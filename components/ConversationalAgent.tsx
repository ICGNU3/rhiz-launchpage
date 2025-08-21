'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  audioUrl?: string
  confidence?: number
  entities?: string[]
  topics?: string[]
  synergies?: SynergyOpportunity[]
  sentiment?: 'positive' | 'neutral' | 'negative'
}

interface AgentResponse {
  text: string
  audioUrl?: string
  confidence?: number
  entities?: string[]
  topics?: string[]
  synergies?: SynergyOpportunity[]
  sentiment?: 'positive' | 'neutral' | 'negative'
}

interface SynergyOpportunity {
  id: string
  title: string
  value: number
  confidence: number
  connections: string[]
}

interface VoiceBiometrics {
  pitch: number
  tone: string
  energy: number
  speaking_rate: number
}

type AIState = 'idle' | 'listening' | 'processing' | 'speaking' | 'learning' | 'analyzing'

type LanguageCode = 'en-US' | 'es-ES' | 'fr-FR' | 'de-DE' | 'zh-CN' | 'ja-JP'

interface LanguageOption {
  code: LanguageCode
  name: string
  flag: string
}

export const ConversationalAgent = () => {
  // Mobile detection
  const [isMobile, setIsMobile] = useState(false)
  
  // Core States
  const [aiState, setAIState] = useState<AIState>('idle')
  const [messages, setMessages] = useState<Message[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // Advanced AI States
  const [confidence, setConfidence] = useState(0)
  const [detectedEntities, setDetectedEntities] = useState<string[]>([])
  const [activeTopics, setActiveTopics] = useState<string[]>([])
  const [synergies, setSynergies] = useState<SynergyOpportunity[]>([])
  const [voiceBiometrics, setVoiceBiometrics] = useState<VoiceBiometrics | null>(null)
  const [relationshipDepth, setRelationshipDepth] = useState(0)
  
  // Language & Suggestions
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en-US')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  
  // Audio Visualization
  const [audioLevels, setAudioLevels] = useState<number[]>(Array(12).fill(0))
  const [waveformData, setWaveformData] = useState<number[]>(Array(50).fill(0))
  const [isThinking, setIsThinking] = useState(false)
  
  // Memory & Learning
  const [memoryContext, setMemoryContext] = useState<string[]>([])
  const [learningProgress, setLearningProgress] = useState(0)
  
  // Refs
  const recognitionRef = useRef<any>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  // Language options
  const languages: LanguageOption[] = [
    { code: 'en-US', name: 'English', flag: '🇺🇸' },
    { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
    { code: 'fr-FR', name: 'Français', flag: '🇫🇷' },
    { code: 'de-DE', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
    { code: 'ja-JP', name: '日本語', flag: '🇯🇵' }
  ]

  // Skeleton Components
  const MessageSkeleton = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-start gap-3 mb-4"
    >
      <div className="w-8 h-8 bg-os-darker rounded-full animate-pulse"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-os-darker rounded animate-pulse w-3/4"></div>
        <div className="h-3 bg-os-darker rounded animate-pulse w-1/2"></div>
      </div>
    </motion.div>
  )

  const VoiceInterfaceSkeleton = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-os-darker/50 backdrop-blur-md border border-depth-cyan/30 rounded-lg p-4 space-y-4"
    >
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-os-darker rounded-full animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-os-darker rounded animate-pulse w-24"></div>
            <div className="h-3 bg-os-darker rounded animate-pulse w-16"></div>
          </div>
        </div>
        <div className="w-8 h-8 bg-os-darker rounded-full animate-pulse"></div>
      </div>

      {/* Messages Area Skeleton */}
      <div className="space-y-3">
        <MessageSkeleton />
        <MessageSkeleton />
        <MessageSkeleton />
      </div>

      {/* Input Area Skeleton */}
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 bg-os-darker rounded-full animate-pulse"></div>
        <div className="flex-1 h-12 bg-os-darker rounded-lg animate-pulse"></div>
        <div className="w-8 h-8 bg-os-darker rounded-full animate-pulse"></div>
      </div>

      {/* Suggestions Skeleton */}
      <div className="grid grid-cols-2 gap-2">
        <div className="h-8 bg-os-darker rounded animate-pulse"></div>
        <div className="h-8 bg-os-darker rounded animate-pulse"></div>
        <div className="h-8 bg-os-darker rounded animate-pulse"></div>
        <div className="h-8 bg-os-darker rounded animate-pulse"></div>
      </div>
    </motion.div>
  )

  // Audio visualization update function
  const updateAudioVisualization = useCallback(() => {
    if (analyserRef.current) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
      analyserRef.current.getByteFrequencyData(dataArray)
      
      // Create audio levels for bars
      const levels = []
      const step = Math.floor(dataArray.length / 12)
      for (let i = 0; i < 12; i++) {
        const start = i * step
        const end = start + step
        const slice = dataArray.slice(start, end)
        const average = slice.reduce((sum, value) => sum + value, 0) / slice.length
        levels.push(average / 255) // Normalize to 0-1
      }
      setAudioLevels(levels)
      
      // Create waveform data
      const waveform = []
      const waveStep = Math.floor(dataArray.length / 50)
      for (let i = 0; i < 50; i++) {
        const start = i * waveStep
        const end = start + waveStep
        const slice = dataArray.slice(start, end)
        const average = slice.reduce((sum, value) => sum + value, 0) / slice.length
        waveform.push(average / 255)
      }
      setWaveformData(waveform)
    }
    
    if (aiState === 'listening' || aiState === 'speaking') {
      animationFrameRef.current = requestAnimationFrame(updateAudioVisualization)
    }
  }, [aiState])

  // Initialize speech recognition with enhanced features
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check for browser support
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = currentLanguage
        recognitionRef.current.maxAlternatives = 3

        recognitionRef.current.onstart = () => {
          setAIState('listening')
          setIsConnected(true)
          setShowSuggestions(false)
          
          // Start audio visualization with mobile compatibility
          navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
              if (!audioContextRef.current) {
                // Handle Safari's requirement for user gesture
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
              }
              
              // Resume audio context for mobile Safari
              if (audioContextRef.current.state === 'suspended') {
                audioContextRef.current.resume()
              }
              
              const source = audioContextRef.current.createMediaStreamSource(stream)
              analyserRef.current = audioContextRef.current.createAnalyser()
              analyserRef.current.fftSize = 256
              source.connect(analyserRef.current)
              updateAudioVisualization()
            })
            .catch(error => {
              console.error('Microphone access error:', error)
              // Provide user feedback for mobile permission issues
              if (error.name === 'NotAllowedError') {
                setMessages(prev => [...prev, {
                  id: Date.now().toString(),
                  text: "Microphone permission denied. Please enable microphone access in your browser settings to use voice features.",
                  isUser: false,
                  timestamp: new Date(),
                  confidence: 100
                }])
              }
            })
        }

        recognitionRef.current.onresult = (event: any) => {
          const result = event.results[event.results.length - 1]
          const transcript = result[0].transcript
          const confidence = result[0].confidence
          
          setCurrentInput(transcript)
          setConfidence(confidence * 100)
          
          // Simulate voice biometrics analysis
          setVoiceBiometrics({
            pitch: Math.random() * 100 + 50,
            tone: ['calm', 'excited', 'focused', 'curious'][Math.floor(Math.random() * 4)],
            energy: Math.random() * 100,
            speaking_rate: Math.random() * 50 + 100
          })
          
          if (result.isFinal) {
            handleUserMessage(transcript, confidence)
          }
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          setAIState('idle')
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current)
          }
        }

        recognitionRef.current.onend = () => {
          setAIState('idle')
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current)
          }
        }
      }
      
      // Initialize suggestions
      setSuggestions([
        "What synergies do you see in my network?",
        "Analyze the depth of my relationships",
        "Show me collaboration opportunities",
        "Who should I connect with next?"
      ])
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [currentLanguage, updateAudioVisualization])

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Initialize conversation with ElevenLabs
  useEffect(() => {
    initializeConversation()
  }, [])

  const initializeConversation = async () => {
    try {
      setIsLoading(true)
      const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY
      console.log('API Key available:', !!apiKey)
      console.log('Voice ID:', process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID)
      
      if (!apiKey) {
        console.warn('ElevenLabs API key not found')
        setIsLoading(false)
        return
      }

      // First, let's test the API key with a simple request
      const testResponse = await fetch('https://api.elevenlabs.io/v1/voices', {
        method: 'GET',
        headers: {
          'xi-api-key': apiKey,
        }
      })

      if (!testResponse.ok) {
        console.error('API key test failed:', testResponse.status, testResponse.statusText)
        return
      }

      console.log('API key is valid, proceeding with conversation setup')

      // For now, let's use a simpler approach - just set up the connection
      // We'll implement the full conversational AI in the next step
      setIsConnected(true)
      setIsLoading(false)
      console.log('Conversational agent initialized successfully')
      
    } catch (error) {
      console.error('Failed to initialize conversation:', error)
      setIsLoading(false)
    }
  }

  const handleUserMessage = async (text: string, confidence: number = 100) => {
    // Simulate entity and topic extraction
    const entities = extractEntities(text)
    const topics = extractTopics(text)
    const detectedSynergies = findSynergies(text)
    const sentiment = analyzeSentiment(text)
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
      confidence,
      entities,
      topics,
      synergies: detectedSynergies,
      sentiment
    }

    setMessages(prev => [...prev, userMessage])
    setAIState('processing')
    setIsThinking(true)
    
    // Update context and learning
    setDetectedEntities(prev => Array.from(new Set([...prev, ...entities])))
    setActiveTopics(prev => Array.from(new Set([...prev, ...topics])))
    setSynergies(prev => [...prev, ...detectedSynergies])
    setMemoryContext(prev => [...prev, text].slice(-10)) // Keep last 10 interactions
    
    // Simulate processing time with thinking animation
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))

    try {
      setAIState('analyzing')
      const response = await sendMessageToAgent(text, confidence, entities, topics)
      
      setAIState('speaking')
      setIsThinking(false)
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isUser: false,
        timestamp: new Date(),
        audioUrl: response.audioUrl,
        confidence: response.confidence,
        entities: response.entities,
        topics: response.topics,
        synergies: response.synergies,
        sentiment: response.sentiment
      }

      setMessages(prev => [...prev, aiMessage])
      
      // Update relationship depth based on conversation quality
      setRelationshipDepth(prev => Math.min(100, prev + Math.random() * 5))
      setLearningProgress(prev => Math.min(100, prev + Math.random() * 3))

      // Play audio if available with mobile compatibility
      if (response.audioUrl && audioRef.current) {        
        // Handle mobile audio playback with user gesture requirement
        const playAudio = async () => {
          try {
            audioRef.current!.onplay = () => {
              updateAudioVisualization()
            }
            audioRef.current!.onended = () => {
              setAIState('idle')
              generateContextualSuggestions(response.text)
            }
            
            await audioRef.current!.play()
          } catch (error) {
            console.warn('Audio playback failed (likely mobile restrictions):', error)
            // On mobile, audio often requires user gesture - show message
            if (isMobile) {
              setMessages(prev => [...prev, {
                id: (Date.now() + 2).toString(),
                text: "[Tap to play audio response]",
                isUser: false,
                timestamp: new Date(),
                confidence: 100,
                audioUrl: response.audioUrl
              }])
            }
            setAIState('idle')
            generateContextualSuggestions(response.text)
          }
        }
        
        audioRef.current.src = response.audioUrl
        playAudio()
      } else {
        setAIState('idle')
        generateContextualSuggestions(response.text)
      }

    } catch (error) {
      console.error('Error processing message:', error)
      setAIState('idle')
      setIsThinking(false)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm experiencing a temporary processing interruption. My relationship intelligence systems are recalibrating. Please try again.",
        isUser: false,
        timestamp: new Date(),
        confidence: 95
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setCurrentInput('')
    }
  }

  // Enhanced AI processing functions
  const extractEntities = (text: string): string[] => {
    const entities = []
    const lowerText = text.toLowerCase()
    
    // People names (simplified detection)
    const namePatterns = /\b[A-Z][a-z]+ [A-Z][a-z]+\b/g
    const names = text.match(namePatterns) || []
    entities.push(...names)
    
    // Companies
    const companies = ['google', 'apple', 'microsoft', 'amazon', 'stripe', 'openai', 'anthropic']
    companies.forEach(company => {
      if (lowerText.includes(company)) entities.push(company)
    })
    
    // Technologies
    const technologies = ['ai', 'machine learning', 'blockchain', 'api', 'cloud', 'data']
    technologies.forEach(tech => {
      if (lowerText.includes(tech)) entities.push(tech)
    })
    
    return Array.from(new Set(entities))
  }
  
  const extractTopics = (text: string): string[] => {
    const topics: string[] = []
    const lowerText = text.toLowerCase()
    
    const topicMap: Record<string, string[]> = {
      'networking': ['network', 'connect', 'relationship', 'introduction'],
      'business': ['business', 'startup', 'company', 'venture'],
      'technology': ['tech', 'software', 'development', 'engineering'],
      'collaboration': ['collaborate', 'partner', 'work together', 'team up'],
      'opportunities': ['opportunity', 'chance', 'potential', 'possibility']
    }
    
    Object.entries(topicMap).forEach(([topic, keywords]) => {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        topics.push(topic)
      }
    })
    
    return topics
  }
  
  const findSynergies = (text: string): SynergyOpportunity[] => {
    const synergies = []
    const lowerText = text.toLowerCase()
    
    if (lowerText.includes('startup') || lowerText.includes('entrepreneur')) {
      synergies.push({
        id: Date.now().toString(),
        title: 'Startup Ecosystem Connection',
        value: 250000 + Math.random() * 500000,
        confidence: 0.8 + Math.random() * 0.2,
        connections: ['VCs', 'Accelerators', 'Fellow Founders']
      })
    }
    
    if (lowerText.includes('ai') || lowerText.includes('machine learning')) {
      synergies.push({
        id: (Date.now() + 1).toString(),
        title: 'AI Research Collaboration',
        value: 180000 + Math.random() * 320000,
        confidence: 0.7 + Math.random() * 0.3,
        connections: ['Research Labs', 'AI Companies', 'Tech Leaders']
      })
    }
    
    return synergies
  }
  
  const analyzeSentiment = (text: string): 'positive' | 'neutral' | 'negative' => {
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'excited']
    const negativeWords = ['bad', 'terrible', 'awful', 'disappointed', 'frustrated']
    
    const lowerText = text.toLowerCase()
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length
    
    if (positiveCount > negativeCount) return 'positive'
    if (negativeCount > positiveCount) return 'negative'
    return 'neutral'
  }
  
  const generateContextualSuggestions = (responseText: string) => {
    const suggestions = []
    const lowerResponse = responseText.toLowerCase()
    
    if (lowerResponse.includes('network')) {
      suggestions.push("Show me my network map", "Analyze connection strength")
    }
    if (lowerResponse.includes('synergy')) {
      suggestions.push("Find more synergies", "Calculate opportunity value")
    }
    if (lowerResponse.includes('relationship')) {
      suggestions.push("Deepen this relationship", "Schedule follow-up")
    }
    
    // Always include some general suggestions
    suggestions.push(
      "What patterns do you see?",
      "Recommend next actions",
      "Show relationship timeline"
    )
    
    setSuggestions(suggestions.slice(0, 4))
    setShowSuggestions(true)
  }

  // REAL AI INTEGRATION - Using secure API route
  const sendMessageToAgent = async (
    text: string, 
    confidence: number = 100, 
    entities: string[] = [], 
    topics: string[] = []
  ): Promise<AgentResponse> => {
    const elevenlabsApiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY

    try {
      // Call our secure API route for OpenAI integration
      const chatResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          entities,
          topics,
          memoryContext
        })
      })

      if (!chatResponse.ok) {
        throw new Error(`Chat API error: ${chatResponse.status}`)
      }

      const chatData = await chatResponse.json()
      const aiResponse = chatData.response
      
      // Extract metadata from AI response
      const responseEntities = extractEntities(aiResponse)
      const responseTopics = extractTopics(aiResponse)
      const responseSynergies = findSynergies(aiResponse)
      const responseSentiment = analyzeSentiment(aiResponse)
      
      // Convert to speech with ElevenLabs TTS (if API key available)
      let audioUrl: string | undefined
      
      if (elevenlabsApiKey) {
        try {
          const voiceId = process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM'
          
          const ttsResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
            method: 'POST',
            headers: {
              'Accept': 'audio/mpeg',
              'Content-Type': 'application/json',
              'xi-api-key': elevenlabsApiKey,
            },
            body: JSON.stringify({
              text: aiResponse,
              model_id: 'eleven_monolingual_v1',
              voice_settings: {
                stability: 0.6,
                similarity_boost: 0.8,
                style: 0.2,
                use_speaker_boost: true
              }
            })
          })

          if (ttsResponse.ok) {
            const audioBlob = await ttsResponse.blob()
            audioUrl = URL.createObjectURL(audioBlob)
          } else {
            console.warn('TTS failed:', ttsResponse.status, ttsResponse.statusText)
          }
        } catch (ttsError) {
          console.warn('TTS error:', ttsError)
        }
      }
      
      return {
        text: aiResponse,
        audioUrl,
        confidence: 90 + Math.random() * 10,
        entities: responseEntities,
        topics: responseTopics,
        synergies: responseSynergies,
        sentiment: responseSentiment
      }
    } catch (error) {
      console.error('AI processing error:', error)
      
      // Fallback response
      const fallbackResponse = "I'm experiencing a temporary connection issue with my neural networks. My relationship intelligence systems are recalibrating. Please try again in a moment."
      
      return {
        text: fallbackResponse,
        audioUrl: undefined,
        confidence: 95,
        entities: [],
        topics: ['technical'],
        synergies: [],
        sentiment: 'neutral'
      }
    }
  }

  const startListening = async () => {
    if (recognitionRef.current && aiState === 'idle') {
      try {
        // Initialize audio context with user gesture for mobile
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        }
        
        // Resume audio context if suspended (common on mobile)
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume()
        }
        
        recognitionRef.current.start()
      } catch (error) {
        console.error('Error starting speech recognition:', error)
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: "Voice recognition unavailable. Please type your message or check microphone permissions.",
          isUser: false,
          timestamp: new Date(),
          confidence: 100
        }])
      }
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && aiState === 'listening') {
      recognitionRef.current.stop()
    }
  }
  
  const handleSuggestionClick = (suggestion: string) => {
    setCurrentInput(suggestion)
    setShowSuggestions(false)
    handleUserMessage(suggestion, 100)
  }
  
  const changeLanguage = (languageCode: LanguageCode) => {
    setCurrentLanguage(languageCode)
    if (recognitionRef.current) {
      recognitionRef.current.lang = languageCode
    }
  }

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentInput.trim()) {
      handleUserMessage(currentInput.trim())
    }
  }
  
  // Handle audio playback for mobile messages
  const handleAudioPlayback = async (audioUrl: string) => {
    if (audioRef.current) {
      try {
        audioRef.current.src = audioUrl
        await audioRef.current.play()
      } catch (error) {
        console.warn('Mobile audio playback failed:', error)
      }
    }
  }

  // Show skeleton while loading
  if (isLoading) {
    return <VoiceInterfaceSkeleton />
  }

  return (
    <div className={`w-full h-full flex flex-col relative ${isMobile ? 'overflow-y-auto' : 'overflow-hidden'}`}>
      {/* Hidden audio element for playback */}
      <audio ref={audioRef} className="hidden" />
      
      {/* Enhanced Status Bar with AI State */}
      <div className={`flex items-center justify-between mb-3 p-2 bg-os-darker/50 rounded border border-synergy-gold/20 ${
        isMobile ? 'p-3' : ''
      }`}>
        <div className="flex items-center gap-2">
          <motion.div 
            className={`w-3 h-3 rounded-full ${
              isConnected ? 'bg-connection-green' : 'bg-red-500'
            }`}
            animate={isConnected ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className={`font-mono text-interface-light ${
            isMobile ? 'text-sm' : 'text-xs'
          }`}>
            RHIZ_AI.{aiState.toUpperCase()}
          </span>
        </div>
        
        {/* Language Selector - Hidden on mobile for space */}
        {!isMobile && (
          <div className="flex items-center gap-2">
            <select 
              value={currentLanguage} 
              onChange={(e) => changeLanguage(e.target.value as LanguageCode)}
              aria-label="Select language for voice recognition"
              className="bg-os-dark border border-depth-cyan/30 rounded text-xs px-2 py-1 text-interface-light"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      
      {/* Real-time Intelligence Display */}
      <AnimatePresence>
        {(detectedEntities.length > 0 || activeTopics.length > 0 || synergies.length > 0) && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`mb-3 p-3 bg-gradient-to-r from-synergy-gold/10 to-depth-cyan/10 rounded border border-synergy-gold/30 ${
              isMobile ? 'p-2' : ''
            }`}
          >
            <div className={`grid gap-2 text-xs ${
              isMobile ? 'grid-cols-1' : 'grid-cols-3'
            }`}>
              {detectedEntities.length > 0 && (
                <div>
                  <div className="text-synergy-gold font-mono mb-1">ENTITIES</div>
                  <div className="text-interface-light">
                    {detectedEntities.slice(0, isMobile ? 1 : 2).map(entity => (
                      <span key={entity} className="inline-block bg-synergy-gold/20 px-1 rounded mr-1 mb-1">
                        {entity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTopics.length > 0 && (
                <div>
                  <div className="text-depth-cyan font-mono mb-1">TOPICS</div>
                  <div className="text-interface-light">
                    {activeTopics.slice(0, isMobile ? 1 : 2).map(topic => (
                      <span key={topic} className="inline-block bg-depth-cyan/20 px-1 rounded mr-1 mb-1">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {synergies.length > 0 && (
                <div>
                  <div className="text-alert-magenta font-mono mb-1">SYNERGIES</div>
                  <div className="text-interface-light">
                    ${Math.floor(synergies.reduce((sum, s) => sum + s.value, 0)).toLocaleString()}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Voice Biometrics Display */}
      <AnimatePresence>
        {voiceBiometrics && aiState === 'listening' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-3 p-2 bg-os-darker/70 rounded border border-connection-green/30"
          >
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div>
                <div className="text-connection-green font-mono">PITCH</div>
                <div className="text-interface-light">{Math.floor(voiceBiometrics.pitch)}Hz</div>
              </div>
              <div>
                <div className="text-connection-green font-mono">TONE</div>
                <div className="text-interface-light">{voiceBiometrics.tone}</div>
              </div>
              <div>
                <div className="text-connection-green font-mono">ENERGY</div>
                <div className="text-interface-light">{Math.floor(voiceBiometrics.energy)}%</div>
              </div>
              <div>
                <div className="text-connection-green font-mono">RATE</div>
                <div className="text-interface-light">{Math.floor(voiceBiometrics.speaking_rate)}wpm</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages Display with Enhanced Visualization */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-3 max-h-40">
        {messages.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xs text-interface-gray py-4 space-y-2"
          >
            <div className="flex justify-center items-center gap-2 mb-2">
              <motion.div 
                className="w-2 h-2 bg-synergy-gold rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-synergy-gold font-mono">NEURAL_PATHWAYS.READY</span>
            </div>
            <div>Voice-enabled relationship intelligence at your command</div>
            <div className="text-depth-cyan">Ask about synergies, network depth, or collaboration opportunities</div>
          </motion.div>
        ) : (
          messages.slice(isMobile ? -2 : -3).map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-3 py-2 relative ${
                  message.isUser
                    ? 'bg-gradient-to-r from-synergy-gold to-synergy-light text-os-dark'
                    : 'bg-gradient-to-r from-os-dark to-os-darker text-interface-light border border-depth-cyan/30'
                } ${isMobile ? 'text-sm' : 'text-xs'}`}
              >
                {/* Handle clickable audio messages for mobile */}
                {message.audioUrl && message.text === '[Tap to play audio response]' ? (
                  <button 
                    type="button"
                    onClick={() => handleAudioPlayback(message.audioUrl!)}
                    className="flex items-center gap-2 w-full text-left hover:bg-depth-cyan/10 rounded p-1 transition-colors touch-manipulation"
                    style={{ minHeight: '44px' }}
                  >
                    <div className="w-3 h-3 bg-connection-green rounded-full animate-pulse"></div>
                    <span>Tap to play audio response</span>
                  </button>
                ) : (
                  message.text
                )}
                
                {/* Confidence and Metadata - Simplified on mobile */}
                {message.confidence && !isMobile && (
                  <div className={`mt-2 flex items-center gap-2 text-xs ${
                    message.isUser ? 'text-os-dark/70' : 'text-interface-gray'
                  }`}>
                    <span>Confidence: {Math.floor(message.confidence)}%</span>
                    {message.sentiment && (
                      <span className={`px-1 rounded ${
                        message.sentiment === 'positive' ? 'bg-connection-green/20 text-connection-green' :
                        message.sentiment === 'negative' ? 'bg-red-500/20 text-red-400' :
                        'bg-interface-gray/20 text-interface-gray'
                      }`}>
                        {message.sentiment}
                      </span>
                    )}
                  </div>
                )}
                
                {message.audioUrl && !isMobile && (
                  <div className="mt-1 flex items-center gap-1">
                    <div className="w-1 h-1 bg-connection-green rounded-full animate-pulse"></div>
                    <span className="text-xs text-connection-green">Neural audio generated</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
      
      {/* AI Thinking Animation */}
      <AnimatePresence>
        {isThinking && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3 p-3 bg-gradient-to-r from-synergy-gold/10 to-depth-cyan/10 rounded border border-synergy-gold/50"
          >
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-synergy-gold rounded-full"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity, 
                      delay: i * 0.2 
                    }}
                  />
                ))}
              </div>
              <span className="text-xs font-mono text-synergy-gold">
                NEURAL_PROCESSING.ACTIVE
              </span>
              <div className="flex-1">
                <div className="w-full bg-os-dark rounded-full h-1">
                  <motion.div 
                    className="bg-gradient-to-r from-synergy-gold to-depth-cyan h-1 rounded-full"
                    animate={{ width: ['0%', '100%', '0%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Processing Skeleton for AI Response */}
      <AnimatePresence>
        {aiState === 'processing' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex justify-start mb-3"
          >
            <div className="max-w-[85%] rounded-lg px-3 py-2 bg-gradient-to-r from-os-dark to-os-darker border border-depth-cyan/30">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 bg-os-darker rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-os-darker rounded animate-pulse w-3/4"></div>
                  <div className="h-3 bg-os-darker rounded animate-pulse w-1/2"></div>
                  <div className="h-3 bg-os-darker rounded animate-pulse w-2/3"></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Real-time Audio Visualization */}
      <AnimatePresence>
        {(aiState === 'listening' || aiState === 'speaking') && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3"
          >
            {/* Waveform Visualization */}
            <div className="flex items-center justify-center gap-1 h-12 mb-2">
              {audioLevels.map((level, index) => (
                <motion.div
                  key={index}
                  className={`w-1 rounded-full ${
                    aiState === 'listening' ? 'bg-connection-green' : 'bg-synergy-gold'
                  }`}
                  style={{
                    height: `${Math.max(4, level * 40)}px`
                  }}
                  animate={{
                    height: `${Math.max(4, level * 40)}px`,
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 0.1 }}
                />
              ))}
            </div>
            
            {/* State Indicator */}
            <div className="text-center">
              <span className={`text-xs font-mono ${
                aiState === 'listening' ? 'text-connection-green' : 'text-synergy-gold'
              }`}>
                {aiState === 'listening' ? 'VOICE_CAPTURE.ACTIVE' : 'NEURAL_SYNTHESIS.ACTIVE'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Smart Suggestions */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-3"
          >
            <div className={`font-mono text-depth-cyan mb-2 ${
              isMobile ? 'text-sm' : 'text-xs'
            }`}>SUGGESTED_QUERIES</div>
            <div className={`grid gap-2 ${
              isMobile ? 'grid-cols-1' : 'grid-cols-2'
            }`}>
              {suggestions.slice(0, isMobile ? 2 : 4).map((suggestion, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-left p-3 md:p-2 bg-os-darker/50 hover:bg-depth-cyan/20 border border-depth-cyan/30 rounded text-sm md:text-xs transition-all touch-manipulation"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ minHeight: '44px' }}
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Relationship Metrics - Hidden on mobile for space */}
      {(relationshipDepth > 0 || learningProgress > 0) && !isMobile && (
        <div className="mb-3 p-2 bg-os-darker/30 rounded border border-interface-gray/20">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-mono text-depth-cyan mb-1">RELATIONSHIP_DEPTH</div>
              <div className="w-full bg-os-dark rounded-full h-1">
                <motion.div 
                  className="bg-gradient-to-r from-depth-blue to-depth-cyan h-1 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${relationshipDepth}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              <div className="text-xs text-interface-light mt-1">{Math.floor(relationshipDepth)}%</div>
            </div>
            
            <div>
              <div className="text-xs font-mono text-synergy-gold mb-1">AI_LEARNING</div>
              <div className="w-full bg-os-dark rounded-full h-1">
                <motion.div 
                  className="bg-gradient-to-r from-synergy-gold to-synergy-light h-1 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${learningProgress}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              <div className="text-xs text-interface-light mt-1">{Math.floor(learningProgress)}%</div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Input Area */}
      <div className={`flex items-center gap-2 ${isMobile ? 'gap-3' : ''}`}>
        {/* AI State Indicator - Hidden on mobile for space */}
        {!isMobile && (
          <motion.div 
            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
              aiState === 'listening' ? 'border-connection-green bg-connection-green/20' :
              aiState === 'processing' ? 'border-synergy-gold bg-synergy-gold/20' :
              aiState === 'speaking' ? 'border-alert-magenta bg-alert-magenta/20' :
              aiState === 'learning' ? 'border-depth-cyan bg-depth-cyan/20' :
              'border-interface-gray bg-interface-gray/20'
            }`}
            animate={{
              scale: aiState !== 'idle' ? [1, 1.1, 1] : 1
            }}
            transition={{ duration: 1, repeat: aiState !== 'idle' ? Infinity : 0 }}
          >
          {aiState === 'idle' && (
            <motion.div 
              className="w-4 h-4 bg-interface-gray rounded-full"
              whileHover={{ scale: 1.2 }}
            />
          )}
          {aiState === 'listening' && (
            <motion.div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-1 h-4 bg-connection-green rounded-full"
                  animate={{ 
                    scaleY: [1, 2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 0.5, 
                    repeat: Infinity, 
                    delay: i * 0.1 
                  }}
                />
              ))}
            </motion.div>
          )}
          {aiState === 'processing' && (
            <motion.div 
              className="w-4 h-4 border-2 border-synergy-gold border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          )}
          {aiState === 'speaking' && (
            <motion.div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="w-1 h-4 bg-alert-magenta rounded-full"
                  animate={{ 
                    scaleY: [1, 0.5, 2, 0.8, 1],
                    opacity: [0.8, 1, 0.6, 1, 0.8]
                  }}
                  transition={{ 
                    duration: 0.8, 
                    repeat: Infinity, 
                    delay: i * 0.15 
                  }}
                />
              ))}
            </motion.div>
          )}
          {aiState === 'learning' && (
            <motion.div 
              className="w-4 h-4 border-2 border-depth-cyan rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                borderColor: ['#00FFFF', '#FFD700', '#00FFFF']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.div>
        )}

        {/* Voice Button */}
        <motion.button
          onClick={aiState === 'listening' ? stopListening : startListening}
          disabled={aiState === 'processing' || aiState === 'speaking' || !isConnected}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-14 h-14 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all relative overflow-hidden touch-manipulation ${
            aiState === 'listening'
              ? 'bg-gradient-to-r from-alert-magenta to-alert-purple shadow-lg'
              : 'bg-gradient-to-r from-connection-green to-connection-light hover:shadow-lg'
          } ${(aiState === 'processing' || aiState === 'speaking' || !isConnected) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          style={{ minHeight: '56px', minWidth: '56px' }}
        >
          <AnimatePresence mode="wait">
            {aiState === 'listening' ? (
              <motion.div
                key="stop"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="w-4 h-4 bg-white rounded-sm"
              />
            ) : (
              <motion.div
                key="mic"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="w-5 h-5 bg-os-dark rounded-full"
              />
            )}
          </AnimatePresence>
          
          {/* Pulsing ring effect */}
          {aiState === 'listening' && (
            <motion.div 
              className="absolute inset-0 border-2 border-white rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.8, 0, 0.8]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.button>

        {/* Text Input */}
        <form onSubmit={handleTextSubmit} className="flex-1">
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder={getInputPlaceholder()}
            disabled={aiState === 'processing' || aiState === 'speaking' || !isConnected}
            className="w-full bg-gradient-to-r from-os-dark to-os-darker border border-depth-cyan/30 rounded-lg px-4 py-4 md:py-3 text-base md:text-sm text-interface-light placeholder-interface-gray focus:outline-none focus:border-depth-cyan/60 focus:shadow-lg transition-all touch-manipulation"
            style={{ minHeight: '48px' }}
          />
        </form>

        {/* Confidence Indicator - Hidden on mobile for space */}
        {confidence > 0 && !isMobile && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-1"
          >
            <div className={`w-8 h-1 rounded-full ${
              confidence > 80 ? 'bg-connection-green' :
              confidence > 60 ? 'bg-synergy-gold' :
              'bg-alert-magenta'
            }`}></div>
            <span className="text-xs text-interface-gray">{Math.floor(confidence)}%</span>
          </motion.div>
        )}

        {/* Processing Neural Network Animation - Hidden on mobile for space */}
        {aiState === 'processing' && !isMobile && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1"
          >
            {[0, 1, 2, 3, 4].map(i => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-synergy-gold rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.1 
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
  
  function getInputPlaceholder(): string {
    switch (aiState) {
      case 'processing':
        return 'Neural networks processing...'
      case 'speaking':
        return 'AI responding...'
      case 'learning':
        return 'Updating relationship intelligence...'
      case 'listening':
        return 'Listening...'
      default:
        return 'Ask about relationships, synergies, or network insights...'
    }
  }
}

export default ConversationalAgent
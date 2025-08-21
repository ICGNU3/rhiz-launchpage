'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  audioUrl?: string
}

interface AgentResponse {
  text: string
  audioUrl?: string
}

export const ConversationalAgent = () => {
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const recognitionRef = useRef<any>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check for browser support
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = 'en-US'

        recognitionRef.current.onstart = () => {
          setIsListening(true)
          setIsConnected(true)
        }

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setCurrentInput(transcript)
          handleUserMessage(transcript)
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }
    }
  }, [])

  // Initialize conversation with ElevenLabs
  useEffect(() => {
    initializeConversation()
  }, [])

  const initializeConversation = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY
      console.log('API Key available:', !!apiKey)
      console.log('Voice ID:', process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID)
      
      if (!apiKey) {
        console.warn('ElevenLabs API key not found')
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
      console.log('Conversational agent initialized successfully')
      
    } catch (error) {
      console.error('Failed to initialize conversation:', error)
    }
  }

  const handleUserMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsProcessing(true)

    try {
      // For now, let's provide a simple response without the conversation API
      const response = await sendMessageToAgent(text)
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isUser: false,
        timestamp: new Date(),
        audioUrl: response.audioUrl
      }

      setMessages(prev => [...prev, aiMessage])

      // Play audio if available
      if (response.audioUrl && audioRef.current) {
        audioRef.current.src = response.audioUrl
        audioRef.current.play()
      }

    } catch (error) {
      console.error('Error processing message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble processing your request right now. Please try again.",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsProcessing(false)
      setCurrentInput('')
    }
  }

  const sendMessageToAgent = async (text: string): Promise<AgentResponse> => {
    const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY
    if (!apiKey) {
      throw new Error('API key not available')
    }

    // For now, let's use a simple text-to-speech approach
    // This will generate a response and convert it to speech
    const aiResponse = generateAIResponse(text)
    
    try {
      // Convert the response to speech using ElevenLabs TTS
      const voiceId = process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM'
      
      const ttsResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text: aiResponse,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        })
      })

      if (ttsResponse.ok) {
        const audioBlob = await ttsResponse.blob()
        const audioUrl = URL.createObjectURL(audioBlob)
        
        return {
          text: aiResponse,
          audioUrl: audioUrl
        }
      } else {
        console.warn('TTS failed, returning text only')
        return {
          text: aiResponse,
          audioUrl: undefined
        }
      }
    } catch (error) {
      console.warn('TTS error, returning text only:', error)
      return {
        text: aiResponse,
        audioUrl: undefined
      }
    }
  }

  const generateAIResponse = (userInput: string): string => {
    // Simple AI response logic for RHIZ relationship intelligence
    const input = userInput.toLowerCase()
    
    if (input.includes('relationship') || input.includes('network')) {
      return "I can help you analyze your relationship network. RHIZ's synergy detection can identify high-value connections and opportunities you might be missing. What specific aspect of your network would you like to explore?"
    }
    
    if (input.includes('synergy') || input.includes('opportunity')) {
      return "Synergy detection is one of RHIZ's core capabilities. I can help you identify potential collaborations, partnerships, and opportunities within your network. Would you like me to analyze your current connections?"
    }
    
    if (input.includes('help') || input.includes('what can you do')) {
      return "I'm RHIZ, your AI relationship intelligence assistant. I can help you discover synergies in your network, optimize relationships, and identify high-value connections. Ask me about relationship insights, network optimization, or synergy opportunities."
    }
    
    if (input.includes('hello') || input.includes('hi')) {
      return "Hello! I'm RHIZ, your AI relationship intelligence assistant. I'm here to help you discover synergies and optimize your network. How can I assist you today?"
    }
    
    // Default response
    return "I understand you're asking about " + userInput + ". As your relationship intelligence assistant, I can help you analyze connections, identify synergies, and optimize your network. Could you tell me more about what you're looking to achieve?"
  }

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentInput.trim()) {
      handleUserMessage(currentInput.trim())
    }
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Hidden audio element for playback */}
      <audio ref={audioRef} style={{ display: 'none' }} />
      
      {/* Connection Status */}
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-connection-green' : 'bg-red-500'}`}></div>
        <span className="text-xs font-mono text-interface-light">
          {isConnected ? 'CONVERSATIONAL_AGENT.ONLINE' : 'CONVERSATIONAL_AGENT.OFFLINE'}
        </span>
      </div>

      {/* Messages Display */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-3 max-h-32">
        {messages.length === 0 ? (
          <div className="text-center text-xs text-interface-gray py-4">
            Ask me about relationship insights, network optimization, or synergy opportunities
          </div>
        ) : (
          messages.slice(-4).map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 text-xs ${
                  message.isUser
                    ? 'bg-synergy-gold text-os-dark'
                    : 'bg-os-dark text-interface-light border border-depth-cyan/30'
                }`}
              >
                {message.text}
                {message.audioUrl && (
                  <div className="mt-1">
                    <span className="text-xs text-interface-gray">🔊 Audio available</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="flex items-center gap-2">
        {/* Voice Button */}
        <button
          onClick={isListening ? stopListening : startListening}
          disabled={isProcessing || !isConnected}
          aria-label={isListening ? "Stop listening" : "Start voice recognition"}
          title={isListening ? "Stop listening" : "Start voice recognition"}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isListening
              ? 'bg-alert-magenta animate-pulse'
              : 'bg-connection-green hover:bg-connection-green/80'
          } ${(isProcessing || !isConnected) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <div className={`w-3 h-3 ${isListening ? 'bg-white' : 'bg-os-dark'}`}></div>
        </button>

        {/* Text Input */}
        <form onSubmit={handleTextSubmit} className="flex-1">
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            placeholder={isProcessing ? "Processing..." : "Type your question..."}
            disabled={isProcessing || !isConnected}
            className="w-full bg-os-dark border border-depth-cyan/30 rounded px-3 py-2 text-xs text-interface-light placeholder-interface-gray focus:outline-none focus:border-depth-cyan/60"
          />
        </form>

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 bg-depth-cyan rounded-full animate-ping"></div>
            <div className="w-1 h-1 bg-depth-cyan rounded-full animate-ping" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1 h-1 bg-depth-cyan rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConversationalAgent

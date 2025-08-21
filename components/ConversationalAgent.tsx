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
  const [conversationId, setConversationId] = useState<string | null>(null)
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
      if (!apiKey) {
        console.warn('ElevenLabs API key not found')
        return
      }

      // Create a new conversation
      const response = await fetch('https://api.elevenlabs.io/v1/convai/conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          conversation_config: {
            agent: {
              prompt: {
                system_prompt: `You are RHIZ, an AI relationship intelligence assistant. You help users discover synergies in their network, optimize relationships, and identify high-value connections. You speak in a professional yet warm tone, using relationship-focused language. Keep responses concise but insightful.`,
                tool_ids: [], // No custom tools for now
                built_in_tools: [] // No system tools for now
              },
              voice_id: process.env.NEXT_PUBLIC_ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM',
              model_id: 'eleven_monolingual_v1'
            }
          }
        })
      })

      if (response.ok) {
        const data = await response.json()
        setConversationId(data.conversation_id)
        setIsConnected(true)
      }
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
      if (!conversationId) {
        throw new Error('Conversation not initialized')
      }

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
    if (!apiKey || !conversationId) {
      throw new Error('API key or conversation ID not available')
    }

    const response = await fetch(`https://api.elevenlabs.io/v1/convai/conversation/${conversationId}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
      },
      body: JSON.stringify({
        message: text,
        include_audio: true
      })
    })

    if (!response.ok) {
      throw new Error(`Agent API error: ${response.status}`)
    }

    const data = await response.json()
    
    return {
      text: data.response.text,
      audioUrl: data.response.audio_url
    }
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

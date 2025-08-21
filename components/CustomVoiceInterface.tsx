'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export const CustomVoiceInterface = () => {
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const recognitionRef = useRef<any>(null)
  const synthesisRef = useRef<SpeechSynthesis | null>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check for browser support
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
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

      // Initialize speech synthesis
      synthesisRef.current = window.speechSynthesis
    }
  }, [])

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
      // Here you would integrate with ElevenLabs API
      // For now, we'll simulate a response
      const response = await simulateElevenLabsResponse(text)
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
      
      // Speak the response
      if (synthesisRef.current) {
        const utterance = new SpeechSynthesisUtterance(response)
        utterance.rate = 0.9
        utterance.pitch = 1.1
        synthesisRef.current.speak(utterance)
      }
    } catch (error) {
      console.error('Error processing message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble processing your request right now.",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsProcessing(false)
      setCurrentInput('')
    }
  }

  const simulateElevenLabsResponse = async (userInput: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simple response logic - in real implementation, this would call ElevenLabs API
    const responses = [
      "I understand you're asking about relationship insights. Let me help you discover synergies in your network.",
      "Based on your question, I can see several opportunities for deeper connections in your professional network.",
      "That's an interesting perspective on relationship building. Have you considered the depth of your existing connections?",
      "I'm analyzing your network patterns. I can identify several high-value connections you might be missing.",
      "Your question touches on a key aspect of relationship intelligence. Let me share some insights about network optimization."
    ]
    
    return responses[Math.floor(Math.random() * responses.length)]
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
      {/* Connection Status */}
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-connection-green' : 'bg-red-500'}`}></div>
        <span className="text-xs font-mono text-interface-light">
          {isConnected ? 'VOICE_INTERFACE.ONLINE' : 'VOICE_INTERFACE.OFFLINE'}
        </span>
      </div>

      {/* Messages Display */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-3 max-h-32">
        {messages.length === 0 ? (
          <div className="text-center text-xs text-interface-gray py-4">
            Ask about relationship insights, synergy opportunities, or network optimization
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
          disabled={isProcessing}
          aria-label={isListening ? "Stop listening" : "Start voice recognition"}
          title={isListening ? "Stop listening" : "Start voice recognition"}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isListening
              ? 'bg-alert-magenta animate-pulse'
              : 'bg-connection-green hover:bg-connection-green/80'
          } ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
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
            disabled={isProcessing}
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

export default CustomVoiceInterface

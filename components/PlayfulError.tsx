'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface PlayfulErrorProps {
  show: boolean
  title?: string
  message: string
  type?: 'network' | 'voice' | 'processing' | 'general'
  onRetry?: () => void
  onDismiss?: () => void
}

const PlayfulError = ({ 
  show, 
  title, 
  message, 
  type = 'general',
  onRetry,
  onDismiss 
}: PlayfulErrorProps) => {
  const [isShaking, setIsShaking] = useState(false)

  const getErrorEmoji = () => {
    switch (type) {
      case 'network':
        return '📡'
      case 'voice':
        return '🎤'
      case 'processing':
        return '🧠'
      default:
        return '🤖'
    }
  }

  const getErrorTitle = () => {
    if (title) return title
    
    switch (type) {
      case 'network':
        return 'Network Hiccup!'
      case 'voice':
        return 'Voice Recognition Oops!'
      case 'processing':
        return 'AI Brain Freeze!'
      default:
        return 'Something Went Sideways!'
    }
  }

  const getFriendlyMessage = () => {
    const friendlyMessages = {
      network: [
        "My digital neurons are having a coffee break ☕",
        "The internet hamsters stopped running on their wheel 🐹",
        "Network is playing hide and seek with us 🙈"
      ],
      voice: [
        "I'm having trouble hearing you over the sound of how awesome you are 🎧",
        "My ears need a moment to recalibrate 👂",
        "Voice recognition is doing vocal warm-ups 🎵"
      ],
      processing: [
        "My AI brain is buffering like a 90s video 📼",
        "Neural networks are doing their thinking dance 💃",
        "Processing power is taking a power nap 😴"
      ],
      general: [
        "Oops! My digital shoelaces came untied 👟",
        "Something unexpected decided to crash the party 🎉",
        "Error 404: Smooth operation not found 🤷‍♂️"
      ]
    }

    const messages = friendlyMessages[type] || friendlyMessages.general
    return messages[Math.floor(Math.random() * messages.length)]
  }

  const handleRetry = () => {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 500)
    onRetry?.()
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            x: isShaking ? [-5, 5, -5, 5, 0] : 0
          }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ 
            duration: 0.3, 
            type: "spring",
            x: { duration: 0.5 }
          }}
          className="bg-os-darker/95 backdrop-blur-md border border-alert-magenta/50 rounded-lg p-6 text-center max-w-md mx-auto shadow-xl"
        >
          {/* Animated Error Icon */}
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, -10, 10, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}
            className="text-6xl mb-4 cursor-pointer"
            onClick={() => setIsShaking(true)}
          >
            {getErrorEmoji()}
          </motion.div>

          {/* Error Title */}
          <motion.h3
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl font-bold text-alert-magenta mb-2"
          >
            {getErrorTitle()}
          </motion.h3>

          {/* Friendly Error Message */}
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-interface-light mb-4"
          >
            {getFriendlyMessage()}
          </motion.p>

          {/* Technical Details (collapsed) */}
          <motion.details
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-interface-gray mb-6 text-left"
          >
            <summary className="cursor-pointer hover:text-interface-light transition-colors">
              Technical Details
            </summary>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-2 p-3 bg-os-dark/50 rounded border border-interface-gray/20 font-mono text-xs"
            >
              {message}
            </motion.div>
          </motion.details>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            {onRetry && (
              <motion.button
                onClick={handleRetry}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 5px 15px rgba(255, 215, 0, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-synergy-gold text-os-dark px-4 py-2 rounded font-semibold hover:bg-synergy-light transition-colors"
              >
                🔄 Try Again
              </motion.button>
            )}
            
            {onDismiss && (
              <motion.button
                onClick={onDismiss}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-interface-gray text-interface-light px-4 py-2 rounded hover:border-interface-light transition-colors"
              >
                Dismiss
              </motion.button>
            )}
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
            {Array.from({ length: 3 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-alert-magenta/50 rounded-full"
                animate={{
                  x: [0, 100, 0],
                  y: [0, -50, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 1,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${80 + i * 5}%`
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PlayfulError
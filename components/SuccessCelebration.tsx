'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface SuccessCelebrationProps {
  show: boolean
  message: string
  onComplete?: () => void
  type?: 'confetti' | 'sparkles' | 'pulse'
}

const SuccessCelebration = ({ 
  show, 
  message, 
  onComplete, 
  type = 'confetti' 
}: SuccessCelebrationProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([])

  useEffect(() => {
    if (show && type === 'confetti') {
      // Generate confetti particles
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: ['#FFD700', '#00FFFF', '#00FF88', '#FF00FF'][Math.floor(Math.random() * 4)]
      }))
      setParticles(newParticles)

      // Auto complete after animation
      const timer = setTimeout(() => {
        onComplete?.()
        setParticles([])
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [show, type, onComplete])

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
            {/* Message */}
            <motion.div
              initial={{ scale: 0, opacity: 0, rotateY: -180 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0, opacity: 0, rotateY: 180 }}
              transition={{ duration: 0.6, ease: "backOut" }}
              className="bg-os-darker/95 backdrop-blur-md border-2 border-synergy-gold rounded-lg p-6 text-center max-w-md mx-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.3, type: "spring" }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl font-bold text-synergy-gold mb-2"
              >
                Success!
              </motion.h3>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-interface-light"
              >
                {message}
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Confetti Animation */}
          {type === 'confetti' && (
            <div className="fixed inset-0 pointer-events-none z-40">
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  initial={{ 
                    x: '50%', 
                    y: '50%', 
                    scale: 0,
                    rotate: 0 
                  }}
                  animate={{ 
                    x: `${particle.x}%`, 
                    y: `${particle.y}%`,
                    scale: [0, 1, 0],
                    rotate: [0, 360, 720]
                  }}
                  transition={{
                    duration: 3,
                    ease: "easeOut",
                    scale: { times: [0, 0.1, 1], duration: 3 }
                  }}
                  className="absolute w-2 h-2 rounded-full"
                  style={{ backgroundColor: particle.color }}
                />
              ))}
            </div>
          )}

          {/* Sparkles Animation */}
          {type === 'sparkles' && (
            <div className="fixed inset-0 pointer-events-none z-40">
              {Array.from({ length: 8 }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    scale: 0,
                    x: '50%',
                    y: '50%',
                    opacity: 0
                  }}
                  animate={{ 
                    scale: [0, 1, 0],
                    x: `${50 + (Math.random() - 0.5) * 80}%`,
                    y: `${50 + (Math.random() - 0.5) * 80}%`,
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                  className="absolute text-2xl"
                >
                  ✨
                </motion.div>
              ))}
            </div>
          )}

          {/* Pulse Animation */}
          {type === 'pulse' && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.5, 2, 0],
                opacity: [0, 0.8, 0.3, 0]
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center"
            >
              <div className="w-64 h-64 border-4 border-synergy-gold rounded-full" />
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  )
}

export default SuccessCelebration
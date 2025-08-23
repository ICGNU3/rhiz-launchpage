'use client'

import { motion } from 'framer-motion'

interface DelightfulLoaderProps {
  type?: 'neural' | 'network' | 'voice' | 'thinking'
  message?: string
  size?: 'sm' | 'md' | 'lg'
  color?: 'gold' | 'cyan' | 'green' | 'magenta'
}

const DelightfulLoader = ({ 
  type = 'neural', 
  message = 'Processing...', 
  size = 'md',
  color = 'gold'
}: DelightfulLoaderProps) => {
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  }

  const colorMap = {
    gold: '#FFD700',
    cyan: '#00FFFF', 
    green: '#00FF88',
    magenta: '#FF00FF'
  }

  const NeuralLoader = () => (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={i}
          className={`${sizeClasses[size]} rounded-full`}
          style={{ backgroundColor: colorMap[color] }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )

  const NetworkLoader = () => (
    <div className="relative">
      {/* Central node */}
      <motion.div
        className={`${sizeClasses[size]} rounded-full border-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
        style={{ borderColor: colorMap[color] }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Orbiting nodes */}
      {Array.from({ length: 3 }, (_, i) => (
        <motion.div
          key={i}
          className="w-3 h-3 rounded-full absolute top-1/2 left-1/2"
          style={{ 
            backgroundColor: colorMap[color],
            transformOrigin: `0 0`,
            transform: `rotate(${i * 120}deg) translate(24px, 0)`
          }}
          animate={{
            rotate: 360,
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, delay: i * 0.3 }
          }}
        />
      ))}
    </div>
  )

  const VoiceLoader = () => (
    <div className="flex items-center gap-1">
      {Array.from({ length: 7 }, (_, i) => (
        <motion.div
          key={i}
          className={`w-2 bg-current rounded-full`}
          style={{ color: colorMap[color] }}
          animate={{
            height: [8, 24, 8],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )

  const ThinkingLoader = () => (
    <div className="flex items-center gap-2">
      {Array.from({ length: 3 }, (_, i) => (
        <motion.div
          key={i}
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: colorMap[color] }}
          animate={{
            y: [-10, 10, -10],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )

  const renderLoader = () => {
    switch (type) {
      case 'neural':
        return <NeuralLoader />
      case 'network':
        return <NetworkLoader />
      case 'voice':
        return <VoiceLoader />
      case 'thinking':
        return <ThinkingLoader />
      default:
        return <NeuralLoader />
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-center">
        {renderLoader()}
      </div>
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-interface-light font-mono"
          style={{ color: colorMap[color] }}
        >
          {message}
        </motion.p>
      )}
    </div>
  )
}

export default DelightfulLoader
'use client'

import { useState, useEffect } from 'react'

interface TypewriterTextProps {
  text: string
  delay?: number
  speed?: number
  className?: string
  onComplete?: () => void
}

export const TypewriterText = ({ 
  text, 
  delay = 0, 
  speed = 50, 
  className = '',
  onComplete 
}: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isStarted, setIsStarted] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsStarted(true)
    }, delay)

    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!isStarted) return

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, isStarted, onComplete])

  return (
    <span className={`${className} ${currentIndex < text.length ? 'typewriter' : ''}`}>
      {displayText}
    </span>
  )
}

export default TypewriterText
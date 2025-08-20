'use client'

import { useEffect, useRef, useState } from 'react'

export const ElevenLabsWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [widgetId, setWidgetId] = useState<string | null>(null)

  useEffect(() => {
    // Create a function to handle script loading
    const loadWidget = () => {
      if (containerRef.current && !widgetId) {
        try {
          // Generate a unique ID for the widget
          const uniqueId = `elevenlabs-widget-${Date.now()}`
          setWidgetId(uniqueId)
          
          // Load the script if it doesn't exist
          if (!document.querySelector('script[src*="elevenlabs"]')) {
            const script = document.createElement('script')
            script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed'
            script.async = true
            script.type = 'text/javascript'
            
            // Use addEventListener instead of onload/onerror
            script.addEventListener('load', () => {
              console.log('ElevenLabs script loaded successfully')
              setIsLoaded(true)
              setError(null)
            })
            
            script.addEventListener('error', () => {
              console.error('Failed to load ElevenLabs script')
              setError('Failed to load voice interface')
              setIsLoaded(false)
            })
            
            document.head.appendChild(script)
          } else {
            setIsLoaded(true)
            setError(null)
          }
        } catch (err) {
          console.error('Error loading widget:', err)
          setError('Failed to initialize voice interface')
          setIsLoaded(false)
        }
      }
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(loadWidget, 100)
    
    return () => {
      clearTimeout(timer)
      // Cleanup function to prevent memory leaks
      try {
        if (containerRef.current) {
          // Don't directly manipulate innerHTML, let React handle it
        }
      } catch (err) {
        console.warn('Cleanup error:', err)
      }
    }
  }, [widgetId])

  return (
    <div className="min-h-[180px] w-full rounded-lg overflow-hidden bg-gradient-to-br from-os-darker to-os-dark border border-depth-cyan/20">
      <div 
        ref={containerRef}
        className="w-full h-full min-h-[180px]"
      >
        {error ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-red-400 text-xs p-4">{error}</div>
          </div>
        ) : !isLoaded ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-xs text-depth-cyan animate-pulse flex items-center gap-2">
              <div className="w-1 h-1 bg-depth-cyan rounded-full animate-ping"></div>
              Initializing Voice Interface...
            </div>
          </div>
        ) : widgetId ? (
          <elevenlabs-convai 
            agent-id="agent_0701k34axbdhfcnbst4hd9fvv20r"
            id={widgetId}
          />
        ) : null}
      </div>
    </div>
  )
}

export default ElevenLabsWidget
'use client'

import { useEffect, useRef, useState } from 'react'

export const ElevenLabsWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Create a function to handle script loading
    const loadWidget = () => {
      if (containerRef.current) {
        // Clear any existing content
        containerRef.current.innerHTML = ''
        
        // Create the widget element directly
        const widgetElement = document.createElement('elevenlabs-convai')
        widgetElement.setAttribute('agent-id', 'agent_0701k34axbdhfcnbst4hd9fvv20r')
        
        // Add the widget to the container
        containerRef.current.appendChild(widgetElement)
        
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
          })
          
          script.addEventListener('error', () => {
            console.error('Failed to load ElevenLabs script')
            if (containerRef.current) {
              containerRef.current.innerHTML = '<div class="text-red-400 text-xs p-4">Failed to load voice interface</div>'
            }
          })
          
          document.head.appendChild(script)
        } else {
          setIsLoaded(true)
        }
      }
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(loadWidget, 100)
    
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="min-h-[180px] w-full rounded-lg overflow-hidden bg-gradient-to-br from-os-darker to-os-dark border border-depth-cyan/20">
      <div 
        ref={containerRef}
        className="w-full h-full min-h-[180px]"
      >
        {!isLoaded && (
          <div className="flex items-center justify-center h-full">
            <div className="text-xs text-depth-cyan animate-pulse flex items-center gap-2">
              <div className="w-1 h-1 bg-depth-cyan rounded-full animate-ping"></div>
              Initializing Voice Interface...
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ElevenLabsWidget
'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import TypewriterText from '../components/TypewriterText'
import InteractiveTerminal, { InteractiveTerminalRef } from '../components/InteractiveTerminal'
import ConversationalAgent from '../components/ConversationalAgent'

// Mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  return isMobile
}

// Synergy Discovery Component
const SynergyMatrix = ({ connections }: { connections: any[] }) => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)
  
  const handleNodeHover = useCallback((index: number | null) => {
    setHoveredNode(index)
  }, [])

  return (
    <div className="relative h-64 w-full">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
        {/* Neural Network Visualization */}
        {connections.map((_, i) => (
          <g key={i}>
            <line
              x1={50 + i * 100}
              y1="100"
              x2={150 + i * 100}
              y2={50 + i * 30}
              className="neural-line"
            />
            <circle
              cx={150 + i * 100}
              cy={50 + i * 30}
              r="6"
              fill="#FFD700"
              className="connection-pulse cursor-pointer hover:r-8 transition-all"
              onMouseEnter={() => handleNodeHover(i)}
              onMouseLeave={() => handleNodeHover(null)}
            />
            {hoveredNode === i && (
              <foreignObject x={120 + i * 100} y={20 + i * 30} width="100" height="40">
                <div className="bg-os-darker p-2 rounded text-xs text-synergy-gold border border-synergy-gold">
                  Connection {i + 1}
                  <br />
                  Value: $847K
                </div>
              </foreignObject>
            )}
          </g>
        ))}
      </svg>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-synergy-gold text-2xl font-mono mb-2">
            SYNERGY DETECTED
          </div>
          <div className="text-depth-cyan text-sm">
            3 high-value connections identified
          </div>
        </div>
      </div>
    </div>
  )
}

// Depth Scanner Component
const DepthScanner = ({ depth }: { depth: number }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isScanning, setIsScanning] = useState(false)
  
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    try {
      const rect = e.currentTarget.getBoundingClientRect()
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      })
    } catch (error) {
      console.warn('Mouse move handler error:', error)
    }
  }, [])
  
  const handleScanningState = useCallback((scanning: boolean) => {
    setIsScanning(scanning)
  }, [])


  return (
    <div 
      className="depth-scanner h-32 relative bg-os-darker rounded overflow-hidden cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => handleScanningState(true)}
      onMouseLeave={() => handleScanningState(false)}
    >
      <div className="scan-line"></div>
      
      {/* Interactive Crosshair */}
      {isScanning && (
        <>
          <div 
            className="absolute w-full h-px bg-depth-cyan opacity-50"
            style={{ top: `${mousePos.y}%` }}
          />
          <div 
            className="absolute h-full w-px bg-depth-cyan opacity-50"
            style={{ left: `${mousePos.x}%` }}
          />
        </>
      )}
      
      <div className="flex items-center justify-between p-4">
        <span className="text-depth-cyan font-mono text-sm">
          DEPTH ANALYSIS {isScanning && <span className="loading-dots"></span>}
        </span>
        <div className="flex items-center gap-3">
          <div className="w-32 bg-os-dark rounded-full h-2">
            <motion.div 
              className="bg-gradient-to-r from-depth-blue to-depth-cyan h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${depth}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
          <span className="text-depth-cyan font-mono">{depth}%</span>
        </div>
      </div>
      
      {isScanning && (
        <div className="absolute bottom-2 left-4 text-xs text-depth-cyan font-mono">
          SCANNING: X{mousePos.x.toFixed(0)} Y{mousePos.y.toFixed(0)}
        </div>
      )}
    </div>
  )
}

// OS Terminal Component
const OSTerminal = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="os-window rounded-lg overflow-hidden">
      <div className="bg-os-darker px-4 py-2 flex items-center justify-between border-b border-os-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="font-mono text-xs text-interface-light">
          RHIZ://RELATIONAL_OS.v150
        </div>
        <div className="text-xs text-connection-green font-mono">
          ● CONNECTED
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}

// Enhanced Value Proposition Component
const ValueProposition = () => {
  const [currentProposition, setCurrentProposition] = useState(0)
  
  const propositions = [
    {
      title: "RELATIONSHIP INTELLIGENCE",
      description: "Never forget a conversation detail again",
      visual: "🧠",
      impact: "+340% deeper connections"
    },
    {
      title: "SYNERGY DETECTION", 
      description: "AI spots collaboration opportunities instantly",
      visual: "⚡",
      impact: "$2.4M opportunity value detected"
    },
    {
      title: "PERFECT MEMORY",
      description: "Complete context for every interaction",
      visual: "💭",
      impact: "0% relationship data loss"
    }
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProposition((prev) => (prev + 1) % propositions.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])
  
  const current = propositions[currentProposition]
  
  return (
    <motion.div 
      key={currentProposition}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="interface-border rounded-lg p-6 bg-os-darker/80 text-center"
    >
      <div className="text-4xl mb-3">{current.visual}</div>
      <h3 className="font-mono text-synergy-gold text-lg mb-2">{current.title}</h3>
      <p className="text-os-light mb-3">{current.description}</p>
      <div className="text-connection-green font-mono text-sm">{current.impact}</div>
    </motion.div>
  )
}


// Sticky CTA Component
const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      try {
        const scrollY = window.scrollY
        setIsVisible(scrollY > 800)
      } catch (error) {
        console.warn('Scroll handler error:', error)
      }
    }

    // Check if window is available (client-side only)
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      return () => {
        try {
          window.removeEventListener('scroll', handleScroll)
        } catch (error) {
          console.warn('Cleanup error:', error)
        }
      }
    }
  }, [])

  return (
    <div className={`sticky-cta ${isVisible ? 'visible' : ''}`}>
      <div className="bg-synergy-gold text-os-dark px-6 py-3 rounded-lg shadow-lg">
        <div className="text-sm font-bold">
          JOIN NOW
        </div>
        <button 
          type="button" 
          className="text-sm md:text-xs underline hover:no-underline touch-manipulation"
          onClick={() => window.open('https://buy.stripe.com/bJebJ0dgNcroeswgBvasg00', '_blank')}
          style={{ minHeight: '44px', minWidth: '120px' }}
        >
          JOIN NOW →
        </button>
      </div>
    </div>
  )
}



export default function Home() {
  const [depthScore, setDepthScore] = useState(0)
  const isMobile = useIsMobile()
  
  // Add refs for DOM elements
  const installButtonRef = useRef<HTMLButtonElement>(null)
  const terminalInputRef = useRef<InteractiveTerminalRef>(null)
  
  // Add a stable key for React reconciliation
  const componentKey = useMemo(() => 'home-component', [])
  
  // Cleanup effect to prevent memory leaks
  useEffect(() => {
    return () => {
      // Cleanup any potential DOM references
      try {
        // This helps prevent DOM manipulation errors during unmounting
      } catch (error) {
        console.warn('Cleanup error:', error)
      }
    }
  }, [])
  
  // Memoized feature data
  const features = useMemo(() => [
    {
      title: "LIFETIME ACCESS",
      description: "Never pay again. Future users pay $99/month ($1,188/year). Your 10-year savings: $11,880",
      metrics: "Value: $30,000+"
    },
    {
      title: "10 GOLDEN INVITES",
      description: "Each invite = 1 year Pro membership worth $1,188. Total gift value: $11,880",
      metrics: "Network multiplier effect"
    },
    {
      title: "FOUNDING MEMBER STATUS",
      description: "Direct founder access, vote on features, early access, your name in credits",
      metrics: "Priceless influence"
    }
  ], [])
  
  // Memoized phases data
  const deploymentPhases = useMemo(() => [
    {
      phase: "PHASE_001",
      title: "ROOT ACCESS",
      period: "NOW - OCT 20",
      description: "150 operators maximum. Lifetime kernel access.",
      status: "ACTIVE",
      color: "text-connection-green"
    },
    {
      phase: "PHASE_002",
      title: "BETA KERNEL",
      period: "OCT 21 - DEC 2025",
      description: "Invitation-only. 1,500 max capacity.",
      status: "PENDING",
      color: "text-depth-cyan"
    },
    {
      phase: "PHASE_003",
      title: "SYSTEM LOCK",
      period: "Q1 2026+",
      description: "Permanent invite-only. Waitlist protocol.",
      status: "SCHEDULED",
      color: "text-alert-magenta"
    }
  ], [])
  
  // Memoized pricing plans
  const pricingPlans = useMemo(() => [
    {
      title: "RHIZ",
      subtitle: "ROOT LICENSE",
      price: "$777",
      period: "LIFETIME",
      features: [
        "Permanent system access",
        "10 user invitations",
        "Priority kernel updates",
        "Direct developer access",
        "Founding operator status"
      ],
      cta: "ACCEPT INVITATION",
      highlight: true
    },
    {
      title: "FUTURE ACCESS",
      subtitle: "SUBSCRIPTION",
      price: "$99",
      period: "MONTHLY",
      features: [
        "$1,188 annually",
        "No invitation codes",
        "Standard updates only",
        "Community support",
        "Regular user status"
      ],
      cta: "NOT AVAILABLE",
      highlight: false
    },
    {
      title: "ALTERNATIVES",
      subtitle: "LEGACY SYSTEMS",
      price: "$60+",
      period: "MONTHLY",
      features: [
        "No relationship OS",
        "No synergy detection",
        "No depth analysis",
        "Manual tracking only",
        "Data silos"
      ],
      cta: "INCOMPATIBLE",
      highlight: false
    }
  ], [])
  
  useEffect(() => {
    // Animate scores on mount
    const timer = setTimeout(() => {
      setDepthScore(82)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Keyboard shortcuts and accessibility
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Close any focused elements or reset focus
        const activeElement = document.activeElement as HTMLElement
        if (activeElement && activeElement.blur) {
          activeElement.blur()
        }
      }
      if (e.ctrlKey && e.key === 'i') {
        e.preventDefault()
        // Focus the main CTA button
        try {
          if (installButtonRef.current) {
            installButtonRef.current.focus()
            installButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        } catch (error) {
          console.warn('Focus error:', error)
        }
      }
      if (e.ctrlKey && e.key === 't') {
        e.preventDefault()
        // Focus the interactive terminal
        try {
          if (terminalInputRef.current) {
            terminalInputRef.current.focus()
            terminalInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        } catch (error) {
          console.warn('Focus error:', error)
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <div key={componentKey} className="min-h-screen bg-os-dark os-grid screen-flicker">

      
      {/* Sticky CTA */}
              <StickyCTA />

      {/* OS Status Bar - Mobile Optimized */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-os-darker/95 backdrop-blur-md border-b border-os-border">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="font-mono text-xs md:text-sm text-synergy-gold">
              {isMobile ? 'RHIZ' : 'RELATIONAL_OS'}
            </div>
            <div className="text-xs text-interface-light">v.150</div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-6">
            {!isMobile && (
              <>
                <div className="text-xs font-mono text-depth-cyan">
                  NETWORK_DEPTH: SCANNING...
                </div>
                <div className="text-xs font-mono text-connection-green">
                  SYNERGIES: ACTIVE
                </div>
              </>
            )}
            <div className="text-xs font-mono text-alert-magenta animate-pulse">
              ACCESS GRANTED
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Mobile-First Responsive Control Room */}
      <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-os-dark via-os-darker to-os-dark w-full">
        {/* Multi-Layer Animated Backgrounds - Optimized for Mobile */}
        <div className="absolute inset-0">
          {/* Primary Grid - Responsive Density */}
          <div className="absolute inset-0 opacity-10 md:opacity-15">
            <div className={`grid h-full w-full ${
              isMobile ? 'grid-cols-8 grid-rows-12' : 'grid-cols-20 grid-rows-12'
            }`}>
              {Array.from({ length: isMobile ? 96 : 240 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="border border-synergy-gold/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.02 }}
                />
              ))}
            </div>
          </div>
          
          {/* Floating Data Particles - Reduced on Mobile */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: isMobile ? 15 : 50 }).map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-depth-cyan rounded-full"
                initial={{ 
                  x: 0, 
                  y: 0,
                  opacity: 0
                }}
                animate={{
                  x: [0, isMobile ? 390 : 1920],
                  y: [0, isMobile ? 844 : 1080],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: isMobile ? 12 + (i % 4) : 8 + (i % 4), 
                  repeat: Infinity, 
                  delay: i * 0.1,
                  ease: "linear"
                }}
              />
            ))}
          </div>
          
          {/* Scanning Lines - Mobile Optimized */}
          {!isMobile && (
            <>
              <motion.div 
                className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-synergy-gold to-transparent"
                animate={{ y: [0, 1080] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-transparent via-depth-cyan to-transparent"
                animate={{ x: [0, 1920] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 2 }}
              />
            </>
          )}
          
          {/* Radar Sweep - Responsive Size */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div 
              className={`border border-connection-green/30 rounded-full ${
                isMobile ? 'w-48 h-48' : 'w-96 h-96'
              }`}
              animate={{ scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div 
              className="absolute inset-4 border border-alert-magenta/20 rounded-full"
              animate={{ scale: [1.2, 0.8, 1.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 min-h-screen flex flex-col px-4 overflow-x-hidden">
          {/* Floating Status Panels - Hidden on Mobile */}
          {!isMobile && (
            <div className="absolute z-20 top-16 left-4 right-4">
              <div className="flex justify-between items-start">
              {/* System Status HUD */}
              <motion.div 
                className="backdrop-blur-md border border-synergy-gold/50 rounded-lg shadow-2xl p-4 bg-os-darker/90"
                initial={{ opacity: 0, x: -50, y: 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1 }}
              >
                <div className="text-xs font-mono text-synergy-gold mb-2">SYSTEM STATUS</div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-connection-green rounded-full animate-pulse"></div>
                  <span className="text-connection-green">ONLINE</span>
                </div>
                <div className="flex items-center gap-2 text-xs mt-1">
                  <div className="w-2 h-2 bg-depth-cyan rounded-full animate-pulse"></div>
                  <span className="text-depth-cyan">SCANNING</span>
                </div>
              </motion.div>
              
              {/* Network Metrics */}
              <motion.div 
                className="backdrop-blur-md border border-depth-cyan/50 rounded-lg shadow-2xl p-4 bg-os-darker/90"
                initial={{ opacity: 0, x: 50, y: 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <div className="text-xs font-mono text-depth-cyan mb-2">NETWORK METRICS</div>
                <div className="text-xs text-interface-light space-y-1">
                  <div>Connections: 2,847</div>
                  <div>Synergies: 94 active</div>
                  <div>Depth: 82% avg</div>
                </div>
              </motion.div>
            </div>
          </div>
          )}
          
          {/* Central Command Header - Mobile First */}
          <div className={`text-center flex-grow flex flex-col justify-center ${
            isMobile ? 'mt-20 mb-6 px-2' : 'mt-32 mb-8'
          }`}>
            {/* Holographic Title Display - Responsive */}
            <motion.div 
              className={`relative ${
                isMobile ? 'mb-6' : 'mb-8'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-synergy-gold/20 via-transparent to-depth-cyan/20 rounded-full blur-3xl"></div>
            
              <h1 className={`relative font-bold leading-tight mb-6 ${
                isMobile 
                  ? 'text-6xl' 
                  : 'text-7xl md:text-8xl lg:text-9xl'
              }`}>
                <div className="absolute inset-0 blur-sm bg-gradient-to-r from-synergy-gold via-depth-cyan to-synergy-gold bg-clip-text text-transparent">
                  RHIZ
                </div>
                <TypewriterText 
                  text="RHIZ" 
                  className="relative screen-light bg-gradient-to-r from-synergy-gold via-depth-cyan to-synergy-gold bg-clip-text text-transparent bg-300% animate-gradient" 
                  speed={80}
                />
                {/* Glitch Effect - Reduced on Mobile */}
                {!isMobile && (
                  <motion.div 
                    className="absolute inset-0 text-synergy-gold opacity-20"
                    animate={{ x: [-2, 2, -1, 1, 0] }}
                    transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    RHIZ
                  </motion.div>
                )}
              </h1>
            </motion.div>
            
            <div className={`text-os-light leading-relaxed max-w-4xl mx-auto relative ${
              isMobile 
                ? 'text-lg mb-6' 
                : 'text-2xl sm:text-3xl mb-8'
            }`}>
              <div className={`bg-os-darker/30 backdrop-blur-sm border border-synergy-gold/30 rounded-lg shadow-2xl ${
                isMobile ? 'p-4' : 'p-6'
              }`}>
                <TypewriterText 
                  text="The world's first AI-powered relationship intelligence system."
                  delay={1500}
                  speed={40}
                  className="text-depth-cyan"
                />
                <br/>
                <TypewriterText 
                  text="Automatically captures, analyzes, and optimizes your professional network."
                  delay={3000}
                  speed={35}
                  className="text-synergy-gold font-semibold"
                />
                <br/>
                <TypewriterText 
                  text="Join the first 150 relationship intelligence pioneers."
                  delay={5000}
                  speed={40}
                  className="text-connection-green"
                />
              </div>
              {/* Data streams around the subtitle - Hidden on Mobile */}
              {!isMobile && (
                <div className="absolute -top-2 -left-2 w-full h-full border border-depth-cyan/20 rounded-lg pointer-events-none">
                  <div className="absolute top-0 left-0 w-8 h-0.5 bg-depth-cyan animate-pulse"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-0.5 bg-synergy-gold animate-pulse"></div>
                </div>
              )}
            </div>

            {/* Hero Status - Mobile Optimized */}
            <motion.div 
              className={`relative ${
                isMobile ? 'mb-32' : 'mb-48'
              }`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 5, duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-synergy-gold/20 rounded-2xl blur-xl animate-pulse"></div>
              
              <div className={`relative bg-os-darker/80 backdrop-blur-sm border border-synergy-gold/30 rounded-2xl p-6 ${
                isMobile ? 'text-center' : 'text-center'
              }`}>
                <div className={`text-interface-light ${
                  isMobile ? 'text-sm' : 'text-lg'
                }`}>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="w-2 h-2 bg-connection-green rounded-full animate-pulse"></span>
                    <span className="font-mono">SYSTEM STATUS: OPERATIONAL</span>
                  </div>
                  <div className="text-synergy-gold font-semibold">
                    PERSONALLY SELECTED • LIFETIME ACCESS
                  </div>
                </div>
              </div>
              
              {!isMobile && (
                <div className="mt-4 flex justify-center items-center gap-8 text-sm text-interface-gray">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-connection-green rounded-full animate-pulse"></span>
                    <span>Press Ctrl+I to focus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-depth-cyan rounded-full animate-pulse"></span>
                    <span>Press Ctrl+T for terminal</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Bottom Command Center - Mobile Responsive */}
          <div className={`absolute left-4 right-4 ${
            isMobile ? 'bottom-4' : 'bottom-8 left-8 right-8'
          }`} style={{ zIndex: 10 }}>
            <div className={`gap-4 ${
              isMobile 
                ? 'grid grid-cols-1'
                : 'grid lg:grid-cols-4'
            }`}>
            
            {/* Command Terminal - Mobile Hidden */}
            {!isMobile && (
              <motion.div 
                className="bg-os-darker/95 backdrop-blur-md border border-connection-green/50 rounded-lg p-4 shadow-2xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 6, duration: 0.8 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-connection-green rounded-full animate-pulse"></div>
                  <span className="font-mono text-connection-green text-xs">TERMINAL</span>
                </div>
                <div className="h-24 overflow-hidden">
                  <InteractiveTerminal ref={terminalInputRef} />
                </div>
              </motion.div>
            )}

            {/* MEGA AI Assistant - Mobile Optimized */}
            <motion.div 
              className={`bg-gradient-to-br from-synergy-gold/20 via-os-darker/95 to-depth-cyan/20 backdrop-blur-md border-2 border-synergy-gold/70 rounded-lg shadow-[0_0_30px_rgba(255,215,0,0.3)] ${
                isMobile ? 'p-4 col-span-1' : 'lg:col-span-2 p-6'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 6.2, duration: 0.8 }}
            >
              {/* Floating Status Indicators */}
              <div className="absolute -top-2 -right-2 flex gap-2">
                <div className="w-4 h-4 bg-connection-green rounded-full animate-pulse shadow-lg"></div>
                <div className="w-4 h-4 bg-synergy-gold rounded-full animate-pulse shadow-lg"></div>
              </div>
              
              <div className={`flex justify-between mb-4 ${
                isMobile ? 'flex-col gap-3' : 'items-center'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`bg-gradient-to-r from-synergy-gold to-depth-cyan rounded-full animate-pulse shadow-lg ${
                    isMobile ? 'w-4 h-4' : 'w-6 h-6'
                  }`}></div>
                  <h3 className={`font-mono text-synergy-gold font-bold tracking-wider ${
                    isMobile ? 'text-sm' : 'text-xl'
                  }`}>
                    {isMobile ? 'AI_ASSISTANT.exe' : 'AI_RELATIONSHIP_ASSISTANT.exe'}
                  </h3>
                </div>
                <div className="flex items-center gap-2 bg-connection-green/20 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-connection-green rounded-full animate-pulse"></div>
                  <span className="text-xs font-mono text-connection-green">OPERATIONAL</span>
                </div>
              </div>
              
              {!isMobile && (
                <div className="grid grid-cols-3 gap-3 mb-4 text-xs">
                  <div className="bg-os-dark/70 p-3 rounded border border-depth-cyan/50">
                    <div className="text-depth-cyan font-mono mb-1">› VOICE STATUS</div>
                    <div className="text-interface-light">Real-time processing</div>
                  </div>
                  <div className="bg-os-dark/70 p-3 rounded border border-synergy-gold/50">
                    <div className="text-synergy-gold font-mono mb-1">› AI ENGINE</div>
                    <div className="text-interface-light">Relationship intelligence</div>
                  </div>
                  <div className="bg-os-dark/70 p-3 rounded border border-alert-magenta/50">
                    <div className="text-alert-magenta font-mono mb-1">› PRIORITY</div>
                    <div className="text-interface-light">Maximum security</div>
                  </div>
                </div>
              )}
              
              {/* STAR OF THE SHOW - ElevenLabs Widget - Mobile Optimized */}
              <div className={`relative bg-gradient-to-r from-os-dark via-os-darker to-os-dark rounded-lg border-2 border-synergy-gold/70 shadow-[0_0_20px_rgba(255,215,0,0.2)] ${
                isMobile ? 'p-4' : 'p-6'
              }`}>
                <div className="absolute inset-0 bg-gradient-to-r from-synergy-gold/5 via-transparent to-depth-cyan/5 rounded-lg"></div>
                <div className={`relative flex flex-col items-center justify-center ${
                  isMobile ? 'min-h-[180px]' : 'min-h-[200px]'
                }`}>
                  <div className={`flex items-center mb-4 ${
                    isMobile ? 'gap-2 flex-col' : 'gap-3'
                  }`}>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-synergy-gold rounded-full animate-pulse"></div>
                      <span className={`font-mono text-synergy-gold font-bold ${
                        isMobile ? 'text-xs' : 'text-sm'
                      }`}>VOICE_INTERFACE.active</span>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: isMobile ? 3 : 5 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 h-4 bg-depth-cyan rounded-full"
                          animate={{ height: [16, 8, 24, 12, 16] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 flex items-center justify-center w-full">
                    <ConversationalAgent />
                  </div>
                  <div className={`text-center text-interface-light ${
                    isMobile ? 'mt-2 text-xs px-2' : 'mt-3 text-xs'
                  }`}>
                    <span className="text-synergy-gold">◆</span> 
                    {isMobile 
                      ? 'Ask about relationship insights'
                      : 'Ask about relationship insights, synergy opportunities, or network optimization'
                    } 
                    <span className="text-synergy-gold">◆</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Depth Scanner - Mobile Hidden */}
            {!isMobile && (
              <motion.div 
                className="bg-os-darker/95 backdrop-blur-md border border-depth-cyan/50 rounded-lg p-4 shadow-2xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 6.4, duration: 0.8 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-depth-cyan rounded-full animate-pulse"></div>
                  <span className="font-mono text-depth-cyan text-xs">DEPTH_SCAN</span>
                </div>
                <div className="h-20 overflow-hidden">
                  <div className="w-full bg-os-dark rounded-full h-2 mb-2">
                    <motion.div 
                      className="bg-gradient-to-r from-depth-blue to-depth-cyan h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${depthScore}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                  <div className="text-xs text-depth-cyan font-mono">{depthScore}% analyzed</div>
                </div>
              </motion.div>
            )}

            {/* Accept Invitation Button - Mobile Optimized */}
            <motion.div 
              className={`bg-gradient-to-br from-synergy-gold/20 via-os-darker/95 to-synergy-gold/20 backdrop-blur-md border-2 border-synergy-gold/70 rounded-lg shadow-[0_0_20px_rgba(255,215,0,0.3)] ${
                isMobile ? 'p-3' : 'p-4'
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 6.6, duration: 0.8 }}
            >
              <div className="text-center space-y-3">

              </div>
            </motion.div>
          </div>
          
          {/* Floating Corner Displays - Hidden on Mobile */}
          {!isMobile && (
            <>
              <div className="absolute bottom-4 left-4">
                <motion.div 
                  className="bg-os-darker/90 backdrop-blur-md border border-connection-green/50 rounded-lg p-3 shadow-lg"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="text-xs font-mono text-connection-green mb-1">NETWORK STATUS</div>
                  <div className="text-xs text-interface-light">94 synergies active</div>
                </motion.div>
              </div>
              
              <div className="absolute bottom-4 right-4">
                <motion.div 
                  className="bg-os-darker/90 backdrop-blur-md border border-depth-cyan/50 rounded-lg p-3 shadow-lg"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="text-xs font-mono text-depth-cyan mb-1">SYSTEM LOAD</div>
                  <div className="text-xs text-interface-light">Optimal performance</div>
                </motion.div>
              </div>
            </>
          )}
        </div>
        </div>
      </section>

      {/* Core Features Section - Mobile Optimized */}
      <section className={`py-8 px-4 sm:px-6 lg:px-8 bg-os-darker/50 ${
        isMobile ? 'pt-4' : ''
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className={`font-bold mb-3 ${
              isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'
            }`}>
              <span className="screen-light">SYSTEM CAPABILITIES</span>
            </h2>
            <p className={`text-interface-light max-w-3xl mx-auto ${
              isMobile ? 'text-base px-2' : 'text-lg'
            }`}>
              The $777 investment that delivers $200,000+ in lifetime value
            </p>
          </div>

          <div className={`gap-6 ${
            isMobile ? 'grid grid-cols-1 space-y-4' : 'grid md:grid-cols-3'
          }`}>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="os-window p-4"
              >

                <h3 className="font-mono text-synergy-gold mb-2 text-lg">{feature.title}</h3>
                <p className="text-os-light mb-3 leading-relaxed">{feature.description}</p>
                <div className="text-sm font-mono text-connection-green">
                  PERFORMANCE: {feature.metrics}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Clear Value Proposition Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-os-darker/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className={`font-bold mb-3 ${
              isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'
            }`}>
              <span className="screen-light">THE $777 INVESTMENT THAT DELIVERS $200,000+ IN LIFETIME VALUE</span>
            </h2>
            <p className={`text-interface-light max-w-3xl mx-auto ${
              isMobile ? 'text-base px-2' : 'text-lg'
            }`}>
              Why $777 today is worth $200,000+ tomorrow
            </p>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className={`py-8 px-4 sm:px-6 lg:px-8 bg-os-dark/50 ${
        isMobile ? 'pt-4' : ''
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className={`font-bold mb-3 ${
              isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'
            }`}>
              <span className="screen-light">WHAT IS RHIZ?</span>
            </h2>
            <p className={`text-interface-light max-w-3xl mx-auto ${
              isMobile ? 'text-base px-2' : 'text-lg'
            }`}>
              RHIZ is an AI system that automatically captures every conversation, meeting, and interaction, then uses advanced intelligence to identify hidden opportunities, optimize your network, and create strategic synergies that drive real business value.
            </p>
          </div>

          <div className={`grid gap-6 ${
            isMobile ? 'grid-cols-1 space-y-4' : 'grid md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {/* Lifetime Access */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="os-window p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-synergy-gold rounded-full flex items-center justify-center">
                  <span className="text-os-dark font-bold text-sm">💎</span>
                </div>
                <h3 className="font-mono text-synergy-gold text-lg">LIFETIME ACCESS</h3>
              </div>
              <div className="space-y-3">
                <div className="text-os-light">
                  <span className="text-connection-green font-semibold">You pay:</span> $777 once
                </div>
                <div className="text-os-light">
                  <span className="text-alert-magenta font-semibold">Future users pay:</span> $99/month ($1,188/year)
                </div>
                <div className="text-os-light">
                  <span className="text-synergy-gold font-semibold">Your 10-year savings:</span> $11,880
                </div>
                <div className="text-os-light">
                  <span className="text-depth-cyan font-semibold">Lifetime value:</span> $30,000+
                </div>
              </div>
            </motion.div>

            {/* Golden Invites */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="os-window p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-synergy-gold rounded-full flex items-center justify-center">
                  <span className="text-os-dark font-bold text-sm">🎟️</span>
                </div>
                <h3 className="font-mono text-synergy-gold text-lg">10 GOLDEN INVITES</h3>
              </div>
              <div className="space-y-3">
                <div className="text-os-light">
                  Each invite = <span className="text-connection-green font-semibold">1 year Pro membership</span>
                </div>
                <div className="text-os-light">
                  Each invite worth = <span className="text-synergy-gold font-semibold">$1,188</span>
                </div>
                <div className="text-os-light">
                  Total gift value = <span className="text-depth-cyan font-semibold">$11,880</span>
                </div>
                <div className="text-xs text-interface-light">
                  Build your inner circle with shared intelligence
                </div>
              </div>
            </motion.div>

            {/* Network Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="os-window p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-synergy-gold rounded-full flex items-center justify-center">
                  <span className="text-os-dark font-bold text-sm">🌐</span>
                </div>
                <h3 className="font-mono text-synergy-gold text-lg">NETWORK EFFECT</h3>
              </div>
              <div className="space-y-3">
                <div className="text-os-light">
                  <span className="text-connection-green font-semibold">150 hand-selected</span> professionals
                </div>
                <div className="text-os-light">
                  <span className="text-synergy-gold font-semibold">825,000</span> total network reach
                </div>
                <div className="text-os-light">
                  <span className="text-depth-cyan font-semibold">$100,000+</span> average member value
                </div>
                <div className="text-xs text-interface-light">
                  Exclusive member directory & quarterly meetups
                </div>
              </div>
            </motion.div>

            {/* First-Mover Advantage */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="os-window p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-synergy-gold rounded-full flex items-center justify-center">
                  <span className="text-os-dark font-bold text-sm">🚀</span>
                </div>
                <h3 className="font-mono text-synergy-gold text-lg">FIRST-MOVER ADVANTAGE</h3>
              </div>
              <div className="space-y-3">
                <div className="text-os-light">
                  <span className="text-connection-green font-semibold">12-18 month</span> head start
                </div>
                <div className="text-os-light">
                  <span className="text-synergy-gold font-semibold">Train AI</span> on your specific needs
                </div>
                <div className="text-os-light">
                  <span className="text-depth-cyan font-semibold">Build data moat</span> while others wait
                </div>
                <div className="text-xs text-interface-light">
                  Lock in competitive advantage
                </div>
              </div>
            </motion.div>

            {/* ROI Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="os-window p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-synergy-gold rounded-full flex items-center justify-center">
                  <span className="text-os-dark font-bold text-sm">💰</span>
                </div>
                <h3 className="font-mono text-synergy-gold text-lg">INVESTMENT-GRADE ROI</h3>
              </div>
              <div className="space-y-3">
                <div className="text-os-light">
                  <span className="text-connection-green font-semibold">One introduction:</span> $10,000+ value
                </div>
                <div className="text-os-light">
                  <span className="text-synergy-gold font-semibold">One key hire:</span> $50,000 saved
                </div>
                <div className="text-os-light">
                  <span className="text-depth-cyan font-semibold">One client saved:</span> $100,000 retained
                </div>
                <div className="text-xs text-interface-light">
                  Members report 100x ROI within first year
                </div>
              </div>
            </motion.div>

            {/* Exclusive Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="os-window p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-synergy-gold rounded-full flex items-center justify-center">
                  <span className="text-os-dark font-bold text-sm">🏆</span>
                </div>
                <h3 className="font-mono text-synergy-gold text-lg">EXCLUSIVE BENEFITS</h3>
              </div>
              <div className="space-y-3">
                <div className="text-os-light">
                  <span className="text-connection-green font-semibold">Monthly video calls</span> with founders
                </div>
                <div className="text-os-light">
                  <span className="text-synergy-gold font-semibold">Direct Telegram</span> access to CEO
                </div>
                <div className="text-os-light">
                  <span className="text-depth-cyan font-semibold">Vote on features</span> & shape roadmap
                </div>
                <div className="text-xs text-interface-light">
                  Your name in product credits
                </div>
              </div>
            </motion.div>
          </div>

          {/* Total Value Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 text-center"
          >
            <div className="inline-block bg-gradient-to-r from-synergy-gold/20 to-depth-cyan/20 border border-synergy-gold/50 rounded-lg p-6">
              <div className="text-2xl font-bold text-synergy-gold mb-2">TOTAL LIFETIME VALUE: $200,000+</div>
              <div className="text-lg text-os-light mb-4">Your Investment: $777</div>
              <div className="text-xl font-bold text-connection-green">Return Multiple: 257x</div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* How It Works */}
      <section className="py-4 md:py-8 px-4 sm:px-6 lg:px-8 bg-os-darker/50">
        <div className="max-w-6xl mx-auto">
          <OSTerminal>
            <div className="space-y-8">
              <h2 className={`font-bold text-synergy-gold mb-6 ${
                isMobile ? 'text-xl' : 'text-2xl sm:text-3xl'
              }`}>
                HOW IT WORKS
              </h2>
              
              <div className={`gap-6 ${
                isMobile ? 'space-y-6' : 'grid md:grid-cols-2'
              }`}>
                <div>
                  <h3 className="font-mono text-depth-cyan mb-6 text-lg">INPUT_LAYER</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-connection-green">►</span>
                      <div>
                        <div className="font-bold">Voice Memory Capture</div>
                        <div className="text-interface-light">"Met Sarah at Stripe, she's hiring engineers..."</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-connection-green">►</span>
                      <div>
                        <div className="font-bold">Automatic Context Extraction</div>
                        <div className="text-interface-light">AI identifies key details and opportunities</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-mono text-depth-cyan mb-6 text-lg">OUTPUT_LAYER</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-synergy-gold">◆</span>
                      <div>
                        <div className="font-bold">Synergy Alerts</div>
                        <div className="text-interface-light">"Connect Sarah with David - perfect timing"</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-synergy-gold">◆</span>
                      <div>
                        <div className="font-bold">Depth Recommendations</div>
                        <div className="text-interface-light">"Schedule deeper conversation about API tools"</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </OSTerminal>
        </div>
      </section>

      {/* Exclusivity Timeline - Mobile Stacked */}
      <section className={`py-8 px-4 sm:px-6 lg:px-8 ${
        isMobile ? 'py-4' : ''
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className={`font-bold mb-3 ${
              isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'
            }`}>
              <span className="screen-light">DEPLOYMENT PHASES</span>
            </h2>
          </div>

          <div className={`gap-6 ${
            isMobile ? 'grid grid-cols-1 space-y-4' : 'grid md:grid-cols-3'
          }`}>
            {deploymentPhases.map((phase, index) => (
              <div key={index} className="interface-border rounded-lg p-6 bg-os-darker/80">
                <div className={`font-mono text-xs ${phase.color} mb-2`}>
                  {phase.phase}
                </div>
                <h3 className="text-xl font-bold text-os-light mb-2">{phase.title}</h3>
                <div className="text-sm text-interface-light mb-3">{phase.period}</div>
                <p className="text-sm text-os-light mb-4">{phase.description}</p>
                <div className="inline-block px-3 py-1 bg-os-dark rounded text-xs font-mono border border-os-border">
                  STATUS: {phase.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Comparison - Mobile Friendly */}
      <section className={`py-8 px-4 sm:px-6 lg:px-8 bg-os-darker/50 ${
        isMobile ? 'py-4' : ''
      }`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className={`font-bold mb-3 ${
              isMobile ? 'text-2xl' : 'text-3xl sm:text-4xl'
            }`}>
              <span className="screen-light">LICENSE COMPARISON</span>
            </h2>
          </div>

          <div className={`gap-6 ${
            isMobile ? 'grid grid-cols-1 space-y-4' : 'grid lg:grid-cols-3'
          }`}>
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={`rounded-lg p-6 ${
                  plan.highlight 
                    ? 'synergy-glow bg-os-darker border-2 border-synergy-gold' 
                    : 'bg-os-darker/50 border border-os-border'
                }`}
              >
                <div className="text-center space-y-4">
                  <div>
                    <div className="font-mono text-sm text-interface-light mb-2">
                      {plan.subtitle}
                    </div>
                    <h3 className="text-xl font-bold text-os-light">
                      {plan.title}
                    </h3>
                  </div>
                  
                  <div>
                    <div className="text-4xl font-bold text-synergy-gold mb-2">
                      {plan.price}
                    </div>
                    <div className="text-sm text-interface-light">
                      {plan.period}
                    </div>
                  </div>
                  
                  <div className="space-y-3 text-left">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className={plan.highlight ? 'text-connection-green' : 'text-interface-gray'}>
                          {plan.highlight ? '✓' : '×'}
                        </span>
                        <span className="text-os-light">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    type="button"
                    className={`w-full font-mono font-bold transition-all touch-manipulation ${
                      plan.highlight 
                        ? 'bg-synergy-gold text-os-dark hover:bg-synergy-light' 
                        : 'bg-interface-dark text-interface-gray cursor-not-allowed'
                    } ${
                      isMobile ? 'py-4 px-3 text-base' : 'py-3 px-4'
                    }`}
                    style={{ minHeight: '48px' }}
                    disabled={!plan.highlight}
                    onClick={plan.highlight ? () => window.open('https://buy.stripe.com/bJebJ0dgNcroeswgBvasg00', '_blank') : undefined}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Mobile Optimized */}
      <section className={`bg-gradient-to-b from-os-dark to-os-darker ${
        isMobile ? 'py-8 px-4' : 'py-12 px-4 sm:px-6 lg:px-8'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className={`inline-block bg-alert-magenta/20 border border-alert-magenta rounded-lg animate-pulse ${
            isMobile ? 'px-4 py-2 mb-6' : 'px-6 py-3 mb-8'
          }`}>
            <span className={`font-mono text-alert-magenta font-semibold ${
              isMobile ? 'text-sm' : ''
            }`}>
              FINAL OPPORTUNITY
            </span>
          </div>
          
          <h2 className={`font-bold leading-tight ${
            isMobile ? 'text-2xl mb-6' : 'text-4xl sm:text-5xl mb-8'
          }`}>
            <span className="screen-light">
              {isMobile ? 'READY TO JOIN?' : 'READY TO JOIN THE ELITE?'}
            </span>
          </h2>
          
          <p className={`text-os-light max-w-3xl mx-auto leading-relaxed ${
            isMobile ? 'text-lg mb-6 px-2' : 'text-xl sm:text-2xl mb-8'
          }`}>
            <span className="text-synergy-gold font-semibold"> The question isn't whether RHIZ is worth $777. The question is: Can you afford to compete without it?</span>
          </p>
          
          <div className="space-y-6">
            {/* Urgency Message */}
            <div className="bg-gradient-to-r from-alert-magenta/20 to-synergy-gold/20 border border-alert-magenta/50 rounded-lg p-4">
              <div className="text-center">
                <div className="text-alert-magenta font-bold mb-2">🔥 AFTER 150 MEMBERS, RHIZ CLOSES UNTIL 2026</div>
                <div className="text-os-light text-sm">
                  No new members until public launch. Your network compounds uncontested while others wait.
                </div>
              </div>
            </div>

            <button 
              type="button" 
              className={`button-glow bg-synergy-gold text-os-dark font-bold hover:bg-synergy-light transition-all touch-manipulation ${
                isMobile 
                  ? 'px-8 py-4 text-lg w-full max-w-sm mx-auto block' 
                  : 'px-12 py-6 text-xl'
              }`}
              style={{ minHeight: isMobile ? '56px' : 'auto' }}
              onClick={() => window.open('https://buy.stripe.com/bJebJ0dgNcroeswgBvasg00', '_blank')}
            >
              ACCEPT INVITATION → $777
            </button>
            
            <div className="text-interface-light">
              Questions? Contact: israel.wilson@uncommonimpactstudio.com
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-os-darker border-t border-os-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="font-mono text-synergy-gold mb-3">SYSTEM_INFO</div>
              <div className="space-y-1 text-interface-light">
                <div>Version: 150.ALPHA</div>
                <div>Kernel: Relational-OS</div>
                <div>Architecture: Human-First</div>
              </div>
            </div>
            
            <div>
              <div className="font-mono text-synergy-gold mb-3">NETWORK_STATUS</div>
              <div className="space-y-1 text-interface-light">
                <div>Operators: Active</div>
                <div>Synergies: Active</div>
                <div>Depth: Optimizing</div>
              </div>
            </div>
            
            <div>
              <div className="font-mono text-synergy-gold mb-3">DOCUMENTATION</div>
              <div className="space-y-1 text-interface-light">
                <div>Terms: /legal/terms.md</div>
                <div>Privacy: /legal/privacy.md</div>
                <div>© 2024 Relational OS</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-os-border mt-8 pt-6 text-center">
            <div className="font-mono text-xs text-connection-green">
              SYSTEM STATUS: OPERATIONAL | UPTIME: 99.99%
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
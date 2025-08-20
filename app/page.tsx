'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import TypewriterText from '../components/TypewriterText'
import InteractiveTerminal from '../components/InteractiveTerminal'
import ElevenLabsWidget from '../components/ElevenLabsWidget'

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

// Sticky CTA Component
const StickyCTA = ({ spotsRemaining }: { spotsRemaining: number }) => {
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
          {spotsRemaining} LICENSES LEFT
        </div>
        <button type="button" className="text-xs underline hover:no-underline">
          INSTALL NOW →
        </button>
      </div>
    </div>
  )
}

// Progress Indicator
const ProgressIndicator = ({ spotsRemaining }: { spotsRemaining: number }) => {
  const progress = ((150 - spotsRemaining) / 150) * 100

  return (
    <div className="fixed top-16 right-4 z-40 bg-os-darker/90 p-3 rounded border border-os-border">
      <div className="text-xs font-mono text-synergy-gold mb-2">
        ROOT ALPHA STATUS
      </div>
      <div className="w-32 bg-os-dark rounded-full h-2 mb-1">
        <div 
          className="bg-synergy-gold h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` } as React.CSSProperties}
        />
      </div>
      <div className="text-xs text-interface-light">
        {150 - spotsRemaining}/150 FILLED
      </div>
    </div>
  )
}

export default function Home() {
  const [spotsRemaining] = useState(117)
  const [synergyScore] = useState(0)
  const [depthScore, setDepthScore] = useState(0)
  
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
      title: "DEPTH_SCANNER.exe",
      description: "Analyzes relationship depth beyond surface interactions",
      metrics: "Depth increased 3.2x average",
      icon: "📊"
    },
    {
      title: "SYNERGY_FINDER.exe",
      description: "Discovers hidden connection opportunities in your network",
      metrics: "$2.4M opportunity value detected",
      icon: "🔍"
    },
    {
      title: "MEMORY_ENHANCE.exe",
      description: "Perfect recall of every interaction and context",
      metrics: "0% relationship data loss",
      icon: "🧠"
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
      title: "RELATIONAL OS",
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
      cta: "INSTALL NOW",
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
        const installButton = document.querySelector('[data-action="install"]') as HTMLElement
        if (installButton && installButton.focus) {
          installButton.focus()
          installButton.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }
      if (e.ctrlKey && e.key === 't') {
        e.preventDefault()
        // Focus the interactive terminal
        const terminalInput = document.querySelector('.interactive-terminal input') as HTMLElement
        if (terminalInput && terminalInput.focus) {
          terminalInput.focus()
          terminalInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <div key={componentKey} className="min-h-screen bg-os-dark os-grid screen-flicker">
      {/* Progress Indicator */}
      <ProgressIndicator spotsRemaining={spotsRemaining} />
      
      {/* Sticky CTA */}
      <StickyCTA spotsRemaining={spotsRemaining} />

      {/* OS Status Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-os-darker/95 backdrop-blur-md border-b border-os-border">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="font-mono text-sm text-synergy-gold">
              RELATIONAL_OS
            </div>
            <div className="text-xs text-interface-light">v.150.ALPHA</div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-xs font-mono text-depth-cyan">
              NETWORK_DEPTH: SCANNING...
            </div>
            <div className="text-xs font-mono text-connection-green">
              SYNERGIES: ACTIVE
            </div>
            <div className="text-xs font-mono text-alert-magenta animate-pulse">
              {spotsRemaining}/150 LICENSES
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Interactive Terminal Interface */}
      <section className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
              <TypewriterText 
                text="RELATIONAL OS" 
                className="screen-light" 
                speed={100}
              />
            </h1>
            <div className="text-xl sm:text-2xl text-os-light leading-relaxed mb-6">
              <TypewriterText 
                text="The operating system for human relationships."
                delay={2000}
                speed={50}
              />
              <br/>
              <TypewriterText 
                text="Deepen connections. Discover synergies."
                className="text-synergy-gold font-semibold"
                delay={4000}
                speed={40}
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Panel - Interactive Terminal */}
            <div className="lg:col-span-2 space-y-6">
              <OSTerminal>
                <InteractiveTerminal />
              </OSTerminal>
              
              {/* Quick System Status */}
              <div className="bg-os-darker p-6 rounded-lg border border-os-border">
                <div className="font-mono text-sm space-y-3">
                  <div className="text-connection-green">
                    &gt; SYNERGY_SCAN: <span className="text-synergy-gold font-semibold">3 opportunities detected</span>
                  </div>
                  <div className="text-depth-cyan">
                    &gt; DEPTH_ANALYSIS: <span className="text-os-light">Relationship potential unlocked</span>
                  </div>
                  <div className="text-alert-magenta">
                    &gt; WARNING: <span className="text-os-light">Limited to 150 operators</span>
                  </div>
                </div>
              </div>
              
              {/* Primary CTA */}
              <div className="text-center lg:text-left">
                <button 
                  type="button" 
                  data-action="install"
                  className="button-glow bg-synergy-gold text-os-dark px-12 py-6 font-bold text-xl hover:bg-synergy-light transition-all focus:ring-2 focus:ring-synergy-light focus:ring-offset-2 focus:ring-offset-os-dark"
                  aria-label="Install Relational OS for $777 lifetime license"
                >
                  INSTALL RELATIONAL_OS [$777]
                </button>
                <div className="text-sm text-interface-light mt-3">
                  LIFETIME LICENSE | ROOT ACCESS | 10 USER INVITES
                </div>
                <div className="text-xs text-interface-gray mt-2">
                  Press Ctrl+I to focus | Press Ctrl+T for terminal
                </div>
              </div>
            </div>

            {/* Right Panel - Live Visualizations */}
            <div className="space-y-6">
              {/* AI Assistant Integration */}
              <div className="interface-border rounded-lg p-6 bg-os-darker/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-mono text-synergy-gold">
                    AI_ASSISTANT.exe
                  </h3>
                  <div className="w-2 h-2 bg-connection-green rounded-full animate-pulse"></div>
                </div>
                <div className="text-xs text-interface-light mb-4 space-y-1">
                  <div>› STATUS: Voice interface active</div>
                  <div>› CAPABILITY: Relationship intelligence Q&A</div>
                  <div>› PROTOCOL: Real-time conversation</div>
                </div>
                {/* ElevenLabs Conversational AI Widget */}
                <div className="bg-os-dark rounded p-2 border border-os-border">
                  <ElevenLabsWidget />
                </div>
              </div>

              {/* Relationship Depth Scanner */}
              <div className="interface-border rounded-lg p-6 bg-os-darker/50">
                <h3 className="text-sm font-mono text-synergy-gold mb-4">
                  DEPTH_SCANNER.exe
                </h3>
                <DepthScanner depth={depthScore} />
                <div className="mt-4 text-xs text-interface-light">
                  <div>SCAN RESULT: High-value connection detected</div>
                  <div>RECOMMENDATION: Immediate engagement advised</div>
                </div>
              </div>

              {/* Synergy Discovery Matrix */}
              <div className="interface-border rounded-lg p-6 bg-os-darker/50">
                <h3 className="text-sm font-mono text-synergy-gold mb-4">
                  SYNERGY_MATRIX.exe
                </h3>
                <SynergyMatrix connections={[1, 2, 3]} />
              </div>
              
              {/* Live Activity Feed */}
              <div className="interface-border rounded-lg p-4 bg-os-darker/50">
                <h3 className="text-sm font-mono text-synergy-gold mb-3">
                  NETWORK_STATUS.log
                </h3>
                <div className="space-y-2 font-mono text-xs">
                  <div className="text-connection-green">
                    [CONNECTED] Sarah Chen → You | Compatibility: 94%
                  </div>
                  <div className="text-depth-cyan">
                    [ANALYZING] David Park | Synergy potential: HIGH
                  </div>
                  <div className="text-alert-magenta animate-pulse">
                    [ALERT] Relationship decay detected: 3 contacts
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-os-darker/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              <span className="screen-light">SYSTEM CAPABILITIES</span>
            </h2>
            <p className="text-lg text-interface-light max-w-3xl mx-auto">
              Transform how you understand and nurture relationships
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="os-window p-4"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
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

      {/* How It Works */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <OSTerminal>
            <div className="space-y-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-synergy-gold mb-6">
                SYSTEM_ARCHITECTURE.md
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
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

      {/* Exclusivity Timeline */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-os-darker/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              <span className="screen-light">DEPLOYMENT PHASES</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
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

      {/* Pricing Comparison */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">
              <span className="screen-light">LICENSE COMPARISON</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
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
                    className={`w-full py-3 px-4 font-mono font-bold transition-all ${
                      plan.highlight 
                        ? 'bg-synergy-gold text-os-dark hover:bg-synergy-light' 
                        : 'bg-interface-dark text-interface-gray cursor-not-allowed'
                    }`}
                    disabled={!plan.highlight}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-os-dark to-os-darker">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-6 py-3 bg-alert-magenta/20 border border-alert-magenta rounded-lg mb-8 animate-pulse">
            <span className="font-mono text-alert-magenta font-semibold">
              CRITICAL: {spotsRemaining} LICENSES REMAINING
            </span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 leading-tight">
            <span className="screen-light">INITIALIZE YOUR RELATIONAL OS</span>
          </h2>
          
          <p className="text-xl sm:text-2xl text-os-light mb-8 max-w-2xl mx-auto leading-relaxed">
            Join 150 operators upgrading how humanity connects
          </p>
          
          <div className="space-y-4">
            <button type="button" className="button-glow bg-synergy-gold text-os-dark px-12 py-6 text-xl font-bold hover:bg-synergy-light transition-all">
              BEGIN INSTALLATION → $777
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
                <div>Operators: {150 - spotsRemaining}/150</div>
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
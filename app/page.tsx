'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Users, Star, ArrowRight, CheckCircle, Zap, Crown, Gift, Shield, TrendingUp, MessageCircle, Calendar } from 'lucide-react'

const NetworkDiagram = () => {
  const [animationStep, setAnimationStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      {/* Central Root Alpha Node */}
      <motion.div
        className="absolute w-16 h-16 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg z-10"
        animate={{ scale: animationStep === 0 ? 1.1 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <Crown className="w-6 h-6" />
      </motion.div>
      
      {/* First Ring - 5 immediate invites */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i * 72) - 90 // -90 to start from top
        const radius = 80
        const x = Math.cos((angle * Math.PI) / 180) * radius
        const y = Math.sin((angle * Math.PI) / 180) * radius
        
        return (
          <motion.div key={`ring1-${i}`} className="absolute">
            {/* Connection Line */}
            <motion.div
              className="absolute w-px bg-gradient-to-r from-accent-300 to-primary-300"
              style={{
                height: `${radius}px`,
                transformOrigin: 'bottom center',
                transform: `rotate(${angle + 90}deg)`,
                left: '50%',
                top: '50%',
                marginLeft: '-0.5px',
                marginTop: `-${radius}px`
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: animationStep >= 1 ? 1 : 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            />
            
            {/* Node */}
            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white shadow-md"
              style={{
                left: `calc(50% + ${x}px - 20px)`,
                top: `calc(50% + ${y}px - 20px)`
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: animationStep >= 1 ? 1 : 0,
                opacity: animationStep >= 1 ? 1 : 0
              }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
            >
              <Users className="w-4 h-4" />
            </motion.div>
          </motion.div>
        )
      })}

      {/* Second Ring - 15 secondary invites (3 per first ring node) */}
      {[0, 1, 2, 3, 4].map((parentIndex) => 
        [0, 1, 2].map((childIndex) => {
          const parentAngle = (parentIndex * 72) - 90
          const childOffset = (childIndex - 1) * 25 // spread children around parent
          const angle = parentAngle + childOffset
          const radius = 140
          const x = Math.cos((angle * Math.PI) / 180) * radius
          const y = Math.sin((angle * Math.PI) / 180) * radius
          const key = `ring2-${parentIndex}-${childIndex}`
          
          return (
            <motion.div key={key} className="absolute">
              {/* Connection Line to Parent */}
              <motion.div
                className="absolute w-px bg-gradient-to-r from-primary-200 to-purple-200"
                style={{
                  height: '60px',
                  transformOrigin: 'bottom center',
                  transform: `rotate(${angle + 90}deg)`,
                  left: `calc(50% + ${Math.cos((parentAngle * Math.PI) / 180) * 80}px)`,
                  top: `calc(50% + ${Math.sin((parentAngle * Math.PI) / 180) * 80}px)`,
                  marginLeft: '-0.5px'
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: animationStep >= 2 ? 1 : 0 }}
                transition={{ duration: 0.6, delay: parentIndex * 0.1 + childIndex * 0.05 }}
              />
              
              {/* Node */}
              <motion.div
                className="w-6 h-6 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full shadow-sm"
                style={{
                  left: `calc(50% + ${x}px - 12px)`,
                  top: `calc(50% + ${y}px - 12px)`
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: animationStep >= 2 ? 1 : 0,
                  opacity: animationStep >= 2 ? 1 : 0
                }}
                transition={{ duration: 0.4, delay: 1.5 + parentIndex * 0.1 + childIndex * 0.05 }}
              />
            </motion.div>
          )
        })
      )}

      {/* Growth Indicator */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: animationStep >= 3 ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 3 }}
      >
        1 → 10 → 1,500+ Network Growth
      </motion.div>

      {/* Legend */}
      <div className="absolute top-0 right-0 text-xs space-y-1">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full"></div>
          <span className="text-gray-600">Root Alpha</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"></div>
          <span className="text-gray-600">Beta Invites</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full"></div>
          <span className="text-gray-600">Network Growth</span>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [spotsRemaining, setSpotsRemaining] = useState(73)
  const [recentMembers] = useState([
    { name: 'Sarah from San Francisco', spot: 77 },
    { name: 'Michael from New York', spot: 76 },
    { name: 'David from Austin', spot: 75 },
  ])

  return (
    <div className="min-h-screen bg-black relative font-mono text-green-400">
      {/* Terminal Grid Background */}
      <div className="fixed inset-0 opacity-5" style={{
        backgroundImage: `
          linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }}></div>
      
      {/* Matrix Rain Effect */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute text-electric-400 opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: '10px',
              fontFamily: 'JetBrains Mono'
            }}
          >
            {Math.random() > 0.5 ? '01' : '10'}
          </div>
        ))}
      </div>
      
      {/* Terminal Status Bar */}
      <div className="fixed top-0 w-full bg-black border-b border-electric-500/50 text-electric-400 py-1 z-50 font-mono text-xs">
        <div className="flex justify-between px-4">
          <span>rhiz@quantum-lab:~/relationship_physics$ </span>
          <span className="animate-pulse">FIELD_STRENGTH: {Math.round((150 - spotsRemaining) / 150 * 100)}% | ENTROPY: RISING ■■■□□</span>
        </div>
      </div>

      {/* Terminal Interface - Revolutionary Layout */}
      <section className="pt-8 px-4 relative min-h-screen">
        {/* Split Screen Layout - Terminal + GUI */}
        <div className="grid lg:grid-cols-12 gap-8 h-screen">
          
          {/* Left Terminal Pane */}
          <div className="lg:col-span-7 bg-black border border-electric-500/30 p-4 font-mono text-sm overflow-hidden">
            <div className="flex items-center gap-2 mb-4 text-electric-400">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="ml-4 text-xs">relationship_physics_lab.exe</span>
            </div>
            
            <div className="space-y-2 text-electric-400">
              <div className="flex">
                <span className="text-green-400">root@rhiz:</span>
                <span className="text-white">~$ ./initialize_quantum_entanglement.sh</span>
              </div>
              <div className="text-gray-400">[INFO] Loading relationship physics engine...</div>
              <div className="text-gray-400">[INFO] Scanning quantum field topology...</div>
              <div className="text-electric-400">[SUCCESS] 150 quantum states discovered</div>
              <div className="text-gravity-400">[WARNING] {spotsRemaining} states remain stable</div>
              <div className="text-red-400">[CRITICAL] Wave function collapse imminent</div>
              <br />
              <div className="flex">
                <span className="text-green-400">root@rhiz:</span>
                <span className="text-white">~$ cat README.md</span>
              </div>
              <div className="mt-4 space-y-3 text-gray-300">
                <div># RHIZ QUANTUM RELATIONSHIP PROTOCOL</div>
                <div className="text-electric-400">## CLASSIFIED: ROOT ALPHA CLEARANCE ONLY</div>
                <br />
                <div>We've cracked the code.</div>
                <div>Human relationships follow invisible laws of physics.</div>
                <div>Connection fields. Attraction forces. Network gravity.</div>
                <br />
                <div className="text-electric-400">This isn't social networking.</div>
                <div className="text-electric-400">This is <span className="font-display font-bold">RELATIONSHIP PHYSICS</span>.</div>
                <br />
                <div className="animate-pulse">Status: {spotsRemaining}/150 quantum observers remaining</div>
                <div className="animate-pulse">Price: $777 (single energy transfer)</div>
                <div className="animate-pulse">Access: LIFETIME | Force multipliers: 10x</div>
              </div>
            </div>
          </div>

          {/* Right Data Visualization Pane */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Network Topology Viewer */}
            <div className="bg-space-950/50 border border-electric-500/30 p-4 h-64">
              <div className="text-electric-400 text-xs mb-2 font-mono">NETWORK_TOPOLOGY.VIZ</div>
              <div className="relative h-full">
                <svg className="w-full h-full" viewBox="0 0 300 200">
                  {/* Central Node */}
                  <circle cx="150" cy="100" r="8" fill="#22d3ee" className="animate-pulse">
                    <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
                  </circle>
                  
                  {/* Connection Lines */}
                  {[...Array(8)].map((_, i) => {
                    const angle = (i * 45) * Math.PI / 180
                    const x = 150 + Math.cos(angle) * 60
                    const y = 100 + Math.sin(angle) * 60
                    return (
                      <g key={i}>
                        <line x1="150" y1="100" x2={x} y2={y} stroke="#22d3ee" strokeWidth="1" opacity="0.6" />
                        <circle cx={x} cy={y} r="4" fill="#a855f7" />
                      </g>
                    )
                  })}
                </svg>
                
                <div className="absolute bottom-2 left-2 text-xs font-mono text-electric-400">
                  FIELD_STRENGTH: {Math.round((150 - spotsRemaining) / 150 * 100)}%
                </div>
              </div>
            </div>

            {/* Quantum States Monitor */}
            <div className="bg-space-950/50 border border-electric-500/30 p-4">
              <div className="text-electric-400 text-xs mb-2 font-mono">QUANTUM_STATES.MON</div>
              <div className="font-display text-4xl text-electric-400 mb-2">{spotsRemaining}</div>
              <div className="text-xs text-gray-400 font-mono">AVAILABLE ENTANGLEMENT SLOTS</div>
              <div className="mt-4 space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-400">OCCUPIED:</span>
                  <span className="text-electric-400">{150 - spotsRemaining}/150</span>
                </div>
                <div className="w-full bg-space-800 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-electric-500 to-gravity-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((150 - spotsRemaining) / 150) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Command Prompt */}
            <div className="bg-space-950/50 border border-electric-500/30 p-4">
              <div className="text-electric-400 text-xs mb-2 font-mono">ENTANGLEMENT_INTERFACE.CMD</div>
              <button className="w-full bg-electric-500 hover:bg-electric-400 text-black font-mono font-bold py-3 px-4 transition-all duration-200 transform hover:scale-[1.02] border border-electric-400">
                {'>> INITIATE_QUANTUM_ENTANGLEMENT($777)'}
              </button>
              <div className="text-xs text-gray-400 mt-2 font-mono">
                WARNING: Irreversible process. Lifetime access granted.
              </div>
            </div>

            {/* Recent Activity Log */}
            <div className="bg-space-950/50 border border-electric-500/30 p-4">
              <div className="text-electric-400 text-xs mb-2 font-mono">ACTIVITY.LOG</div>
              <div className="space-y-1 text-xs font-mono">
                <div className="text-green-400">[√] NODE_77: ENTANGLEMENT_COMPLETE</div>
                <div className="text-green-400">[√] NODE_76: ENTANGLEMENT_COMPLETE</div>
                <div className="text-green-400">[√] NODE_75: ENTANGLEMENT_COMPLETE</div>
                <div className="text-yellow-400">[?] SCANNING FOR NEW OBSERVERS...</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Terminal */}
      <footer className="px-4 py-8 border-t border-electric-500/30">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black border border-electric-500/30 p-4 font-mono text-xs">
            <div className="flex items-center gap-2 mb-2 text-electric-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>SYSTEM STATUS: OPERATIONAL</span>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-gray-400">
              <div>
                <div className="text-electric-400 mb-2">NETWORK_INFO:</div>
                <div>• PROTOCOL: Quantum Entanglement</div>
                <div>• ENCRYPTION: 256-bit relationship hashing</div>
                <div>• LATENCY: Sub-quantum response time</div>
              </div>
              <div>
                <div className="text-electric-400 mb-2">CONTACT_VECTORS:</div>
                <div>• TELEGRAM: @rhiz_quantum_lab</div>
                <div>• EMAIL: root@rhiz.network</div>
                <div>• IRC: #relationship-physics</div>
              </div>
              <div>
                <div className="text-electric-400 mb-2">LEGAL_FRAMEWORK:</div>
                <div>• TERMS: Quantum entanglement binding</div>
                <div>• PRIVACY: Heisenberg uncertainty principle</div>
                <div>• COPYRIGHT: 2024 Rhiz Quantum Labs</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-electric-500/30 text-center text-electric-400">
              {'> END TRANSMISSION <'}
            </div>
          </div>
        </div>
      </footer>

      {/* Quantum Entanglement Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-space-950 to-space-900 text-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 relative"
            >
              <div className="orbital-path relative">
                <div className="inline-block space-border rounded-2xl p-8 mb-8 animate-gravity-well relative z-10">
                  <div className="text-6xl sm:text-7xl font-bold gradient-text mb-4">
                    {spotsRemaining}
                  </div>
                  <div className="text-xl text-electric-400 font-medium">
                    Quantum States Available
                  </div>
                  <div className="text-sm text-space-400 mt-2">
                    Field Strength: {Math.round((150 - spotsRemaining) / 150 * 100)}% | Wave Collapse Imminent
                  </div>
                </div>
                
                {/* Orbiting Elements */}
                <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-electric-400 rounded-full animate-orbit opacity-60"></div>
                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-gravity-400 rounded-full animate-orbit opacity-40" style={{animationDelay: '2s'}}></div>
              </div>
            </motion.div>

            {/* Quantum Entanglement CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-6"
            >
              <button className="bg-gradient-to-r from-electric-500 to-gravity-500 hover:from-electric-400 hover:to-gravity-400 text-white font-bold py-6 px-12 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 electromagnetic-glow relative overflow-hidden">
                <span className="relative z-10">Initiate Quantum Entanglement - $777</span>
                <div className="absolute inset-0 force-field opacity-30"></div>
                <ArrowRight className="inline-block ml-2 w-5 h-5 relative z-10" />
              </button>
              
              <div className="mt-4 text-space-300">
                Single energy transfer. Permanent field access. <span className="font-semibold text-electric-400">Includes 10 force multipliers.</span>
              </div>
            </motion.div>

            {/* Field Collapse Warning */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-border rounded-xl p-4 inline-block"
            >
              <div className="flex items-center text-electric-400 font-medium">
                <Zap className="w-5 h-5 mr-2 animate-pulse" />
                Critical Mass: 150 observers collapse quantum field. Beta phase accessible only through entangled members.
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Relationship Physics Laboratory */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-space-950 to-space-900 text-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 relative">
            {/* Background Force Field */}
            <div className="absolute inset-0 force-field rounded-3xl opacity-20"></div>
            
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 relative z-10">
              Discover <span className="gradient-text">Relationship Physics</span> Laboratory
            </h2>
            <p className="text-xl text-space-300 max-w-4xl mx-auto leading-relaxed relative z-10">
              Rhiz applies the fundamental laws of <span className="text-electric-400 font-semibold">social physics</span> to map invisible connection forces, 
              calculate relationship field strengths, and predict optimal interaction moments across your network topology.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">Network Entropy & Force Decay</h3>
              <div className="space-y-4 text-space-300">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gravity-400 rounded-full mt-2 animate-pulse"></div>
                  <p>Connection fields weaken without energy input (forgotten follow-ups)</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gravity-400 rounded-full mt-2 animate-pulse"></div>
                  <p>Network topology becomes invisible without mapping algorithms</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gravity-400 rounded-full mt-2 animate-pulse"></div>
                  <p>Optimal interaction windows pass undetected in the quantum field</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gravity-400 rounded-full mt-2 animate-pulse"></div>
                  <p>Relationship potential energy dissipates through thermodynamic neglect</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <NetworkDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Be Part of the <span className="text-accent-400">First 150</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the quantum relationship revolution. Limited to 150 founding members.
          </p>
          <button className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
            Join Now - $777
          </button>
        </div>
      </section>
    </div>
  )
}
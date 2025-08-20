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
                {'>>'} INITIATE_QUANTUM_ENTANGLEMENT($777)
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
              {'>'} END TRANSMISSION &lt;
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
              <div className="mt-6 p-4 bg-gravity-900/30 border border-gravity-700 rounded-xl">
                <p className="text-gravity-200 font-semibold">Quantum Loss: Network entropy increases exponentially, causing $50K-200K in missed connection opportunities annually.</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-electric-500/20 to-gravity-500/20 rounded-2xl p-8 space-border electromagnetic-glow">
              <h3 className="text-3xl font-bold text-white mb-6">Rhiz: Applied Social Physics Engine</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Zap className="w-6 h-6 text-electric-400 mt-1 animate-pulse" />
                  <div>
                    <p className="font-semibold text-electric-400">Electromagnetic Field Capture</p>
                    <p className="text-space-300">Voice waves transmit interaction data directly to quantum processors</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="w-6 h-6 text-electric-400 mt-1 animate-pulse" />
                  <div>
                    <p className="font-semibold text-electric-400">Connection Force Calculations</p>
                    <p className="text-space-300">AI maps invisible attraction fields between network nodes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="w-6 h-6 text-electric-400 mt-1 animate-pulse" />
                  <div>
                    <p className="font-semibold text-electric-400">Temporal Interaction Optimization</p>
                    <p className="text-space-300">Predict optimal energy transfer moments across spacetime</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Zap className="w-6 h-6 text-electric-400 mt-1 animate-pulse" />
                  <div>
                    <p className="font-semibold text-electric-400">Network Topology Queries</p>
                    <p className="text-space-300">Query the quantum field: "Show gravitational pull toward Series A contacts"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Voice Notes</h4>
              <p className="text-gray-300">"Just had coffee with Sarah from Stripe. She's hiring engineers and looking for API tools."</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">AI Processing</h4>
              <p className="text-gray-300">Rhiz extracts key details, identifies opportunities, and enriches your network data.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Smart Actions</h4>
              <p className="text-gray-300">"Introduce Sarah to David—he's a senior engineer looking for new opportunities."</p>
            </div>
          </div>

          <div className="bg-accent-500/20 border border-accent-500/30 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Perfect For:</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-semibold text-accent-400">Founders</div>
                <div className="text-gray-300">Track investors, advisors, and key hires</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-semibold text-accent-400">Sales Leaders</div>
                <div className="text-gray-300">Manage hundreds of relationships at scale</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-semibold text-accent-400">Investors</div>
                <div className="text-gray-300">Remember every entrepreneur you meet</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="font-semibold text-accent-400">Executives</div>
                <div className="text-gray-300">Build and maintain strategic networks</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Why Only <span className="gradient-text">150 Members?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              <span className="font-semibold text-gray-800">Dunbar's Law states that humans can only maintain 150 meaningful relationships.</span> We believe in the power of deep connections over endless networks. 
              Rhiz will always be invite-only, and these 150 founding members form the <span className="font-semibold text-gray-800">inner circle</span> - the beginning of something extraordinary.
            </p>
            <div className="bg-gradient-to-r from-purple-50 to-accent-50 border border-purple-200 rounded-2xl p-8 max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed">
                <span className="font-bold text-purple-700">You will always be special. Always be remembered. Always be venerated.</span><br/>
                As a Root Alpha member, you hold privileges that supersede all who come later. Your status is eternal, your access is permanent, and your influence is foundational. 
                Every feature we build, every decision we make, honors the trust you place in us today.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Star className="w-8 h-8" />,
                title: "Eternal Access",
                description: "Pay once at $777, access forever. Your status is permanent and unrevokable.",
                color: "text-accent-600"
              },
              {
                icon: <Gift className="w-8 h-8" />,
                title: "10 Golden Invites",
                description: "Expand your inner circle. Each invite carries your Root Alpha endorsement.",
                color: "text-primary-600"
              },
              {
                icon: <Crown className="w-8 h-8" />,
                title: "Supreme Privilege",
                description: "Superseding access, founder intimacy, and decision-making influence that no future member will ever possess.",
                color: "text-purple-600"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center premium-border rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className={`${benefit.color} mb-4 flex justify-center`}>
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Root Alpha Membership Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Root Alpha: A <span className="text-accent-400">Lifetime Investment</span> in Your Network
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Pricing */}
            <div className="text-center lg:text-left">
              <div className="mb-8">
                <div className="text-6xl font-bold text-accent-400 mb-2">$777</div>
                <div className="text-2xl text-gray-300 mb-4">Once</div>
                <div className="text-lg text-gray-400 line-through mb-2">vs $1,188/year after launch</div>
                <div className="text-accent-400 font-semibold text-lg">You save $11,880 over 10 years</div>
              </div>
              
              <button className="bg-accent-500 hover:bg-accent-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 w-full lg:w-auto">
                Secure Your Spot Now
              </button>
            </div>

            {/* Perks Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                "Lifetime access to all current and future features",
                "10 invitation codes ($1,188 value each = $11,880 total value)",
                "Founding member badge and recognition",
                "Monthly calls with founders",
                "Priority feature requests",
                "Access to Root Alpha private community",
                "Early access to Chrome extension (2025)",
                "Early access to WhatsApp integration (2025)"
              ].map((perk, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{perk}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Invite System Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Your <span className="gradient-text">10 Golden Invites</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each Root Alpha member receives 10 invitations to share
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What invitees get:</h3>
              <div className="space-y-4 mb-8">
                {[
                  "Access to Root Beta starting October 21st",
                  "All premium features during closed beta",
                  "Opportunity to secure permanent invite-only status"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-accent-50 border border-accent-200 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <Zap className="w-6 h-6 text-accent-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Why this matters:</h4>
                    <p className="text-gray-700">Build your inner circle. Strengthen your team. Create your network effect.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Network Growth Visualization</h3>
              <NetworkDiagram />
              <p className="text-gray-600 text-center mt-6">Root Alpha members invite 10 people to Root Beta, creating exponential network growth and value for everyone.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusivity Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              The <span className="gradient-text">Exclusivity Timeline</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                period: "Now - Oct 20",
                title: "Root Alpha Only",
                subtitle: "(150 members max)",
                description: "Exclusive founding community with lifetime access and invite privileges",
                color: "border-accent-500 bg-accent-50"
              },
              {
                period: "Oct 21 - Dec 2025",
                title: "Root Beta",
                subtitle: "(1,500 max invites)",
                description: "Closed beta for those invited by Root Alpha members only",
                color: "border-primary-500 bg-primary-50"
              },
              {
                period: "Q1 2026+",
                title: "Invite-Only Forever",
                subtitle: "(Waitlist only)",
                description: "Platform remains invite-only. New members must be invited or join waitlist",
                color: "border-purple-500 bg-purple-50"
              }
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`border-2 rounded-2xl p-8 ${phase.color}`}
              >
                <div className="text-sm font-semibold text-gray-600 mb-2">{phase.period}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{phase.title}</h3>
                <div className="text-lg text-gray-700 mb-4">{phase.subtitle}</div>
                <p className="text-gray-600">{phase.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 inline-block">
              <div className="text-red-700 font-semibold text-lg">
                Rhiz remains invite-only forever. Root Alpha members control access to Root Beta.
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              How <span className="gradient-text">Rhiz Serves You</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your personal relationship assistant, working behind the scenes to strengthen your connections
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "You Connect",
                description: "You choose which contacts and apps to share. Rhiz only sees what you decide to show.",
                icon: <MessageCircle className="w-8 h-8" />
              },
              {
                step: "02",
                title: "Rhiz Remembers",
                description: "Your AI assistant quietly tracks important moments, birthdays, and conversation topics—so you never forget.",
                icon: <Zap className="w-8 h-8" />
              },
              {
                step: "03",
                title: "You Succeed",
                description: "Receive thoughtful prompts and insights that help you nurture relationships authentically.",
                icon: <Users className="w-8 h-8" />
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-accent-500 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <div className="text-sm font-bold text-accent-600 mb-2">STEP {step.step}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Comparison Table */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              The Math Is <span className="gradient-text">Simple</span>
            </h2>
          </div>

          <div className="bg-white rounded-2xl premium-shadow overflow-hidden">
            <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
              {[
                {
                  title: "Root Alpha",
                  subtitle: "Limited Time",
                  price: "$777 once",
                  features: [
                    "Lifetime access",
                    "10 invites",
                    "$11,880 value",
                    "Founding member status",
                    "Direct founder access"
                  ],
                  cta: "Join Now",
                  highlight: true
                },
                {
                  title: "Future Monthly",
                  subtitle: "After Launch",
                  price: "$99/month",
                  features: [
                    "$1,188/year",
                    "No invites",
                    "$11,880 over 10 years",
                    "Regular member",
                    "Standard support"
                  ],
                  cta: "Too Late",
                  highlight: false
                },
                {
                  title: "LinkedIn Premium",
                  subtitle: "Current Option",
                  price: "$60/month",
                  features: [
                    "$720/year",
                    "No AI insights",
                    "$7,200 over 10 years",
                    "Basic features",
                    "No relationship intelligence"
                  ],
                  cta: "Outdated",
                  highlight: false
                }
              ].map((plan, index) => (
                <div key={index} className={`p-8 ${plan.highlight ? 'bg-accent-50 border-2 border-accent-500' : ''}`}>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.title}</h3>
                    <div className="text-gray-600 mb-4">{plan.subtitle}</div>
                    <div className="text-4xl font-bold text-gray-900 mb-6">{plan.price}</div>
                    
                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center justify-center">
                          <CheckCircle className={`w-5 h-5 mr-2 ${plan.highlight ? 'text-accent-600' : 'text-gray-400'}`} />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <button 
                      className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                        plan.highlight 
                          ? 'bg-accent-500 hover:bg-accent-600 text-white' 
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
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
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "What happens after 150 members?",
                answer: "Root Alpha closes. On October 21st, Root Beta begins for invited members only. After that, Rhiz remains invite-only forever."
              },
              {
                question: "Why lifetime membership?",
                answer: "We want aligned incentives. Your success is our success. Forever."
              },
              {
                question: "Can I buy multiple memberships?",
                answer: "No. One per person to keep it fair."
              },
              {
                question: "What if I want to join after 150?",
                answer: "You'll need an invite from a Root Alpha member for Root Beta (Oct 21+), or join the permanent waitlist for future consideration."
              },
              {
                question: "Are the 10 invites transferable?",
                answer: "Yes, you choose who gets them. They're valid forever."
              },
              {
                question: "What's included in lifetime?",
                answer: "Everything. Current features, future features, all integrations, forever."
              }
            ].map((faq, index) => (
              <div key={index} className="premium-border rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
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
            When these lifetime memberships are gone, they're gone forever
          </p>
          
          <button className="bg-accent-500 hover:bg-accent-600 text-white font-bold py-6 px-12 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 mb-6">
            Claim Your Lifetime Membership
          </button>
          
          <div className="text-gray-400">
            Questions? Text our founder directly: <a href="#" className="text-accent-400 hover:underline">Telegram link</a>
          </div>
        </div>
      </section>
    </div>
  )
}
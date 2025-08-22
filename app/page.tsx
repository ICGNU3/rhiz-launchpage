'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import TypewriterText from '../components/TypewriterText'
import ConversationalAgent from '../components/ConversationalAgent'
import NetworkVisualizer from '../components/NetworkVisualizer'

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

export default function Home() {
  const isMobile = useIsMobile()
  
  // Add a stable key for React reconciliation
  const componentKey = useMemo(() => 'home-component', [])
  
  return (
    <div key={componentKey} className="bg-os-dark os-grid screen-flicker">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-os-darker/90 backdrop-blur-md border-b border-os-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-synergy-gold rounded-full flex items-center justify-center">
                <span className="text-os-dark font-bold text-sm">R</span>
              </div>
              <div className="font-mono text-synergy-gold font-bold text-lg">RHIZ</div>
            </div>
            
            <div className="hidden sm:flex items-center gap-6">
              <a href="#about" className="text-interface-light hover:text-synergy-gold transition-colors">
                About
              </a>
              <a href="#technology" className="text-interface-light hover:text-synergy-gold transition-colors">
                Technology
              </a>
              <a href="#demo" className="text-interface-light hover:text-synergy-gold transition-colors">
                Network Demo
              </a>
              <a 
                href="/root-alpha" 
                className="bg-synergy-gold text-os-dark px-4 py-2 rounded-lg font-semibold hover:bg-synergy-light transition-colors"
              >
                Join Root Alpha
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="sm:hidden p-2 text-interface-light hover:text-synergy-gold transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Open mobile menu"
              title="Open mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen relative bg-gradient-to-br from-os-dark via-os-darker to-os-dark w-full pt-16">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-10">
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
        </div>

        <div className="max-w-7xl mx-auto relative z-10 min-h-screen flex flex-col px-4">
          <div className={`text-center flex-grow flex flex-col justify-center ${
            isMobile ? 'mt-16 mb-6 px-4' : 'mt-32 mb-8'
          }`}>
            {/* Main Title */}
            <motion.div 
              className={`relative ${
                isMobile ? 'mb-6' : 'mb-8'
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
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
              </h1>
            </motion.div>
            
            {/* Subtitle */}
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
                  delay={1000}
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
                  text="Transform how you build and leverage relationships."
                  delay={5000}
                  speed={40}
                  className="text-connection-green"
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <motion.div 
              className={`flex gap-4 justify-center ${
                isMobile ? 'flex-col items-center' : 'flex-row'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 6, duration: 0.8 }}
            >
              <button 
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-synergy-gold text-os-dark px-8 py-4 rounded-lg font-bold hover:bg-synergy-light transition-all transform hover:scale-105"
              >
                Try the Demo
              </button>
              <button 
                onClick={() => document.getElementById('technology')?.scrollIntoView({ behavior: 'smooth' })}
                className="border border-synergy-gold text-synergy-gold px-8 py-4 rounded-lg font-bold hover:bg-synergy-gold hover:text-os-dark transition-all transform hover:scale-105"
              >
                Learn More
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-os-darker/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`font-bold mb-6 ${
              isMobile ? 'text-3xl' : 'text-4xl sm:text-5xl'
            }`}>
              <span className="screen-light">What is RHIZ?</span>
            </h2>
            <p className={`text-interface-light max-w-3xl mx-auto ${
              isMobile ? 'text-lg' : 'text-xl'
            }`}>
              RHIZ is an AI system that automatically captures every conversation, meeting, and interaction, 
              then uses advanced intelligence to identify hidden opportunities, optimize your network, 
              and create strategic synergies that drive real business value.
            </p>
          </div>

          <div className={`grid gap-8 ${
            isMobile ? 'grid-cols-1' : 'grid-cols-3'
          }`}>
            {/* Capture */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-synergy-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-os-dark font-bold text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-os-light mb-3">Automatic Capture</h3>
              <p className="text-interface-light">
                RHIZ automatically captures conversations and meetings, extracting key information about people, 
                opportunities, and potential synergies.
              </p>
            </motion.div>

            {/* Analyze */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-depth-cyan rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-os-dark font-bold text-2xl">🧠</span>
              </div>
              <h3 className="text-xl font-bold text-os-light mb-3">AI Analysis</h3>
              <p className="text-interface-light">
                Advanced AI analyzes your network to identify hidden opportunities, synergies, and strategic connections.
              </p>
            </motion.div>

            {/* Optimize */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-connection-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-os-dark font-bold text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-os-light mb-3">Network Optimization</h3>
              <p className="text-interface-light">
                Get actionable insights to optimize your network, build stronger relationships, and create more value.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-16 px-4 sm:px-6 lg:px-8 bg-os-darker/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`font-bold mb-6 ${
              isMobile ? 'text-3xl' : 'text-4xl sm:text-5xl'
            }`}>
              <span className="screen-light">How It Works</span>
            </h2>
            <p className={`text-interface-light max-w-3xl mx-auto ${
              isMobile ? 'text-lg' : 'text-xl'
            }`}>
              RHIZ uses cutting-edge AI to transform how you understand and leverage your professional relationships.
            </p>
          </div>

          <div className={`grid gap-8 ${
            isMobile ? 'grid-cols-1' : 'grid-cols-2'
          }`}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-os-darker/50 rounded-lg p-6 border border-synergy-gold/30"
            >
              <h3 className="text-xl font-bold text-synergy-gold mb-4">Voice Memory Capture</h3>
              <p className="text-interface-light mb-4">
                RHIZ automatically captures conversations and meetings, extracting key information about people, 
                opportunities, and potential synergies.
              </p>
              <div className="text-sm text-connection-green font-mono">
                "Met Sarah at Stripe, she's hiring engineers..."
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-os-darker/50 rounded-lg p-6 border border-depth-cyan/30"
            >
              <h3 className="text-xl font-bold text-depth-cyan mb-4">AI Intelligence</h3>
              <p className="text-interface-light mb-4">
                Advanced AI analyzes your network patterns, identifies hidden opportunities, and provides 
                strategic recommendations for relationship building.
              </p>
              <div className="text-sm text-synergy-gold font-mono">
                "Connect Sarah with David - perfect timing"
              </div>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <a 
              href="/root-alpha"
              className="bg-synergy-gold text-os-dark px-8 py-4 rounded-lg font-bold hover:bg-synergy-light transition-all transform hover:scale-105 inline-block"
            >
              Join Root Alpha - Get Early Access
            </a>
          </div>
        </div>
      </section>

      {/* Network Intelligence Demo */}
      <section id="demo" className="py-16 px-4 sm:px-6 lg:px-8 bg-os-darker/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`font-bold mb-6 ${
              isMobile ? 'text-3xl' : 'text-4xl sm:text-5xl'
            }`}>
              <span className="screen-light">Network Intelligence Demo</span>
            </h2>
            <p className={`text-interface-light max-w-3xl mx-auto ${
              isMobile ? 'text-lg' : 'text-xl'
            }`}>
              See how RHIZ analyzes your network and finds hidden opportunities. Enter your goals and skills to get personalized insights.
            </p>
          </div>
          
          <NetworkVisualizer />
        </div>
      </section>

      {/* AI Chat Demo */}
      <section id="ai-chat" className="py-16 px-4 sm:px-6 lg:px-8 bg-os-darker/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`font-bold mb-6 ${
              isMobile ? 'text-3xl' : 'text-4xl sm:text-5xl'
            }`}>
              <span className="screen-light">Chat with RHIZ AI</span>
            </h2>
            <p className={`text-interface-light max-w-3xl mx-auto ${
              isMobile ? 'text-lg' : 'text-xl'
            }`}>
              Ask our AI about networking strategies, business opportunities, or relationship building.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <ConversationalAgent />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-os-darker border-t border-os-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="font-mono text-synergy-gold mb-3">RHIZ</div>
              <div className="space-y-1 text-interface-light">
                <div>AI Relationship Intelligence</div>
                <div>Transform your network</div>
                <div>Build strategic connections</div>
              </div>
            </div>
            
            <div>
              <div className="font-mono text-synergy-gold mb-3">ACCESS</div>
              <div className="space-y-1 text-interface-light">
                <a href="/root-alpha" className="hover:text-synergy-gold transition-colors">Root Alpha</a>
                <div>Early access program</div>
                <div>Lifetime membership</div>
              </div>
            </div>
            
            <div>
              <div className="font-mono text-synergy-gold mb-3">CONTACT</div>
              <div className="space-y-1 text-interface-light">
                <div>israel.wilson@uncommonimpactstudio.com</div>
                <div>Questions? Get in touch</div>
                <div>© 2024 RHIZ</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-os-border mt-8 pt-6 text-center">
            <div className="font-mono text-xs text-connection-green">
              RHIZ AI SYSTEM | RELATIONSHIP INTELLIGENCE | NETWORK OPTIMIZATION
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
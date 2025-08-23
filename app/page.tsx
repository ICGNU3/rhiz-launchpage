'use client'

import { Metadata } from 'next'
import TypewriterText from '../components/TypewriterText'
import NetworkVisualizer from '../components/NetworkVisualizer'
import ConversationalAgent from '../components/ConversationalAgent'
import { motion } from 'framer-motion'

// Note: metadata moved to layout.tsx due to client component conversion

export default function Home() {
  return (
    <main className="min-h-screen bg-os-dark text-interface-light overflow-x-hidden">
      {/* Navigation with Enhanced Interactions */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-os-darker/90 backdrop-blur-md border-b border-os-border"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center gap-3 cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="w-8 h-8 bg-synergy-gold rounded-full flex items-center justify-center group-hover:shadow-lg transition-shadow duration-200"
                whileHover={{ 
                  rotate: [0, -10, 10, -5, 5, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <span className="text-os-dark font-bold text-sm">R</span>
              </motion.div>
              <motion.div 
                className="font-mono text-synergy-gold font-bold text-lg group-hover:drop-shadow-lg transition-all duration-200"
              >RHIZ</motion.div>
            </motion.div>
            
            <div className="hidden sm:flex items-center gap-6">
              <motion.a 
                href="#how-it-works" 
                className="text-interface-light hover:text-synergy-gold transition-all duration-200 relative group"
                whileHover={{ y: -2 }}
              >
                How It Works
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-synergy-gold group-hover:w-full transition-all duration-300" />
              </motion.a>
              <motion.a 
                href="#demo" 
                className="text-interface-light hover:text-synergy-gold transition-all duration-200 relative group"
                whileHover={{ y: -2 }}
              >
                Live Demo
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-synergy-gold group-hover:w-full transition-all duration-300" />
              </motion.a>
              <motion.a 
                href="#pricing" 
                className="text-interface-light hover:text-synergy-gold transition-all duration-200 relative group"
                whileHover={{ y: -2 }}
              >
                Pricing
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-synergy-gold group-hover:w-full transition-all duration-300" />
              </motion.a>
              <motion.a 
                href="/root-alpha" 
                className="bg-synergy-gold text-os-dark px-4 py-2 rounded font-semibold hover:bg-synergy-light transition-all duration-200 relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(255, 215, 0, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Join Root Alpha</span>
              </motion.a>
            </div>
            
            {/* Mobile Menu Button with Playful Animation */}
            <motion.button 
              className="sm:hidden p-2 text-interface-light hover:text-synergy-gold transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Open mobile menu"
              title="Open mobile menu"
              whileHover={{ 
                scale: 1.1,
                rotate: 90,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section with Delightful Interactions */}
      <motion.section 
        className="pt-16 pb-20 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {/* Floating Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-20 left-10 w-2 h-2 bg-synergy-gold/20 rounded-full"
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-40 right-20 w-3 h-3 bg-depth-cyan/30 rounded-full"
            animate={{
              y: [20, -30, 20],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div 
            className="absolute bottom-40 left-1/4 w-1 h-1 bg-connection-green/40 rounded-full"
            animate={{
              y: [-15, 25, -15],
              opacity: [0.4, 0.9, 0.4]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            {/* Enhanced Scarcity Indicator */}
            <motion.div 
              className="inline-block bg-alert-magenta/20 border border-alert-magenta rounded-full px-4 py-2 mb-6 cursor-pointer group"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(255, 0, 255, 0.3)"
              }}
            >
              <motion.span 
                className="text-alert-magenta font-mono text-sm font-semibold"
                animate={{
                  textShadow: [
                    "0 0 0px rgba(255, 0, 255, 0.8)",
                    "0 0 8px rgba(255, 0, 255, 1)",
                    "0 0 0px rgba(255, 0, 255, 0.8)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                🔥 LIMITED: 150 FOUNDING MEMBERS ONLY
              </motion.span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl sm:text-6xl font-bold text-synergy-gold mb-8 cursor-default select-none"
              initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "backOut" }}
              whileHover={{ 
                textShadow: "0 0 30px #FFD700, 0 0 60px #FFD700",
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              RHIZ
            </motion.h1>
            
            <motion.div 
              className="text-os-light leading-relaxed max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto relative text-lg sm:text-xl lg:text-2xl xl:text-3xl mb-8 px-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div 
                className="bg-os-darker/30 backdrop-blur-sm border border-synergy-gold/30 rounded-lg shadow-2xl p-4 sm:p-6 hover:shadow-3xl hover:border-synergy-gold/50 transition-all duration-300 overflow-hidden"
                whileHover={{ 
                  scale: 1.02,
                  rotateX: 2,
                  rotateY: -2,
                  transition: { duration: 0.3 }
                }}
                style={{
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  hyphens: 'auto',
                  maxWidth: '100%',
                  overflow: 'hidden'
                }}
              >
                <div className="space-y-3 sm:space-y-4 typewriter-container">
                  <div className="min-h-[1.5em] overflow-hidden hero-typewriter">
                    <TypewriterText 
                      text="Stop losing $2M+ opportunities because you forgot who knows who."
                      delay={1000}
                      speed={40}
                      className="text-alert-magenta font-bold block break-words"
                    />
                  </div>
                  <div className="min-h-[1.5em] overflow-hidden hero-typewriter">
                    <TypewriterText 
                      text="RHIZ transforms your network into an intelligent relationship OS that never forgets and always connects."
                      delay={3000}
                      speed={35}
                      className="text-synergy-gold font-semibold block break-words"
                    />
                  </div>
                  <div className="min-h-[1.5em] overflow-hidden hero-typewriter">
                    <TypewriterText 
                      text="Voice-first intelligence. Zero manual data entry. Maximum network ROI."
                      delay={5000}
                      speed={40}
                      className="text-connection-green block break-words"
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced Risk Reversal Guarantee */}
            <motion.div 
              className="bg-connection-green/10 border border-connection-green/30 rounded-lg p-4 mb-8 max-w-2xl mx-auto group cursor-pointer"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 8px 25px rgba(0, 255, 136, 0.2)",
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="flex items-center justify-center gap-2 text-connection-green"
                animate={{
                  textShadow: [
                    "0 0 0px rgba(0, 255, 136, 0.8)",
                    "0 0 8px rgba(0, 255, 136, 1)",
                    "0 0 0px rgba(0, 255, 136, 0.8)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.span 
                  className="text-xl"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >✓</motion.span>
                <span className="font-semibold">30-Day Money-Back Guarantee</span>
              </motion.div>
              <p className="text-sm text-os-light mt-2">
                If RHIZ doesn't create 10x ROI in your first month, get a full refund.
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <motion.a 
                href="#demo" 
                className="bg-synergy-gold text-os-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-synergy-light transition-all duration-200 shadow-lg relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 15px 35px rgba(255, 215, 0, 0.4)",
                  y: -3
                }}
                whileTap={{ 
                  scale: 0.95,
                  y: 0,
                  transition: { duration: 0.1 }
                }}
              >
                <span className="relative z-10">✨ Experience RHIZ Demo →</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-synergy-light via-synergy-gold to-synergy-light"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.a>
              <motion.a 
                href="/root-alpha" 
                className="border-2 border-synergy-gold text-synergy-gold px-8 py-4 rounded-lg font-bold text-lg hover:bg-synergy-gold hover:text-os-dark transition-all duration-200 relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: "#FFED4E",
                  y: -3
                }}
                whileTap={{ 
                  scale: 0.95,
                  y: 0,
                  transition: { duration: 0.1 }
                }}
              >
                <span className="relative z-10">🚀 Secure Lifetime Access</span>
                <motion.div 
                  className="absolute top-0 right-0 bg-alert-magenta text-white text-xs px-2 py-1 rounded-bl font-mono"
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      "0 0 0px rgba(255, 0, 255, 0.5)",
                      "0 0 10px rgba(255, 0, 255, 0.8)",
                      "0 0 0px rgba(255, 0, 255, 0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  $777
                </motion.div>
                <motion.div 
                  className="absolute inset-0 bg-synergy-gold"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />
              </motion.a>
            </motion.div>

            {/* Enhanced Social Proof */}
            <motion.div 
              className="mt-12 max-w-3xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <motion.p 
                className="text-interface-light text-sm mb-4 italic"
                whileHover={{ 
                  scale: 1.02,
                  textShadow: "0 0 10px rgba(255, 215, 0, 0.3)",
                  transition: { duration: 0.2 }
                }}
              >
                "The relationship intelligence system I wish I had 10 years ago"
              </motion.p>
              <div className="flex items-center justify-center gap-8 opacity-70">
                <motion.div 
                  className="text-center cursor-pointer group"
                  whileHover={{ 
                    scale: 1.05,
                    opacity: 1,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="text-synergy-gold font-bold group-hover:drop-shadow-lg transition-all duration-200">Israel Wilson</div>
                  <div className="text-xs text-interface-gray group-hover:text-interface-light transition-colors duration-200">CEO, RHIZ • Ex-Microsoft</div>
                </motion.div>
                <motion.div 
                  className="w-px h-12 bg-interface-gray/30"
                  animate={{ scaleY: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="text-center cursor-pointer group"
                  whileHover={{ 
                    scale: 1.05,
                    opacity: 1,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="text-connection-green font-mono text-sm group-hover:drop-shadow-lg transition-all duration-200">150+ Professionals</div>
                  <div className="text-xs text-interface-gray group-hover:text-interface-light transition-colors duration-200">Already Building Networks</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Enhanced How It Works Section */}
      <motion.section 
        id="how-it-works" 
        className="py-20 bg-os-darker/30 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Background Animation */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-10 right-10 w-64 h-64 bg-synergy-gold/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-center text-synergy-gold mb-16"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            How RHIZ Works
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Enhanced Step 1 */}
            <motion.div 
              className="bg-os-darker/50 rounded-lg p-6 border border-synergy-gold/30 group hover:border-synergy-gold/60 transition-all duration-300 cursor-pointer"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                boxShadow: "0 15px 30px rgba(255, 215, 0, 0.1)"
              }}
            >
              <motion.div 
                className="w-12 h-12 bg-synergy-gold rounded-full flex items-center justify-center text-os-dark font-bold text-xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
                whileHover={{ 
                  boxShadow: "0 0 20px rgba(255, 215, 0, 0.5)"
                }}
              >
                1
              </motion.div>
              <h3 className="text-xl font-bold text-synergy-gold mb-3 group-hover:text-synergy-light transition-colors duration-200">Voice-First Capture</h3>
              <p className="text-interface-light group-hover:text-os-light transition-colors duration-200">
                Speak naturally about people you meet via Telegram voice messages. No forms, fields, or manual data entry ever required.
              </p>
              <motion.div 
                className="mt-4 p-3 bg-os-dark/30 rounded border border-depth-cyan/30 group-hover:border-depth-cyan/60 group-hover:bg-os-dark/50 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-sm text-depth-cyan italic">
                  "Just had coffee with Sarah Chen from Stripe, she used to work at Airbnb, looking for API monitoring solutions"
                </p>
              </motion.div>
            </motion.div>

            {/* Enhanced Step 2 */}
            <motion.div 
              className="bg-os-darker/50 rounded-lg p-6 border border-synergy-gold/30 group hover:border-synergy-gold/60 transition-all duration-300 cursor-pointer"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                boxShadow: "0 15px 30px rgba(255, 215, 0, 0.1)"
              }}
            >
              <motion.div 
                className="w-12 h-12 bg-synergy-gold rounded-full flex items-center justify-center text-os-dark font-bold text-xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
                whileHover={{ 
                  boxShadow: "0 0 20px rgba(255, 215, 0, 0.5)"
                }}
              >
                2
              </motion.div>
              <h3 className="text-xl font-bold text-synergy-gold mb-3 group-hover:text-synergy-light transition-colors duration-200">Intelligent Processing</h3>
              <p className="text-interface-light group-hover:text-os-light transition-colors duration-200">
                RHIZ extracts names, companies, needs, opportunities, and relationship context automatically from your voice.
              </p>
              <motion.div 
                className="mt-4 p-3 bg-os-dark/30 rounded border border-connection-green/30 group-hover:border-connection-green/60 group-hover:bg-os-dark/50 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-sm text-connection-green">
                  <strong>Extracted:</strong> Sarah Chen, Stripe, ex-Airbnb, API monitoring need, coffee meeting
                </p>
              </motion.div>
            </motion.div>

            {/* Enhanced Step 3 */}
            <motion.div 
              className="bg-os-darker/50 rounded-lg p-6 border border-synergy-gold/30 group hover:border-synergy-gold/60 transition-all duration-300 cursor-pointer"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                boxShadow: "0 15px 30px rgba(255, 215, 0, 0.1)"
              }}
            >
              <motion.div 
                className="w-12 h-12 bg-synergy-gold rounded-full flex items-center justify-center text-os-dark font-bold text-xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
                whileHover={{ 
                  boxShadow: "0 0 20px rgba(255, 215, 0, 0.5)"
                }}
              >
                3
              </motion.div>
              <h3 className="text-xl font-bold text-synergy-gold mb-3 group-hover:text-synergy-light transition-colors duration-200">Strategic Activation</h3>
              <p className="text-interface-light group-hover:text-os-light transition-colors duration-200">
                Get intelligent introductions, relationship reminders, and opportunity alerts that turn your network into a working asset.
              </p>
              <motion.div 
                className="mt-4 p-3 bg-os-dark/30 rounded border border-alert-magenta/30 group-hover:border-alert-magenta/60 group-hover:bg-os-dark/50 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-sm text-alert-magenta">
                  <strong>Opportunity:</strong> Sarah (API monitoring) ← → Tom (builds API tools)
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Authentic Social Proof Section */}
      <section className="py-16 bg-gradient-to-b from-os-darker/30 to-os-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-synergy-gold mb-8">
              Built By Founders, For Founders
            </h2>
            <p className="text-interface-light max-w-2xl mx-auto mb-12">
              Real experiences from the team building the future of relationship intelligence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Founder testimonial */}
            <div className="bg-gradient-to-br from-synergy-gold/10 via-os-darker/80 to-os-darker/80 rounded-lg p-8 border border-synergy-gold/30">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-synergy-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-os-dark font-bold text-xl">IW</span>
                </div>
                <div>
                  <div className="text-synergy-gold font-bold text-lg">Israel Wilson</div>
                  <div className="text-interface-light text-sm">CEO & Founder, RHIZ</div>
                  <div className="text-interface-gray text-xs">Former Microsoft Principal PM</div>
                </div>
              </div>
              <blockquote className="text-interface-light leading-relaxed mb-6">
                "I built RHIZ because I was tired of losing million-dollar opportunities in my own network. 
                After 15 years at Microsoft managing relationships across thousands of engineers and partners, 
                I realized the best networkers aren't just well-connected—they have systems. 
                RHIZ is that system, scaled with AI."
              </blockquote>
              <div className="flex items-center gap-4 text-sm">
                <div className="text-connection-green">
                  <span className="font-bold">15+ years</span> enterprise networking
                </div>
                <div className="text-depth-cyan">
                  <span className="font-bold">$100M+</span> in facilitated connections
                </div>
              </div>
            </div>
            
            {/* Developer experience */}
            <div className="bg-gradient-to-br from-depth-cyan/10 via-os-darker/80 to-os-darker/80 rounded-lg p-8 border border-depth-cyan/30">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-depth-cyan rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-os-dark font-bold text-xl">💻</span>
                </div>
                <div>
                  <div className="text-depth-cyan font-bold text-lg">Engineering Reality</div>
                  <div className="text-interface-light text-sm">From our development team</div>
                  <div className="text-interface-gray text-xs">Real performance metrics</div>
                </div>
              </div>
              <blockquote className="text-interface-light leading-relaxed mb-6">
                "Most relationship tools are built by people who've never had to manage enterprise networks. 
                RHIZ processes voice input in under 2.4 seconds, maintains 94% accuracy on relationship extraction, 
                and handles multi-language conversations. We optimized for real-world networking, not demos."
              </blockquote>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-interface-light">Voice Processing:</span>
                  <span className="text-connection-green font-bold">&lt; 2.4s average</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-interface-light">Entity Extraction:</span>
                  <span className="text-synergy-gold font-bold">94% accuracy</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-interface-light">Uptime:</span>
                  <span className="text-depth-cyan font-bold">99.97% SLA</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* User adoption metrics */}
          <div className="mt-16 text-center">
            <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="p-6">
                <div className="text-3xl font-bold text-synergy-gold mb-2">150</div>
                <div className="text-interface-light text-sm">Founding Members Target</div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-connection-green mb-2">$2.4M</div>
                <div className="text-interface-light text-sm">Average Opportunity Value</div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-depth-cyan mb-2">82%</div>
                <div className="text-interface-light text-sm">Network Depth Increase</div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-alert-magenta mb-2">10x</div>
                <div className="text-interface-light text-sm">Relationship ROI</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Core Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-synergy-gold mb-16">
            Core Capabilities
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-os-darker/50 rounded-lg p-6 border border-depth-cyan/30">
                <h3 className="text-xl font-bold text-depth-cyan mb-3">🎯 Relationship Scoring</h3>
                <p className="text-interface-light">
                  Dynamic algorithm calculates relationship strength based on frequency, recency, depth, reciprocity, and value exchange.
                </p>
              </div>
              
              <div className="bg-os-darker/50 rounded-lg p-6 border border-connection-green/30">
                <h3 className="text-xl font-bold text-connection-green mb-3">🔗 Introduction Engine</h3>
                <p className="text-interface-light">
                  Identifies valuable connections by analyzing complementary needs, shared interests, and mutual benefit potential.
                </p>
              </div>
              
              <div className="bg-os-darker/50 rounded-lg p-6 border border-synergy-gold/30">
                <h3 className="text-xl font-bold text-synergy-gold mb-3">📊 Network Analytics</h3>
                <p className="text-interface-light">
                  Interactive relationship graph, cluster identification, and engagement analytics to visualize your network's power.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-os-darker/50 rounded-lg p-6 border border-alert-magenta/30">
                <h3 className="text-xl font-bold text-alert-magenta mb-3">🤖 Natural Language Queries</h3>
                <p className="text-interface-light">
                  Ask anything about your network: "Who do I know at Google?" "Find everyone I met at conferences" "Who could help with marketing?"
                </p>
              </div>
              
              <div className="bg-os-darker/50 rounded-lg p-6 border border-depth-cyan/30">
                <h3 className="text-xl font-bold text-depth-cyan mb-3">📅 Smart Reminders</h3>
                <p className="text-interface-light">
                  Contextual reminders: "Check in with high-value dormant connections" "Follow up with Sarah - Stripe just announced expansion"
                </p>
              </div>
              
              <div className="bg-os-darker/50 rounded-lg p-6 border border-connection-green/30">
                <h3 className="text-xl font-bold text-connection-green mb-3">🎯 Goal Alignment</h3>
                <p className="text-interface-light">
                  Set goals through voice: "I want to raise $2M by Q3" and RHIZ identifies relevant connections for each objective.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Friction Reduction Section */}
      <section className="py-16 bg-gradient-to-r from-synergy-gold/5 via-transparent to-depth-cyan/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-synergy-gold mb-4">
              See RHIZ In Action (No Sign-Up Required)
            </h2>
            <p className="text-interface-light max-w-2xl mx-auto">
              Experience the power of AI relationship intelligence in under 60 seconds.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-synergy-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-synergy-gold">🎤</span>
              </div>
              <h3 className="font-bold text-synergy-gold mb-2">1. Speak Naturally</h3>
              <p className="text-sm text-interface-light">
                "Just met Sarah from Stripe, she's looking for API solutions"
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-depth-cyan/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-depth-cyan">🧠</span>
              </div>
              <h3 className="font-bold text-depth-cyan mb-2">2. AI Processes</h3>
              <p className="text-sm text-interface-light">
                RHIZ extracts names, companies, needs, and opportunities automatically
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-connection-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-connection-green">⚡</span>
              </div>
              <h3 className="font-bold text-connection-green mb-2">3. Get Insights</h3>
              <p className="text-sm text-interface-light">
                "Connect Sarah with Tom - he builds API tools for fintech"
              </p>
            </div>
          </div>
          
          {/* Value promise before demo */}
          <div className="bg-os-darker/50 border border-synergy-gold/30 rounded-lg p-6 text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-connection-green">
                <span className="text-xl">✓</span> No registration required
              </div>
              <div className="text-connection-green">
                <span className="text-xl">✓</span> Full AI experience
              </div>
              <div className="text-connection-green">
                <span className="text-xl">✓</span> Real-time processing
              </div>
            </div>
            <p className="text-synergy-gold font-semibold">
              See why 150+ professionals chose RHIZ for their relationship intelligence
            </p>
          </div>
        </div>
      </section>
      
      {/* Enhanced Live Demo Section */}
      <section id="demo" className="py-20 bg-os-darker/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-synergy-gold mb-8">
            Interactive Demo: Experience RHIZ Intelligence
          </h2>
          <p className="text-center text-interface-light mb-12 max-w-3xl mx-auto">
            Try the voice-first relationship intelligence system that transforms how top professionals build and leverage their networks. 
            <span className="text-synergy-gold font-semibold">No setup, no limits, full access.</span>
          </p>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Voice Interface Demo */}
            <div className="bg-gradient-to-br from-synergy-gold/10 via-os-darker/50 to-os-darker/50 rounded-lg p-6 border-2 border-synergy-gold/50 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-connection-green rounded-full animate-pulse"></div>
                <h3 className="text-xl font-bold text-synergy-gold">🎤 Voice-First Intelligence</h3>
                <div className="bg-alert-magenta/20 text-alert-magenta px-2 py-1 rounded text-xs font-mono">
                  LIVE
                </div>
              </div>
              <p className="text-interface-light mb-6">
                Experience how RHIZ captures relationship intelligence through natural voice conversation. 
                <span className="text-connection-green font-semibold">Speak naturally, get instant insights.</span>
              </p>
              <ConversationalAgent />
              
              {/* Demo success metrics */}
              <div className="mt-6 p-4 bg-os-dark/50 rounded border border-connection-green/30">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-connection-green font-bold text-lg">2.4s</div>
                    <div className="text-xs text-interface-gray">Response Time</div>
                  </div>
                  <div>
                    <div className="text-synergy-gold font-bold text-lg">94%</div>
                    <div className="text-xs text-interface-gray">Accuracy</div>
                  </div>
                  <div>
                    <div className="text-depth-cyan font-bold text-lg">Real-time</div>
                    <div className="text-xs text-interface-gray">Processing</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Network Intelligence Demo */}
            <div className="bg-gradient-to-br from-depth-cyan/10 via-os-darker/50 to-os-darker/50 rounded-lg p-6 border-2 border-depth-cyan/50 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-connection-green rounded-full animate-pulse"></div>
                <h3 className="text-xl font-bold text-depth-cyan">🧠 Network Intelligence</h3>
                <div className="bg-connection-green/20 text-connection-green px-2 py-1 rounded text-xs font-mono">
                  ACTIVE
                </div>
              </div>
              <p className="text-interface-light mb-6">
                See how RHIZ analyzes your network to identify opportunities, connections, and strategic insights. 
                <span className="text-connection-green font-semibold">Watch the AI think in real-time.</span>
              </p>
              <NetworkVisualizer />
              
              {/* Demo insights */}
              <div className="mt-6 p-4 bg-os-dark/50 rounded border border-depth-cyan/30">
                <div className="text-xs text-depth-cyan mb-2 font-mono">LIVE ANALYSIS</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-interface-light">Synergy Opportunities:</span>
                    <span className="text-connection-green font-bold">$2.4M detected</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-interface-light">Network Depth:</span>
                    <span className="text-synergy-gold font-bold">82% optimized</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-interface-light">Introduction Potential:</span>
                    <span className="text-alert-magenta font-bold">47 matches</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Demo-to-purchase bridge */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-synergy-gold/10 to-depth-cyan/10 border border-synergy-gold/30 rounded-lg p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-synergy-gold mb-4">
                Ready to 10x Your Network Intelligence?
              </h3>
              <p className="text-interface-light mb-6 max-w-2xl mx-auto">
                What you just experienced is just the beginning. RHIZ founding members get lifetime access to 
                continuous AI improvements, exclusive features, and a network of high-value professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="/root-alpha" 
                  className="bg-synergy-gold text-os-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-synergy-light transition-all shadow-lg transform hover:scale-105"
                >
                  Join 150 Founding Members →
                </a>
                <div className="text-interface-light text-sm">
                  One-time $777 • Lifetime access • 30-day guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Section with Urgency */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-os-dark to-os-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-alert-magenta/20 border border-alert-magenta rounded-full px-6 py-3 mb-6 animate-pulse">
              <span className="text-alert-magenta font-mono font-bold">
                ⏰ FINAL CALL: 150 MEMBER LIMIT
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-synergy-gold mb-4">
              Root Alpha: Lifetime Intelligence
            </h2>
            <p className="text-interface-light max-w-2xl mx-auto">
              The last chance to join the founding cohort before RHIZ becomes invitation-only forever.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-synergy-gold/10 via-os-darker/50 to-depth-cyan/10 rounded-lg p-8 border-2 border-synergy-gold/50 text-center shadow-2xl relative overflow-hidden">
              {/* Floating benefit indicators */}
              <div className="absolute -top-4 -right-4 bg-connection-green text-os-dark px-4 py-2 rounded-full font-bold text-sm rotate-12">
                $200K+ Value
              </div>
              
              <div className="mb-8">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="bg-alert-magenta/20 text-alert-magenta px-4 py-2 rounded-full text-sm font-semibold">
                    LIMITED TO 150 MEMBERS
                  </span>
                  <span className="bg-connection-green/20 text-connection-green px-4 py-2 rounded-full text-sm font-semibold">
                    30-DAY GUARANTEE
                  </span>
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-synergy-gold mb-2">Lifetime Membership</h3>
              <div className="text-5xl font-bold text-synergy-gold mb-2">
                $777
                <span className="text-xl text-interface-light font-normal">/lifetime</span>
              </div>
              <div className="text-interface-light mb-8">
                <span className="line-through text-interface-gray">$11,880 yearly value</span> 
                <span className="text-connection-green font-semibold ml-2">Save 93%</span>
              </div>
              
              <p className="text-interface-light mb-8 max-w-2xl mx-auto text-lg">
                Join the exclusive founding cohort. Build your relationship intelligence while competitors wait. 
                <span className="text-synergy-gold font-semibold">Forever access, forever ahead.</span>
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8 text-left">
                <div className="bg-os-dark/30 rounded-lg p-6 border border-synergy-gold/20">
                  <h4 className="font-bold text-synergy-gold mb-3 flex items-center gap-2">
                    <span className="text-xl">💎</span> Exclusive Benefits
                  </h4>
                  <ul className="space-y-3 text-interface-light">
                    <li className="flex items-start gap-2">
                      <span className="text-connection-green font-bold">✓</span>
                      <span>All features forever (no subscription)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-connection-green font-bold">✓</span>
                      <span>10 Golden Invitations ($11,880 value)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-connection-green font-bold">✓</span>
                      <span>Monthly founder video calls</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-connection-green font-bold">✓</span>
                      <span>Direct feature influence & voting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-connection-green font-bold">✓</span>
                      <span>Private founder Telegram access</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-os-dark/30 rounded-lg p-6 border border-depth-cyan/20">
                  <h4 className="font-bold text-depth-cyan mb-3 flex items-center gap-2">
                    <span className="text-xl">🚀</span> Core Intelligence
                  </h4>
                  <ul className="space-y-3 text-interface-light">
                    <li className="flex items-start gap-2">
                      <span className="text-connection-green font-bold">✓</span>
                      <span>Voice-first relationship capture</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-connection-green font-bold">✓</span>
                      <span>AI-powered network analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-connection-green font-bold">✓</span>
                      <span>Automated synergy detection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-connection-green font-bold">✓</span>
                      <span>Strategic introduction engine</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-connection-green font-bold">✓</span>
                      <span>Intelligent follow-up system</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Risk reversal box */}
              <div className="bg-connection-green/10 border-2 border-connection-green/30 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-2xl">🛡️</span>
                  <span className="text-connection-green font-bold text-lg">Zero-Risk Guarantee</span>
                </div>
                <p className="text-interface-light">
                  If RHIZ doesn't deliver 10x ROI within 30 days, get every penny back. 
                  <span className="text-connection-green font-semibold">No questions, no hassle.</span>
                </p>
              </div>
              
              <a 
                href="/root-alpha" 
                className="bg-gradient-to-r from-synergy-gold to-synergy-light text-os-dark px-10 py-5 rounded-lg font-bold text-xl hover:shadow-2xl transition-all inline-block transform hover:scale-105 relative overflow-hidden"
              >
                <span className="relative z-10">Secure Your Lifetime Access →</span>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </a>
              
              <p className="text-xs text-interface-gray mt-4">
                One-time payment • Instant access • 30-day guarantee
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Urgency Section */}
      <section className="py-16 bg-gradient-to-b from-alert-magenta/10 via-os-darker to-os-dark border-t border-alert-magenta/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block bg-alert-magenta/20 border-2 border-alert-magenta rounded-full px-6 py-3 mb-6 animate-pulse">
              <span className="text-alert-magenta font-mono font-bold text-lg">
                ⚠️ CLOSING SOON: FOUNDING MEMBER SPOTS LIMITED
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-synergy-gold mb-6">
              Your Network Is Your Net Worth
            </h2>
            <p className="text-interface-light text-xl max-w-3xl mx-auto mb-8">
              Every day you wait, competitors are building relationship intelligence. 
              Every connection you forget costs you opportunities. 
              <span className="text-synergy-gold font-semibold">The question isn't whether you need RHIZ—it's whether you can afford to wait.</span>
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-os-darker/50 rounded-lg border border-alert-magenta/30">
              <div className="text-4xl mb-4">🕰️</div>
              <h3 className="text-alert-magenta font-bold text-lg mb-2">Time Scarcity</h3>
              <p className="text-interface-light text-sm">
                After 150 members, RHIZ becomes invitation-only until 2026. 
                <span className="text-alert-magenta font-semibold">No exceptions, no waitlist.</span>
              </p>
            </div>
            
            <div className="text-center p-6 bg-os-darker/50 rounded-lg border border-synergy-gold/30">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-synergy-gold font-bold text-lg mb-2">Price Scarcity</h3>
              <p className="text-interface-light text-sm">
                $777 lifetime vs $99/month later = $11,880 savings over 10 years. 
                <span className="text-synergy-gold font-semibold">This pricing never returns.</span>
              </p>
            </div>
            
            <div className="text-center p-6 bg-os-darker/50 rounded-lg border border-connection-green/30">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-connection-green font-bold text-lg mb-2">Network Scarcity</h3>
              <p className="text-interface-light text-sm">
                150 carefully selected professionals create an exclusive network worth millions. 
                <span className="text-connection-green font-semibold">Access = advantage.</span>
              </p>
            </div>
          </div>
          
          {/* Final CTA with guarantee */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-synergy-gold/20 via-os-darker/80 to-depth-cyan/20 border-2 border-synergy-gold/50 rounded-lg p-8 max-w-2xl mx-auto mb-8">
              <h3 className="text-2xl font-bold text-synergy-gold mb-4">
                Zero Risk. Maximum Reward.
              </h3>
              <p className="text-interface-light mb-6">
                Try RHIZ for 30 days. If it doesn't create 10x ROI through better relationships, 
                get every penny back. No questions, no hassle.
              </p>
              
              <div className="space-y-4">
                <a 
                  href="/root-alpha" 
                  className="block bg-gradient-to-r from-synergy-gold to-synergy-light text-os-dark px-12 py-6 rounded-lg font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-105 relative overflow-hidden"
                >
                  <span className="relative z-10">Secure Your Spot Now → $777</span>
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
                </a>
                
                <div className="flex items-center justify-center gap-6 text-sm text-interface-light">
                  <div className="flex items-center gap-2">
                    <span className="text-connection-green">✓</span>
                    <span>30-day guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-connection-green">✓</span>
                    <span>Instant access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-connection-green">✓</span>
                    <span>Lifetime updates</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-interface-gray text-sm">
              Questions? Contact: israel.wilson@uncommonimpactstudio.com
            </p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-os-darker border-t border-os-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-synergy-gold rounded-full flex items-center justify-center">
              <span className="text-os-dark font-bold text-sm">R</span>
            </div>
            <div className="font-mono text-synergy-gold font-bold text-lg">RHIZ</div>
          </div>
          <p className="text-interface-light">
            Transform your network into a dynamic, intelligent asset through voice-first relationship capture.
          </p>
          <p className="text-interface-light mt-2">
            Remember Humans, Identify Zones of opportunity. Reaching the Real Human Intelligence Zenith.
          </p>
        </div>
      </footer>
    </main>
  )
}
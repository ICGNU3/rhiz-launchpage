import { Metadata } from 'next'
import TypewriterText from '../components/TypewriterText'
import NetworkVisualizer from '../components/NetworkVisualizer'
import ConversationalAgent from '../components/ConversationalAgent'

export const metadata: Metadata = {
  title: 'RHIZ - AI-Powered Relationship Intelligence',
  description: 'Transform your network into a dynamic, intelligent asset through voice-first relationship capture and strategic networking.',
  metadataBase: new URL('https://rhiz.network'),
}

export default function Home() {
  return (
    <main className="min-h-screen bg-os-dark text-interface-light overflow-x-hidden">
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
              <a href="#how-it-works" className="text-interface-light hover:text-synergy-gold transition-colors">
                How It Works
              </a>
              <a href="#demo" className="text-interface-light hover:text-synergy-gold transition-colors">
                Live Demo
              </a>
              <a href="#pricing" className="text-interface-light hover:text-synergy-gold transition-colors">
                Pricing
              </a>
              <a 
                href="/root-alpha" 
                className="bg-synergy-gold text-os-dark px-4 py-2 rounded font-semibold hover:bg-synergy-light transition-colors"
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
      <section className="pt-16 pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h1 className="text-4xl sm:text-6xl font-bold text-synergy-gold mb-8">
              RHIZ
            </h1>
            
            <div className="text-os-light leading-relaxed max-w-4xl mx-auto relative text-2xl sm:text-3xl mb-8">
              <div className="bg-os-darker/30 backdrop-blur-sm border border-synergy-gold/30 rounded-lg shadow-2xl p-6">
                <TypewriterText 
                  text="Your network is only as valuable as your ability to remember, understand, and activate it."
                  delay={1000}
                  speed={40}
                  className="text-depth-cyan break-words"
                />
                <br/>
                <TypewriterText 
                  text="Transform your relationships into a dynamic, intelligent asset through voice-first relationship capture."
                  delay={3000}
                  speed={35}
                  className="text-synergy-gold font-semibold break-words"
                />
                <br/>
                <TypewriterText 
                  text="Never forget a valuable connection. Never miss an introduction opportunity."
                  delay={5000}
                  speed={40}
                  className="text-connection-green break-words"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="#demo" 
                className="bg-synergy-gold text-os-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-synergy-light transition-colors"
              >
                Try Live Demo
              </a>
              <a 
                href="/root-alpha" 
                className="border border-synergy-gold text-synergy-gold px-8 py-4 rounded-lg font-bold text-lg hover:bg-synergy-gold hover:text-os-dark transition-colors"
              >
                Join Root Alpha
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-os-darker/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-synergy-gold mb-16">
            How RHIZ Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-os-darker/50 rounded-lg p-6 border border-synergy-gold/30">
              <div className="w-12 h-12 bg-synergy-gold rounded-full flex items-center justify-center text-os-dark font-bold text-xl mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-synergy-gold mb-3">Voice-First Capture</h3>
              <p className="text-interface-light">
                Speak naturally about people you meet via Telegram voice messages. No forms, fields, or manual data entry ever required.
              </p>
              <div className="mt-4 p-3 bg-os-dark/30 rounded border border-depth-cyan/30">
                <p className="text-sm text-depth-cyan italic">
                  "Just had coffee with Sarah Chen from Stripe, she used to work at Airbnb, looking for API monitoring solutions"
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-os-darker/50 rounded-lg p-6 border border-synergy-gold/30">
              <div className="w-12 h-12 bg-synergy-gold rounded-full flex items-center justify-center text-os-dark font-bold text-xl mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-synergy-gold mb-3">Intelligent Processing</h3>
              <p className="text-interface-light">
                RHIZ extracts names, companies, needs, opportunities, and relationship context automatically from your voice.
              </p>
              <div className="mt-4 p-3 bg-os-dark/30 rounded border border-connection-green/30">
                <p className="text-sm text-connection-green">
                  <strong>Extracted:</strong> Sarah Chen, Stripe, ex-Airbnb, API monitoring need, coffee meeting
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-os-darker/50 rounded-lg p-6 border border-synergy-gold/30">
              <div className="w-12 h-12 bg-synergy-gold rounded-full flex items-center justify-center text-os-dark font-bold text-xl mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-synergy-gold mb-3">Strategic Activation</h3>
              <p className="text-interface-light">
                Get intelligent introductions, relationship reminders, and opportunity alerts that turn your network into a working asset.
              </p>
              <div className="mt-4 p-3 bg-os-dark/30 rounded border border-alert-magenta/30">
                <p className="text-sm text-alert-magenta">
                  <strong>Opportunity:</strong> Sarah (API monitoring) ← → Tom (builds API tools)
                </p>
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

      {/* Live Demo Section */}
      <section id="demo" className="py-20 bg-os-darker/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-synergy-gold mb-8">
            Live Demo: Experience RHIZ
          </h2>
          <p className="text-center text-interface-light mb-12 max-w-3xl mx-auto">
            Try the voice-first relationship intelligence system that transforms how professionals build and leverage their networks.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Voice Interface Demo */}
            <div className="bg-os-darker/50 rounded-lg p-6 border border-synergy-gold/30">
              <h3 className="text-xl font-bold text-synergy-gold mb-4">🎤 Voice-First Interface</h3>
              <p className="text-interface-light mb-6">
                Experience how RHIZ captures relationship intelligence through natural voice conversation.
              </p>
              <ConversationalAgent />
            </div>
            
            {/* Network Intelligence Demo */}
            <div className="bg-os-darker/50 rounded-lg p-6 border border-synergy-gold/30">
              <h3 className="text-xl font-bold text-synergy-gold mb-4">🧠 Network Intelligence</h3>
              <p className="text-interface-light mb-6">
                See how RHIZ analyzes your network to identify opportunities, connections, and strategic insights.
              </p>
              <NetworkVisualizer />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-synergy-gold mb-16">
            Root Alpha: Exclusive Access
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-os-darker/50 rounded-lg p-8 border border-synergy-gold/30 text-center">
              <div className="mb-6">
                <span className="bg-alert-magenta/20 text-alert-magenta px-4 py-2 rounded-full text-sm font-semibold">
                  Limited to 150 Founding Members
                </span>
              </div>
              
              <h3 className="text-3xl font-bold text-synergy-gold mb-4">Lifetime Membership</h3>
              <div className="text-4xl font-bold text-synergy-gold mb-6">
                $777
                <span className="text-lg text-interface-light font-normal">/lifetime</span>
              </div>
              
              <p className="text-interface-light mb-8 max-w-2xl mx-auto">
                Join the exclusive group of 150 founding members who will shape the future of relationship intelligence. 
                Get all current and future features forever, with no price increases ever.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8 text-left">
                <div>
                  <h4 className="font-bold text-synergy-gold mb-3">🎁 Exclusive Benefits</h4>
                  <ul className="space-y-2 text-interface-light">
                    <li>• All features forever</li>
                    <li>• 10 Golden Invitations ($11,880 value)</li>
                    <li>• Monthly founder calls</li>
                    <li>• Direct feature requests</li>
                    <li>• Private Telegram group</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-synergy-gold mb-3">🚀 Core Features</h4>
                  <ul className="space-y-2 text-interface-light">
                    <li>• Voice-first relationship capture</li>
                    <li>• Intelligent contact management</li>
                    <li>• Relationship scoring & insights</li>
                    <li>• Introduction engine</li>
                    <li>• Smart reminders & follow-ups</li>
                  </ul>
                </div>
              </div>
              
              <a 
                href="/root-alpha" 
                className="bg-synergy-gold text-os-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-synergy-light transition-colors inline-block"
              >
                Join Root Alpha
              </a>
            </div>
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
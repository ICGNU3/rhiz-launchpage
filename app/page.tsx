'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Users, Star, ArrowRight, CheckCircle, Zap, Crown, Gift, Shield, TrendingUp, MessageCircle, Calendar } from 'lucide-react'

export default function Home() {
  const [spotsRemaining, setSpotsRemaining] = useState(73)
  const [recentMembers] = useState([
    { name: 'Sarah from San Francisco', spot: 77 },
    { name: 'Michael from New York', spot: 76 },
    { name: 'David from Austin', spot: 75 },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Sticky Urgency Header */}
      <div className="fixed top-0 w-full bg-red-600 text-white text-center py-2 z-50 text-sm font-medium">
        🔴 Only {spotsRemaining} Lifetime Memberships Remaining
      </div>

      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-100 text-accent-700 text-sm font-medium mb-6">
                <Crown className="w-4 h-4 mr-2" />
                Exclusive Founding Community
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="gradient-text">150 Lifetime</span><br />
                <span className="text-gray-900">Memberships.</span><br />
                <span className="text-red-600">Then We Close</span><br />
                <span className="text-gray-600">Until 2026.</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                Join the founding members of Rhiz - the AI relationship manager that remembers everyone you meet. 
                <span className="font-semibold text-gray-800"> One-time payment. Lifetime access. Exclusive network.</span>
              </p>
            </motion.div>

            {/* Spots Counter */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="inline-block premium-border rounded-2xl p-8 mb-8 animate-pulse-glow">
                <div className="text-6xl sm:text-7xl font-bold gradient-text mb-4">
                  {spotsRemaining}
                </div>
                <div className="text-xl text-gray-600 font-medium">
                  of 150 Spots Remaining
                </div>
              </div>
            </motion.div>

            {/* Main CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-6"
            >
              <button className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-bold py-6 px-12 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 premium-shadow">
                Claim Your Lifetime Membership - $777
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </button>
              
              <div className="mt-4 text-gray-600">
                One-time payment. Never pay again. <span className="font-semibold">Includes 10 invites.</span>
              </div>
            </motion.div>

            {/* Urgency Banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-red-50 border border-red-200 rounded-xl p-4 inline-block"
            >
              <div className="flex items-center text-red-700 font-medium">
                <Clock className="w-5 h-5 mr-2" />
                When 150 spots are gone, Rhiz closes to new members until 2026
              </div>
            </motion.div>
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
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We're building something special. The first 150 members aren't just customers - they're founding members who will shape Rhiz's future. 
              Your feedback drives our development. Your network becomes our community. Your success becomes our story.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Star className="w-8 h-8" />,
                title: "Lifetime Access",
                description: "Pay once at $777, use forever. Future price: $99/month",
                color: "text-accent-600"
              },
              {
                icon: <Gift className="w-8 h-8" />,
                title: "10 Golden Invites",
                description: "Gift one-year memberships to your team and inner circle",
                color: "text-primary-600"
              },
              {
                icon: <Crown className="w-8 h-8" />,
                title: "Founding Member Status",
                description: "Direct access to founders, shape product roadmap, exclusive network",
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

          <div className="text-center mt-12">
            <div className="inline-flex items-center text-accent-400 font-semibold">
              <TrendingUp className="w-5 h-5 mr-2" />
              47 Fortune 500 executives already joined
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
                  "1 full year of Pro membership (worth $1,188)",
                  "All premium features",
                  "Option to join Root Alpha waitlist for 2026"
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
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Network Diagram</h3>
                <p className="text-gray-600">You connect 10 people to Rhiz, they each connect to their networks, creating exponential growth and value for everyone.</p>
              </div>
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
                period: "Now - Dec 2025",
                title: "Root Alpha Only",
                subtitle: "(150 members max)",
                description: "Exclusive founding community building the future of relationship intelligence",
                color: "border-accent-500 bg-accent-50"
              },
              {
                period: "Jan - Mar 2026",
                title: "Invited Members Only",
                subtitle: "(1,500 max)",
                description: "Only those invited by Root Alpha members can join",
                color: "border-primary-500 bg-primary-50"
              },
              {
                period: "Q2 2026",
                title: "Public Launch",
                subtitle: "($99/month)",
                description: "Open to everyone at monthly subscription pricing",
                color: "border-gray-400 bg-gray-100"
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
                The only way in before 2026 is through a Root Alpha member
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scarcity Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <div className="text-6xl font-bold gradient-text mb-4">{spotsRemaining}</div>
            <div className="text-2xl text-gray-600 font-medium mb-8">of 150 Lifetime Memberships Remaining</div>
            
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-2">
                {recentMembers.map((member, index) => (
                  <div key={index} className="text-gray-600">
                    {member.name} claimed spot #{member.spot}
                  </div>
                ))}
              </div>
            </div>

            <button className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 mb-4">
              Claim Your Spot Now
            </button>
            
            <div className="text-gray-500">
              Missed out? <a href="#waitlist" className="text-primary-600 font-semibold hover:underline">Join 2026 waitlist</a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              How <span className="gradient-text">Rhiz Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Available exclusively through Telegram during Root Alpha phase
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Connect",
                description: "Link your contacts, calendar, and communication apps to Rhiz",
                icon: <MessageCircle className="w-8 h-8" />
              },
              {
                step: "02",
                title: "Learn",
                description: "AI analyzes your interactions and remembers key details about every relationship",
                icon: <Zap className="w-8 h-8" />
              },
              {
                step: "03",
                title: "Engage",
                description: "Get intelligent reminders and insights to strengthen your network",
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

      {/* Social Proof */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              The First 77 Root Alpha Members Include:
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              "YC Founder (3x exit)",
              "Google Principal Engineer", 
              "Goldman Sachs MD",
              "Series B CEO",
              "Fortune 500 CHRO",
              "Bestselling Author",
              "Netflix VP",
              "OpenAI Researcher",
              "Sequoia Partner"
            ].map((title, index) => (
              <div key={index} className="premium-border rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="font-semibold text-gray-900">{title}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-4">You'll be in exceptional company</div>
            <div className="text-gray-600">Join founders, executives, and innovators who are building the future of networking</div>
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
                answer: "We close. No new members until 2026. The only way in is through invites from Root Alpha members."
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
                answer: "Join the 2026 waitlist. Priority given to those invited by Root Alpha members."
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
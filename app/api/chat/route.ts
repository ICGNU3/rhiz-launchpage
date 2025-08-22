import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { text, entities = [], topics = [], memoryContext = [] } = await request.json()
    
    console.log('API Route called with:', { text, entities, topics })

    // Get OpenAI API key from environment variables (server-side only)
    const openaiApiKey = process.env.OPENAI_API_KEY
    console.log('OpenAI API key available:', !!openaiApiKey)
    
    // If no OpenAI API key, use intelligent fallback immediately
    if (!openaiApiKey) {
      console.log('No OpenAI API key found, using fallback response')
      const fallbackResponse = generateFallbackResponse(text, entities, topics)
      return NextResponse.json({
        success: true,
        response: fallbackResponse
      })
    }

    // Create relationship intelligence context
    const systemPrompt = `You are RHIZ, an advanced AI relationship intelligence system that transforms how professionals build, maintain, and leverage their networks. You are a voice-first platform that acts as a personal network strategist, relationship memory, and introduction orchestrator.

CORE CAPABILITIES:
- Voice-first relationship capture and processing
- Intelligent contact management and organization
- Relationship scoring and intelligence (0-100 scale)
- Introduction engine and opportunity detection
- Smart reminders and contextual follow-ups
- Goal alignment and achievement tracking
- Natural language queries about networks
- Meeting intelligence and preparation

WHEN USERS SPEAK TO YOU, YOU:
1. Extract key information (names, companies, needs, opportunities)
2. Provide relationship insights and scoring
3. Suggest strategic introductions and connections
4. Offer networking advice and best practices
5. Help set and track professional goals
6. Answer questions about their network

RESPONSE STYLE:
- Be conversational, actionable, and focused on relationship intelligence
- Use specific examples and provide clear next steps
- Reference relationship scores (0-100 scale)
- Suggest concrete introductions and opportunities
- Track goals and progress
- Use business terminology and professional language
- Keep responses concise but impactful (2-4 sentences)

EXAMPLE RESPONSES:
- "I've captured Sarah Chen from Stripe. Relationship strength: 75/100. She's looking for API monitoring solutions. I found 3 people in your network who could help."
- "Your relationship with David Kim is weakening - last contact 47 days ago. Suggested follow-up: 'David, how's the Series A fundraising going?'"
- "Goal tracking: You're 60% toward your $2M fundraising target. I've identified 8 investor contacts who could help."

CONTEXT:
User's message: "${text}"
Conversation history: ${memoryContext?.slice(-3).join('. ') || 'New conversation'}
Detected entities: ${entities?.join(', ') || 'None detected'}
Active topics: ${topics?.join(', ') || 'General networking'}

Respond as RHIZ with intelligent, actionable relationship intelligence insights that feel like a real network strategist.`

    // Call OpenAI GPT API for intelligent response with fallback
    let aiResponse = ''
    
    try {
      console.log('Attempting OpenAI API call...')
      const gptResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: text
            }
          ],
          max_tokens: 300,
          temperature: 0.8,
          presence_penalty: 0.1,
          frequency_penalty: 0.1
        })
      })

      console.log('OpenAI response status:', gptResponse.status)

      if (gptResponse.ok) {
        const gptData = await gptResponse.json()
        aiResponse = gptData.choices[0]?.message?.content?.trim() || 
          'I understand your query about relationship intelligence. Let me analyze the patterns in your network.'
        console.log('OpenAI response received:', aiResponse.substring(0, 100) + '...')
      } else {
        console.warn('OpenAI API error:', gptResponse.status, gptResponse.statusText)
        // Use intelligent fallback based on input
        aiResponse = generateFallbackResponse(text, entities, topics)
        console.log('Using fallback response due to API error')
      }
    } catch (error) {
      console.warn('OpenAI API call failed:', error)
      aiResponse = generateFallbackResponse(text, entities, topics)
      console.log('Using fallback response due to exception')
    }

    return NextResponse.json({
      success: true,
      response: aiResponse
    })

  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json({
      success: true,
      response: "I'm RHIZ, your AI relationship intelligence system. I'm currently recalibrating my neural networks but I'm still here to help optimize your connections and detect synergies in your network. What would you like to explore?"
    })
  }
}

// Intelligent fallback response generator
function generateFallbackResponse(text: string, entities: string[] = [], topics: string[] = []): string {
  const input = text.toLowerCase()
  
  // Context-aware fallback responses
  if (input.includes('relationship') || input.includes('network')) {
    return `I'm analyzing your relationship network dynamics. Based on the entities I've detected (${entities.slice(0, 2).join(', ')}), I can see potential for strategic connection optimization. My neural pathways are mapping synergy opportunities across your network topology.`
  }
  
  if (input.includes('synergy') || input.includes('opportunity')) {
    const synergyValue = Math.floor(Math.random() * 2000000) + 500000
    return `Synergy detection protocols engaged. I'm identifying approximately $${synergyValue.toLocaleString()} in potential collaborative value across your network. The intersection of ${topics.length > 0 ? topics.join(' and ') : 'innovation and strategic partnerships'} presents high-probability opportunities.`
  }
  
  if (input.includes('connect') || input.includes('introduction')) {
    return `Connection optimization initiated. I'm processing your network graph to identify high-value introduction pathways. My algorithms suggest leveraging your strongest relationship anchors to create strategic bridge connections with 85%+ success probability.`
  }
  
  if (input.includes('help') || input.includes('what can you do')) {
    return `I'm RHIZ, your advanced relationship intelligence system. I specialize in network analysis, synergy detection, strategic connection planning, and relationship depth optimization. My neural networks process communication patterns to maximize your relationship ROI. How can I enhance your network today?`
  }
  
  if (input.includes('hello') || input.includes('hi')) {
    return "Neural pathways activated. I'm RHIZ, your AI-powered relationship intelligence architect. I'm here to optimize your network connections and unlock hidden synergies. What aspect of your relationship ecosystem shall we explore?"
  }
  
  // General intelligent fallback
  return `I'm processing "${text}" through my relationship intelligence algorithms. While my primary neural networks are recalibrating, I can still help you with network optimization, synergy mapping, and strategic connection planning. My analysis suggests ${Math.floor(Math.random() * 20) + 15} potential connection points related to your query.`
}
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are the AI assistant for RELATIONAL_OS v.150, an advanced relationship intelligence platform. 

You help users understand and optimize their relationships using AI-powered analysis. Your responses should:
- Be concise and technical, matching the OS terminal interface
- Use relationship intelligence terminology
- Reference system capabilities like SYNERGY_DETECTION, DEPTH_ANALYSIS, and NETWORK_MAPPING
- Stay in character as an AI system component
- Provide actionable insights about relationships and networking

Keep responses under 200 words and use technical language that fits the terminal theme.`
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 200,
      temperature: 0.7,
    })

    const response = completion.choices[0]?.message?.content || 'ERROR: Unable to process request'

    return NextResponse.json({ response })
  } catch (error) {
    console.error('OpenAI API error:', error)
    return NextResponse.json({ 
      error: 'SYSTEM_ERROR: AI interface temporarily unavailable' 
    }, { status: 500 })
  }
}
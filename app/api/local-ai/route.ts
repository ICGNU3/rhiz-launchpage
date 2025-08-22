import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { text, context = '', model = 'llama2' } = await request.json()
    
    console.log('Local AI API called with:', { text, model })

    // Check if Ollama is available locally
    const isOllamaAvailable = await checkOllamaAvailability()
    
    if (!isOllamaAvailable) {
      console.log('Ollama not available, returning fallback response')
      return NextResponse.json({
        success: true,
        response: generateLocalFallbackResponse(text),
        source: 'fallback'
      })
    }

    // Try to get response from local Ollama
    try {
      const localResponse = await callLocalOllama(text, context, model)
      
      return NextResponse.json({
        success: true,
        response: localResponse,
        source: 'local-ollama'
      })
    } catch (error) {
      console.warn('Local Ollama call failed:', error)
      
      return NextResponse.json({
        success: true,
        response: generateLocalFallbackResponse(text),
        source: 'fallback'
      })
    }
    
  } catch (error) {
    console.error('Local AI API error:', error)
    return NextResponse.json({ 
      error: 'Local AI processing failed',
      response: generateLocalFallbackResponse('')
    }, { status: 500 })
  }
}

async function checkOllamaAvailability(): Promise<boolean> {
  try {
    const response = await fetch('http://localhost:11434/api/tags', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(3000) // 3 second timeout
    })
    return response.ok
  } catch (error) {
    console.log('Ollama not available:', error)
    return false
  }
}

async function callLocalOllama(text: string, context: string, model: string): Promise<string> {
  const prompt = `You are RHIZ, an advanced AI relationship intelligence system. 

Context: ${context}

User: ${text}

RHIZ:`

  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: model,
      prompt: prompt,
      stream: false,
      options: {
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 200
      }
    }),
    signal: AbortSignal.timeout(10000) // 10 second timeout
  })

  if (!response.ok) {
    throw new Error(`Ollama API error: ${response.status}`)
  }

  const data = await response.json()
  return data.response?.trim() || generateLocalFallbackResponse(text)
}

function generateLocalFallbackResponse(text: string): string {
  const responses = [
    "I'm analyzing your network for relationship opportunities. Based on your query, I can see several high-value connections that could benefit from your expertise.",
    "Your network shows strong potential for strategic partnerships. I've identified key individuals who could accelerate your goals through collaborative opportunities.",
    "The relationship intelligence data indicates you're well-positioned for growth. Let me help you optimize your network connections for maximum value creation.",
    "I'm detecting valuable synergies in your professional network. There are several opportunities to leverage your relationships for mutual benefit and growth.",
    "Based on my analysis, your network has untapped potential. I can help you identify the most valuable connections and strategic opportunities."
  ]
  
  return responses[Math.floor(Math.random() * responses.length)]
}

# ElevenLabs Conversational AI Setup Guide

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# ElevenLabs API Configuration
NEXT_PUBLIC_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
NEXT_PUBLIC_ELEVENLABS_VOICE_ID=your_voice_id_here
```

## Getting Your Credentials

1. **API Key**: 
   - Go to https://elevenlabs.io/
   - Sign up/login to your account
   - Go to your profile settings
   - Copy your API key

2. **Voice ID**:
   - In your ElevenLabs dashboard, go to "Voice Library"
   - Choose a voice you want to use
   - Copy the Voice ID from the URL or voice settings

## Conversational AI Integration

The conversational agent is now set up to use ElevenLabs' Conversational AI API. Once you add your credentials to `.env.local`, the agent will:

- **Real-time conversations** with context awareness
- **High-quality voice synthesis** using ElevenLabs voices
- **Relationship-focused AI** trained on network optimization
- **Voice input/output** with natural conversation flow
- **Persistent conversation memory** across sessions

## Features

- **Voice Recognition**: Speak naturally to the agent
- **Contextual Responses**: AI remembers conversation history
- **Audio Playback**: Agent responses are spoken back to you
- **Text Input**: Type questions as an alternative to voice
- **Real-time Processing**: Instant responses with visual feedback

## Testing

After setting up the credentials:
1. Restart your development server
2. Test the conversational agent
3. Try both voice and text input
4. The agent will respond with both text and audio

# ElevenLabs API Setup Guide

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# ElevenLabs API Configuration
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
ELEVENLABS_VOICE_ID=your_voice_id_here

# Optional: ElevenLabs Model Configuration
ELEVENLABS_MODEL=eleven_monolingual_v1

# Optional: Voice Settings
ELEVENLABS_STABILITY=0.5
ELEVENLABS_SIMILARITY_BOOST=0.75
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

## API Integration

The custom voice interface is already set up to use these credentials. Once you add them to `.env.local`, the voice interface will:

- Use real ElevenLabs TTS for AI responses
- Maintain the same UI/UX
- Provide high-quality voice synthesis

## Testing

After setting up the credentials:
1. Restart your development server
2. Test the voice interface
3. The AI responses will be spoken using ElevenLabs voices

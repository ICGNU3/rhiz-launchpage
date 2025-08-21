/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        'mobile': {'max': '767px'},
        'tablet': {'min': '768px', 'max': '1023px'},
        'desktop': {'min': '1024px'},
      },
      colors: {
        os: {
          dark: '#0A0F14',
          darker: '#050A0F',
          light: '#E0E6ED',
          border: '#1B2733',
        },
        synergy: {
          gold: '#FFD700',
          light: '#FFED4E',
          dark: '#B8860B',
        },
        depth: {
          blue: '#0080FF',
          cyan: '#00FFFF',
          light: '#40B0FF',
        },
        connection: {
          green: '#00FF88',
          light: '#40FFB0',
          dark: '#00CC66',
        },
        alert: {
          magenta: '#FF00FF',
          purple: '#9D00FF',
          pink: '#FF00AA',
        },
        interface: {
          gray: '#4A5568',
          light: '#718096',
          dark: '#2D3748',
        }
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
        'interface': ['Space Grotesk', 'sans-serif'],
        'system': ['Inter', 'sans-serif'],
      },
      animation: {
        'typewriter': 'typewriter 4s steps(40, end)',
        'blink': 'blink 1s infinite',
        'stamp-appear': 'stampAppear 0.5s ease-out',
        'folder-lift': 'folderLift 0.3s ease-out',
        'paper-shuffle': 'paperShuffle 0.4s ease-in-out',
        'mobile-pulse': 'mobilePulse 2s ease-in-out infinite',
        'touch-feedback': 'touchFeedback 0.1s ease-out',
        'listening-pulse': 'listening-pulse 2s ease-in-out infinite',
        'neural-scan': 'neural-scan 2s linear infinite',
        'waveform-pulse': 'waveform-pulse 0.5s ease-in-out infinite alternate',
        'thinking-bounce': 'thinking-bounce 1.4s ease-in-out infinite both',
        'synergy-ripple': 'synergy-ripple 2s ease-out infinite',
        'entity-appear': 'entity-appear 0.5s ease-out',
        'relationship-flow': 'relationship-flow 3s linear infinite',
        'memory-fade-in': 'memory-fade-in 0.8s ease-out',
        'learning-shine': 'learning-shine 2s ease-in-out infinite',
        'ai-spin': 'ai-spin 1s linear infinite',
        'speaking-bounce': 'speaking-bounce 0.6s ease-in-out infinite alternate',
      },
      keyframes: {
        typewriter: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        stampAppear: {
          '0%': { 
            transform: 'scale(0) rotate(-10deg)',
            opacity: '0'
          },
          '50%': { 
            transform: 'scale(1.1) rotate(-5deg)',
            opacity: '0.8'
          },
          '100%': { 
            transform: 'scale(1) rotate(-3deg)',
            opacity: '1'
          },
        },
        folderLift: {
          '0%': { transform: 'translateY(0px) rotate(0deg)' },
          '100%': { transform: 'translateY(-8px) rotate(2deg)' },
        },
        paperShuffle: {
          '0%': { transform: 'translateX(0px) rotate(0deg)' },
          '25%': { transform: 'translateX(-5px) rotate(-1deg)' },
          '75%': { transform: 'translateX(5px) rotate(1deg)' },
          '100%': { transform: 'translateX(0px) rotate(0deg)' },
        },
        mobilePulse: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        touchFeedback: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.98)' },
          '100%': { transform: 'scale(1)' },
        },
        'listening-pulse': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.2)', opacity: '0.7' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
        'neural-scan': {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
        'waveform-pulse': {
          '0%': { height: '8px', opacity: '0.5' },
          '100%': { height: '32px', opacity: '1' },
        },
        'thinking-bounce': {
          '0%, 80%, 100%': { transform: 'scale(0.8)', opacity: '0.5' },
          '40%': { transform: 'scale(1.2)', opacity: '1' },
        },
        'synergy-ripple': {
          '0%': { transform: 'translate(-50%, -50%) scale(0)', opacity: '1' },
          '100%': { transform: 'translate(-50%, -50%) scale(2)', opacity: '0' },
        },
        'entity-appear': {
          '0%': { transform: 'scale(0.8) translateY(10px)', opacity: '0' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
        'relationship-flow': {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '-10' },
        },
        'memory-fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.9)' },
          '50%': { opacity: '0.5', transform: 'translateY(10px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'learning-shine': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'ai-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'speaking-bounce': {
          '0%': { height: '8px' },
          '100%': { height: '20px' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      minHeight: {
        'screen-mobile': ['100vh', '100dvh'],
        'screen-safe': 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
      },
      height: {
        'screen-mobile': ['100vh', '100dvh'],
        'screen-safe': 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
      },
    },
  },
  plugins: [],
}
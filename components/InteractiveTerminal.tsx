'use client'

import { useState, useEffect, useRef } from 'react'
import TypewriterText from './TypewriterText'

interface TerminalLine {
  id: string
  text: string
  type: 'command' | 'output' | 'error'
  delay?: number
}

export const InteractiveTerminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [isActive, setIsActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const initialSequence: TerminalLine[] = [
    { id: '1', text: '> INITIALIZING RELATIONAL_OS...', type: 'command', delay: 0 },
    { id: '2', text: 'LOADING RELATIONSHIP_MODULES', type: 'output', delay: 1000 },
    { id: '3', text: 'SCANNING NETWORK_TOPOLOGY', type: 'output', delay: 2000 },
    { id: '4', text: 'SYNERGY_DETECTION: ACTIVE', type: 'output', delay: 3000 },
    { id: '5', text: 'SYSTEM READY. TYPE "HELP" FOR COMMANDS.', type: 'output', delay: 4000 },
  ]

  useEffect(() => {
    // Run initial sequence
    initialSequence.forEach((line, index) => {
      setTimeout(() => {
        setLines(prev => [...prev, line])
        if (index === initialSequence.length - 1) {
          setIsActive(true)
        }
      }, line.delay)
    })
  }, [])

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase().trim()
    const newLines: TerminalLine[] = [
      { id: Date.now().toString(), text: `> ${command}`, type: 'command' }
    ]

    switch (cmd) {
      case 'help':
        newLines.push({
          id: (Date.now() + 1).toString(),
          text: 'AVAILABLE COMMANDS:',
          type: 'output'
        })
        newLines.push({
          id: (Date.now() + 2).toString(),
          text: 'STATUS - System status',
          type: 'output'
        })
        newLines.push({
          id: (Date.now() + 3).toString(),
          text: 'SCAN - Network scan',
          type: 'output'
        })
        newLines.push({
          id: (Date.now() + 4).toString(),
          text: 'INSTALL - Begin installation',
          type: 'output'
        })
        break

      case 'status':
        newLines.push({
          id: (Date.now() + 1).toString(),
          text: 'RELATIONAL_OS v.150.ALPHA',
          type: 'output'
        })
        newLines.push({
          id: (Date.now() + 2).toString(),
          text: 'LICENSES: 117/150 AVAILABLE',
          type: 'output'
        })
        newLines.push({
          id: (Date.now() + 3).toString(),
          text: 'SYNERGY_ENGINE: OPERATIONAL',
          type: 'output'
        })
        break

      case 'scan':
        newLines.push({
          id: (Date.now() + 1).toString(),
          text: 'SCANNING NETWORK...',
          type: 'output'
        })
        newLines.push({
          id: (Date.now() + 2).toString(),
          text: '3 HIGH-VALUE CONNECTIONS DETECTED',
          type: 'output'
        })
        newLines.push({
          id: (Date.now() + 3).toString(),
          text: 'SYNERGY POTENTIAL: 94%',
          type: 'output'
        })
        break

      case 'install':
        newLines.push({
          id: (Date.now() + 1).toString(),
          text: 'REDIRECTING TO INSTALLATION PORTAL...',
          type: 'output'
        })
        break

      case 'clear':
        setLines([])
        setCurrentInput('')
        return

      default:
        newLines.push({
          id: (Date.now() + 1).toString(),
          text: `COMMAND NOT FOUND: ${command}`,
          type: 'error'
        })
        newLines.push({
          id: (Date.now() + 2).toString(),
          text: 'TYPE "HELP" FOR AVAILABLE COMMANDS',
          type: 'output'
        })
    }

    setLines(prev => [...prev, ...newLines])
    setCurrentInput('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      handleCommand(currentInput)
    }
  }

  const handleTerminalClick = () => {
    if (inputRef.current && isActive) {
      inputRef.current.focus()
    }
  }

  return (
    <div 
      className="bg-os-darker p-6 rounded-lg font-mono text-sm cursor-text screen-flicker interactive-terminal"
      onClick={handleTerminalClick}
      role="application"
      aria-label="Interactive Relational OS Terminal"
      aria-describedby="terminal-help"
    >
      <div className="space-y-1 mb-2 max-h-64 overflow-y-auto">
        {lines.map((line, index) => (
          <div 
            key={line.id}
            className={`${
              line.type === 'command' 
                ? 'text-connection-green' 
                : line.type === 'error'
                ? 'text-red-400'
                : 'text-os-light'
            }`}
          >
            <TypewriterText 
              text={line.text}
              delay={index * 100}
              speed={30}
              className="phosphor-text"
            />
          </div>
        ))}
      </div>
      
      {isActive && (
        <div className="flex items-center text-connection-green">
          <span className="mr-2">{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="bg-transparent border-none outline-none flex-1 text-connection-green font-mono focus:ring-1 focus:ring-connection-green"
            placeholder="Type command..."
            aria-label="Terminal command input"
            aria-describedby="terminal-help"
            autoFocus
          />
          <span className="terminal-cursor"></span>
        </div>
      )}
      
      {/* Hidden help text for screen readers */}
      <div id="terminal-help" className="sr-only">
        Interactive terminal. Available commands: help, status, scan, install, clear. Type help for more information.
      </div>
    </div>
  )
}

export default InteractiveTerminal
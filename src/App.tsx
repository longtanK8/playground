import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float, OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import type { Mesh } from 'three'
import { BackgroundMusic } from './components/BackgroundMusic'
import { MuteButton } from './components/MuteButton'
import { GameRouter } from './components/GameRouter'
import { generateRandomName } from './utils/nameGenerator'
import './App.css'

// Theme links mapping
const themeLinks: Record<string, string> = {
  'Ethereal Whispers': 'https://www.youtube.com/results?search_query=ethereal+whispers+relaxing+ambient+music',
  'Cosmic Harmony': 'https://www.youtube.com/results?search_query=cosmic+harmony+space+ambient+music',
  'Serenity Waves': 'https://www.youtube.com/results?search_query=serenity+waves+meditation+ocean+sounds',
  'Soul Journey': 'https://www.youtube.com/results?search_query=soul+journey+spiritual+psychedelic+music',
}

function RotatingCube() {
  const meshRef = useRef<Mesh>(null)
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5
      meshRef.current.rotation.y += delta * 0.8
    }
  })
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#a855f7" wireframe />
      </mesh>
    </Float>
  )
}

function App() {
  const [isMuted, setIsMuted] = useState(true)
  const [playerName, setPlayerName] = useState('')
  const [isNameSubmitted, setIsNameSubmitted] = useState(false)
  const [showGameMode, setShowGameMode] = useState(false)
  const nameInputRef = useRef<HTMLInputElement>(null)

  // Load player name from sessionStorage on mount
  useEffect(() => {
    const savedName = sessionStorage.getItem('playerName')
    if (savedName) {
      setPlayerName(savedName)
      setIsNameSubmitted(true)
    }
  }, [])

  // Listen for game mode events
  useEffect(() => {
    const handleGameSelected = () => {
      // Force re-render when game is selected
      setShowGameMode(true)
    }

    const handleBackToMenu = () => {
      setShowGameMode(true)
    }

    window.addEventListener('gameSelected', handleGameSelected)
    window.addEventListener('backToMenu', handleBackToMenu)

    return () => {
      window.removeEventListener('gameSelected', handleGameSelected)
      window.removeEventListener('backToMenu', handleBackToMenu)
    }
  }, [])

  const handleToggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleEnterName = () => {
    if (playerName.trim()) {
      sessionStorage.setItem('playerName', playerName.trim())
      setIsNameSubmitted(true)
      console.log(`Welcome, ${playerName}!`)
    }
  }

  const handleRandomName = () => {
    const randomName = generateRandomName()
    setPlayerName(randomName)
  }

  const handleChangeIdentity = () => {
    sessionStorage.removeItem('playerName')
    setPlayerName('')
    setIsNameSubmitted(false)
    nameInputRef.current?.focus()
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && playerName.trim()) {
      handleEnterName()
    }
  }

  const handleEnterMenu = () => {
    setShowGameMode(true)
 console.log(`${playerName} is entering the menu...`)
  }

  return (
    <div className="game-root">
      {/* Background Music Component */}
      <BackgroundMusic isMuted={isMuted} />

      {/* 3D Background Canvas */}
      <div className="canvas-bg">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Stars radius={80} depth={50} count={4000} factor={4} fade speed={1} />
          <RotatingCube />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* Overlay UI */}
      <div className="overlay">
        {/* Player Name Entry Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="player-name-section"
        >
          {!isNameSubmitted ? (
            // Input form for entering name
            <div className="name-input-group">
              <input
                ref={nameInputRef}
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What should we call you?"
                className="player-name-input"
              />
              <motion.button
                onClick={handleRandomName}
                className="random-name-button"
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.95 }}
                title="Generate random name"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z" />
                </svg>
              </motion.button>
              <motion.button
                onClick={handleEnterName}
                disabled={!playerName.trim()}
                className="enter-button"
                whileHover={playerName.trim() ? { scale: 1.1 } : {}}
                whileTap={playerName.trim() ? { scale: 0.95 } : {}}
                title="Enter your Identity"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          ) : (
            // Welcome message after name submission
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="welcome-container"
            >
              <div className="welcome-message">
                Welcome to the place, <span className="player-name-display">{playerName}</span>!
              </div>
              <motion.button
                onClick={handleChangeIdentity}
                className="change-identity-button"
                whileHover={{ x: 4, opacity: 1 }}
              >
                Change Identity...
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Main Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          className="hero-text"
        >
          <motion.h1
            className="title"
            animate={{ textShadow: ['0 0 8px #a855f7', '0 0 24px #7c3aed', '0 0 8px #a855f7'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            VIBE RELAX
          </motion.h1>
          <motion.p
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            Chill · Joke · Relax · Explore The Universe
          </motion.p>
        </motion.div>

        <motion.div
          className="badges"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          {Object.keys(themeLinks).map((theme) => (
            <motion.a
              key={theme}
              href={themeLinks[theme]}
              target="_blank"
              rel="noopener noreferrer"
              className="badge"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              title={`Explore ${theme} on YouTube`}
            >
              {theme}
            </motion.a>
          ))}
        </motion.div>

        {/* Swipe to Open Menu - Only show when name is submitted */}
        {isNameSubmitted && (
          <motion.div
            className="swipe-menu-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <p className="swipe-hint">Swipe to open</p>
            <motion.div
              className="swipe-arrow-wrapper"
              drag="x"
              dragElastic={0.2}
              dragConstraints={{ left: -100, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) {
                  handleEnterMenu()
                }
              }}
              whileDrag={{ scale: 1.05 }}
            >
              <motion.div
                className="swipe-arrow"
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Mute Button */}
      <MuteButton isMuted={isMuted} onToggle={handleToggleMute} />

      {/* Game Router - Handles menu and game views */}
      <GameRouter
        showGameMode={showGameMode}
        playerName={playerName}
        onClose={() => setShowGameMode(false)}
      />
    </div>
  )
}

export default App

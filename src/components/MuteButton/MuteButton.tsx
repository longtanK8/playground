import { motion } from 'framer-motion'
import './MuteButton.css'

interface MuteButtonProps {
  isMuted: boolean
  onToggle: () => void
}

export function MuteButton({ isMuted, onToggle }: MuteButtonProps) {
  return (
    <motion.button
      className={`mute-button ${isMuted ? 'muted' : 'playing'}`}
      onClick={onToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        boxShadow: isMuted
          ? '0 0 20px rgba(168, 85, 247, 0.3)'
          : '0 0 30px rgba(168, 85, 247, 0.8)',
      }}
      transition={{ duration: 0.3 }}
      aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      title={isMuted ? 'Click to play music' : 'Click to mute music'}
    >
      <svg
        className="music-note-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {!isMuted ? (
          <>
            {/* Music note icon when playing */}
            <path d="M9 18v-5m0 0V5m0 8h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9.5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z" />
            <path d="M11 12v8" />
          </>
        ) : (
          <>
            {/* Music note icon with slash when muted */}
            <path d="M9 18v-5m0 0V5m0 8h11a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9.5a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z" />
            <path d="M11 12v8" />
            <line x1="3" y1="3" x2="21" y2="21" strokeWidth="2" />
          </>
        )}
      </svg>
    </motion.button>
  )
}

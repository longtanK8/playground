import { motion } from 'framer-motion'
import { GameCard } from '../GameCard'
import { GAMES } from '../../games/gameConfig'
import './GameMenu.css'

interface GameMenuProps {
  onSelectGame: (gameId: string) => void
  onClose: () => void
  playerName: string
}

export const GameMenu: React.FC<GameMenuProps> = ({ onSelectGame, onClose, playerName }) => {
  return (
    <motion.div
      className="game-menu-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="game-menu-container"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.4, type: 'spring' }}
      >
        <div className="game-menu-header">
          <h1 className="game-menu-title">Welcome, <span className="player-highlight">{playerName}</span></h1>
          <p className="game-menu-subtitle">Choose your adventure</p>
        </div>

        <div className="game-menu-grid">
          {GAMES.map((game) => (
            <GameCard
              key={game.id}
              name={game.name}
              description={game.description}
              icon={game.icon}
              onClick={() => onSelectGame(game.id)}
            />
          ))}
        </div>

        <motion.button
          className="back-button"
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Back to Home
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

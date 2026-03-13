import { motion } from 'framer-motion'
import './GameCard.css'

interface GameCardProps {
  name: string
  description: string
  icon: string
  onClick: () => void
}

export const GameCard: React.FC<GameCardProps> = ({ name, description, icon, onClick }) => {
  return (
    <motion.button
      className="game-card"
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, boxShadow: '0 12px 32px rgba(168, 85, 247, 0.4)' }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="game-card-icon">{icon}</div>
      <h3 className="game-card-name">{name}</h3>
      <p className="game-card-description">{description}</p>
    </motion.button>
  )
}

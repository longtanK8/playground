import { NhieuChuyect } from '../../games/NhieuChuyect'
import { MeoNo } from '../../games/MeoNo'
import { Uno } from '../../games/Uno'
import { BlackJack } from '../../games/BlackJack'
import { GameMenu } from '../GameMenu'

interface GameRouterProps {
  showGameMode: boolean
  playerName: string
  onClose: () => void
}

export const GameRouter: React.FC<GameRouterProps> = ({ showGameMode, playerName, onClose }) => {
  // Get the game ID from sessionStorage
  const currentGameId = sessionStorage.getItem('currentGame')

  if (!showGameMode) return null

  // If no game is selected, show the menu
  if (!currentGameId) {
    return (
      <GameMenu
        playerName={playerName}
        onSelectGame={(gameId: string) => {
          sessionStorage.setItem('currentGame', gameId)
          // Force re-render by triggering state update
          window.dispatchEvent(new Event('gameSelected'))
        }}
        onClose={onClose}
      />
    )
  }

  // Render the selected game
  const handleBackToMenu = () => {
    sessionStorage.removeItem('currentGame')
    window.dispatchEvent(new Event('backToMenu'))
  }

  switch (currentGameId) {
    case 'nhieu-chuyect':
      return <NhieuChuyect playerName={playerName} onClose={handleBackToMenu} />
    case 'meo-no':
      return <MeoNo playerName={playerName} onClose={handleBackToMenu} />
    case 'uno':
      return <Uno playerName={playerName} onClose={handleBackToMenu} />
    case 'blackjack':
      return <BlackJack playerName={playerName} onClose={handleBackToMenu} />
    default:
      return (
        <GameMenu
          playerName={playerName}
          onSelectGame={(gameId: string) => {
            sessionStorage.setItem('currentGame', gameId)
            window.dispatchEvent(new Event('gameSelected'))
          }}
          onClose={onClose}
        />
      )
  }
}

export interface GameConfig {
  id: string
  name: string
  description: string
  icon: string
}

export const GAMES: GameConfig[] = [
  {
    id: 'nhieu-chuyect',
    name: 'Nhiều Chuyện',
    description: 'A storytelling game',
    icon: '📖'
  },
  {
    id: 'meo-no',
    name: 'Mèo Nỗ',
    description: 'A cat-themed game',
    icon: '🐱'
  },
  {
    id: 'uno',
    name: 'Uno',
    description: 'Classic card game',
    icon: '🎴'
  },
  {
    id: 'blackjack',
    name: 'Black Jack',
    description: 'Card game of chance',
    icon: '🎰'
  }
]

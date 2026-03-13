// Random name generator utility

const firstNames = [
  'Alex',
  'Jordan',
  'Casey',
  'Morgan',
  'Riley',
  'Avery',
  'Quinn',
  'Cameron',
  'Blake',
  'Dakota',
  'Phoenix',
  'Ocean',
  'Sage',
  'River',
  'Sky',
  'Storm',
  'Echo',
  'Nova',
  'Zephyr',
  'Aspen',
]

const lastNames = [
  'Shadow',
  'Thunder',
  'Frost',
  'Blaze',
  'Stone',
  'Wind',
  'Cloud',
  'Spark',
  'Mystic',
  'Dream',
  'Star',
  'Moon',
  'Sun',
  'Forest',
  'Ocean',
  'Mountain',
  'Desert',
  'Valley',
  'Harbor',
  'Peak',
]

const animalNames = [
  'Wolf',
  'Eagle',
  'Phoenix',
  'Dragon',
  'Tiger',
  'Panther',
  'Raven',
  'Hawk',
  'Fox',
  'Bear',
  'Lion',
  'Shark',
  'Snake',
  'Owl',
  'Dolphin',
  'Whale',
  'Lightning',
  'Blizzard',
  'Tornado',
  'Wildfire',
]

// Get random element from array
const getRandomElement = <T,>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)]
}

// Generate random player name
export const generateRandomName = (): string => {
  const firstName = getRandomElement(firstNames)
  const lastName = getRandomElement(lastNames)
  const animal = getRandomElement(animalNames)
  return `${firstName} ${lastName} ${animal}`
}

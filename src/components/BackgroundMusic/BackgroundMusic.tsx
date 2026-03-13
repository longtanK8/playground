import { useEffect, useRef, useState } from 'react'

interface BackgroundMusicProps {
  isMuted: boolean
}

const FALLBACK_URL = 'https://cdn.pixabay.com/download/audio/2022/02/15/audio_d3c16e83f6.mp3'

// Import all audio files from assets/audio folder (supports all formats)
const audioModules = import.meta.glob('../../assets/audio/*.{mp3,wav,ogg,m4a,flac,aac,webm}', { eager: true, as: 'url' })

// Get MIME type based on file extension
const getMimeType = (url: string): string => {
  const ext = url.split('.').pop()?.toLowerCase()
  const mimeTypes: Record<string, string> = {
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    ogg: 'audio/ogg',
    m4a: 'audio/mp4',
    flac: 'audio/flac',
    aac: 'audio/aac',
    webm: 'audio/webm',
    weba: 'audio/weba',
  }
  return mimeTypes[ext || ''] || 'audio/mpeg'
}

// Get list of audio URLs from imported modules
const getAudioURLs = (): string[] => {
  const urls = Object.values(audioModules) as string[]
  return urls.length > 0 ? urls : [FALLBACK_URL]
}

export function BackgroundMusic({ isMuted }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const audioURLs = getAudioURLs()
  const currentURL = audioURLs[currentTrackIndex]

  // When current track ends, move to next track (if there are multiple tracks)
  const handleTrackEnd = () => {
    if (audioURLs.length > 1) {
      setCurrentTrackIndex((prev) => (prev + 1) % audioURLs.length)
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(() => {
          console.log('Audio playback failed')
        })
      }
    }
  }, [isMuted])

  // Log info: local files or fallback URL
  useEffect(() => {
    console.log(`🎵 Audio files found: ${audioURLs.length}`)
    console.log(`Playing: ${currentURL}`)
  }, [currentURL, audioURLs.length])

  return (
    <audio
      ref={audioRef}
      loop={audioURLs.length === 1} // Only loop if there's just 1 track
      preload="auto"
      crossOrigin="anonymous"
      onEnded={handleTrackEnd}
    >
      <source src={currentURL} type={getMimeType(currentURL)} />
      Your browser does not support the audio element.
    </audio>
  )
}

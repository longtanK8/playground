import { useState, useRef, useCallback } from 'react'

export const useAudioControl = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(() => {
          console.log('Audio playback failed')
        })
      } else {
        audioRef.current.pause()
      }
      setIsMuted(!isMuted)
    }
  }, [isMuted])

  const play = useCallback(() => {
    if (audioRef.current && isMuted) {
      audioRef.current.play().catch(() => {
        console.log('Audio playback failed')
      })
      setIsMuted(false)
    }
  }, [isMuted])

  const pause = useCallback(() => {
    if (audioRef.current && !isMuted) {
      audioRef.current.pause()
      setIsMuted(true)
    }
  }, [isMuted])

  return {
    audioRef,
    isMuted,
    toggleMute,
    play,
    pause,
  }
}

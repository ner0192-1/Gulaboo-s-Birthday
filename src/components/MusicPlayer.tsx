import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAudio } from '../audioManager'

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(0.14)
  const [showPlayer, setShowPlayer] = useState(false)

  // Wire up audio events
  useEffect(() => {
    const audio = getAudio()

    const onTimeUpdate = () => {
      if (audio.duration) setProgress((audio.currentTime / audio.duration) * 100)
    }
    const onEnded = () => setPlaying(false)

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('ended', onEnded)

    // Reflect actual play state (audio may already be playing from login)
    setPlaying(!audio.paused)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  // Play / pause
  useEffect(() => {
    const audio = getAudio()
    if (playing) audio.play().catch(() => setPlaying(false))
    else audio.pause()
  }, [playing])

  // Volume sync
  useEffect(() => {
    getAudio().volume = volume
  }, [volume])

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = getAudio()
    if (!audio.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration
  }

  const restart = () => { getAudio().currentTime = 0 }

  const EQ_HEIGHTS = [0.4, 0.8, 0.6, 1, 0.7, 0.9, 0.5, 0.75, 0.6, 0.85]

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full flex items-center justify-center text-xl z-50"
        style={{
          background: 'linear-gradient(135deg, #C8A2FF, #B88BFF)',
          boxShadow: '0 8px 30px rgba(200,162,255,0.5)',
          border: '2px solid rgba(255,255,255,0.6)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowPlayer(s => !s)}
        animate={{ boxShadow: playing ? ['0 8px 30px rgba(200,162,255,0.5)', '0 8px 50px rgba(200,162,255,0.9)', '0 8px 30px rgba(200,162,255,0.5)'] : '0 8px 30px rgba(200,162,255,0.5)' }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        🎵
      </motion.button>

      {/* Player panel */}
      <AnimatePresence>
        {showPlayer && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 120 }}
            className="fixed bottom-28 right-8 w-72 rounded-2xl p-6 z-50"
            style={{
              background: 'rgba(255,255,255,0.7)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(200,162,255,0.4)',
              boxShadow: '0 20px 60px rgba(200,162,255,0.3)',
            }}
          >
            {/* Close */}
            <button
              className="absolute top-3 right-3 text-purple-300 hover:text-purple-500 transition-colors"
              onClick={() => setShowPlayer(false)}
            >
              ✕
            </button>

            {/* Vinyl record */}
            <div className="flex justify-center mb-5">
              <motion.div
                className="relative w-24 h-24 rounded-full"
                animate={{ rotate: playing ? 360 : 0 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #444 0%, #1a1a1a 60%, #333 100%)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                }}
              >
                {/* Vinyl grooves */}
                {[20, 30, 38, 44].map(r => (
                  <div key={r} className="absolute inset-0 rounded-full border border-white/5"
                    style={{ margin: r }}
                  />
                ))}
                {/* Center label */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm"
                    style={{ background: 'linear-gradient(135deg, #C8A2FF, #B88BFF)' }}
                  >
                    🎵
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Song info */}
            <div className="text-center mb-4">
              <p className="font-playfair text-lg font-semibold text-purple-800">Our dance Song</p>
              <p className="font-poppins text-sm text-purple-400/70">For My Bebu ❤️</p>
            </div>

            {/* Equalizer */}
            <div className="flex items-end justify-center gap-1 h-8 mb-4">
              {EQ_HEIGHTS.map((h, i) => (
                <motion.div
                  key={i}
                  className="w-2 rounded-full"
                  style={{ background: 'linear-gradient(0deg, #C8A2FF, #F6D77B)' }}
                  animate={playing ? { height: [`${h * 100}%`, `${(1 - h) * 80 + 20}%`, `${h * 100}%`] } : { height: '20%' }}
                  transition={{ duration: 0.4 + i * 0.05, repeat: Infinity, ease: 'easeInOut', delay: i * 0.04 }}
                />
              ))}
            </div>

            {/* Progress bar */}
            <div
              className="relative h-2 rounded-full mb-4 cursor-pointer overflow-hidden"
              style={{ background: 'rgba(200,162,255,0.2)' }}
              onClick={seek}
            >
              <div
                className="absolute left-0 top-0 h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #C8A2FF, #F6D77B)', width: `${progress}%`, transition: 'width 0.1s linear' }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                className="text-purple-300 hover:text-purple-600 transition-colors text-lg"
                onClick={restart}
              >
                ⏮
              </button>

              <motion.button
                className="w-12 h-12 rounded-full flex items-center justify-center text-xl text-white"
                style={{ background: 'linear-gradient(135deg, #C8A2FF, #B88BFF)' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPlaying(p => !p)}
              >
                {playing ? '⏸' : '▶'}
              </motion.button>

              <button
                className="text-purple-300 hover:text-purple-600 transition-colors text-lg"
                onClick={restart}
              >
                ⏭
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm text-purple-300">🔈</span>
              <input
                type="range"
                min={0} max={100} step={1}
                value={Math.round(volume * 100)}
                onChange={e => setVolume(parseInt(e.target.value) / 100)}
                className="flex-1 h-1 accent-purple-400"
              />
              <span className="text-sm text-purple-300 w-8 text-right font-poppins" style={{ fontSize: '0.65rem' }}>
                {Math.round(volume * 100)}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

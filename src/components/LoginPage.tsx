import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { startAudio } from '../audioManager'

// Hardcoded credentials — change these anytime
const CORRECT_USER = 'khushi_0807'
const CORRECT_PASS = '230809'

// Floating petal for background
const Petal = ({ x, delay }: { x: number; delay: number }) => (
  <motion.div
    className="absolute pointer-events-none select-none"
    style={{ left: `${x}%`, top: -30, fontSize: 18 }}
    animate={{ y: ['0vh', '105vh'], x: [0, 40, -30, 50, 0], rotate: [0, 360, 720], opacity: [0, 0.8, 0.8, 0] }}
    transition={{ duration: 12 + delay * 2, delay, repeat: Infinity, ease: 'linear' }}
  >
    {['🌸', '🌺', '💮', '🌷'][Math.floor(delay) % 4]}
  </motion.div>
)

interface LoginPageProps {
  onSuccess: () => void
}

export default function LoginPage({ onSuccess }: LoginPageProps) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [shaking, setShaking] = useState(false)
  const [loading, setLoading] = useState(false)
  const passRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return

    if (user.trim() === CORRECT_USER && pass === CORRECT_PASS) {
      setError('')
      startAudio() // called synchronously inside click = true user gesture
      setLoading(true)
    } else {
      setError('Hmm… that doesn\'t seem right 💕 Try again!')
      setShaking(true)
      setTimeout(() => setShaking(false), 600)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        key="login"
        className="fixed inset-0 flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #EAD9FF 0%, #D4B8FF 30%, #C8A2FF 60%, #E6D8FF 85%, #F8F4FF 100%)',
          zIndex: 1000,
        }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      >
        {/* Petals */}
        {[5, 14, 24, 35, 47, 58, 68, 79, 88, 95].map((x, i) => (
          <Petal key={i} x={x} delay={i * 1.1} />
        ))}

        {/* Radial glow overlays */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 70% 50% at 20% 20%, rgba(246,215,123,0.2) 0%, transparent 70%)',
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 60% 50% at 80% 80%, rgba(255,214,236,0.25) 0%, transparent 70%)',
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255,255,255,0.4) 0%, transparent 60%)',
        }} />

        {/* Sparkles */}
        {[
          { x: 10, y: 15 }, { x: 85, y: 10 }, { x: 5, y: 70 }, { x: 92, y: 65 },
          { x: 50, y: 5 }, { x: 20, y: 90 }, { x: 75, y: 85 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none text-lg"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            animate={{ scale: [0, 1, 0], rotate: [0, 180, 360], opacity: [0, 1, 0] }}
            transition={{ duration: 3 + i * 0.5, delay: i * 0.7, repeat: Infinity, ease: 'easeInOut' }}
          >
            ✨
          </motion.div>
        ))}

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, type: 'spring', stiffness: 70 }}
          className="relative w-full mx-4"
          style={{ maxWidth: 420 }}
        >
          {/* Success overlay — shows when loading=true */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center z-20 gap-4"
                style={{
                  background: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(20px)',
                }}
                onAnimationComplete={() => {
                  // delay slightly so the success animation plays
                  setTimeout(onSuccess, 1000)
                }}
              >
                <motion.div
                  className="text-5xl"
                  animate={{ scale: [0.8, 1.3, 1], rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.8 }}
                >
                  💕
                </motion.div>
                <p className="font-script text-3xl" style={{ color: '#7C3AED' }}>
                  Welcome, my love...
                </p>
                <motion.div
                  className="flex gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {['🌸', '✨', '🌸'].map((e, i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                    >
                      {e}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Glass card */}
          <motion.form
            onSubmit={handleSubmit}
            animate={shaking ? { x: [-12, 12, -10, 10, -6, 6, 0] } : { x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl p-8 md:p-10 overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              border: '1px solid rgba(255,255,255,0.7)',
              boxShadow: '0 24px 80px rgba(184,139,255,0.25), 0 8px 30px rgba(200,162,255,0.2), inset 0 1px 0 rgba(255,255,255,0.9)',
            }}
          >
            {/* Golden inner border */}
            <div className="absolute inset-3 rounded-2xl pointer-events-none" style={{
              border: '1px solid rgba(246,215,123,0.4)',
            }} />

            {/* Corner flowers */}
            {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos, i) => (
              <motion.div
                key={i}
                className={`absolute ${pos} text-xl pointer-events-none`}
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
              >
                🌸
              </motion.div>
            ))}

            {/* Header */}
            <div className="text-center mb-8 relative z-10">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="text-5xl mb-3"
              >
                🔐
              </motion.div>
              <h1 className="font-script mb-1" style={{
                fontSize: 'clamp(2.2rem, 8vw, 3rem)',
                color: '#5B21B6',
                textShadow: '0 2px 12px rgba(255,255,255,0.9), 0 0 30px rgba(200,162,255,0.5)',
              }}>
                A Secret Garden
              </h1>
              <p className="font-cormorant text-base italic" style={{ color: '#7C3AED' }}>
                Only for someone very special 💜
              </p>
            </div>

            {/* Username field */}
            <div className="mb-5 relative z-10">
              <label
                className="font-poppins text-xs font-semibold tracking-widest uppercase block mb-2"
                style={{ color: '#7C3AED' }}
              >
                Username
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg pointer-events-none">🌸</span>
                <input
                  type="text"
                  value={user}
                  onChange={e => { setUser(e.target.value); setError('') }}
                  onKeyDown={e => e.key === 'Enter' && passRef.current?.focus()}
                  placeholder="your instagram @"
                  autoComplete="username"
                  className="w-full font-poppins text-sm rounded-2xl pl-11 pr-4 py-3.5 outline-none transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.7)',
                    border: '1.5px solid rgba(200,162,255,0.5)',
                    color: '#4C1D95',
                    caretColor: '#9B6FE0',
                  }}
                  onFocus={e => (e.target.style.border = '1.5px solid rgba(155,111,224,0.8)', e.target.style.boxShadow = '0 0 0 4px rgba(200,162,255,0.2)')}
                  onBlur={e => (e.target.style.border = '1.5px solid rgba(200,162,255,0.5)', e.target.style.boxShadow = 'none')}
                />
              </div>
            </div>

            {/* Password field */}
            <div className="mb-7 relative z-10">
              <label
                className="font-poppins text-xs font-semibold tracking-widest uppercase block mb-2"
                style={{ color: '#7C3AED' }}
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg pointer-events-none">🔑</span>
                <input
                  ref={passRef}
                  type={showPass ? 'text' : 'iPhone Pin'}
                  value={pass}
                  onChange={e => { setPass(e.target.value); setError('') }}
                  placeholder="your iphone pin"
                  autoComplete="current-password"
                  className="w-full font-poppins text-sm rounded-2xl pl-11 pr-12 py-3.5 outline-none transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.7)',
                    border: '1.5px solid rgba(200,162,255,0.5)',
                    color: '#4C1D95',
                    caretColor: '#9B6FE0',
                  }}
                  onFocus={e => (e.target.style.border = '1.5px solid rgba(155,111,224,0.8)', e.target.style.boxShadow = '0 0 0 4px rgba(200,162,255,0.2)')}
                  onBlur={e => (e.target.style.border = '1.5px solid rgba(200,162,255,0.5)', e.target.style.boxShadow = 'none')}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(s => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-base opacity-60 hover:opacity-100 transition-opacity"
                  tabIndex={-1}
                >
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="font-poppins text-xs text-center mb-4 -mt-3 relative z-10"
                  style={{ color: '#BE185D' }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit button */}
            <motion.button
              type="submit"
              className="btn-luxury w-full relative z-10"
              whileHover={{ scale: 1.03, boxShadow: '0 16px 40px rgba(200,162,255,0.6)' }}
              whileTap={{ scale: 0.97 }}
              style={{ fontSize: '1rem', letterSpacing: '0.12em' }}
            >
              ✨ Enter the Garden ✨
            </motion.button>

            {/* Hint */}
            <p className="font-cormorant text-sm italic text-center mt-5 relative z-10"
              style={{ color: '#9B6FE0', opacity: 0.8 }}>
              This garden was made just for you 🌸
            </p>
          </motion.form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

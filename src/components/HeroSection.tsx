import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const TYPING_PHRASES = [
  'Meri Gulaboo 🌹',
  'Meri Riya 🌸',
  'Meri Kriya🌷',
  'Meri Khushi😊',
  'Meri Shouna🦋',
  'Meri Bebu💕',
  'Meri Hanuman ji🐵',
]

function useTypingEffect(phrases: string[], speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const chars = [...phrases[phraseIdx]] // codepoint array — emoji = 1 unit
    const len = chars.length
    if (!deleting && charIdx < len) {
      const t = setTimeout(() => setCharIdx(c => c + 1), speed)
      return () => clearTimeout(t)
    }
    if (!deleting && charIdx === len) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx(c => c - 1), speed / 2)
      return () => clearTimeout(t)
    }
    if (deleting && charIdx === 0) {
      setDeleting(false)
      setPhraseIdx(i => (i + 1) % phrases.length)
    }
  }, [charIdx, deleting, phraseIdx, phrases, speed, pause])

  useEffect(() => {
    // Use spread to split by Unicode codepoints so emoji are never cut mid-character
    setDisplayed([...phrases[phraseIdx]].slice(0, charIdx).join(''))
  }, [charIdx, phraseIdx, phrases])

  return displayed
}

// ─── Floating balloon ─────────────────────────────────────────────────────────
const Balloon = ({ color, x, delay, size = 40 }: { color: string; x: number; delay: number; size?: number }) => (
  <motion.div
    className="absolute"
    style={{ left: `${x}%`, bottom: '-80px' }}
    animate={{ y: [0, -2200] }}
    transition={{ duration: 14 + delay * 2, delay, repeat: Infinity, ease: 'linear' }}
  >
    <motion.div
      animate={{ rotate: [-8, 8, -8], x: [-10, 10, -10] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width={size} height={size * 1.4} viewBox="0 0 40 56" fill="none">
        <ellipse cx="20" cy="20" rx="18" ry="20" fill={color} opacity="0.85" />
        <ellipse cx="14" cy="12" rx="5" ry="4" fill="white" opacity="0.3" transform="rotate(-30 14 12)" />
        <path d="M20 40 Q22 44 20 48 Q18 44 20 40" stroke={color} strokeWidth="1.5" fill="none" opacity="0.7" />
        <path d="M20 48 Q18 52 22 56 Q24 52 20 48" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" />
      </svg>
    </motion.div>
  </motion.div>
)

// ─── Floating heart ───────────────────────────────────────────────────────────
const FloatingHeart = ({ x, delay, size = 24 }: { x: number; delay: number; size?: number }) => (
  <motion.div
    className="absolute text-2xl"
    style={{ left: `${x}%`, bottom: '-40px', fontSize: size }}
    animate={{ y: [0, -1800], opacity: [0, 1, 1, 0] }}
    transition={{ duration: 9 + delay, delay, repeat: Infinity, ease: 'easeOut' }}
  >
    <motion.div
      animate={{ scale: [1, 1.2, 1], rotate: [-10, 10, -10] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      ❤️
    </motion.div>
  </motion.div>
)

// ─── Hero Section ─────────────────────────────────────────────────────────────
export default function HeroSection({ onBeginJourney }: { onBeginJourney: () => void }) {
  const typed = useTypingEffect(TYPING_PHRASES)

  const balloonConfig = [
    { color: '#C8A2FF', x: 5, delay: 0, size: 44 },
    { color: '#FFD6EC', x: 12, delay: 2.5, size: 36 },
    { color: 'rgba(255,255,255,0.7)', x: 20, delay: 1, size: 40 },
    { color: '#E6D8FF', x: 80, delay: 3, size: 38 },
    { color: '#FFD6EC', x: 88, delay: 0.5, size: 42 },
    { color: '#C8A2FF', x: 93, delay: 2, size: 34 },
    { color: 'rgba(246,215,123,0.6)', x: 50, delay: 4, size: 30 },
  ]

  const heartConfig = [
    { x: 8, delay: 1, size: 20 },
    { x: 25, delay: 3, size: 16 },
    { x: 45, delay: 0.5, size: 22 },
    { x: 65, delay: 2, size: 18 },
    { x: 85, delay: 4, size: 20 },
    { x: 95, delay: 1.5, size: 14 },
  ]

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
    >
      {/* Balloons */}
      {balloonConfig.map((b, i) => <Balloon key={i} {...b} />)}
      {heartConfig.map((h, i) => <FloatingHeart key={i} {...h} />)}

      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">

        {/* Pre-headline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="font-script text-4xl md:text-5xl text-white mb-2"
          style={{ textShadow: '0 0 20px rgba(200,162,255,0.8), 0 2px 8px rgba(0,0,0,0.15)' }}
        >
          ✨ A Special Day ✨
        </motion.p>

        {/* Happy Birthday */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 1.2, type: 'spring', stiffness: 80 }}
          className="font-script leading-none mb-4"
          style={{
            fontSize: 'clamp(3.5rem, 14vw, 9rem)',
            background: 'linear-gradient(135deg, #fff 0%, #F6D77B 40%, #FFD6EC 70%, #C8A2FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 30px rgba(246,215,123,0.5))',
          }}
        >
          Happy Birthday
        </motion.h1>

        {/* Heart */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.3, 1] }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-5xl mb-4"
          style={{ filter: 'drop-shadow(0 0 10px rgba(255,100,100,0.5))' }}
        >
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'inline-block' }}
          >
            ❤️
          </motion.span>
        </motion.div>

        {/* Typing sub-headline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="font-cormorant text-white mb-8"
          style={{
            fontSize: 'clamp(1.4rem, 5vw, 3rem)',
            textShadow: '0 0 20px rgba(200,162,255,0.6)',
            minHeight: '2.5rem',
            fontStyle: 'italic',
            fontWeight: 300,
          }}
        >
          {typed}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            |
          </motion.span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="font-poppins text-base md:text-lg text-white/80 max-w-lg mb-12 leading-relaxed"
        >
          A site build with love just for my,{' '}
          <span className="font-script text-2xl text-white" style={{ textShadow: '0 0 15px rgba(246,215,123,0.8)' }}>Gulaboo</span>.
          <br />
          Tumhare sath har lamha tumhare jitna hi sundar lagta hai.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.8 }}
          onClick={onBeginJourney}
          className="btn-luxury text-white font-cormorant"
          style={{ fontSize: '1.2rem', letterSpacing: '0.15em' }}
          whileHover={{ scale: 1.05, boxShadow: '0 20px 50px rgba(200,162,255,0.7)' }}
          whileTap={{ scale: 0.97 }}
        >
          ✨ Memories ✨
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="font-poppins text-white/60 text-xs tracking-widest uppercase">Scroll Down</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
        </motion.div>
      </motion.div>

      {/* Soft radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(200,162,255,0.15) 100%)',
        }}
      />
    </section>
  )
}

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// A lantern SVG
const Lantern = ({ color = '#F6D77B', size = 40 }: { color?: string; size?: number }) => (
  <svg width={size * 0.6} height={size} viewBox="0 0 24 40" fill="none">
    <rect x="9" y="0" width="6" height="4" rx="1" fill={color} opacity="0.8" />
    <path d="M4 8 Q3 20 4 30 L20 30 Q21 20 20 8 Z" fill={color} opacity="0.7" />
    <path d="M4 8 L20 8" stroke={color} strokeWidth="1.5" />
    <path d="M4 30 L20 30" stroke={color} strokeWidth="1.5" />
    <rect x="10" y="30" width="4" height="4" fill={color} opacity="0.8" />
    <line x1="12" y1="34" x2="12" y2="40" stroke={color} strokeWidth="1" opacity="0.6" />
    <ellipse cx="12" cy="19" rx="5" ry="7" fill="white" opacity="0.2" />
  </svg>
)

// A star SVG
const Star = ({ size = 16, color = '#F6D77B' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2L14.4 8.5L21.5 8.7L16 13.3L17.9 20.3L12 16.5L6.1 20.3L8 13.3L2.5 8.7L9.6 8.5L12 2Z" />
  </svg>
)

export default function FinalSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const lanternPositions = [
    { x: 8, delay: 0 }, { x: 20, delay: 1.5 }, { x: 35, delay: 3 },
    { x: 50, delay: 0.5 }, { x: 65, delay: 2 }, { x: 78, delay: 1 },
    { x: 90, delay: 2.5 },
  ]

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden section-padding"
      style={{
        background: 'linear-gradient(180deg, #C8A2FF 0%, #B088E0 25%, #8B5FD0 55%, #6B3FB0 80%, #4A2080 100%)',
      }}
    >
      {/* Stars */}
      {Array.from({ length: 60 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${(i * 17.3 + 5) % 100}%`,
            top: `${(i * 13.7 + 3) % 60}%`,
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: 2 + (i % 4),
            delay: (i * 0.3) % 4,
            repeat: Infinity,
          }}
        >
          <Star size={4 + (i % 4) * 3} color={i % 3 === 0 ? '#F6D77B' : '#ffffff'} />
        </motion.div>
      ))}

      {/* Moon */}
      <motion.div
        className="absolute top-12 right-12 md:right-24"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className="w-24 h-24 md:w-32 md:h-32 rounded-full"
            style={{
              background: 'radial-gradient(circle at 35% 35%, #FFF8D0, #F6D77B 50%, #E8C060 100%)',
              boxShadow: '0 0 40px rgba(246,215,123,0.4), 0 0 80px rgba(246,215,123,0.2)',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Floating lanterns */}
      {lanternPositions.map((l, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 pointer-events-none"
          style={{ left: `${l.x}%` }}
          initial={{ y: 0, opacity: 0 }}
          animate={isInView ? {
            y: [0, -(window.innerHeight + 200)],
            opacity: [0, 0.9, 0.9, 0],
            x: [0, 20, -15, 25, 0],
          } : {}}
          transition={{
            duration: 12 + i * 2,
            delay: l.delay + 1,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          <motion.div
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Lantern color="#F6D77B" size={40 + (i % 3) * 10} />
          </motion.div>
        </motion.div>
      ))}

      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto px-6">

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mb-12"
        >
          <p
            className="font-script text-4xl md:text-5xl lg:text-6xl leading-relaxed"
            style={{
              color: '#F6D77B',
              textShadow: '0 0 30px rgba(246,215,123,0.6), 0 0 60px rgba(246,215,123,0.3)',
            }}
          >
            "I'll choose you in every lifetime."
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 1.5 }}
          className="w-48 h-px mb-12"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(246,215,123,0.8), transparent)' }}
        />

        {/* Name message */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 1.8, type: 'spring' }}
          className="font-script text-5xl md:text-7xl mb-3"
          style={{ color: 'white', textShadow: '0 0 40px rgba(200,162,255,0.8)' }}
        >
          Happy Birthday, Gulaboo
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="font-cormorant text-xl md:text-2xl text-white/80 italic mb-10"
        >
          From now until forever, I am yours. ✨
        </motion.p>

        {/* Final button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="btn-luxury"
          style={{
            background: 'linear-gradient(135deg, rgba(246,215,123,0.3), rgba(200,162,255,0.4))',
            backdropFilter: 'blur(16px)',
            border: '2px solid rgba(246,215,123,0.6)',
            color: '#F6D77B',
          }}
          whileHover={{ scale: 1.05, boxShadow: '0 20px 50px rgba(246,215,123,0.4)' }}
          whileTap={{ scale: 0.97 }}
        >
          I Love You Forever ❤️
        </motion.button>

        {/* Floating hearts at bottom */}
        {[0, 1, 2, 3, 4].map(i => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{ bottom: 40, left: `${20 + i * 16}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, rgba(200,162,255,0.6) 0%, transparent 100%)' }}
      />
    </section>
  )
}

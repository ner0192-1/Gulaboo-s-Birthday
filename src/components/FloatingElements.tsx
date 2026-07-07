import { useMemo } from 'react'
import { motion } from 'framer-motion'

// Balloon SVG
const Balloon = ({ color, size, x, y, delay, duration }: {
  color: string; size: number; x: number; y: number; delay: number; duration: number
}) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{
      y: [0, -30, 10, -20, 0],
      x: [0, 15, -10, 20, 0],
      rotate: [-5, 5, -3, 7, -5],
    }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
  >
    <svg width={size} height={size * 1.4} viewBox="0 0 40 56" fill="none">
      <ellipse cx="20" cy="20" rx="18" ry="20" fill={color} opacity="0.55" />
      <ellipse cx="14" cy="12" rx="5" ry="4" fill="white" opacity="0.2" transform="rotate(-30 14 12)" />
      <path d="M20 40 Q22 44 20 48 Q18 44 20 40" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M20 48 Q18 52 22 56 Q24 52 20 48" stroke={color} strokeWidth="1.5" fill="none" opacity="0.35" />
    </svg>
  </motion.div>
)

// Crystal heart SVG
const CrystalHeart = ({ size, x, y, delay }: { size: number; x: number; y: number; delay: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{ y: [0, -25, 0], scale: [0.9, 1.1, 0.9], opacity: [0.4, 0.8, 0.4] }}
    transition={{ duration: 4 + delay, delay, repeat: Infinity, ease: 'easeInOut' }}
  >
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"
        fill="url(#crystalGrad)"
        opacity="0.7"
      />
      <defs>
        <linearGradient id="crystalGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#C8A2FF" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FFD6EC" stopOpacity="0.8" />
        </linearGradient>
      </defs>
    </svg>
  </motion.div>
)

// Ribbon SVG
const Ribbon = ({ size, x, y, delay, color }: { size: number; x: number; y: number; delay: number; color: string }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{ rotate: [0, 360], y: [0, -15, 0] }}
    transition={{ duration: 6 + delay, delay, repeat: Infinity, ease: 'easeInOut' }}
  >
    <svg width={size} height={size * 0.5} viewBox="0 0 40 20" fill="none">
      <path d="M20 10 Q10 0 2 5 Q10 10 2 15 Q10 20 20 10Z" fill={color} opacity="0.6" />
      <path d="M20 10 Q30 0 38 5 Q30 10 38 15 Q30 20 20 10Z" fill={color} opacity="0.6" />
      <circle cx="20" cy="10" r="3" fill={color} opacity="0.8" />
    </svg>
  </motion.div>
)

export default function FloatingElements() {
  const balloons = useMemo(() => [
    { color: '#C8A2FF', size: 36, x: 3, y: 15, delay: 0, duration: 7 },
    { color: '#FFD6EC', size: 28, x: 6, y: 45, delay: 2, duration: 9 },
    { color: 'rgba(255,255,255,0.7)', size: 32, x: 10, y: 70, delay: 1, duration: 8 },
    { color: '#E6D8FF', size: 24, x: 88, y: 25, delay: 3, duration: 10 },
    { color: '#FFD6EC', size: 34, x: 92, y: 55, delay: 0.5, duration: 7.5 },
    { color: '#C8A2FF', size: 26, x: 95, y: 80, delay: 2.5, duration: 9 },
    { color: 'rgba(246,215,123,0.5)', size: 20, x: 50, y: 5, delay: 4, duration: 11 },
  ], [])

  const hearts = useMemo(() => [
    { size: 18, x: 15, y: 30, delay: 0 },
    { size: 14, x: 25, y: 60, delay: 1.5 },
    { size: 22, x: 75, y: 40, delay: 0.7 },
    { size: 16, x: 85, y: 65, delay: 2.2 },
    { size: 12, x: 45, y: 85, delay: 3 },
  ], [])

  const ribbons = useMemo(() => [
    { color: '#C8A2FF', size: 24, x: 20, y: 20, delay: 0 },
    { color: '#F6D77B', size: 20, x: 70, y: 35, delay: 1.8 },
    { color: '#FFD6EC', size: 22, x: 55, y: 75, delay: 0.9 },
  ], [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 3 }}>
      {balloons.map((b, i) => <Balloon key={i} {...b} />)}
      {hearts.map((h, i) => <CrystalHeart key={i} {...h} />)}
      {ribbons.map((r, i) => <Ribbon key={i} {...r} />)}

      {/* Gold confetti raining slowly */}
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={`conf-${i}`}
          className="absolute rounded-sm"
          style={{
            left: `${(i * 9 + 2) % 100}%`,
            top: -10,
            width: 4 + (i % 3) * 2,
            height: 4 + (i % 3) * 2,
            background: ['#F6D77B', '#C8A2FF', '#FFD6EC', '#E6D8FF'][i % 4],
            borderRadius: i % 2 === 0 ? '50%' : '2px',
          }}
          animate={{
            y: ['0vh', '100vh'],
            x: [0, 40 - (i % 5) * 20, -30, 50, 0],
            rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: 15 + (i % 5) * 3,
            delay: i * 1.2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

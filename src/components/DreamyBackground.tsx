import { useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'

export const ButterflyIcon = ({ size = 32, color = '#C8A2FF' }: { size?: number; color?: string }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 60 42" fill="none">
    <ellipse cx="18" cy="16" rx="16" ry="10" fill={color} opacity="0.7" transform="rotate(-20 18 16)" />
    <ellipse cx="42" cy="16" rx="16" ry="10" fill={color} opacity="0.7" transform="rotate(20 42 16)" />
    <ellipse cx="18" cy="30" rx="10" ry="7" fill={color} opacity="0.5" transform="rotate(-10 18 30)" />
    <ellipse cx="42" cy="30" rx="10" ry="7" fill={color} opacity="0.5" transform="rotate(10 42 30)" />
    <path d="M28 12 Q30 20 28 32 Q30 28 32 32 Q30 20 32 12" fill="#9B6FE0" opacity="0.6" />
    <circle cx="30" cy="10" r="3" fill="#9B6FE0" opacity="0.8" />
  </svg>
)

// Deterministic pseudo-random helpers (no Math.random — stable across renders)
const det = (i: number, seed: number) => ((i * 137.508 + seed * 31.41) % 100 + 100) % 100

export default function DreamyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Reduced particle count for performance, still visually rich
  const sparkles = useMemo(() => {
    const colors = ['#C8A2FF', '#FFD6EC', '#F6D77B', '#E6D8FF', '#ffffff', '#B88BFF']
    return Array.from({ length: 24 }, (_, i) => ({
      id: i, x: det(i, 1), y: det(i, 2),
      size: (i % 3) + 3, color: colors[i % colors.length],
      duration: 4 + (i % 6), delay: (i % 8) * 0.6,
    }))
  }, [])

  const petals = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i, x: det(i, 3),
      size: (i % 3) + 3,
      duration: 14 + (i % 6) * 2, delay: i * 1.2,
      color: i % 2 === 0 ? '#FFD6EC' : '#E6D8FF',
    })), [])

  const clouds = useMemo(() =>
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: (i * 22) % 110 - 10,
      y: 4 + (i * 9) % 30,
      width: 220 + (i * 60) % 180,
      opacity: 0.25 + (i % 4) * 0.06,
      duration: 90 + i * 25,
      delay: -(i * 15),
    })), [])

  // Firefly canvas — GPU accelerated via willReadFrequently: false
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: false })
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    // Deterministic-ish seed for fireflies (avoids Math.random differences)
    const fireflies = Array.from({ length: 20 }, (_, i) => ({
      x: (i * 157.3) % canvas.width,
      y: (i * 113.7) % canvas.height,
      vx: ((i % 5) - 2) * 0.4,
      vy: ((i % 3) - 1) * 0.4,
      size: 1.5 + (i % 3),
      alpha: (i % 10) / 10,
      alphaDir: (i % 2 === 0 ? 1 : -1) * 0.015,
      hue: 50 + (i * 8) % 40,
    }))

    let frame: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      fireflies.forEach(f => {
        f.x += f.vx; f.y += f.vy
        f.alpha += f.alphaDir
        if (f.alpha >= 1 || f.alpha <= 0) f.alphaDir *= -1
        if (f.x < 0) f.x = canvas.width
        if (f.x > canvas.width) f.x = 0
        if (f.y < 0) f.y = canvas.height
        if (f.y > canvas.height) f.y = 0

        const r = f.size * 5
        const grd = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, r)
        grd.addColorStop(0, `hsla(${f.hue},100%,80%,${f.alpha * 0.8})`)
        grd.addColorStop(1, `hsla(${f.hue},100%,80%,0)`)
        ctx.beginPath(); ctx.arc(f.x, f.y, r, 0, Math.PI * 2)
        ctx.fillStyle = grd; ctx.fill()
        ctx.beginPath(); ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${f.hue},100%,90%,${f.alpha})`; ctx.fill()
      })
      frame = requestAnimationFrame(animate)
    }
    animate()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(frame) }
  }, [])

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0, willChange: 'transform' }}
    >
      {/* Sky gradient */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(170deg, #EAD9FF 0%, #D4B8FF 25%, #C8A2FF 55%, #E6D8FF 80%, #F8F4FF 100%)',
      }} />

      {/* Radial glows — static, no animation = faster */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(246,215,123,0.13) 0%, transparent 70%)',
      }} />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 60% 50% at 80% 70%, rgba(255,214,236,0.18) 0%, transparent 70%)',
      }} />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 70% 40% at 50% 10%, rgba(255,255,255,0.35) 0%, transparent 70%)',
      }} />

      {/* Light rays — will-change: opacity only */}
      {[15, 45, 72].map((left, i) => (
        <motion.div
          key={i}
          className="absolute top-0"
          style={{
            left: `${left}%`, width: 60, height: '100vh',
            background: `linear-gradient(180deg, rgba(246,215,123,${0.1 + i * 0.04}) 0%, transparent 80%)`,
            transform: `rotate(${-6 + i * 6}deg)`,
            transformOrigin: 'top center',
            filter: 'blur(20px)',
            willChange: 'opacity',
          }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Clouds */}
      {clouds.map(c => (
        <motion.div
          key={c.id}
          className="absolute"
          style={{
            top: `${c.y}%`, width: c.width, height: c.width * 0.38,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.25) 70%, transparent 100%)',
            filter: 'blur(18px)', opacity: c.opacity,
            willChange: 'transform',
          }}
          initial={{ x: `${c.x}vw` }}
          animate={{ x: [`${c.x}vw`, `${c.x + 25}vw`, `${c.x}vw`] }}
          transition={{ duration: c.duration, delay: c.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Bokeh — only 10 (was 20) */}
      {Array.from({ length: 10 }, (_, i) => (
        <motion.div
          key={`bk${i}`}
          className="absolute rounded-full"
          style={{
            left: `${det(i, 5)}%`, top: `${det(i, 6)}%`,
            width: 20 + (i % 5) * 14, height: 20 + (i % 5) * 14,
            background: `radial-gradient(circle, ${['rgba(200,162,255,0.28)','rgba(246,215,123,0.18)','rgba(255,214,236,0.22)','rgba(255,255,255,0.28)'][i % 4]} 0%, transparent 70%)`,
            filter: 'blur(5px)', willChange: 'opacity, transform',
          }}
          animate={{ scale: [1, 1.35, 1], opacity: [0.25, 0.65, 0.25] }}
          transition={{ duration: 4 + (i % 5), delay: (i * 0.5) % 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Sparkles */}
      {sparkles.map(p => (
        <motion.div
          key={`sp${p.id}`}
          className="absolute"
          style={{ left: `${p.x}%`, top: `${p.y}%`, willChange: 'transform, opacity' }}
          animate={{ scale: [0, 1, 0], rotate: [0, 180, 360], opacity: [0, 1, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width={p.size * 5} height={p.size * 5} viewBox="0 0 24 24" fill="none">
            <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill={p.color} opacity="0.9" />
          </svg>
        </motion.div>
      ))}

      {/* Petals */}
      {petals.map(p => (
        <motion.div
          key={`pt${p.id}`}
          className="absolute"
          style={{ left: `${p.x}%`, top: -20, willChange: 'transform, opacity' }}
          animate={{ y: ['0vh', '110vh'], x: [0, 50, -35, 60, 0], rotate: [0, 720], opacity: [0, 0.8, 0.8, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
        >
          <svg width={p.size * 4} height={p.size * 6} viewBox="0 0 20 30" fill="none">
            <ellipse cx="10" cy="15" rx="7" ry="12" fill={p.color} opacity="0.75" transform="rotate(-15 10 15)" />
          </svg>
        </motion.div>
      ))}

      {/* Firefly canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* 2 butterflies (was 3) */}
      {[0, 1].map(i => (
        <motion.div
          key={`bf${i}`}
          className="absolute"
          style={{ top: `${25 + i * 30}%`, willChange: 'transform' }}
          animate={{ x: ['-80px', 'calc(100vw + 80px)'], y: [0, -50, 20, -40, 0] }}
          transition={{ duration: 18 + i * 10, delay: i * 14, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            animate={{ scaleY: [1, 0.25, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ButterflyIcon size={28 + i * 8} color={['#C8A2FF', '#FFD6EC'][i]} />
          </motion.div>
        </motion.div>
      ))}

      {/* Bottom fog */}
      <div className="absolute bottom-0 left-0 right-0" style={{
        height: '25vh',
        background: 'linear-gradient(0deg, rgba(248,244,255,0.45) 0%, transparent 100%)',
      }} />
    </div>
  )
}

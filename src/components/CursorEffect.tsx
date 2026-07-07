import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface TrailHeart {
  id: number
  x: number
  y: number
}

export default function CursorEffect() {
  const [pos, setPos] = useState({ x: -200, y: -200 })
  const [hearts, setHearts] = useState<TrailHeart[]>([])
  const [isHovering, setIsHovering] = useState(false)
  const nextId = useRef(0)
  const lastHeart = useRef({ x: -999, y: -999 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })

      // detect if over a button/link
      const el = e.target as HTMLElement
      setIsHovering(
        el.tagName === 'BUTTON' ||
        el.tagName === 'A' ||
        el.closest('button') !== null ||
        el.closest('a') !== null
      )

      const dx = e.clientX - lastHeart.current.x
      const dy = e.clientY - lastHeart.current.y
      if (Math.hypot(dx, dy) > 45) {
        const id = nextId.current++
        setHearts(prev => [...prev.slice(-12), { id, x: e.clientX, y: e.clientY }])
        lastHeart.current = { x: e.clientX, y: e.clientY }
        setTimeout(() => setHearts(prev => prev.filter(h => h.id !== id)), 1200)
      }
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 99999 }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: isHovering ? 70 : 56,
          height: isHovering ? 70 : 56,
          background: isHovering
            ? 'radial-gradient(circle, rgba(246,215,123,0.55) 0%, rgba(246,215,123,0.15) 55%, transparent 75%)'
            : 'radial-gradient(circle, rgba(200,162,255,0.55) 0%, rgba(200,162,255,0.15) 55%, transparent 75%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(3px)',
          transition: 'width 0.2s ease, height 0.2s ease, background 0.3s ease',
        }}
        animate={{ left: pos.x, top: pos.y }}
        transition={{ type: 'spring', stiffness: 450, damping: 38, mass: 0.08 }}
      />

      {/* Middle ring (visible on buttons) */}
      <motion.div
        className="absolute rounded-full border-2"
        style={{
          width: isHovering ? 48 : 0,
          height: isHovering ? 48 : 0,
          borderColor: 'rgba(246,215,123,0.7)',
          transform: 'translate(-50%, -50%)',
          opacity: isHovering ? 1 : 0,
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.2s ease',
        }}
        animate={{ left: pos.x, top: pos.y }}
        transition={{ type: 'spring', stiffness: 420, damping: 36, mass: 0.08 }}
      />

      {/* Inner dot */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: isHovering ? 20 : 14,
          height: isHovering ? 20 : 14,
          background: isHovering
            ? 'linear-gradient(135deg, #F6D77B, #FFD6EC)'
            : 'linear-gradient(135deg, #C8A2FF, #F6D77B)',
          transform: 'translate(-50%, -50%)',
          boxShadow: isHovering
            ? '0 0 16px rgba(246,215,123,0.9), 0 0 30px rgba(246,215,123,0.5)'
            : '0 0 14px rgba(200,162,255,0.9), 0 0 26px rgba(200,162,255,0.4)',
          transition: 'width 0.15s ease, height 0.15s ease, box-shadow 0.3s ease',
        }}
        animate={{ left: pos.x, top: pos.y }}
        transition={{ type: 'spring', stiffness: 750, damping: 48, mass: 0.04 }}
      />

      {/* Heart trail */}
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          className="absolute pointer-events-none select-none"
          style={{ left: heart.x, top: heart.y, transform: 'translate(-50%, -50%)', fontSize: 16 }}
          initial={{ scale: 0, opacity: 1, y: 0 }}
          animate={{ scale: [0, 1.3, 0.9], opacity: [1, 0.9, 0], y: -55 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  )
}

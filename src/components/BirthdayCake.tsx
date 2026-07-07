import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Age: born 08/07/1999, turning 27 in 2026 ─────────────────────────────
const AGE = 27

// ─── Candle component (digit-shaped via segments) ──────────────────────────
// We'll render the age as two big number candles made of wax + flame
const DIGIT_COLORS = [
  { body: '#C8A2FF', stripe: '#B88BFF', flame: '#F6D77B', glow: 'rgba(246,215,123,0.8)' },
  { body: '#FFD6EC', stripe: '#F4AECB', flame: '#FF9B6B', glow: 'rgba(255,155,107,0.8)' },
]

interface CandleProps {
  digit: string
  colorIdx: number
  isLit: boolean
  index: number
}

function Candle({ digit, colorIdx, isLit, index }: CandleProps) {
  const c = DIGIT_COLORS[colorIdx % 2]
  const width = 52
  const height = 120
  const segW = width * 0.22
  const halfH = height * 0.44

  // Seven-segment display
  const segs: Record<string, boolean> = {
    top:    ['0','2','3','5','6','7','8','9'].includes(digit),
    mid:    ['2','3','4','5','6','8','9'].includes(digit),
    bot:    ['0','2','3','5','6','8','9'].includes(digit),
    topL:   ['0','4','5','6','8','9'].includes(digit),
    botL:   ['0','2','6','8'].includes(digit),
    topR:   ['0','1','2','3','4','7','8','9'].includes(digit),
    botR:   ['0','1','3','4','5','6','7','8','9'].includes(digit),
  }

  const segStyle = (on: boolean) => ({
    background: on ? `linear-gradient(135deg, ${c.body}, ${c.stripe})` : 'rgba(200,162,255,0.15)',
    borderRadius: 4,
    boxShadow: on && isLit ? `0 0 8px ${c.glow}` : 'none',
    transition: 'all 0.3s ease',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.6, type: 'spring', stiffness: 80 }}
      className="relative flex flex-col items-center"
    >
      {/* Flame */}
      <AnimatePresence>
        {isLit && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 mb-1"
            style={{ height: 44 }}
          >
            {/* Glow */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 30, height: 30,
                background: `radial-gradient(circle, ${c.glow.replace('0.8', '0.4')} 0%, transparent 70%)`,
                top: 8, left: '50%', transform: 'translateX(-50%)',
                filter: 'blur(8px)',
              }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 0.9, repeat: Infinity }}
            />
            {/* Outer flame */}
            <motion.div
              style={{
                width: 18, height: 34,
                background: `linear-gradient(0deg, #FF8C00 0%, ${c.flame} 50%, rgba(255,255,200,0.9) 100%)`,
                borderRadius: '50% 50% 40% 40% / 60% 60% 40% 40%',
                position: 'absolute',
                left: '50%', bottom: 0,
                transform: 'translateX(-50%)',
                filter: 'blur(1px)',
              }}
              animate={{
                scaleX: [1, 0.85, 1.1, 0.9, 1],
                scaleY: [1, 1.08, 0.95, 1.05, 1],
                rotate: [-3, 3, -2, 4, -3],
              }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Inner flame */}
            <motion.div
              style={{
                width: 9, height: 20,
                background: 'linear-gradient(0deg, #FFE4A0, white)',
                borderRadius: '50% 50% 40% 40% / 60% 60% 40% 40%',
                position: 'absolute',
                left: '50%', bottom: 3,
                transform: 'translateX(-50%)',
              }}
              animate={{ scaleX: [1, 0.8, 1.1, 0.9, 1], scaleY: [1, 1.1, 0.9, 1.05, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
            />
          </motion.div>
        )}
        {!isLit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-1 text-center"
            style={{ height: 44, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
          >
            {/* Smoke wisps */}
            <motion.div
              animate={{ y: [0, -20, -40], opacity: [0.6, 0.3, 0], scaleX: [1, 1.5, 2] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              style={{
                width: 3, height: 16,
                background: 'linear-gradient(0deg, rgba(180,180,200,0.6), transparent)',
                borderRadius: 2,
                filter: 'blur(2px)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Candle body — seven-segment style */}
      <div
        className="relative rounded-lg overflow-hidden"
        style={{
          width, height,
          background: `linear-gradient(145deg, ${c.body}, ${c.stripe})`,
          boxShadow: isLit
            ? `0 0 20px ${c.glow}, 0 4px 15px rgba(0,0,0,0.15)`
            : '0 4px 15px rgba(0,0,0,0.1)',
          transition: 'box-shadow 0.5s ease',
        }}
      >
        {/* Wax drip stripes */}
        {[0.25, 0.55, 0.8].map((x, j) => (
          <div key={j} className="absolute" style={{
            left: `${x * 100}%`, top: 0, width: 6, height: `${30 + j * 12}%`,
            background: 'rgba(255,255,255,0.3)', borderRadius: '0 0 4px 4px',
          }} />
        ))}

        {/* Seven-segment digit overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div style={{ position: 'relative', width: width * 0.75, height: height * 0.85 }}>
            {/* Top segment */}
            <div style={{ ...segStyle(segs.top), position: 'absolute', top: 0, left: segW, right: segW, height: segW * 0.7 }} />
            {/* Mid segment */}
            <div style={{ ...segStyle(segs.mid), position: 'absolute', top: halfH - segW * 0.35, left: segW, right: segW, height: segW * 0.7 }} />
            {/* Bot segment */}
            <div style={{ ...segStyle(segs.bot), position: 'absolute', bottom: 0, left: segW, right: segW, height: segW * 0.7 }} />
            {/* Top-left */}
            <div style={{ ...segStyle(segs.topL), position: 'absolute', top: segW * 0.35, left: 0, width: segW * 0.7, height: halfH - segW * 0.7 }} />
            {/* Bot-left */}
            <div style={{ ...segStyle(segs.botL), position: 'absolute', top: halfH + segW * 0.35, left: 0, width: segW * 0.7, height: halfH - segW * 0.7 }} />
            {/* Top-right */}
            <div style={{ ...segStyle(segs.topR), position: 'absolute', top: segW * 0.35, right: 0, width: segW * 0.7, height: halfH - segW * 0.7 }} />
            {/* Bot-right */}
            <div style={{ ...segStyle(segs.botR), position: 'absolute', top: halfH + segW * 0.35, right: 0, width: segW * 0.7, height: halfH - segW * 0.7 }} />
          </div>
        </div>

        {/* Shimmer overlay */}
        {isLit && (
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
            }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>

      {/* Wick */}
      <div style={{ width: 3, height: 8, background: '#5a3a1a', borderRadius: 2, marginTop: -2 }} />
    </motion.div>
  )
}

// ─── Cake Tier ────────────────────────────────────────────────────────────────
function CakeTier({ width, height, color1, color2, stripeColor, delay }: {
  width: number; height: number; color1: string; color2: string; stripeColor: string; delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.7, y: 20 }}
      animate={{ opacity: 1, scaleX: 1, y: 0 }}
      transition={{ delay, duration: 0.7, type: 'spring', stiffness: 80 }}
      className="relative overflow-hidden"
      style={{
        width, height,
        background: `linear-gradient(145deg, ${color1}, ${color2})`,
        borderRadius: '12px 12px 4px 4px',
        boxShadow: '0 8px 30px rgba(200,162,255,0.3), inset 0 2px 0 rgba(255,255,255,0.5)',
      }}
    >
      {/* Decorative stripes */}
      {Array.from({ length: Math.floor(width / 30) }, (_, i) => (
        <div key={i} style={{
          position: 'absolute', left: i * 30 + 10, top: 0, bottom: 0,
          width: 3, background: stripeColor, opacity: 0.35, borderRadius: 2,
        }} />
      ))}
      {/* Frosting drip on top */}
      {Array.from({ length: Math.floor(width / 24) }, (_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute', top: 0, left: i * 24 + 4,
            width: 14, height: 12 + (i % 3) * 6,
            background: 'rgba(255,255,255,0.7)',
            borderRadius: '0 0 50% 50%',
          }}
          animate={{ scaleY: [1, 1.05, 1] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
        />
      ))}
      {/* Pearl decorations */}
      {Array.from({ length: Math.floor(width / 18) }, (_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: i * 18 + 8, top: '40%',
          width: 7, height: 7, borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, white, rgba(200,162,255,0.7))',
          boxShadow: '0 2px 6px rgba(200,162,255,0.4)',
        }} />
      ))}
    </motion.div>
  )
}

// ─── Confetti burst after blowing ─────────────────────────────────────────────
function ConfettiBurst() {
  return (
    <>
      {Array.from({ length: 50 }, (_, i) => {
        const angle = (i / 50) * Math.PI * 2
        const dist = 80 + (i % 5) * 40
        return (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{
              left: '50%', top: '40%',
              width: 6 + (i % 3) * 3,
              height: 6 + (i % 3) * 3,
              borderRadius: i % 3 === 0 ? '50%' : '2px',
              background: ['#C8A2FF','#F6D77B','#FFD6EC','#E6D8FF','#fff','#B88BFF'][i % 6],
            }}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist - 60,
              scale: [0, 1, 0.7],
              opacity: [1, 1, 0],
              rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
            }}
            transition={{ duration: 1.4, delay: i * 0.01, ease: 'easeOut' }}
          />
        )
      })}
    </>
  )
}

// ─── Main Birthday Cake ────────────────────────────────────────────────────────
export default function BirthdayCake() {
  const [candlesLit, setCandlesLit] = useState(true)
  const [blown, setBlown] = useState(false)
  const [micActive, setMicActive] = useState(false)
  const [micError, setMicError] = useState(false)
  const [blowProgress, setBlowProgress] = useState(0)
  const [celebrating, setCelebrating] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const frameRef = useRef<number>(0)
  const progressRef = useRef(0)

  const digits = String(AGE).split('')

  const stopMic = useCallback(() => {
    cancelAnimationFrame(frameRef.current)
    streamRef.current?.getTracks().forEach(t => t.stop())
    audioCtxRef.current?.close()
    setMicActive(false)
    setBlowProgress(0)
    progressRef.current = 0
  }, [])

  const startMic = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const ctx = new AudioContext()
      audioCtxRef.current = ctx
      const analyser = ctx.createAnalyser()
      analyserRef.current = analyser
      analyser.fftSize = 256
      const source = ctx.createMediaStreamSource(stream)
      source.connect(analyser)
      setMicActive(true)
      setMicError(false)

      const buf = new Uint8Array(analyser.frequencyBinCount)
      const THRESH = 72   // lower = easier to trigger (normal phone mic blowing)
      const HOLD = 14     // frames to hold before extinguishing

      let holdFrames = 0

      const detect = () => {
        analyser.getByteFrequencyData(buf)
        // Focus on low-mid frequencies (50–400 Hz) — breath/blow band
        const lo = Math.floor((50 / (ctx.sampleRate / 2)) * buf.length)
        const hi = Math.floor((400 / (ctx.sampleRate / 2)) * buf.length)
        let sum = 0
        for (let i = lo; i < hi; i++) sum += buf[i]
        const avg = sum / (hi - lo)

        if (avg > THRESH) {
          holdFrames++
          progressRef.current = Math.min(1, holdFrames / HOLD)
          setBlowProgress(progressRef.current)
          if (holdFrames >= HOLD) {
            setCandlesLit(false)
            setBlown(true)
            setCelebrating(true)
            stopMic()
            setTimeout(() => setCelebrating(false), 3000)
            return
          }
        } else {
          holdFrames = Math.max(0, holdFrames - 1)
          progressRef.current = Math.max(0, holdFrames / HOLD)
          setBlowProgress(progressRef.current)
        }

        frameRef.current = requestAnimationFrame(detect)
      }

      frameRef.current = requestAnimationFrame(detect)
    } catch {
      setMicError(true)
    }
  }, [stopMic])

  // Cleanup on unmount
  useEffect(() => () => stopMic(), [stopMic])

  const relight = () => {
    setCandlesLit(true)
    setBlown(false)
    setBlowProgress(0)
  }

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="max-w-2xl mx-auto">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-poppins text-sm tracking-[0.3em] uppercase mb-3 font-semibold"
            style={{ color: '#7C3AED', textShadow: '0 1px 4px rgba(255,255,255,0.8)' }}>
            Make a Wish
          </p>
          <h2 className="font-script" style={{
            fontSize: 'clamp(2.4rem, 8vw, 4.5rem)',
            color: '#5B21B6',
            textShadow: '0 2px 12px rgba(255,255,255,0.9), 0 0 30px rgba(200,162,255,0.5)',
          }}>
            Happy 27th Birthday, Gulaboo!
          </h2>
          <p className="font-cormorant text-lg text-purple-500/80 mt-2 italic">
            Blow the candles with your mic 🎤
          </p>
        </motion.div>

        {/* Cake display */}
        <div className="flex flex-col items-center gap-0">

          {/* Candles row */}
          <motion.div
            className="flex items-end gap-4 mb-2 relative"
            style={{ zIndex: 2 }}
          >
            {/* Confetti burst */}
            <AnimatePresence>{celebrating && <ConfettiBurst />}</AnimatePresence>

            {digits.map((d, i) => (
              <Candle key={i} digit={d} colorIdx={i} isLit={candlesLit} index={i} />
            ))}
          </motion.div>

          {/* Top tier (smallest) */}
          <CakeTier
            width={200} height={55}
            color1="#F8F0FF" color2="#EAD9FF"
            stripeColor="#C8A2FF"
            delay={0.2}
          />

          {/* Middle tier */}
          <CakeTier
            width={280} height={65}
            color1="#FFD6EC" color2="#F4AECB"
            stripeColor="#F6D77B"
            delay={0.35}
          />

          {/* Base tier */}
          <CakeTier
            width={340} height={80}
            color1="#EAD9FF" color2="#C8A2FF"
            stripeColor="#B88BFF"
            delay={0.5}
          />

          {/* Cake plate */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.5 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            style={{
              width: 380, height: 22,
              background: 'linear-gradient(145deg, rgba(255,255,255,0.8), rgba(200,162,255,0.4))',
              borderRadius: '50% 50% 8px 8px',
              boxShadow: '0 6px 20px rgba(200,162,255,0.35)',
            }}
          />
        </div>

        {/* Blow progress bar */}
        <AnimatePresence>
          {micActive && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 max-w-xs mx-auto"
            >
              <p className="font-poppins text-sm text-purple-500 text-center mb-2">
                {blowProgress > 0.5 ? '💨 Keep blowing!' : '🎤 Blow into your mic...'}
              </p>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(200,162,255,0.2)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #C8A2FF, #F6D77B)',
                    width: `${blowProgress * 100}%`,
                  }}
                  animate={{ width: `${blowProgress * 100}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          {!blown ? (
            <>
              {!micActive ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={startMic}
                  disabled={!candlesLit}
                  className="btn-luxury"
                  style={{ opacity: candlesLit ? 1 : 0.5 }}
                >
                  🎤 Use Mic to Blow
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={stopMic}
                  className="btn-luxury"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,100,100,0.4), rgba(200,162,255,0.4))',
                    border: '2px solid rgba(255,100,100,0.4)',
                  }}
                >
                  🛑 Stop Mic
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => { setCandlesLit(false); setBlown(true); setCelebrating(true); setTimeout(() => setCelebrating(false), 3000) }}
                className="btn-luxury"
                style={{
                  background: 'rgba(255,255,255,0.4)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(200,162,255,0.5)',
                  color: '#9B6FE0',
                }}
              >
                💨 Blow (Click)
              </motion.button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <p className="font-script text-4xl text-purple-500 mb-2" style={{
                  textShadow: '0 0 20px rgba(200,162,255,0.5)',
                }}>
                  Your wish will come true! ✨
                </p>
                <p className="font-cormorant text-lg text-purple-400/80 italic">
                  Love you, Gulaboo 💕
                </p>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={relight}
                className="btn-luxury"
              >
                🕯️ Relight Candles
              </motion.button>
            </div>
          )}
        </div>

        {/* Mic error */}
        {micError && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center font-poppins text-sm text-red-400/80 mt-4"
          >
            Microphone access denied. Please use the "Blow (Click)" button instead 💕
          </motion.p>
        )}
      </div>
    </section>
  )
}

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function getTimeUntilNextBirthday(month: number, day: number) {
  const now = new Date()
  const thisYear = new Date(now.getFullYear(), month - 1, day)
  const nextBirthday = thisYear <= now
    ? new Date(now.getFullYear() + 1, month - 1, day)
    : thisYear

  const diff = nextBirthday.getTime() - now.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  return { days, hours, minutes, seconds }
}

// Gulaboo's birthday: July 8
const BIRTHDAY_MONTH = 7
const BIRTHDAY_DAY = 8

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      whileHover={{ scale: 1.05 }}
    >
      <div
        className="relative rounded-2xl flex items-center justify-center mb-1.5"
        style={{
          width: 'clamp(60px, 18vw, 96px)',
          height: 'clamp(60px, 18vw, 96px)',
          background: 'rgba(255,255,255,0.5)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(200,162,255,0.5)',
          boxShadow: '0 8px 30px rgba(200,162,255,0.25)',
        }}
      >
        <motion.span
          key={value}
          initial={{ y: -14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: 'clamp(1.25rem, 5vw, 2.25rem)',
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #B88BFF, #C8A2FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {String(value).padStart(2, '0')}
        </motion.span>

        {/* Glow pulse */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{ boxShadow: ['0 0 0 0 rgba(200,162,255,0.2)', '0 0 0 8px rgba(200,162,255,0)', '0 0 0 0 rgba(200,162,255,0)'] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <p
        className="font-poppins uppercase text-purple-400/70 text-center"
        style={{ fontSize: 'clamp(0.55rem, 2vw, 0.75rem)', letterSpacing: '0.15em' }}
      >
        {label}
      </p>
    </motion.div>
  )
}

export default function Countdown() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [time, setTime] = useState(getTimeUntilNextBirthday(BIRTHDAY_MONTH, BIRTHDAY_DAY))

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getTimeUntilNextBirthday(BIRTHDAY_MONTH, BIRTHDAY_DAY))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const isToday = time.days === 0 && time.hours === 0

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="max-w-3xl mx-auto">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-poppins text-sm tracking-[0.3em] uppercase mb-3 font-semibold"
            style={{ color: '#7C3AED', textShadow: '0 1px 4px rgba(255,255,255,0.8)' }}>
            Counting Down
          </p>
          <h2 className="font-script" style={{
            fontSize: 'clamp(2rem, 8vw, 4.5rem)',
            color: '#5B21B6',
            textShadow: '0 2px 12px rgba(255,255,255,0.9), 0 0 30px rgba(200,162,255,0.5)',
          }}>
            {isToday ? "Happy Birthday, Gulaboo! 🎉" : "Until Gulaboo's Birthday"}
          </h2>
        </motion.div>

        {/* Countdown display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center items-start px-2 w-full"
          style={{ gap: 'clamp(4px, 2vw, 28px)' }}
        >
          <CountdownUnit value={time.days} label="Days" />
          <div
            className="font-playfair text-purple-300 self-start"
            style={{ fontSize: 'clamp(1.2rem, 5vw, 1.875rem)', marginTop: 'clamp(14px, 4vw, 24px)' }}
          >:</div>
          <CountdownUnit value={time.hours} label="Hours" />
          <div
            className="font-playfair text-purple-300 self-start"
            style={{ fontSize: 'clamp(1.2rem, 5vw, 1.875rem)', marginTop: 'clamp(14px, 4vw, 24px)' }}
          >:</div>
          <CountdownUnit value={time.minutes} label="Mins" />
          <div
            className="font-playfair text-purple-300 self-start"
            style={{ fontSize: 'clamp(1.2rem, 5vw, 1.875rem)', marginTop: 'clamp(14px, 4vw, 24px)' }}
          >:</div>
          <CountdownUnit value={time.seconds} label="Secs" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="font-cormorant text-xl text-center mt-10 text-purple-500/80 italic"
        >
          Every second I count is another moment I get to love you 💕
        </motion.p>
      </div>
    </section>
  )
}

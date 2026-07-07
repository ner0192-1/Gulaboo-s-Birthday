import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const WISH_LINES = [
  'May every dream you carry',
  'blossom into something more beautiful',
  'than you ever imagined possible.',
  '',
  'May your days be filled with soft light,',
  'gentle laughter, and hearts full of love.',
  '',
  'May you always know',
  'how deeply, endlessly, and completely',
  'you are loved — by me, and by life itself.',
  '',
  'Happy Birthday, Gulaboo.',
  'Here is to you — today and forever. 🥂',
]

export default function BirthdayWishes() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding relative overflow-hidden" ref={ref}>
      {/* Falling petals */}
      {Array.from({ length: 16 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none text-lg"
          style={{ left: `${(i * 7.3) % 100}%`, top: -40 }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, 50 - (i % 3) * 30, -30, 40, 0],
            rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: 10 + (i % 5) * 2,
            delay: i * 0.8,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {['🌸', '🌺', '💮', '🌷'][i % 4]}
        </motion.div>
      ))}

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-poppins text-sm tracking-[0.3em] uppercase mb-3 font-semibold"
            style={{ color: '#7C3AED', textShadow: '0 1px 4px rgba(255,255,255,0.8)' }}>
            With All My Heart
          </p>
          <h2 className="font-script" style={{
            fontSize: 'clamp(2.8rem, 10vw, 5rem)',
            color: '#5B21B6',
            textShadow: '0 2px 12px rgba(255,255,255,0.9), 0 0 30px rgba(200,162,255,0.5)',
          }}>
            Birthday Wishes
          </h2>
        </motion.div>

        {/* Wishes card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.3, type: 'spring', stiffness: 60 }}
          className="rounded-3xl p-10 md:p-14 relative overflow-hidden text-center"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.7) 0%, rgba(248,244,255,0.6) 100%)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(200,162,255,0.4)',
            boxShadow: '0 30px 80px rgba(200,162,255,0.2)',
          }}
        >
          {/* Top sparkle */}
          <motion.div
            className="absolute top-4 right-4 text-2xl"
            animate={{ rotate: 360, scale: [1, 1.3, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          >
            ✨
          </motion.div>
          <motion.div
            className="absolute bottom-4 left-4 text-2xl"
            animate={{ rotate: -360, scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            🌟
          </motion.div>

          {/* Wish lines */}
          {WISH_LINES.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
              className={line === '' ? 'py-3' : 'font-cormorant text-xl md:text-2xl text-purple-700 leading-relaxed italic'}
            >
              {line || ' '}
            </motion.p>
          ))}

          {/* Animated handwriting underline */}
          <motion.div
            className="mt-8 mx-auto"
            style={{ maxWidth: 200 }}
          >
            <svg viewBox="0 0 200 20" fill="none" className="w-full">
              <motion.path
                d="M10 10 Q50 5 100 10 Q150 15 190 10"
                stroke="url(#wishGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.5, delay: 2 }}
              />
              <defs>
                <linearGradient id="wishGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#C8A2FF" />
                  <stop offset="50%" stopColor="#F6D77B" />
                  <stop offset="100%" stopColor="#FFD6EC" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const letterLines = [
  'My Dearest Gulaboo,',
  '',
  'I may not be with you this year on your birthday but on this beautiful day,I want you to know that every single moment I have spent with you has been the greatest gift life could ever offer me.You are not just my bebu — you are my home, my peace, my adventure, and my greatest joy.',
  '',
  'Your smile lights up the darkest rooms. Your laughter is the most beautiful sound I have ever heard.Your kindness touches everyone around you,and your love for me makes me feel like the luckiest person in the entire universe.',
  '',
  'Every day with you is a dream I never want to wake from.I promise to love you more with every sunrise,to hold your hand through every storm,and to celebrate every single moment of this magical life we are building together.',
  '',
  'Happy Birthday,My beautiful Gulaboo. 🌸',
  'May this year bring you everything your heart desires.',
  '',
  'Forever and always yours,',
  'Your Neon ❤️',
]

export default function LoveLetter() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="max-w-3xl mx-auto">

        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-poppins text-sm tracking-[0.3em] uppercase mb-3 font-semibold"
            style={{ color: '#7C3AED', textShadow: '0 1px 4px rgba(255,255,255,0.8)' }}>
            A Note From My Heart
          </p>
          <h2 className="font-script" style={{
            fontSize: 'clamp(2.8rem, 10vw, 5rem)',
            color: '#5B21B6',
            textShadow: '0 2px 12px rgba(255,255,255,0.9), 0 0 30px rgba(200,162,255,0.5)',
          }}>
            My Love Letter
          </h2>
        </motion.div>

        {/* The letter card */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3, type: 'spring', stiffness: 60 }}
          className="relative"
        >
          {/* Paper background */}
          <div
            className="relative rounded-2xl p-8 md:p-12 overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(248,244,255,0.92) 50%, rgba(255,250,255,0.95) 100%)',
              boxShadow: '0 30px 80px rgba(184,139,255,0.2), 0 10px 30px rgba(200,162,255,0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
              border: '1px solid rgba(200,162,255,0.3)',
            }}
          >
            {/* Golden border decoration */}
            <div
              className="absolute inset-3 rounded-xl pointer-events-none"
              style={{
                border: '1px solid',
                borderImage: 'linear-gradient(135deg, rgba(246,215,123,0.6), rgba(200,162,255,0.4), rgba(255,214,236,0.5), rgba(246,215,123,0.6)) 1',
                borderRadius: '12px',
              }}
            />

            {/* Corner decorations */}
            {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
              <div key={i} className={`absolute ${pos} text-2xl opacity-40`} style={{ fontSize: '1.5rem' }}>
                🌸
              </div>
            ))}

            {/* Paper texture lines */}
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className="absolute left-8 right-8 pointer-events-none"
                style={{
                  top: `${80 + i * 38}px`,
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(200,162,255,0.1), transparent)',
                }}
              />
            ))}

            {/* Letter content */}
            <div className="relative z-10 space-y-1">
              {letterLines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.06 }}
                  className={`${
                    i === 0
                      ? 'font-script text-3xl md:text-4xl text-purple-400 mb-4'
                      : line === ''
                      ? 'py-2'
                      : i >= letterLines.length - 3
                      ? 'font-script text-2xl text-purple-400'
                      : 'font-cormorant text-lg md:text-xl text-gray-600 leading-relaxed'
                  }`}
                  style={
                    i === 0 || i >= letterLines.length - 3
                      ? { color: '#9B6FE0' }
                      : { color: '#6b5b7b' }
                  }
                >
                  {line || ' '}
                </motion.p>
              ))}
            </div>

            {/* Wax seal */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ delay: 1.8, duration: 0.8, type: 'spring' }}
              className="flex justify-center mt-8"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                style={{
                  background: 'radial-gradient(circle, #C8A2FF 0%, #9B6FE0 100%)',
                  boxShadow: '0 4px 15px rgba(155,111,224,0.4)',
                }}
              >
                ❤️
              </div>
            </motion.div>
          </div>

          {/* Floating petals around letter */}
          {['-top-4 -left-4', '-top-4 -right-4', '-bottom-4 -left-4', '-bottom-4 -right-4'].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} text-3xl pointer-events-none`}
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 6 + i, repeat: Infinity, ease: 'linear' }}
            >
              🌸
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

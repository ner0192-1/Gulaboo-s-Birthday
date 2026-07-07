import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

type GiftState = 'idle' | 'opening' | 'open'

function Confetti() {
  return (
    <>
      {Array.from({ length: 40 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none text-lg"
          style={{
            left: '50%',
            top: '50%',
            fontSize: `${10 + (i % 4) * 4}px`,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          animate={{
            x: (Math.cos((i / 40) * Math.PI * 2) * (100 + (i % 5) * 40)),
            y: (Math.sin((i / 40) * Math.PI * 2) * (100 + (i % 5) * 40)) - 60,
            opacity: [0, 1, 1, 0],
            scale: [0, 1.2, 1, 0],
            rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
          }}
          transition={{ duration: 1.5, delay: i * 0.02 }}
        >
          {['✨', '❤️', '🌸', '💫', '🎊', '💕', '⭐', '🌟'][i % 8]}
        </motion.div>
      ))}
    </>
  )
}

export default function SurpriseGift() {
  const [giftState, setGiftState] = useState<GiftState>('idle')
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const handleClick = () => {
    if (giftState === 'idle') {
      setGiftState('opening')
      setTimeout(() => setGiftState('open'), 1500)
    }
  }

  const MESSAGE = "My dearest love, the real gift isn't in this box — it's every laugh we've shared, every moment I've held your hand, and every day I get to wake up knowing you're mine. You are the greatest gift life has ever given me. I love you beyond words, beyond time, beyond every universe that has ever existed. Happy Birthday. 💜"

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="max-w-2xl mx-auto">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-poppins text-sm tracking-[0.3em] uppercase mb-3 font-semibold"
            style={{ color: '#7C3AED', textShadow: '0 1px 4px rgba(255,255,255,0.8)' }}>
            Something Special
          </p>
          <h2 className="font-script" style={{
            fontSize: 'clamp(2.8rem, 10vw, 5rem)',
            color: '#5B21B6',
            textShadow: '0 2px 12px rgba(255,255,255,0.9), 0 0 30px rgba(200,162,255,0.5)',
          }}>
            A Surprise For You
          </h2>
        </motion.div>

        {/* Gift box area */}
        <div className="flex flex-col items-center">
          <div className="relative" style={{ width: 200, height: 280 }}>

            {/* Confetti burst */}
            <AnimatePresence>
              {giftState === 'open' && <Confetti />}
            </AnimatePresence>

            {/* Box body */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 rounded-2xl cursor-pointer"
              style={{
                height: 160,
                background: 'linear-gradient(145deg, #E6D8FF, #C8A2FF)',
                border: '2px solid rgba(255,255,255,0.6)',
                boxShadow: '0 15px 40px rgba(200,162,255,0.4)',
              }}
              whileHover={giftState === 'idle' ? { scale: 1.02, y: -4 } : {}}
              onClick={handleClick}
            >
              {/* Ribbon vertical */}
              <div className="absolute inset-x-0 flex justify-center">
                <div className="w-6 h-full" style={{ background: 'linear-gradient(180deg, #F6D77B, #FFE4A0)' }} />
              </div>
              {/* Ribbon horizontal */}
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-center">
                <div className="h-6 w-full" style={{ background: 'linear-gradient(90deg, transparent, #F6D77B, transparent)' }} />
              </div>
            </motion.div>

            {/* Box lid */}
            <motion.div
              className="absolute left-0 right-0 rounded-2xl cursor-pointer"
              style={{
                height: 60,
                bottom: 145,
                background: 'linear-gradient(145deg, #B88BFF, #9B6FE0)',
                border: '2px solid rgba(255,255,255,0.6)',
                boxShadow: '0 8px 20px rgba(155,111,224,0.4)',
                transformOrigin: 'center top',
              }}
              animate={
                giftState === 'opening' || giftState === 'open'
                  ? { rotateX: -130, y: -30, opacity: giftState === 'open' ? 0 : 1 }
                  : { rotateX: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.8, type: 'spring', stiffness: 60 }}
              onClick={handleClick}
            >
              {/* Ribbon bow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-3xl"
                  animate={giftState === 'opening' ? { scale: [1, 1.5, 0], opacity: [1, 1, 0] } : {}}
                  transition={{ duration: 0.6 }}
                >
                  🎀
                </motion.div>
              </div>
            </motion.div>

            {/* Glow from inside when open */}
            <AnimatePresence>
              {giftState === 'open' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-20 left-0 right-0 flex justify-center"
                >
                  <motion.div
                    className="text-5xl"
                    animate={{ y: [-20, -60, -100], scale: [0.8, 1.3, 0.5], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: 3 }}
                  >
                    💜
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Prompt text */}
          <AnimatePresence mode="wait">
            {giftState === 'idle' && (
              <motion.p
                key="prompt"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="font-poppins text-sm text-purple-400/70 mt-8 tracking-wider"
              >
                ✨ Click to open your gift ✨
              </motion.p>
            )}
            {giftState === 'opening' && (
              <motion.p
                key="opening"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-script text-3xl text-purple-500 mt-8"
              >
                Opening with love...
              </motion.p>
            )}
          </AnimatePresence>

          {/* Message reveal */}
          <AnimatePresence>
            {giftState === 'open' && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.8, type: 'spring' }}
                className="mt-10 rounded-2xl p-8 max-w-lg mx-auto text-center"
                style={{
                  background: 'rgba(255,255,255,0.65)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(200,162,255,0.4)',
                  boxShadow: '0 20px 50px rgba(200,162,255,0.25)',
                }}
              >
                <div className="text-3xl mb-4">💝</div>
                <p className="font-cormorant text-lg md:text-xl text-purple-700 leading-relaxed italic">
                  {MESSAGE}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

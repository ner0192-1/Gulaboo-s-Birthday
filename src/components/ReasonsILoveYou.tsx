import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

import imgSmile    from '../../assets/tiles/your_smile.jpg'
import imgKindness from '../../assets/tiles/your_kindness.jpg'
import imgLaugh    from '../../assets/tiles/your_laugh.jpg'
import imgEyes     from '../../assets/tiles/your_eyes.jpg'
import imgSupport  from '../../assets/tiles/your_support.jpg'
import imgHugs     from '../../assets/tiles/your_hugs.jpg'
import imgSpirit   from '../../assets/tiles/your_spirit.jpg'
import imgSoul     from '../../assets/tiles/your_soul.jpg'
import imgDreams   from '../../assets/tiles/your_dreams.jpg'
import imgVoice    from '../../assets/tiles/your_voice.jpg'
import imgStrength from '../../assets/tiles/your_strength.jpg'
import imgHeart    from '../../assets/tiles/your_heart.jpg'

const REASONS = [
  { emoji: '😊', reason: 'Your smile',    description: 'It lights up the entire room and my whole world',  img: imgSmile    },
  { emoji: '💛', reason: 'Your kindness', description: 'The way you care for everyone around you',          img: imgKindness },
  { emoji: '😂', reason: 'Your laugh',    description: 'The most beautiful sound I have ever heard',        img: imgLaugh    },
  { emoji: '👁️', reason: 'Your eyes',    description: 'Oceans I could get lost in forever',               img: imgEyes     },
  { emoji: '🤝', reason: 'Your support',  description: "You believe in me even when I don't",              img: imgSupport  },
  { emoji: '🤗', reason: 'Your hugs',     description: 'Where I feel safest in the whole world',           img: imgHugs     },
  { emoji: '🦋', reason: 'Your spirit',   description: 'Wild, free, and absolutely magical',               img: imgSpirit   },
  { emoji: '✨', reason: 'Your soul',     description: "The most beautiful one I've ever known",           img: imgSoul     },
  { emoji: '🌙', reason: 'Your dreams',   description: 'You dare to dream bigger than anyone',             img: imgDreams   },
  { emoji: '🎵', reason: 'Your voice',    description: 'Music sweeter than any melody',                    img: imgVoice    },
  { emoji: '💫', reason: 'Your strength', description: 'You rise even when life gets hard',                img: imgStrength },
  { emoji: '🌸', reason: 'Your heart',    description: 'Gentle, pure, and endlessly loving',               img: imgHeart    },
]

const CARD_COLORS = [
  { front: 'linear-gradient(135deg, #EAD9FF, #C8A2FF)', back: 'linear-gradient(135deg, #C8A2FF, #B88BFF)' },
  { front: 'linear-gradient(135deg, #FFD6EC, #F4AECB)', back: 'linear-gradient(135deg, #F4AECB, #FFD6EC)' },
  { front: 'linear-gradient(135deg, #F6D77B, #FFE4A0)', back: 'linear-gradient(135deg, #FFE4A0, #F6D77B)' },
  { front: 'linear-gradient(135deg, #E6D8FF, #D4B8FF)', back: 'linear-gradient(135deg, #D4B8FF, #C8A2FF)' },
]

function ReasonCard({ item, index }: { item: typeof REASONS[0]; index: number }) {
  const [flipped, setFlipped] = useState(false)
  const [showBack, setShowBack] = useState(false)
  const colors = CARD_COLORS[index % CARD_COLORS.length]

  const handleFlip = () => {
    setFlipped(f => !f)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.055 }}
      className="relative cursor-pointer select-none"
      style={{ height: '160px' }}
      onClick={handleFlip}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        animate={{ scaleX: flipped ? 0 : 1 }}
        transition={{ duration: 0.18, ease: 'easeIn' }}
        onAnimationComplete={() => { if (flipped) setShowBack(true) }}
        style={{
          background: colors.front,
          border: '1px solid rgba(255,255,255,0.6)',
          boxShadow: '0 8px 28px rgba(200,162,255,0.25)',
          originX: 0.5,
        }}
      >
        {/* Shimmer */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)',
              backgroundSize: '200% 100%',
            }}
            animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
            transition={{ duration: 3 + index * 0.3, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
          />
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-3">
          <motion.span
            className="text-4xl"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2.2 + index * 0.15, repeat: Infinity, ease: 'easeInOut' }}
          >
            {item.emoji}
          </motion.span>
          <p className="font-playfair font-bold text-center"
            style={{ fontSize: 'clamp(0.9rem, 3vw, 1.1rem)', color: '#3B0764' }}>
            {item.reason}
          </p>
          <p className="font-poppins text-center"
            style={{ fontSize: '0.63rem', color: 'rgba(91,33,182,0.6)', letterSpacing: '0.05em' }}>
            tap to flip ✨
          </p>
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: showBack ? (flipped ? 1 : 0) : 0 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        onAnimationComplete={() => { if (!flipped) setShowBack(false) }}
        style={{
          background: colors.back,
          border: '1px solid rgba(255,255,255,0.5)',
          boxShadow: '0 8px 28px rgba(200,162,255,0.3)',
          originX: 0.5,
        }}
      >
        {item.img ? (
          <>
            <img
              src={item.img}
              alt={item.reason}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 px-3 py-2"
              style={{ background: 'linear-gradient(0deg, rgba(59,7,100,0.8) 0%, transparent 100%)' }}>
              <p className="font-cormorant italic text-center text-white leading-snug"
                style={{ fontSize: 'clamp(0.78rem, 2.5vw, 0.92rem)' }}>
                {item.description}
              </p>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4">
            <motion.span className="text-2xl"
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}>
              ❤️
            </motion.span>
            <p className="font-cormorant italic text-center leading-snug"
              style={{ fontSize: 'clamp(0.85rem, 2.8vw, 1rem)', color: '#3B0764', fontWeight: 500 }}>
              {item.description}
            </p>
          </div>
        )}
      </motion.div>

      {/* Corner heart */}
      <motion.span
        className="absolute -top-2 -right-2 text-sm pointer-events-none z-10"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 1.6 + index * 0.1, repeat: Infinity }}
      >
        💜
      </motion.span>
    </motion.div>
  )
}

export default function ReasonsILoveYou() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-poppins text-sm tracking-[0.3em] uppercase mb-3 font-semibold"
            style={{ color: '#7C3AED', textShadow: '0 1px 4px rgba(255,255,255,0.8)' }}>
            From My Heart
          </p>
          <h2 className="font-script" style={{
            fontSize: 'clamp(2.8rem, 10vw, 5rem)',
            color: '#5B21B6',
            textShadow: '0 2px 12px rgba(255,255,255,0.9), 0 0 30px rgba(200,162,255,0.5)',
          }}>
            Why I Love You
          </h2>
          <p className="font-cormorant text-lg mt-3 italic font-medium"
            style={{ color: '#6D28D9', textShadow: '0 1px 6px rgba(255,255,255,0.8)' }}>
            Tap each card to reveal ✨
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {REASONS.map((item, i) => (
            <ReasonCard key={i} item={item} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="font-script text-center mt-12"
          style={{
            fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
            color: '#5B21B6',
            textShadow: '0 2px 10px rgba(255,255,255,0.8)',
          }}
        >
          ...and a million more reasons ❤️
        </motion.p>
      </div>
    </section>
  )
}

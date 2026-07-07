import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const MEMORIES = [
  {
    date: 'The Very Beginning',
    emoji: '✨',
    title: 'The Day I Met You',
    description: 'The universe conspired to bring us together. The moment I saw you, I knew something different is going to happen. Little did I know you would become my whole world.',
    color: '#C8A2FF',
  },
  {
    date: 'Our First Date',
    emoji: '🌹',
    title: 'Magic in the Air',
    description: 'Butterflies, laughter, nervousness and joy all at once. That evening felt like stepping into a fairytale. Time stood still when you smiled at me.',
    color: '#FFD6EC',
  },
  {
    date: 'A Special Moment',
    emoji: '💫',
    title: 'When I Knew',
    description: 'There was a quiet evening at the lake,when I looked at you and just knew — you were the one. My heart had been searching for you my whole life.',
    color: '#F6D77B',
  },
  {
    date: 'Adventures Together',
    emoji: '🦋',
    title: 'Exploring the World',
    description: 'Every adventure is better with you beside me. From small walks to big journeys, you make every moment an unforgettable memory.',
    color: '#B88BFF',
  },
  {
    date: 'Quiet Days',
    emoji: '🌸',
    title: 'Simple Perfection',
    description: 'The ordinary days are the ones I treasure most. Lazy mornings, shared laughter, residing all day in a single room, and the feeling of complete peace being by your side.',
    color: '#E6D8FF',
  },
  {
    date: 'Today & Forever',
    emoji: '❤️',
    title: 'Your Birthday',
    description: 'Today I celebrate the most beautiful person in my life. You deserve all the love, magic, and happiness in the world. Happy Birthday, my love.',
    color: '#FFD6EC',
  },
]

function MemoryCard({ memory, index, isLeft }: { memory: typeof MEMORIES[0]; index: number; isLeft: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className={`flex items-center gap-6 md:gap-12 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Card */}
      <motion.div
        className="flex-1 max-w-sm cursor-pointer"
        whileHover={{ scale: 1.02, y: -4 }}
        onClick={() => setExpanded(!expanded)}
      >
        <div
          className="rounded-2xl p-6 relative overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${memory.color}40`,
            boxShadow: `0 10px 40px ${memory.color}25`,
          }}
        >
          {/* Glow accent */}
          <div
            className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20 blur-2xl"
            style={{ background: memory.color, transform: 'translate(30%, -30%)' }}
          />

          <div className="flex items-start gap-4 relative z-10">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: `${memory.color}30` }}
            >
              {memory.emoji}
            </div>
            <div>
              <p className="font-poppins text-xs tracking-widest uppercase mb-1 font-semibold" style={{ color: memory.color }}>
                {memory.date}
              </p>
              <h3 className="font-playfair text-lg font-semibold mb-2" style={{ color: '#5B21B6' }}>{memory.title}</h3>

              {/* Description always visible — truncated with expand */}
              <p
                className="font-cormorant leading-relaxed"
                style={{
                  fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
                  color: '#6D28D9',
                  display: '-webkit-box',
                  WebkitLineClamp: expanded ? 'unset' : 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {memory.description}
              </p>
              {!expanded && (
                <button
                  className="font-poppins text-xs mt-1 opacity-60 hover:opacity-100"
                  style={{ color: memory.color, background: 'none', border: 'none', padding: 0 }}
                  onClick={e => { e.stopPropagation(); setExpanded(true) }}
                >
                  read more ✨
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Timeline dot */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <motion.div
          className="w-5 h-5 rounded-full border-2 border-white"
          style={{ background: `linear-gradient(135deg, ${memory.color}, white)` }}
          animate={{ scale: [1, 1.3, 1], boxShadow: [`0 0 0 0 ${memory.color}40`, `0 0 0 10px transparent`] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Spacer for alternating layout */}
      <div className="flex-1 max-w-sm hidden md:block" />
    </motion.div>
  )
}

export default function MemoryTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding relative" ref={ref}>
      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-poppins text-sm tracking-[0.3em] uppercase mb-3 font-semibold"
            style={{ color: '#7C3AED', textShadow: '0 1px 4px rgba(255,255,255,0.8)' }}>
            Our Story
          </p>
          <h2 className="font-script" style={{
            fontSize: 'clamp(2.8rem, 10vw, 5rem)',
            color: '#5B21B6',
            textShadow: '0 2px 12px rgba(255,255,255,0.9), 0 0 30px rgba(200,162,255,0.5)',
          }}>
            Our Timeline
          </h2>
        </motion.div>

        {/* Timeline line */}
        <div className="relative">
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px transform -translate-x-1/2"
            style={{ background: 'linear-gradient(180deg, transparent, #C8A2FF, #F6D77B, #FFD6EC, transparent)' }}
          />

          <div className="space-y-12">
            {MEMORIES.map((memory, i) => (
              <MemoryCard key={i} memory={memory} index={i} isLeft={i % 2 === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

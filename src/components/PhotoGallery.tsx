import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

import imgOurFirstPhoto  from '../../assets/our_first_photo.jpeg'
import imgTogetherAlways from '../../assets/together_always.jpeg'
import imgMagicMoments   from '../../assets/magic_moments.jpeg'
import imgOurFirstTrip   from '../../assets/our_first_trip.jpeg'
import imgStarryNights   from '../../assets/starry_nights.jpeg'
import imgTenderLove     from '../../assets/tender_love.jpeg'
import imgSweetMoments   from '../../assets/sweet_moments.jpeg'
import imgDreamTogether  from '../../assets/dream_together.jpeg'
import imgBeautifulDays  from '../../assets/beautiful_days.jpeg'
import imgSecretMeets    from '../../assets/secret_meets.jpeg'

const PHOTOS = [
  { id: 1,  src: imgOurFirstPhoto,  label: 'Our First Photo' },
  { id: 2,  src: imgTogetherAlways, label: 'Together Always' },
  { id: 3,  src: imgMagicMoments,   label: 'Magic Moments'   },
  { id: 4,  src: imgOurFirstTrip,   label: 'Our First Trip'  },
  { id: 5,  src: imgStarryNights,   label: 'Starry Nights'   },
  { id: 6,  src: imgTenderLove,     label: 'Tender Love'     },
  { id: 7,  src: imgSweetMoments,   label: 'Sweet Memories'  },
  { id: 8,  src: imgDreamTogether,  label: 'Dream Together'  },
  { id: 9,  src: imgBeautifulDays,  label: 'Beautiful Days'  },
  { id: 10, src: imgSecretMeets,    label: 'Secret Meets'    },
]

type Photo = { id: number; emoji?: string; src?: string; label: string; bg?: string }

function PhotoCard({ photo, index }: { photo: Photo; index: number }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      whileHover={{ scale: 1.04, y: -6 }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        boxShadow: '0 8px 25px rgba(200,162,255,0.22)',
        transition: 'box-shadow 0.4s ease',
      }}
    >
      <div
        className="w-full relative"
        style={{ aspectRatio: '1/1', background: photo.bg ?? 'linear-gradient(135deg, #EAD9FF, #C8A2FF)' }}
      >
        {photo.src ? (
          <>
            {/* Shimmer + pulsing 🌸 while loading */}
            {!loaded && (
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(90deg, rgba(200,162,255,0.15) 0%, rgba(255,255,255,0.45) 50%, rgba(200,162,255,0.15) 100%)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="text-4xl"
                    animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    🌸
                  </motion.span>
                </div>
              </div>
            )}

            {/* Image — eager load, fades in on ready */}
            <motion.img
              src={photo.src}
              alt={photo.label}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
              onLoad={() => setLoaded(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: loaded ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <motion.span
              className="text-5xl md:text-6xl"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3 + index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {photo.emoji}
            </motion.span>
          </div>
        )}

        <div
          className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
          style={{ background: 'linear-gradient(0deg, rgba(91,33,182,0.35) 0%, transparent 100%)' }}
        />
      </div>

      {/* Label */}
      <div
        className="px-3 py-2.5"
        style={{ background: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(12px)' }}
      >
        <p
          className="font-cormorant font-semibold text-center leading-tight"
          style={{ fontSize: 'clamp(0.85rem, 3vw, 1.05rem)', color: '#5B21B6' }}
        >
          {photo.label}
        </p>
      </div>
    </motion.div>
  )
}

export default function PhotoGallery() {
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
          <p
            className="font-poppins text-sm tracking-[0.3em] uppercase mb-3 font-semibold"
            style={{ color: '#7C3AED', textShadow: '0 1px 4px rgba(255,255,255,0.8)' }}
          >
            Captured Moments
          </p>
          <h2
            className="font-script"
            style={{
              fontSize: 'clamp(2.8rem, 10vw, 5rem)',
              color: '#5B21B6',
              textShadow: '0 2px 12px rgba(255,255,255,0.9), 0 0 30px rgba(200,162,255,0.5)',
            }}
          >
            Our Gallery
          </h2>
          <p
            className="font-cormorant text-lg mt-3 italic font-medium"
            style={{ color: '#6D28D9', textShadow: '0 1px 6px rgba(255,255,255,0.8)' }}
          >
            Every picture tells a story
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-5">
          {PHOTOS.map((photo, i) => (
            <PhotoCard key={photo.id} photo={photo} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="font-script text-3xl text-center mt-10"
          style={{ color: '#6D28D9', textShadow: '0 2px 8px rgba(255,255,255,0.7)' }}
        >
          Every moment with you is a treasure 💕
        </motion.p>
      </div>
    </section>
  )
}

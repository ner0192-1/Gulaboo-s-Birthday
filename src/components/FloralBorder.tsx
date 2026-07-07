import { motion } from 'framer-motion'

// ─── SVG Flower shapes ────────────────────────────────────────────────────────

const WhiteLily = ({ size = 60 }: { size?: number }) => (
  <svg width={size} height={size * 1.3} viewBox="0 0 60 78" fill="none">
    <ellipse cx="30" cy="50" rx="5" ry="22" fill="#d4b896" opacity="0.6" />
    <ellipse cx="30" cy="30" rx="8" ry="18" fill="white" opacity="0.92" transform="rotate(-20 30 30)" />
    <ellipse cx="30" cy="30" rx="8" ry="18" fill="white" opacity="0.85" transform="rotate(20 30 30)" />
    <ellipse cx="30" cy="30" rx="8" ry="18" fill="white" opacity="0.88" transform="rotate(60 30 30)" />
    <ellipse cx="30" cy="30" rx="8" ry="18" fill="white" opacity="0.83" transform="rotate(-60 30 30)" />
    <ellipse cx="30" cy="30" rx="8" ry="18" fill="white" opacity="0.9" transform="rotate(100 30 30)" />
    <ellipse cx="30" cy="30" rx="8" ry="18" fill="white" opacity="0.87" transform="rotate(-100 30 30)" />
    <circle cx="30" cy="30" r="5" fill="#F6D77B" opacity="0.9" />
    <circle cx="30" cy="30" r="3" fill="#ffeab0" />
  </svg>
)

const LavenderSprig = ({ size = 40 }: { size?: number }) => (
  <svg width={size * 0.5} height={size} viewBox="0 0 20 60" fill="none">
    <path d="M10 58 Q9 40 10 10" stroke="#9B7FD4" strokeWidth="1.5" fill="none" />
    {[12, 20, 28, 36, 44].map((y, i) => (
      <g key={i}>
        <ellipse cx={7} cy={y} rx="4" ry="3" fill="#C8A2FF" opacity="0.8" transform={`rotate(-20 7 ${y})`} />
        <ellipse cx={13} cy={y + 4} rx="4" ry="3" fill="#B88BFF" opacity="0.8" transform={`rotate(20 13 ${y + 4})`} />
      </g>
    ))}
  </svg>
)

const BabyBreath = ({ size = 30 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <g key={i} transform={`rotate(${angle} 20 20)`}>
        <circle cx="20" cy="8" r="3" fill="white" opacity="0.85" />
        <circle cx="20" cy="4" r="2" fill="white" opacity="0.75" />
      </g>
    ))}
    <circle cx="20" cy="20" r="2" fill="#F6D77B" opacity="0.7" />
  </svg>
)

const WhiteRose = ({ size = 50 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
      <ellipse
        key={i}
        cx="30" cy="18" rx="8" ry="14"
        fill="white"
        opacity={0.7 + (i % 3) * 0.1}
        transform={`rotate(${angle} 30 30)`}
      />
    ))}
    <circle cx="30" cy="30" r="8" fill="white" opacity="0.95" />
    <circle cx="30" cy="30" r="4" fill="#FFD6EC" opacity="0.8" />
  </svg>
)

const EucalyptusLeaf = ({ size = 40 }: { size?: number }) => (
  <svg width={size * 0.6} height={size} viewBox="0 0 24 60" fill="none">
    <path d="M12 58 Q11 35 12 5" stroke="#8fad94" strokeWidth="1.5" fill="none" />
    {[8, 16, 24, 32, 40, 48].map((y, i) => (
      <g key={i}>
        <ellipse cx={i % 2 === 0 ? 6 : 18} cy={y} rx="5" ry="3.5"
          fill="#a8c5a3" opacity="0.75"
          transform={`rotate(${i % 2 === 0 ? -30 : 30} ${i % 2 === 0 ? 6 : 18} ${y})`}
        />
      </g>
    ))}
  </svg>
)

const WisteriaCluster = ({ size = 60 }: { size?: number }) => (
  <svg width={size * 0.7} height={size} viewBox="0 0 42 80" fill="none">
    <path d="M21 0 Q19 20 21 45 Q23 55 21 80" stroke="#B88BFF" strokeWidth="2" fill="none" />
    {[4, 12, 20, 28, 36, 44, 52, 60, 68, 76].map((y, i) => (
      <ellipse key={i} cx={i % 2 === 0 ? 12 : 30} cy={y} rx="6" ry="5"
        fill={i % 2 === 0 ? '#C8A2FF' : '#D4B8FF'} opacity="0.8"
      />
    ))}
  </svg>
)

// ─── Border decoration strips ──────────────────────────────────────────────────
export default function FloralBorder() {
  return (
    <>
      {/* Top border – wisteria hanging vines — hidden on mobile */}
      <div className="fixed top-0 left-0 right-0 pointer-events-none justify-between px-8 hidden md:flex" style={{ zIndex: 2 }}>
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center"
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 3 + i * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
          >
            <WisteriaCluster size={50 + (i % 3) * 10} />
          </motion.div>
        ))}
      </div>

      {/* Left border — hidden on mobile */}
      <div className="fixed left-0 top-0 bottom-0 pointer-events-none flex-col justify-around py-20 px-2 hidden md:flex" style={{ zIndex: 2, width: 70 }}>
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            animate={{ x: [-3, 3, -3], rotate: [-5, 5, -5] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          >
            {i % 4 === 0 && <WhiteLily size={45} />}
            {i % 4 === 1 && <LavenderSprig size={50} />}
            {i % 4 === 2 && <EucalyptusLeaf size={45} />}
            {i % 4 === 3 && <BabyBreath size={30} />}
          </motion.div>
        ))}
      </div>

      {/* Right border — hidden on mobile */}
      <div className="fixed right-0 top-0 bottom-0 pointer-events-none flex-col justify-around py-20 px-2 hidden md:flex" style={{ zIndex: 2, width: 70 }}>
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            animate={{ x: [3, -3, 3], rotate: [5, -5, 5] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          >
            {i % 4 === 0 && <WhiteRose size={40} />}
            {i % 4 === 1 && <WisteriaCluster size={45} />}
            {i % 4 === 2 && <WhiteLily size={40} />}
            {i % 4 === 3 && <LavenderSprig size={45} />}
          </motion.div>
        ))}
      </div>

      {/* Bottom border */}
      <div className="fixed bottom-0 left-0 right-0 pointer-events-none justify-between px-8 py-2 hidden md:flex" style={{ zIndex: 2 }}>
        {Array.from({ length: 10 }, (_, i) => (
          <motion.div
            key={i}
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          >
            {i % 3 === 0 && <WhiteRose size={30} />}
            {i % 3 === 1 && <BabyBreath size={24} />}
            {i % 3 === 2 && <EucalyptusLeaf size={30} />}
          </motion.div>
        ))}
      </div>
    </>
  )
}

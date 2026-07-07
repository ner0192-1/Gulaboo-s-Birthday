import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import DreamyBackground from './components/DreamyBackground'
import FloralBorder from './components/FloralBorder'
import CursorEffect from './components/CursorEffect'
import HeroSection from './components/HeroSection'
import LoveLetter from './components/LoveLetter'
import PhotoGallery from './components/PhotoGallery'
import MemoryTimeline from './components/MemoryTimeline'
import ReasonsILoveYou from './components/ReasonsILoveYou'
import BirthdayWishes from './components/BirthdayWishes'
import MusicPlayer from './components/MusicPlayer'
import Countdown from './components/Countdown'
import SurpriseGift from './components/SurpriseGift'
import BirthdayCake from './components/BirthdayCake'
import FinalSection from './components/FinalSection'
import FloatingElements from './components/FloatingElements'
import LoginPage from './components/LoginPage'
import { AnimatePresence, motion } from 'framer-motion'

function SectionDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className={`relative flex items-center justify-center py-3 overflow-hidden ${flip ? 'scale-y-[-1]' : ''}`}
    >
      <svg viewBox="0 0 400 30" className="w-full max-w-lg opacity-40" fill="none" preserveAspectRatio="none">
        <path d="M0 15 Q50 5 100 15 Q150 25 200 15 Q250 5 300 15 Q350 25 400 15"
          stroke="url(#dg)" strokeWidth="1.5" />
        <circle cx="200" cy="15" r="4" fill="url(#dg)" opacity="0.8" />
        <circle cx="100" cy="15" r="2.5" fill="url(#dg)" opacity="0.6" />
        <circle cx="300" cy="15" r="2.5" fill="url(#dg)" opacity="0.6" />
        <defs>
          <linearGradient id="dg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="25%" stopColor="#C8A2FF" />
            <stop offset="50%" stopColor="#F6D77B" />
            <stop offset="75%" stopColor="#FFD6EC" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
      <motion.div
        className="absolute text-base"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        🌸
      </motion.div>
    </div>
  )
}

export default function App() {
  const lenis = useRef<Lenis | null>(null)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    lenis.current = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    let frame: number
    const raf = (time: number) => {
      lenis.current?.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(frame)
      lenis.current?.destroy()
    }
  }, [])

  const handleBeginJourney = () => {
    lenis.current?.scrollTo('#letter', { offset: -60, duration: 2 })
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Custom cursor always visible */}
      <CursorEffect />

      {/* Login gate — shown until correct credentials entered */}
      <AnimatePresence>
        {!loggedIn && <LoginPage onSuccess={() => setLoggedIn(true)} />}
      </AnimatePresence>

      {/* Main site — only rendered after login */}
      {loggedIn && (
        <>
          <DreamyBackground />
          <FloralBorder />
          <FloatingElements />
          <MusicPlayer />

          {/* Scrollable content */}
          <motion.div
            className="relative"
            style={{ zIndex: 10 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <HeroSection onBeginJourney={handleBeginJourney} />
            <SectionDivider />
            <div id="letter"><LoveLetter /></div>
            <SectionDivider flip />
            <BirthdayCake />
            <SectionDivider />
            <PhotoGallery />
            <SectionDivider flip />
            <MemoryTimeline />
            <SectionDivider />
            <ReasonsILoveYou />
            <SectionDivider flip />
            <BirthdayWishes />
            <SectionDivider />
            <Countdown />
            <SectionDivider flip />
            <SurpriseGift />
            <SectionDivider />
            <FinalSection />
          </motion.div>
        </>
      )}
    </div>
  )
}

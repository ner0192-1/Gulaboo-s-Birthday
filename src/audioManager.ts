// Shared audio singleton — created on login click (inside user gesture) so
// browsers allow autoplay without a policy block.
import musicFile from '../assets/music.mp3'

let _audio: HTMLAudioElement | null = null

export function getAudio(): HTMLAudioElement {
  if (!_audio) {
    _audio = new Audio(musicFile)
    _audio.loop = true
    _audio.volume = 0.14
  }
  return _audio
}

export function startAudio() {
  const audio = getAudio()
  audio.play().catch(() => {})
}

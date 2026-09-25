import { useEffect, useState } from 'react'

function hasWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function detect() {
  if (typeof window === 'undefined') {
    return { reducedMotion: false, isMobile: false, lowPower: false, webgl: false, use3D: false }
  }
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isMobile = window.matchMedia('(max-width: 767px)').matches
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches
  const cores = navigator.hardwareConcurrency ?? 8
  const memory = navigator.deviceMemory ?? 8
  const lowPower = cores < 4 || memory < 4
  const webgl = hasWebGL()

  return {
    reducedMotion,
    isMobile,
    coarsePointer,
    lowPower,
    webgl,
    // Expensive scenes (hero core, architecture) only run where they will be smooth.
    use3D: webgl && !reducedMotion && !isMobile && !lowPower,
  }
}

// Device/preference snapshot used to choose between 3D scenes and their 2D fallbacks.
export default function useCapability() {
  const [capability, setCapability] = useState(detect)

  useEffect(() => {
    const queries = ['(prefers-reduced-motion: reduce)', '(max-width: 767px)'].map((q) =>
      window.matchMedia(q),
    )
    const update = () => setCapability(detect())
    queries.forEach((mq) => mq.addEventListener('change', update))
    return () => queries.forEach((mq) => mq.removeEventListener('change', update))
  }, [])

  return capability
}

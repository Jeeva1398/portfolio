import { useSyncExternalStore } from 'react'

// Who the visitor is: 'hiring' (recruiter / hiring manager) or 'client' (freelance project).
// `?for=clients` (or `?for=freelance`) opens the client view, so that link can go on freelance profiles.
const KEY = 'audience'
const listeners = new Set()

function initial() {
  if (typeof window === 'undefined') return 'hiring'
  const param = new URLSearchParams(window.location.search).get('for')
  if (param === 'clients' || param === 'client' || param === 'freelance') return 'client'
  if (param === 'hiring' || param === 'recruiters') return 'hiring'
  try {
    return localStorage.getItem(KEY) === 'client' ? 'client' : 'hiring'
  } catch {
    return 'hiring'
  }
}

let audience = initial()

export function setAudience(next) {
  if (next === audience) return
  audience = next
  try {
    localStorage.setItem(KEY, next)
  } catch {
    // storage blocked: the choice just won't persist
  }
  listeners.forEach((fn) => fn())
}

function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export default function useAudience() {
  return useSyncExternalStore(subscribe, () => audience, () => 'hiring')
}

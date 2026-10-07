import useTheme from '../hooks/useTheme'

const PALETTES = {
  dark: { app: '#22d3ee', data: '#a78bfa', ai: '#f472b6', aiBody: '#2a0f22', neutral: '#94a3b8', appBody: '#0b1324', dataBody: '#1e1036', glow: 1, link: '#475569', linkOpacity: 0.16 },
  light: { app: '#0891b2', data: '#7c3aed', ai: '#db2777', aiBody: '#fce7f3', neutral: '#64748b', appBody: '#dff3f8', dataBody: '#ece6fd', glow: 0.45, link: '#94a3b8', linkOpacity: 0.14 },
}

export default function usePalette() {
  return PALETTES[useTheme().theme]
}

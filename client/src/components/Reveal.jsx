import { motion } from 'framer-motion'

export default function Reveal({
  as = 'div',
  children,
  delay = 0,
  y = 24,
  className = '',
  once = true,
}) {
  const Component = motion[as] ?? motion.div

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </Component>
  )
}

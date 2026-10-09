import { motion } from 'framer-motion'

export default function Reveal({ as = 'div', children, delay = 0, y = 20, className = '', once = true }) {
  const Component = motion[as] ?? motion.div

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 90, damping: 20, delay }}
      className={className}
    >
      {children}
    </Component>
  )
}

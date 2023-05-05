import React from 'react'
import { motion } from 'framer-motion'


export const TopToBottom = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -200 }}
      transition={{ duration: 0.3, staggerChildren: 0.2 }}>
      {children}
    </motion.div>
  )
}

export const BottomToTop = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 200 }}
      transition={{ duration: 0.3 }}>
      {children}
    </motion.div>
  )
}

export const LeftToRight = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -200 }}
      transition={{ duration: 0.3 }}>
      {children}
    </motion.div>
  )
}

export const RightToLeft = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      transition={{ duration: 0.3 }}>
      {children}
    </motion.div>
  )
}
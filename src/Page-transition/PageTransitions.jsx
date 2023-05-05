import React from 'react'
import { motion } from 'framer-motion'


export const ZoomInSlide = ({ children }) => {

  const animationTransition = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  }

  return (
    <>
      <motion.div
        variants={animationTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.2 }} >
        {children}
      </motion.div>
    </>
  )
}

export const ZoomOut = ({ children }) => {

  const animationTransition = {
    initial: { opacity: 0, scale: 1.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.8 },
  }

  return (
    <>
      <motion.div
        variants={animationTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.2 }} >
        {children}
      </motion.div>
    </>
  )
}

export const SlideLeft = ({ children }) => {

  const animationTransition = {
    initial: { opacity: 0, x: -300 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 300 },
  }

  return (
    <>
      <motion.div
        variants={animationTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.2 }} >
        {children}
      </motion.div>
    </>
  )
}



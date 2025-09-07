// src/variants.js

export const pageVariants = {
  initial: {
    opacity: 0,
    x: 50,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.25, 0.1, 0.25, 1], 
    },
  },
  exit: {
    opacity: 0,
    x: -50,
    scale: 0.98,
    transition: {
      duration: 0.35,
      ease: "easeInOut",
    },
  },
};

export const fadeInUp = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

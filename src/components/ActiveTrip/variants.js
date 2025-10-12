// src/components/shared/variants.js
// Shared Framer Motion animation variants for consistent animations across the app

export const fadeInUp = {
  initial: { y: 16, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.10, ease: [0.22, 1, 0.36, 1] } 
  },
  exit: { 
    y: 10, 
    opacity: 0, 
    transition: { duration: 0.12 } 
  }
};

export const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.04 } }
};

export const slideFromRight = {
  initial: { x: "20%", opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 250, damping: 20 } 
  },
  exit: { 
    x: "20%", 
    opacity: 0, 
    transition: { duration: 0.12 } 
  }
};

export const modal = {
  initial: { scale: 0.98, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1, 
    transition: { duration: 0.13, ease: [0.22, 1, 0.36, 1] } 
  },
  exit: { 
    scale: 0.98, 
    opacity: 0, 
    transition: { duration: 0.09 } 
  }
};

export const accordion = {
  closed: { height: 0, opacity: 0 },
  open: { 
    height: 'auto', 
    opacity: 1, 
    transition: { 
      height: { duration: 0.15, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.12, delay: 0.05 }
    }
  }
};

export const slideLeft = {
  initial: { x: 300, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 250, damping: 20 } 
  },
  exit: { 
    x: -300, 
    opacity: 0, 
    transition: { duration: 0.10 } 
  }
};

export const fadeInUpCustom = (delay = 0) => ({
  initial: { y: 16, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1, 
    transition: { delay, duration: 0.10, ease: [0.22, 1, 0.36, 1] } 
  },
  exit: { 
    y: 10, 
    opacity: 0, 
    transition: { duration: 0.12 } 
  }
});
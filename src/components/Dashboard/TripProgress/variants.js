// src/components/TripProgress/variants.js
// Framer Motion animation variants for Trip Progress components
// Reusable across all Trip Progress subcomponents

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } }
};

export const progressFill = (value) => ({
  hidden: { width: 0 },
  show: { width: `${value}%`, transition: { type: 'spring', stiffness: 120, damping: 20 } }
});

export const slideLeft = {
  initial: { opacity: 0, x: 50 },
  enter: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.3 } }
};

export const buttonHover = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
  tap: { scale: 0.98 }
};

export const cardEntrance = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: 'easeOut',
      staggerChildren: 0.1
    }
  }
};
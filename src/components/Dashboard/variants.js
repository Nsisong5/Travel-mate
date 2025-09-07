export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export const staggerUp = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } }
};

export const hoverCard = {
  scale: 1.02,
  boxShadow: "var(--shadow)",
  transition: { duration: 0.3, ease: "easeOut" }
};

export const routeTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.4, ease: "easeIn" } }
};

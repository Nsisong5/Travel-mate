import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  // Resolve initial theme once (localStorage -> prefers-color-scheme -> 'light')
  const getInitial = () => {
    if (typeof window === "undefined") return "light";
    const stored = window.localStorage.getItem("tm-theme");
    if (stored === "light" || stored === "dark") return stored;
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getInitial);

  // Apply to <body> and persist
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.dataset.theme = theme;      // for [data-theme="dark"] selectors
    if (theme === "dark") {
      document.body.classList.add("dark");    // for existing `.dark` styles
    } else {
      document.body.classList.remove("dark");
    }
    try {
      window.localStorage.setItem("tm-theme", theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  const value = useMemo(() => ({ theme, toggleTheme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
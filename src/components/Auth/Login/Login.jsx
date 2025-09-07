import React, { useContext,useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom"; // ⬅️ added useNavigate for redirect
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { GoogleLogo, FacebookLogo } from "../InlineLogos";
import styles from "./Login.module.css";
import  { loginUser } from "../../../services/Auth/login"
import { AuthContext } from "../../../AuthProvider"
import { useLocation } from "react-router-dom"

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  },
};

const fadeInUp = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6 } }
};

export default function Login() {
  const { login,user,logout} = useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // ⬅️ new state for login error
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/dashboard';
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // reset previous errors

    try {
      const data = await login({ email, password })
      console.log(`sucessfully login: ${data}`) 
      navigate(from,{replace: true});
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password. Please try again."); // show error to user
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.main
      className={styles.page}
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      style={{ minHeight: "100dvh" }}
    >
      <motion.div className={styles.brand} variants={fadeInUp} aria-label="TravelMate brand">
        <div className={styles.logoCircle} aria-hidden="true">TM</div>
        <p className={styles.tagline}>Your travel companion</p>
      </motion.div>

      <motion.section className={styles.card} variants={fadeInUp} role="region" aria-labelledby="loginTitle">
        <h1 className={styles.title} id="loginTitle">Welcome Back</h1>
        <p className={styles.subtext}>Log in to your TravelMate account to continue your journey.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="email" className={styles.label}>Email address</label>
          <div className={styles.inputWrap}>
            <Mail className={styles.iconLeft} size={20} aria-hidden="true" />
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              disabled={loading}
              className={styles.input}
              value={email}
              onChange={e => setEmail(e.target.value)}
              aria-label="Email address"
            />
          </div>

          <label htmlFor="password" className={styles.label}>Password</label>
          <div className={styles.inputWrap}>
            <Lock className={styles.iconLeft} size={20} aria-hidden="true" />
            <input
              id="password"
              type={showPwd ? "text" : "password"}
              required
              autoComplete="current-password"
              disabled={loading}
              className={styles.input}
              value={password}
              onChange={e => setPassword(e.target.value)}
              aria-label="Password"
              aria-describedby="showHidePwdToggleLabel"
            />
            <button
              type="button"
              aria-pressed={showPwd}
              aria-label={showPwd ? "Hide password" : "Show password"}
              onClick={() => setShowPwd(!showPwd)}
              className={styles.toggleBtn}
            >
              {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className={styles.actions}>
            <Link to="/auth/forgot" className={styles.forgotLink}>Forgot password?</Link>
          </div>

          {/* 🔴 Show error message if login fails */}
          {error && <p className={styles.errorMsg}>{error}</p>}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={loading}
            aria-busy={loading}
            aria-live="polite"
          >
            {loading && <span className={styles.spinner} aria-hidden="true"></span>}
            Login
          </button>
        </form>

        <div className={styles.dividerWrap} aria-hidden="true">
          <div className={styles.dividerLine}></div>
          <span className={styles.dividerText}>or continue with</span>
          <div className={styles.dividerLine}></div>
        </div>

        <div className={styles.socials}>
          <button className={styles.socialBtn} type="button" aria-label="Login with Google">
            <GoogleLogo className={styles.socialIcon} aria-hidden="true" />
            <span className={styles.socialText}>Google</span>
          </button>
          <button className={styles.socialBtn} type="button" aria-label="Login with Facebook">
            <FacebookLogo className={styles.socialIcon} aria-hidden="true" />
            <span className={styles.socialText}>Facebook</span>
          </button>
        </div>

        <footer className={styles.footer}>
          <span className={styles.footerText}>Don’t have an account? </span>
          <Link to="/SignUp" className={styles.link}>Sign up here</Link>
        </footer>
      </motion.section>
    </motion.main>
  );
}
import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider";

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: "easeOut" } },
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  // Real-time validation on any input change
  useEffect(() => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
  }, [fullName, email, password, confirmPassword]);

  const isFormValid =
    fullName.trim() &&
    email.trim() &&
    emailRegex.test(email) &&
    password &&
    password.length >= 6 &&
    confirmPassword &&
    password === confirmPassword &&
    Object.keys(errors).length === 0;

  const validateForm = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setTimeout(async () => {
      try {
        await register({ full_name: fullName, email, password });
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    }, 800);
  };

  return (
    <motion.main
      className={styles.page}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      aria-label="Sign up page"
    >
      <motion.div className={styles.brand} variants={itemVariants} aria-label="TravelMate brand">
        <div className={styles.logoPill} aria-hidden="true">TM</div>
      </motion.div>

      <motion.section className={styles.card} variants={itemVariants} aria-labelledby="signupTitle">
        <h1 className={styles.title} id="signupTitle">Create your account</h1>
        <p className={styles.subtext}>Join TravelMate to start planning your journeys.</p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <label htmlFor="fullName" className={styles.label}>
            Full Name
          </label>
          <div className={styles.inputWrap}>
            <User className={styles.iconLeft} size={20} aria-hidden="true" />
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`${styles.input} ${errors.fullName ? styles.error : ""}`}
              aria-required="true"
              aria-invalid={!!errors.fullName}
              aria-describedby="fullNameError"
              disabled={isSubmitting}
            />
          </div>
          {errors.fullName && (
            <p id="fullNameError" className={styles.errorMessage} role="alert">
              {errors.fullName}
            </p>
          )}

          {/* Email */}
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <div className={styles.inputWrap}>
            <Mail className={styles.iconLeft} size={20} aria-hidden="true" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${styles.input} ${errors.email ? styles.error : ""}`}
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby="emailError"
              disabled={isSubmitting}
            />
          </div>
          {errors.email && (
            <p id="emailError" className={styles.errorMessage} role="alert">
              {errors.email}
            </p>
          )}

          {/* Password */}
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <div className={styles.inputWrap}>
            <Lock className={styles.iconLeft} size={20} aria-hidden="true" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${styles.input} ${errors.password ? styles.error : ""}`}
              aria-required="true"
              aria-invalid={!!errors.password}
              aria-describedby="passwordError"
              disabled={isSubmitting}
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              onClick={() => setShowPassword(!showPassword)}
              className={styles.toggleBtn}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p id="passwordError" className={styles.errorMessage} role="alert">
              {errors.password}
            </p>
          )}

          {/* Confirm Password */}
          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm Password
          </label>
          <div className={styles.inputWrap}>
            <Lock className={styles.iconLeft} size={20} aria-hidden="true" />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${styles.input} ${errors.confirmPassword ? styles.error : ""}`}
              aria-required="true"
              aria-invalid={!!errors.confirmPassword}
              aria-describedby="confirmPasswordError"
              disabled={isSubmitting}
            />
            <button
              type="button"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              aria-pressed={showConfirmPassword}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={styles.toggleBtn}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p id="confirmPasswordError" className={styles.errorMessage} role="alert">
              {errors.confirmPassword}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isSubmitting || !isFormValid}
            aria-busy={isSubmitting}
          >
            {isSubmitting && <span className={styles.spinner} aria-hidden="true"></span>}
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className={styles.dividerWrap} aria-hidden="true">
          <div className={styles.dividerLine}></div>
          <span className={styles.dividerText}>or continue with</span>
          <div className={styles.dividerLine}></div>
        </div>

        {/* Social Buttons */}
        <div className={styles.socials}>
          <button
            className={styles.socialBtn}
            type="button"
            aria-label="Sign up with Google"
            onClick={() => console.log("Sign up with Google")}
          >
            <GoogleLogo className={styles.socialIcon} aria-hidden="true" />
            <span className={styles.socialText}>Google</span>
          </button>
          <button
            className={styles.socialBtn}
            type="button"
            aria-label="Sign up with Facebook"
            onClick={() => console.log("Sign up with Facebook")}
          >
            <FacebookLogo className={styles.socialIcon} aria-hidden="true" />
            <span className={styles.socialText}>Facebook</span>
          </button>
        </div>

        <footer className={styles.footer}>
          <span className={styles.footerText}>Already have an account? </span>
          <Link to="/Login" className={styles.link}>
            Login here
          </Link>
        </footer>
      </motion.section>
    </motion.main>
  );
}

function GoogleLogo({ className, ...rest }) {
  return (
    <svg
      className={className}
      viewBox="0 0 533.5 544.3"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      role="img"
      aria-label="Google logo"
    >
      <path fill="#4285f4" d="M533.5 278.4c0-17.5-1.5-34.3-4.4-50.7H272.1v95.9h146.9c-6.3 34-25.1 62.8-53.7 82v68.2h87c51-47 81.2-116 81.2-195.4z" />
      <path fill="#34a853" d="M272.1 544.3c72.8 0 134-24.2 178.6-65.7l-87-68.2c-24.2 16.3-55 25.9-91.6 25.9-70.5 0-130.3-47.7-151.7-111.3H32.9v69.9c44.1 87 134.7 149.4 239.2 149.4z" />
      <path fill="#fbbc04" d="M120.4 324.3c-10.8-32-10.8-66.6 0-98.6V155.8H32.9c-34 67.8-34 147.4 0 215.2l87.5-46.7z" />
      <path fill="#ea4335" d="M272.1 107.7c38.8 0 73.8 13.3 101.3 39.5l75.9-75.9C399.9 24.8 343.1 0 272.1 0 167.6 0 77 62.4 32.9 149.4l87.5 46.7c21.2-63.5 81-111.3 151.7-111.3z" />
    </svg>
  );
}

function FacebookLogo({ className, ...rest }) {
  return (
    <svg
      className={className}
      viewBox="0 0 216 216"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      role="img"
      aria-label="Facebook logo"
    >
      <path fill="#1877F2" d="M204.1 0H11.9C5.3 0 0 5.3 0 11.9v192.2c0 6.6 5.3 11.9 11.9 11.9h103.6V132.2h-28v-32.6h28v-24c0-27.6 16.8-42.6 41.3-42.6 11.8 0 22 0.9 25 1.3v29h-17.2c-13.5 0-16.1 6.4-16.1 15.8v20.5h32.2l-4.2 32.6h-28v95.7h54.8c6.6 0 11.9-5.3 11.9-11.9V11.9C216 5.3 210.7 0 204.1 0z" />
      <path fill="#fff" d="M150.7 132.2l4.2-32.6h-32.2v-20.5c0-9.4 2.6-15.8 16.1-15.8h17.2v-29c-3-0.4-13.2-1.3-25-1.3-24.5 0-41.3 15-41.3 42.6v24h-28v32.6h28v95.7h33.6v-95.7h28z" />
    </svg>
  );
}

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useOutletContext, useNavigate } from "react-router-dom";
import styles from "./DestinationStep.module.css";
import { fadeInUp, staggerContainer } from "../motion";
import SearchSelect from "../SearchSelect/SearchSelect";
import PopularDestinations from "../PopularDestinations/PopularDestinations";

export default function DestinationStep() {
  const { state, dispatch } = useOutletContext();
  const navigate = useNavigate();
  const [touched, setTouched] = useState(false);

  const setDestination = (destination) => {
    dispatch({ type: "setField", field: "destination", value: destination });
    setTouched(true);
  };

  const canProceed = !!state.destination;

  return (
    <motion.div
      className={styles.destinationPage}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
      aria-label="Choose destination"
    >
      <motion.h1 variants={fadeInUp} className={styles.title}>
        Where would you like to go?
      </motion.h1>
      <motion.p variants={fadeInUp} className={styles.subtext}>
        Search for a destination or pick one of the popular options below.
      </motion.p>

      <motion.div variants={fadeInUp} className={styles.inputSection}>
        <SearchSelect
          value={state.destination}
          onChange={setDestination}
          placeholder="Search destination..."
        />
      </motion.div>

      <motion.div variants={fadeInUp}>
        <PopularDestinations onSelect={setDestination} />
      </motion.div>

      <motion.div variants={fadeInUp} className={styles.nextNav}>
        <button
          className={styles.nextBtn}
          type="button"
          onClick={() => canProceed && navigate("/onboarding/dates")}
          disabled={!canProceed}
        >
          Next
        </button>
      </motion.div>
    </motion.div>
  );
}

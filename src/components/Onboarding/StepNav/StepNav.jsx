import React from "react";
import { ChevronLeft, ChevronRight, SkipBack } from "lucide-react";
import styles from "./StepNav.module.css";

export default function StepNav({ currentStep, totalSteps, onBack, onNext, allowSkip, onSkip }) {
  return (
    <nav className={styles.stepNav} aria-label="Step navigation">

      {allowSkip && (
        <button
          className={styles.btnSkip}
          onClick={onSkip}
          aria-label="Skip onboarding"
          type="button"
        >
          <SkipBack size={20} /> Skip for now
        </button>
      )}


    </nav>
  );
}

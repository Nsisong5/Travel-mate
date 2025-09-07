import React from "react";
import { ChevronLeft, ChevronRight, SkipBack } from "lucide-react";
import styles from "./StepNav.module.css";

export default function StepNav({ currentStep, totalSteps, onBack, onNext, allowSkip, onSkip }) {
  return (
    <nav className={styles.stepNav} aria-label="Step navigation">
      <button
        className={styles.btnBack}
        onClick={onBack}
        disabled={currentStep === 0}
        aria-label="Back"
        type="button"
      >
        <ChevronLeft size={20} /> Back
      </button>

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

      <button
        className={styles.btnNext}
        onClick={onNext}
        aria-label="Next"
        type="button"
      >
        Next <ChevronRight size={20} />
      </button>
    </nav>
  );
}

import React, { useReducer, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
import { motion } from "framer-motion";
import ProgressBar from "./ProgressBar/ProgressBar";
import StepNav from "./StepNav/StepNav";
import styles from "./Onboarding.module.css";
import { pageVariants } from "./motion";
import { Helmet } from "react-helmet"
const STEPS = ["welcome", "destination", "dates", "preferences", "summary"];

const initialState = {
  destination: "",
  startDate: "",
  endDate: "",
  budget: "medium",
  style: "leisure",
};

function reducer(state, action) {
  switch (action.type) {
    case "setField":
      return { ...state, [action.field]: action.value };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

export default function OnboardingShell({ allowSkip }) {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const currentStepIndex = STEPS.findIndex((step) => location.pathname.endsWith(step));

  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    try {
      const saved = sessionStorage.getItem("travelmate.onboarding");
      return saved ? JSON.parse(saved) : init;
    } catch {
      return init;
    }
  });

  useEffect(() => {
    sessionStorage.setItem("travelmate.onboarding", JSON.stringify(state));
  }, [state]);

  const stepPaths = STEPS;

  return (
  <>      
   <Helmet> 
       <meta  
        name="viewport"
        content="width=device-width, initial-scale=1.0"/>
    </Helmet>
    <motion.div
      className={styles.onboardingShell}
      data-theme={theme}
      key={location.pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <ProgressBar totalSteps={STEPS.length} currentStep={currentStepIndex + 1} />
      <Outlet
        context={{ state, dispatch, currentStepIndex, allowSkip }}
      />
      <StepNav
        currentStep={currentStepIndex}
        totalSteps={STEPS.length}
        onBack={() => {
          if (currentStepIndex > 0) navigate(`/onboarding/${stepPaths[currentStepIndex - 1]}`);
        }}
        onNext={() => {
          if (currentStepIndex + 1 < STEPS.length) {
            navigate(`/onboarding/${stepPaths[currentStepIndex + 1]}`);
          }
        }}
        allowSkip={allowSkip}
        onSkip={() => {
          navigate("/auth/signup");
        }}
      />
    </motion.div>
   </>
  );
}

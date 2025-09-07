import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import OnboardingShell from "./OnboardingShell";
import DestinationStep from "./DestinationStep/DestinationStep";
import WelcomeStep from "./WelcomeStep/WelcomeStep";
import DatesStep from "./DatesStep/DatesStep";
import PreferencesStep from "./PreferencesStep/PreferencesStep";
import SummaryStep from "./SummaryStep/SummaryStep";

export default function OnboardingRouter({ allowSkip }) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/onboarding/welcome" replace />} />
      <Route element={<OnboardingShell allowSkip={allowSkip} />}>
        <Route path="welcome" element={<WelcomeStep />} />
        <Route path="destination" element={<DestinationStep />} />
        <Route path="dates" element={<DatesStep />} />
        <Route path="preferences" element={<PreferencesStep />} />
        <Route path="summary" element={<SummaryStep />} />
      </Route>
    </Routes>
  );
}

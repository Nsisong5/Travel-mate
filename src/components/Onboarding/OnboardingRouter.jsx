import React, { useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import OnboardingShell from "./OnboardingShell";
import DestinationStep from "./DestinationStep/DestinationStep";
import WelcomeStep from "./WelcomeStep/WelcomeStep";
import DatesStep from "./DatesStep/DatesStep";
import PreferencesStep from "./PreferencesStep/PreferencesStep";
import SummaryStep from "./SummaryStep/SummaryStep";
import { AuthContext } from "../../AuthProvider";
import { Helmet } from "react-helmet";

export default function OnboardingRouter({ allowSkip }) {
  const { user } = useContext(AuthContext);
  const isAuthenticated = !!user;

  const location = useLocation();
  const preselected = location.state?.preSelectedDestination ?? null;

  // Determine the initial route based on authentication and preselection
  const rootElement = isAuthenticated
    ? preselected
      ? <Navigate to="/onboarding/dates" replace state={{ preselected }} />
      : <Navigate to="/onboarding/destination" replace />
    : <Navigate to="/onboarding/welcome" replace />;

  return (
    <Routes>
      <Route path="/" element={rootElement} />
      <Route element={<OnboardingShell allowSkip={allowSkip} preselected={preselected} />}>
        <Route
          path="welcome"
          element={
            isAuthenticated
              ? <Navigate to="/onboarding/destination" replace />
              : <WelcomeStep />
          }
        />
        <Route path="destination" element={<DestinationStep />} />
        <Route path="dates" element={<DatesStep />} />
        <Route path="preferences" element={<PreferencesStep />} />
        <Route path="summary" element={<SummaryStep />} />
      </Route>
    </Routes>
  );
}
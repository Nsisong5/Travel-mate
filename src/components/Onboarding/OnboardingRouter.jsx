import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import OnboardingShell from "./OnboardingShell";
import DestinationStep from "./DestinationStep/DestinationStep";
import WelcomeStep from "./WelcomeStep/WelcomeStep";
import DatesStep from "./DatesStep/DatesStep";
import PreferencesStep from "./PreferencesStep/PreferencesStep";
import SummaryStep from "./SummaryStep/SummaryStep";
import { AuthContext } from "../../AuthProvider";
import { Helmet } from "react-helmet"

export default function OnboardingRouter({ allowSkip }) {
  // Determine if user is authenticated (adjust logic if needed)
  const { user } = useContext(AuthContext)
  const isAuthenticated = !!user;
  
  return (
  <>

     <Routes>                   
      {/* Redirect root onboarding path to appropriate initial step */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/onboarding/destination" replace />
          ) : (
            <Navigate to="/onboarding/welcome" replace />
          )
        }
      />

      <Route element={<OnboardingShell allowSkip={allowSkip} />}>
        {/* Conditionally redirect from welcome if authenticated */}
        <Route
          path="welcome"
          element={isAuthenticated ? <Navigate to="/onboarding/destination" replace /> : <WelcomeStep />}
        />

        {/* Other steps */}
        <Route path="destination" element={<DestinationStep />} />
        <Route path="dates" element={<DatesStep />} />
        <Route path="preferences" element={<PreferencesStep />} />
        <Route path="summary" element={<SummaryStep />} />
      </Route>
    </Routes>
   </>
  );
}

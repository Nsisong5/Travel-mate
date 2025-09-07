import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./ThemeContext";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage";
import OnboardingLayout from "./components/OnboardingLayout/OnboardingLayout";
import WelcomeStep from "./components/OnboardingLayout/WelcomeStep/WelcomeStep";
import PersonalizationStep from "./components/OnboardingLayout/PersonalizationStep/PersonalizationStep";
import AccountStep from "./components/OnboardingLayout/AccountStep/AccountStep";
import DBLayout from "./components/Dashboard/DBLayout";
import SettingsPage from "./components/Settings/SettingsPage";
import TripHistoryPage from "./components/TripHistory/TripHistoryPage";
import TripDetailPage from "./components/TripsDetail/TripDetailPage";
import UserProfileDetail from './components/UserProfile/UserProfileDetail';
import AIRecommendationsPage from "./components/AIRecommendationsPage/AIRecommendationsPage";
import SavedPlacesPage from "./components/SavedPlaces/SavedPlacesPage";
import EditProfilePage from "./components/EditProfile/EditProfilePage";
import Login from "./components/Auth/Login/Login";
import SignUp from "./components/Auth/SignUp/SignUp";
import LandingP from "./components/Landing/LandingP";
import OnboardingRouter from "./components/Onboarding/OnboardingRouter";
import AuthGuard from "./PagesAuth/AuthGuard";
import ProtectedRoute from "./PagesAuth/ProtectedRoute";
import PublicRoute from "./PagesAuth/PublicRoute";

import AvatarUpload from './AvatarUpload'

function InnerAnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AuthGuard>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<LandingP />} />
          
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          
          <Route
           path="/upload"
           element={
          
             <AvatarUpload />
           
            }
          />
          
          <Route 
            path="/signup" 
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            } 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DBLayout />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <UserProfileDetail />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/history" 
            element={
              <ProtectedRoute>
                <TripHistoryPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/trips/:tripId" 
            element={
              <ProtectedRoute>
                <TripDetailPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/ai" 
            element={
              <ProtectedRoute>
                <AIRecommendationsPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/saved" 
            element={
              <ProtectedRoute>
                <SavedPlacesPage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/profileEdit" 
            element={
              <ProtectedRoute>
                <EditProfilePage />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/onboarding/*" 
            element={
              <ProtectedRoute>
                <OnboardingRouter AllowSkip={true} />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all route - redirect to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </AuthGuard>
  );
}


export default function AppRouter() {
  return (
    <Router>
      <InnerAnimatedRoutes />
    </Router>
  );
}

// Named export for compatibility
export { AppRouter };
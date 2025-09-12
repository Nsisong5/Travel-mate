import './App.css';
import AppRouter from "./MyRouter"; // Changed from named import to default import
import { ThemeProvider, useTheme } from "./ThemeContext";
import colors from "./colors";
import { AuthProvider } from "./AuthProvider";
import { AIRecommendationsProvider } from "./services/AIRecommendationsServices/AIRecommendations"
import {SavedPlaceContextProvider } from "./services/SavePlacesService/SavePlacesService"
import { BudgetContextProvider } from "./services/BudgetServices/BudgetContextProvider"
function AppContainer() {
  const { theme } = useTheme();
  const themeVars = {
    '--color-background': colors[theme].background,
    '--color-text': colors[theme].text,
    '--color-primary': colors[theme].primary,
    '--color-secondary': colors[theme].secondary,
    '--color-accent': colors[theme].accent,
    '--color-card': colors[theme].card,
    '--color-border': colors[theme].border,
  };

  return (
    <div style={themeVars}>
      <AppRouter />
    </div>
  );
}

function App() {
  return (
   <AuthProvider>
    <BudgetContextProvider>
     <AIRecommendationsProvider>
      <SavedPlaceContextProvider>
       <ThemeProvider>
         <AppContainer />
        </ThemeProvider>
       </SavedPlaceContextProvider>
      </AIRecommendationsProvider>
     </BudgetContextProvider>
   </AuthProvider>
  );
}

export default App;
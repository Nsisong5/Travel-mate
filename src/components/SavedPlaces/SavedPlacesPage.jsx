import React, { useState, useEffect} from "react";
import DashboardLayout from "../Dashboard/DashboardLayout";
import Header from "./Header/Header";
import Controls from "./Controls/Controls";
import SavedPlacesGrid from "./SavedPlacesGrid/SavedPlacesGrid";
import EmptyState from "./EmptyState/EmptyState";
import styles from "./SavedPlacesPage.module.css";
import { useAIRecommendations } from "../../services/AIRecommendationsServices/AIRecommendations";
import { useSavedPlaceContext } from "../../services/SavePlacesService/SavePlacesService"
import { useNavigate } from "react-router-dom"
const savedPlacesMock = [
  {
    id: 1,
    name: "Paris",
    location: "France",
    description: "The city of lights and love, home to the Eiffel Tower.",
    image: "https://via.placeholder.com/400x250",
  },
  {
    id: 2,
    name: "Kyoto",
    location: "Japan",
    description: "A historic city known for its temples and cherry blossoms.",
    image: "https://via.placeholder.com/400x250",
  },
  {
    id: 3,
    name: "Cape Town",
    location: "South Africa",
    description: "A coastal gem with Table Mountain and stunning beaches.",
    image: "https://via.placeholder.com/400x250",
  },
];

export default function SavedPlacesPage() {
  const [savedPlaces, setSavedPlaces] = useState([]);
  const { getSavePlaces, removeSavePlace } = useSavedPlaceContext(); // Fixed: correct function name
  const [savePlacesMap, setSavedPlacesMap] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getUserAIRecommendations } = useAIRecommendations();
  const navigate = useNavigate();
  console.log("recommendations: ", recommendations);
  
  useEffect(() => { 
    const initializeData = async () => {
      try {
        setIsLoading(true);
        
        const [recommendationsData, savePlacesData] = await Promise.all([
          getRecommendations(),
          getSavePlacesMap()
        ]);
        
        console.log("recommendationData: ",recommendationsData)
        console.log("saveplaceData: ",savePlacesData)
        // Once both are loaded, match the places
        if (recommendationsData && savePlacesData && 
            recommendationsData.length > 0 && savePlacesData.length > 0) {
          console.log("match func access ")
          getMatchPlaces(recommendationsData, savePlacesData);
        }
        
      } catch (error) {
        console.error("Error initializing data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeData();
  }, []);
  
  const getRecommendations = async () => {
    console.log("recommendations function access");
    try {
      const response = await getUserAIRecommendations();
      console.log("recommendations: ", response);
      setRecommendations(response);
      return response;
    } catch (error){
      console.log("couldn't fetch recommendations", error);
      return [];
    }
  };
  
  const getSavePlacesMap = async () => {
    try {
      const response = await getSavePlaces();
      console.log("save places: ", response);
      setSavedPlacesMap(response);
      return response;
    } catch (err) {
      console.log("couldn't fetch save places:", err);
      return [];
    }
  };
  
  const getMatchPlaces = (recommendationsData = recommendations, savePlacesData = savePlacesMap) => {
    console.log("getMatchPlaces access");
    const matchedPlaces = [];

    savePlacesData.forEach((mapItem) => {
      const matchedRecommendation = recommendationsData.find(
        (rec) => rec.id == mapItem.rec_id
      );
      if (matchedRecommendation) {
        matchedPlaces.push(matchedRecommendation);
      }
    });
    console.log("match:", matchedPlaces);
    setSavedPlaces(matchedPlaces);
  };

  const handleRemove = async (id) => {
    // Find the mapping first to get the correct ID to remove
    const mapItem = savePlacesMap.find(map => map.rec_id == id);
    
    if (mapItem) {
      try {
        // Call the API to remove from backend
        await removeSavePlace(id); // Fixed: using correct function name and await
        
        // Update local state only after successful API call
        setSavedPlaces((prev) => prev.filter((place) => place.id !== id));
        setSavedPlacesMap((prev) => prev.filter((map) => map.rec_id !== id));
        
        console.log("Place removed successfully");
      } catch (error) {
        console.error("Failed to remove place:", error);
        // Optionally show error message to user
      }
    }
  };
 

  const handleView = (id) => {
    // Implement navigation or details logic here
    navigate(`/AIRecDetail/${id}`)
  };

  const handleExplore = () => {
      navigate("/ai")
  };

  // Show loading state while data is being fetched
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className={styles.page}>
          <Header />
          <Controls />
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            Loading saved places...
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className={styles.page}>
        <Header />
        <Controls />
        {savedPlaces.length === 0 ? (
          <EmptyState onExplore={handleExplore} />
        ) : (
          <SavedPlacesGrid
            places={savedPlaces}
            onRemove={handleRemove}
            onView={handleView}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
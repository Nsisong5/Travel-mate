import React, { useState, useMemo, useEffect, useContext } from "react";
import styles from "./AIRecommendationsPage.module.css";
import Header from "./Header/Header";
import Filters from "./Filters/Filters";
import RecommendationGrid from "./RecommendationGrid/RecommendationGrid";
import Footer from "./Footer/Footer";
import DashboardLayout from "../Dashboard/DashboardLayout";
import { useAIRecommendations } from "../../services/AIRecommendationsServices/AIRecommendations";
import { useSavedPlaceContext } from "../../services/SavePlacesService/SavePlacesService"
import { useNavigate } from "react-router-dom"


const RECOMMENDATION_TYPES = ["All", "Destinations", "Hotels", "Activities", "Tips"];
const SORT_OPTIONS = ["Popularity", "Rating", "Budget-friendly"];

export default function AIRecommendationsPage() {
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { savePlace }  =  useSavedPlaceContext();
  
  
  
  const { 
    recommendations, 
    loading: contextLoading, 
    error, 
    getUserAIRecommendations 
  } = useAIRecommendations();

  // Load recommendations when component mounts
  useEffect(() => {
    const loadRecommendations = async () => {
      setLoading(true);
      try {
        await getUserAIRecommendations({ limit: 50 }); // Get more recommendations for filtering
      } catch (err) {
        console.error('Failed to load AI recommendations:', err);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, [])
  
   const handleSave = async (data)=>{
      console.log("rec id: ",data)
      try{   
         const response  = await savePlace({"rec_id":data})
         console.log(response)
         return response 
      }catch(err){
      console.log("error setting saveplace:",error)
      }
   }
  
  
  // Use context loading state alongside local loading
  const isLoading = loading || contextLoading;

  const filteredRecs = useMemo(() => {
    let recs = recommendations;

    // Filter by type
    if (filter !== "All") {
      recs = recs.filter((r) => r.destination_type === filter);
    }

    // Filter by search term
    if (search.trim()) {
      const searchTerm = search.toLowerCase();
      recs = recs.filter((r) => 
        r.title.toLowerCase().includes(searchTerm) ||
        r.name.toLowerCase().includes(searchTerm) ||
        r.location.toLowerCase().includes(searchTerm) ||
        r.description?.toLowerCase().includes(searchTerm)
      );
    }

    // Sort recommendations
    if (sortBy === "Popularity") {
      recs = [...recs].sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === "Rating") {
      recs = [...recs].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "Budget-friendly") {
      recs = [...recs].sort((a, b) => b.budget_score - a.budget_score);
    }

    return recs;
  }, [recommendations, filter, search, sortBy]);
  
  
  const handleViewDetail = (id)=>{
    navigate(`/AIRecDetail/${id}`)
  }
  
  
  return (
    <DashboardLayout>
      <div className={styles.page}>
        <Header loading={isLoading} setLoading={setLoading} />
        <Filters
          filter={filter} setFilter={setFilter} sortBy={sortBy} setSortBy={setSortBy}
          search={search} setSearch={setSearch}
          types={RECOMMENDATION_TYPES} sortOptions={SORT_OPTIONS}
        />
        <main aria-live="polite" className={styles.recsMain}>
          {error && (
            <div className="text-red-600 text-center p-4">
              Error loading recommendations: {error}
            </div>
          )}
          <RecommendationGrid recommendations={filteredRecs} loading={isLoading} onSave={handleSave} viewDetail={handleViewDetail}/>
        </main>
        <Footer />
      </div>
    </DashboardLayout>
  );
}
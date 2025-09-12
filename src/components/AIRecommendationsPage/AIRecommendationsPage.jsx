import React, { useState, useMemo, useEffect, useContext } from "react";
import styles from "./AIRecommendationsPage.module.css";
import Header from "./Header/Header";
import Filters from "./Filters/Filters";
import RecommendationGrid from "./RecommendationGrid/RecommendationGrid";
import Footer from "./Footer/Footer";
import DashboardLayout from "../Dashboard/DashboardLayout";
import { useAIRecommendations } from "../../services/AIRecommendationsServices/AIRecommendations";
import { useSavedPlaceContext } from "../../services/SavePlacesService/SavePlacesService";
import { useNavigate } from "react-router-dom";

const RECOMMENDATION_TYPES = ["All", "Destinations", "Hotels", "Activities", "Tips"];
const SORT_OPTIONS = ["Popularity", "Rating", "Budget-friendly"];

export default function AIRecommendationsPage() {
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { savePlace } = useSavedPlaceContext();
  
  const { 
    recommendations, 
    loading: contextLoading, 
    error, 
    getUserAIRecommendations 
  } = useAIRecommendations();

  // Backend API integration: Load recommendations when component mounts
  useEffect(() => {
    const loadRecommendations = async () => {
      setLoading(true);
      try {
        await getUserAIRecommendations({ limit: 50 }); // API call to get recommendations
      } catch (err) {
        console.error('Failed to load AI recommendations:', err);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, []); // Fixed: Empty dependency array to run only once on mount
  
  // Backend API integration: Save place functionality
  const handleSave = async (data) => {
    console.log("rec id: ", data);
    try {   
      const response = await savePlace({"rec_id": data}); // API call to save place
      console.log(response);
      return response;
    } catch (err) {
      console.log("error setting saveplace:", err);
    }
  };
  
  // Use context loading state alongside local loading
  const isLoading = loading || contextLoading;

  // Enhanced filtering and sorting logic with better performance
  const filteredRecs = useMemo(() => {
    let recs = recommendations;

    // Filter by type
    if (filter !== "All") {
      recs = recs.filter((r) => r.destination_type === filter);
    }

    // Filter by search term with improved search logic
    if (search.trim()) {
      const searchTerm = search.toLowerCase();
      recs = recs.filter((r) => 
        r.title?.toLowerCase().includes(searchTerm) ||
        r.name?.toLowerCase().includes(searchTerm) ||
        r.location?.toLowerCase().includes(searchTerm) ||
        r.description?.toLowerCase().includes(searchTerm)
      );
    }

    // Sort recommendations with null safety
    if (sortBy === "Popularity") {
      recs = [...recs].sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    } else if (sortBy === "Rating") {
      recs = [...recs].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "Budget-friendly") {
      recs = [...recs].sort((a, b) => (b.budget_score || 0) - (a.budget_score || 0));
    }

    return recs;
  }, [recommendations, filter, search, sortBy]);
  
  // Navigation handler for detailed view
  const handleViewDetail = (id) => {
    navigate(`/AIRecDetail/${id}`);
  };
  
  return (
    <DashboardLayout>
      {/* Main page container with full screen coverage and proper theme inheritance */}
      <div className={styles.pageContainer}>
        
        {/* Header section */}
        <section className={styles.headerSection}>
          <Header loading={isLoading} setLoading={setLoading} />
        </section>

        {/* Filters section */}
        <section className={styles.filtersSection}>
          <Filters
            filter={filter} 
            setFilter={setFilter} 
            sortBy={sortBy} 
            setSortBy={setSortBy}
            search={search} 
            setSearch={setSearch}
            types={RECOMMENDATION_TYPES} 
            sortOptions={SORT_OPTIONS}
          />
        </section>

        {/* Main content area */}
        <main 
          className={styles.mainContent} 
          aria-live="polite"
          aria-label="AI Recommendations"
        >
          {/* Error state */}
          {error && (
            <div className={styles.errorState}>
              <p className={styles.errorMessage}>
                Unable to load recommendations. Please try again later.
              </p>
              <button 
                className={styles.retryButton}
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          )}

          {/* Empty state */}
          {!error && !isLoading && filteredRecs.length === 0 && (
            <div className={styles.emptyState}>
              <p className={styles.emptyMessage}>
                No recommendations found matching your criteria.
              </p>
              <button 
                className={styles.clearFiltersButton}
                onClick={() => {
                  setFilter("All");
                  setSearch("");
                  setSortBy(SORT_OPTIONS[0]);
                }}
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Recommendations grid */}
          <div className={styles.gridContainer}>
            <RecommendationGrid 
              recommendations={filteredRecs} 
              loading={isLoading} 
              onSave={handleSave} 
              viewDetail={handleViewDetail}
            />
          </div>
        </main>

        {/* Footer section */}
        <footer className={styles.footerSection}>
          <Footer />
        </footer>

      </div>
    </DashboardLayout>
  );
}
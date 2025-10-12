import React, { useState, useEffect } from "react";
import { useTheme } from "../../ThemeContext";
import styles from "./AIRecommendationDetail.module.css";
import HeroSection from "./HeroSection/HeroSection";
import QuickFacts from "./QuickFacts/QuickFacts";
import Description from "./Description/Description";
import Gallery from "./Gallery/Gallery";
import Ratings from "./Ratings/Ratings";
import Tags from "./Tags/Tags";
import ActionBar from "./ActionBar/ActionBar";
import { useParams } from "react-router-dom";
import { useAIRecommendations } from "../../services/AIRecommendationsServices/AIRecommendations";

export default function AIRecommendationDetail() {
  const { theme } = useTheme();
  const { recId } = useParams();
 
  // Fix 1: Proper destructuring with parentheses
  const { recommendations, getUserAIRecommendations, loading: contextLoading,getActiveTripRecDetail } = useAIRecommendations();
  
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);
  
  const getActiveRec = ()=>{
     const recs = JSON.parse(localStorage.getItem("AIActiveRecs"));
     const array = recs.filter(rec => rec.id == recId)
     return array[0]
  }
  
  useEffect(() => {
     const loadRecommendations = async () => {
      setLoading(true);
      setError(null);
      const recommendation = getActiveRec()
      try {
        if (!recommendation){
          const recommendation = await getActiveTripRecDetail(recId);
          setRecommendation(recommendation)
         }else{
           console.log("recommendations gotten from local storage: ", recommendation)
           setRecommendation(recommendation)
        }
      } catch (err) {
        console.error('Failed to load AI recommendations:', err);
        setError('Failed to load recommendations');
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, []); // Fix 3: Add dependency

  // Fix 4: Find specific recommendation after recommendations are loaded
  useEffect(() => {
    if (recommendations && recommendations.length > 0 && recId) {
      const foundRec = recommendations.find(rec => rec.id === recId || rec.id === parseInt(recId));
      setRecommendation(foundRec || null);
    }
  }, [recommendations, recId]);

  // Fix 5: Show loading state properly
  if (loading || contextLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading recommendation...</p>
      </div>
    );
  }

  // Fix 6: Handle error state
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  // Fix 7: Handle case where recommendation is not found
  if (!recommendation) {
    return (
      <div className={styles.notFoundContainer}>
        <p>Recommendation not found</p>
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    );
  }

  return (
    <div data-theme={theme} className={styles.page}>
      <HeroSection
        image={recommendation.cover_image}
        title={recommendation.title}
        location={recommendation.location.name}
        settlement_type={recommendation.settlement_type || null}
      />
      <div className={styles.mainContent}>
        <div className={styles.leftCol}>
          <Description description={recommendation.description} />
          <Gallery images={[recommendation.image2, recommendation.image3, recommendation.image4]} />
        </div>
        <div className={styles.rightCol}>
          <QuickFacts
            category={recommendation.category}
            budget_category={recommendation.budget_category}
            lifestyle_category={recommendation.lifestyle_category}
            destination_type={recommendation.destination_type}
            estimated_cost={recommendation.estimated_cost}
          />
          <Ratings rating={recommendation.rating} popularity={recommendation.popularity} />
          <Tags tags={recommendation.tags} />
          <ActionBar />
        </div>
      </div>
    </div>
  );
}
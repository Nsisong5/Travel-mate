import React, { useState, useMemo } from "react";
import styles from "./AIRecommendationsPage.module.css";
import Header from "./Header/Header";
import Filters from "./Filters/Filters";
import RecommendationGrid from "./RecommendationGrid/RecommendationGrid";
import Footer from "./Footer/Footer";
import DashboardLayout from "../Dashboard/DashboardLayout"
const MOCK_RECOMMENDATIONS = [
  { id: "1", type: "Destinations", title: "Paris, France", description: "A romantic getaway with rich culture and history.", image: "https://via.placeholder.com/300x180?text=Paris", tags: ["Budget-friendly", "Trending"] },
  { id: "2", type: "Hotels", title: "Hotel Luxe Downtown", description: "Top rated luxury hotel with sea views.", image: "https://via.placeholder.com/300x180?text=Hotel+Luxe", tags: ["Luxury", "Popular"] },
  { id: "3", type: "Activities", title: "Wine tasting tour", description: "Explore local vineyards and taste exquisite wines.", image: "https://via.placeholder.com/300x180?text=Wine+Tour", tags: ["Best Seller"] },
  { id: "4", type: "Tips", title: "Packing Tips", description: "How to pack light for any trip.", image: "https://via.placeholder.com/300x180?text=Packing+Tips", tags: ["Useful"] },
];

const RECOMMENDATION_TYPES = ["All", "Destinations", "Hotels", "Activities", "Tips"];
const SORT_OPTIONS = ["Popularity", "Rating", "Budget-friendly"];

export default function AIRecommendationsPage() {
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredRecs = useMemo(() => {
    let recs = MOCK_RECOMMENDATIONS;
    if(filter !== "All") recs = recs.filter((r) => r.type === filter);
    if(search.trim()) recs = recs.filter((r) => r.title.toLowerCase().includes(search.toLowerCase()));
    return recs;
  }, [filter, search]);

  return (
   <DashboardLayout>
    <div className={styles.page}>
      <Header loading={loading} setLoading={setLoading} />
      <Filters
        filter={filter} setFilter={setFilter} sortBy={sortBy} setSortBy={setSortBy}
        search={search} setSearch={setSearch}
        types={RECOMMENDATION_TYPES} sortOptions={SORT_OPTIONS}
      />
      <main aria-live="polite" className={styles.recsMain}>
        <RecommendationGrid recommendations={filteredRecs} loading={loading} />
      </main>
      <Footer />
    </div>
   </DashboardLayout>
  );
}

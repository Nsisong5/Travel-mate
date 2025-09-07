import React, { useState } from "react";
import DashboardLayout from "../Dashboard/DashboardLayout";
import Header from "./Header/Header";
import Controls from "./Controls/Controls";
import SavedPlacesGrid from "./SavedPlacesGrid/SavedPlacesGrid";
import EmptyState from "./EmptyState/EmptyState";
import styles from "./SavedPlacesPage.module.css";

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
  const [savedPlaces, setSavedPlaces] = useState(savedPlacesMock);

  const handleRemove = (id) => {
    setSavedPlaces((prev) => prev.filter((place) => place.id !== id));
  };

  const handleView = (id) => {
    // Implement navigation or details logic here
    // e.g., navigate(`/destinations/${id}`)
    alert(`View details for place ID: ${id}`); // placeholder
  };

  const handleExplore = () => {
    alert("Navigate to Explore page"); // placeholder
  };

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

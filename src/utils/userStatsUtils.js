
export function computeUserStats(trips = []) {
  // ✅ Only consider completed trips for most stats
  const completedTrips = trips.filter(trip => trip.status === "completed");


  const tripsTaken = completedTrips.length;

  const countriesVisited = new Set(
    completedTrips.map(trip => trip.country || extractCountry(trip.destination))
  );

  const citiesVisited = new Set(
    completedTrips.map(trip => trip.city || extractCity(trip.destination))
  );

  // Average rating (from trips where rating is present)
  const ratings = completedTrips.map(trip => trip.rating).filter(Boolean);
  const avgRating =
    ratings.length > 0
      ? (ratings.reduce((sum, r) => sum + r, 0) / ratings.length).toFixed(1)
      : null;

  // Favorite destination (most frequent city or country)
  const frequencyMap = {};
  completedTrips.forEach(trip => {
    const dest = trip.city || trip.destination;
    if (!frequencyMap[dest]) frequencyMap[dest] = 0;
    frequencyMap[dest]++;
  });
  const favoriteDestination = Object.keys(frequencyMap).length
    ? Object.entries(frequencyMap).sort((a, b) => b[1] - a[1])[0][0]
    : null;

  // Travel style (simple inference rules)
  const avgCost =
    completedTrips.length > 0
      ? completedTrips.reduce((sum, trip) => sum + (trip.cost || 0), 0) /
        completedTrips.length
      : 0;
  let travelStyle = "Explorer";
  if (avgCost > 2000) travelStyle = "Luxury Traveler";
  else if (avgCost > 500) travelStyle = "Adventurer";
  else travelStyle = "Budget Traveler";

  // Languages (placeholder: inferred from country)
  const languages = inferLanguagesFromCountries([...countriesVisited]);

  return {
    tripsTaken,
    countriesVisited: countriesVisited.size,
    citiesVisited: citiesVisited.size,
    avgRating,
    favoriteDestination,
    travelStyle,
    languages,
  };
}


export function getRecentActivities(trips = []) {
  
  const validTrips = trips.filter(trip => trip.created_at);
  const sorted = validTrips.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const recent = sorted.slice(0, 5); 
  return recent.map(trip => ({
    id: trip.id,
    year: new Date(trip.created_at).getFullYear(),
    destination: trip.destination || `${trip.city}, ${trip.country}`,
    status: trip.status, // e.g., "planned", "completed"
    cost: trip.cost || 0,
    cost_estimated: trip.cost_estimated,
    rating: trip.rating || null,
    created_at: trip.created_at,
  }));
}





function extractCountry(destination = "") {
  const parts = destination.split(",").map(p => p.trim());
  return parts.length > 1 ? parts[parts.length - 1] : destination;
}

function extractCity(destination = "") {
  const parts = destination.split(",").map(p => p.trim());
  return parts.length > 1 ? parts[0] : destination;
}

function inferLanguagesFromCountries(countries = []) {
  const map = {
    France: "French",
    Spain: "Spanish",
    Italy: "Italian",
    Germany: "German",
    Nigeria: "English",
    USA: "English",
    Canada: "English/French",
  };
  return countries.map(c => map[c] || "Unknown");
}
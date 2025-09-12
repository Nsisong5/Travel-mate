import React, { useState, useContext, useEffect} from "react";
import { Bell, Settings, Edit, LogOut, Globe, Star, MapPin, Mail, Phone, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../ThemeContext";
import styles from "./UserProfileDetail.module.css";
import UserProfileHeader from "./UserProfileHeader/UserProfileHeader" 
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../AuthProvider"
import { computeUserStats, getRecentActivities } from "../../utils/userStatsUtils";
import { useTripServices } from "../../services/TripServices/TripServices"



export default function UserProfileDetail() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { getUserTrips } = useTripServices();
  const { user,logout } = useContext(AuthContext)    
  const [trips, setTrips] = useState([])
  const stats = computeUserStats(trips);
  const [loading, setLoading ] = useState(false);
  const recentTrips = getRecentActivities(trips)
  console.log("tips: ",trips)
  console.log("stats: ",stats)
  useEffect(()=>{
      setLoading(true);
      getTrips();
      setLoading(false)
   },[])
  
  
  const getTrips = async ()=>{
      try {
          const response = await getUserTrips();
          setTrips(response)
          console.log("trip fetch: ", response)
      }catch(err){
       console.log(err)
      }
  }
  
  
  function getShortName(){
    console.log("user",user)
    const wordsFiltered = user.full_name.split(/\s+/).filter(Boolean)
    const y = wordsFiltered[0].slice(0,1)
    const z = wordsFiltered[1].slice(0,1)
    const shortName = y + z   
    return shortName 
  }
  
  const handleLogout = async()=>{
      logout();
      navigate("");
  }
  
 
  return (
    <main className={styles.page}>
      <UserProfileHeader />
      
      <section className={styles.profileSection} aria-label="User Profile">
        <div className={styles.avatar} aria-hidden="true">{getShortName()}</div>
        <h1 className={styles.name}>{ user.full_name }</h1>
        <p className={styles.tagline}>Adventurer | 15 countries</p>
        <button className={styles.editProfileBtn} title="Edit Profile"
         onClick={()=> navigate("/profileEdit")}>
          <Edit size={16} /> Edit Profile
        </button>
      </section>

      <section className={styles.personalInfo} aria-label="Personal Info">
        <h2 className={styles.sectionTitle}>Personal Info</h2>
        <ul className={styles.infoList}>
          <li><Mail size={16} /> <span>{ user.email }</span></li>
          <li><Phone size={16} /> <span>{ user.phone }</span></li>
          <li><MapPin size={16} /> <span>{ user.country }</span></li>
          <li><Calendar size={16} /> <span>Joined: {user.created_at}</span></li>
        </ul>
      </section>

      <section className={styles.travelStats} aria-label="Travel Statistics">
        <h2 className={styles.sectionTitle}>Travel Stats</h2>
        <div className={styles.statsGrid}>
          <div><Globe size={20} /><span>Trips Taken: <b>{stats.tripsTaken}</b></span></div>
          <div><MapPin size={20} /><span>Countries: <b>{stats.countriesVisited}</b></span></div>
          <div><Star size={20} /><span>Cities: <b>{stats.citiesVisited}</b></span></div>
          <div><Star size={20} /><span>Avg Rating: <b>{ stats.averageRating }</b></span></div>
        </div>
      </section>

      <section className={styles.preferences} aria-label="Preferences">
        <h2 className={styles.sectionTitle}>Preferences</h2>
        <ul className={styles.prefList}>
          <li>Favorite Destinations: <strong>{ stats.favoriteDestinations}</strong></li>
          <li>Travel Style: <strong>{ stats.travelStyle }</strong></li>
          <li>Language: <strong>{ stats.languages[0] }</strong></li>
        </ul>
      </section>

      <section className={styles.recentActivity} aria-label="Recent Activity">
        <h2 className={styles.sectionTitle}>Recent Activity</h2>
        <div className={styles.activityCards}>
          {recentTrips.map(({ id, city,year, destination}) => (
            <motion.button
              key={id}
              className={styles.activityCard}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Recent trip to ${destination}`}
              type="button"
            >
              {destination} {year}
            </motion.button>
          ))}
        </div>
        <button className={styles.viewAllBtn} aria-label="View all trips" onClick={()=>(navigate("/history"))}>View All Trips</button>
      </section>

      <nav className={styles.actionButtons} aria-label="User actions">
        <button className={styles.logoutBtn}
        onClick={handleLogout}>
          <LogOut size={18} /> Log Out
        </button>
      </nav>
    </main>
  );
}

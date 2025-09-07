import React, {useEffect, useState}from "react";
import { motion } from "framer-motion";
import styles from "./RecentTripsTable.module.css";
import { fadeInUp, hoverCard } from "../variants";
import { useTripServices } from "../../../services/TripServices/TripServices"
import { useNavigate } from "react-router-dom"

export default function RecentTripsTable({ trips }) {
  const [recentTrips,setRecentTrips] = useState([])
  const { getUserTrips } = useTripServices();
  const navigate = useNavigate();
  
  useEffect(()=>{
     const get_recent_trips = async()=>{
      try{
         const trips = await getUserTrips();
         setRecentTrips(trips)
         console.log("recent trips fetch successfully")
      }catch(error){
         console.log("couldn't fetch recent trips:", error)
      }     
     }   
     get_recent_trips();
  },[])
  
  return (
    <motion.section
      className={styles.tableSection}
      variants={fadeInUp}
      whileHover={hoverCard}
      tabIndex={0}
      aria-label="Recent trips table"
    >
      <h2 className={styles.title}>Recent Trips</h2>
      <table className={styles.recentTripsTable}>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Destination</th>
            <th scope="col">Duration</th>
            <th scope="col">Cost</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>     
          {recentTrips && 
           recentTrips.map(({ start_date, destination, duration, cost, status,id}, idx) => (
            <tr key={`${destination}-${idx}`} tabIndex={0} onClick={()=>navigate(`/trips/${id}`)}>
              <td>{start_date}</td>
              <td>{destination}</td>
              <td>{duration}</td>
              <td>{cost}</td>
              <td>{status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.section>
  );
}

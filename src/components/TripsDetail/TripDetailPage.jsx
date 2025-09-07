import React,{ useState, useEffect} from "react";
import TripDetailHeader from "./TripDetailHeader/TripDetailHeader";
import TripSummaryCard from "./TripSummaryCard/TripSummaryCard";
import TripInfoSection from "./TripInfoSection/TripInfoSection";
import TripActions from "./TripActions/TripActions";
import styles from "./TripDetailPage.module.css";
import { useParams } from "react-router-dom"
import { useTripServices } from "../../services/TripServices/TripServices";


// Mock trip data
const mockTrip = {
  id: 1,
  type: "plane", // plane | bus | car
  origin: "Abuja",
  destination: "London",
  status: "Completed", // Completed | Canceled | Ongoing
  date: "02 Aug 2025",
  duration: "6h 45m",
  cost: "₦220,000"
};




export default function TripDetailPage() {
  const { tripId } =  useParams()
  const [trip, setTrip ] = useState(mockTrip)
  const { getUserTrips } =  useTripServices()
  
  useEffect(()=>{
     const get_trips = async ()=>{
         try{
             const response = await getUserTrips()
             console.log("successfully fetch trips:", response)
             return set_trip(response);
         }catch(error){
          console.log("error fetching trips: ",error)
         } 
     }
     get_trips();
     
  },[])
  
const set_trip = (trips)=>{
        console.log("trips: ",trips)
        const c_trip = trips.find(t=> t.id == tripId)       
        c_trip ? setTrip(c_trip)
        : console.log("couldn't find trip that match query")
  }


  
  return (
    <div className={styles.page}>
      <TripDetailHeader />
      <main className={styles.main}>
        <TripSummaryCard trip={trip} />
        <TripInfoSection trip={trip} />
        <TripActions />
      </main>
    </div>
  );
}

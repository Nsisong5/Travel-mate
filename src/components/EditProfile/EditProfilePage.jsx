import React, { useState, useContext, useEffect} from "react";
//import DashboardLayout from "../Dashboard/DashboardLayout";
import PageHeader from "./PageHeader/PageHeader";
import ProfilePhotoUpload from "./ProfilePhotoUpload/ProfilePhotoUpload";
import ProfileForm from "./ProfileForm/ProfileForm";
import PasswordSection from "./PasswordSection/PasswordSection";
import ButtonsSection from "./ButtonsSection/ButtonsSection";
import styles from "./EditProfilePage.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../AuthProvider';
import userService from "../../services/userservices/UserService"

export default function EditProfilePage() {
  const { updateUser } = useContext(AuthContext);
  const { user }  = useContext(AuthContext)
  const  navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullName: "John Doe",
    email: "johndoe@email.com",
    phone: "123-456-7890",
    location: "New York, USA",
    bio: "Travel enthusiast and foodie",
  }); 

  useEffect(()=>{
      user && setUserData(user);
      console.log(userData)
  },[])
  
  const [passwordExpanded, setPasswordExpanded] = useState(false);
  const [passwordChange,setPasswordChange] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Validation state (simple mock validation)
  const [validationErrors, setValidationErrors] = useState({});

  const handleUserChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
;
  };

  // Handle changes for password fields
  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
    setPasswordChange(true);
  };


  const handleSave = async () => {
        try{
             console.log("userData: ",userData)            
             const response = await updateUser(userData)
             if (passwordChange){
               const { newPassword : new_password, currentPassword : current_password } = passwordData;
               try{
                    const response = await updateUser({current_password,new_password})
                    console.log("password update successfull:", response)
                  } catch(error){
                    console.log("password update failed: ",error)
                  }
             }
             
             console.log("response: ", response)
             navigate(-1)
        }catch(error){
          console.log("couldn't edit user property: ",error)
        }
        
  };


  const handleCancel = () => {
      alert("wanna go back")
  };

  return (
      <main className={styles.page} aria-label="Edit Profile Page">
        <PageHeader />
        <ProfilePhotoUpload />
        <ProfileForm
          data={userData}
          onChange={handleUserChange}
          errors={validationErrors}
        />
        <PasswordSection
          expanded={passwordExpanded}
          toggleExpanded={() => setPasswordExpanded(!passwordExpanded)}
          passwordData={passwordData}
          onChange={handlePasswordChange}
        />
        <ButtonsSection onSave={handleSave} onCancel={() => window.history.back()} />
      </main>
  );
}
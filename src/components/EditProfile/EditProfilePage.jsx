import React, { useState } from "react";
//import DashboardLayout from "../Dashboard/DashboardLayout";
import PageHeader from "./PageHeader/PageHeader";
import ProfilePhotoUpload from "./ProfilePhotoUpload/ProfilePhotoUpload";
import ProfileForm from "./ProfileForm/ProfileForm";
import PasswordSection from "./PasswordSection/PasswordSection";
import ButtonsSection from "./ButtonsSection/ButtonsSection";
import styles from "./EditProfilePage.module.css";
import { useNavigate } from "react-router-dom";

export default function EditProfilePage() {
  // Mock user data state
  const [userData, setUserData] = useState({
    fullName: "John Doe",
    email: "johndoe@email.com",
    phone: "123-456-7890",
    location: "New York, USA",
    bio: "Travel enthusiast and foodie",
  }); 

   
  // Password section expanded or not 
  const [passwordExpanded, setPasswordExpanded] = useState(false);

  // Password form values
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Validation state (simple mock validation)
  const [validationErrors, setValidationErrors] = useState({});

  // Handle changes for profile fields
  const handleUserChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  // Handle changes for password fields
  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  // Mock submit handler
  const handleSave = () => {
    // Simple mock required field validation
    let errors = {};
    if (!userData.fullName.trim()) errors.fullName = true;
    if (!userData.email.trim()) errors.email = true;
    if (!userData.phone.trim()) errors.phone = true;
    if (!userData.location.trim()) errors.location = true;
    setValidationErrors(errors);
    if(Object.keys(errors).length === 0) {
      alert("Successfully saved profile (mock)!");
    }
  };

  // Cancel handler (mock)
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
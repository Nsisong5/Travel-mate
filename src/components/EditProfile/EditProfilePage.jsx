import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
import PageHeader from "./PageHeader/PageHeader";
import ProfilePhotoUpload from "./ProfilePhotoUpload/ProfilePhotoUpload";
import ProfileForm from "./ProfileForm/ProfileForm";
import PasswordSection from "./PasswordSection/PasswordSection";
import ButtonsSection from "./ButtonsSection/ButtonsSection";
import styles from "./EditProfilePage.module.css";
import { AuthContext } from '../../AuthProvider';
import userService from "../../services/userservices/UserService";

// Animation variants for smooth page transitions
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: 'easeOut',
      staggerChildren: 0.1 
    }
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const sectionVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export default function EditProfilePage() {
  const { updateUser, user } = useContext(AuthContext);
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  // Preserve existing state management
  const [userData, setUserData] = useState({
    fullName: "John Doe",
    email: "johndoe@email.com",
    phone: "123-456-7890",
    location: "New York, USA",
    bio: "Travel enthusiast and foodie",
  }); 

  useEffect(() => {
    if (user) {
      setUserData(user);
      console.log(userData);
    }
  }, [user]);
  
  const [passwordExpanded, setPasswordExpanded] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Validation state (simple mock validation)
  const [validationErrors, setValidationErrors] = useState({});

  // Preserve existing handlers
  const handleUserChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  // Handle changes for password fields
  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
    setPasswordChange(true);
  };

  // Preserve existing save functionality
  const handleSave = async () => {
    try {
      console.log("userData: ", userData);            
      const response = await updateUser(userData);
      
      if (passwordChange) {
        const { newPassword: new_password, currentPassword: current_password } = passwordData;
        try {
          const response = await updateUser({ current_password, new_password });
          console.log("password update successful:", response);
        } catch (error) {
          console.log("password update failed: ", error);
        }
      }
      
      console.log("response: ", response);
      navigate(-1);
    } catch (error) {
      console.log("couldn't edit user property: ", error);
    }
  };

  const handleCancel = () => {
    alert("wanna go back");
  };

  return (
    <div className={styles.pageWrapper} data-theme={theme}>
      <div className={styles.pageBackground}>
        <motion.main 
          className={styles.page} 
          aria-label="Edit Profile Page"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div variants={sectionVariants}>
            <PageHeader />
          </motion.div>
          
          <motion.div variants={sectionVariants}>
            <ProfilePhotoUpload />
          </motion.div>
          
          <motion.div variants={sectionVariants}>
            <ProfileForm
              data={userData}
              onChange={handleUserChange}
              errors={validationErrors}
            />
          </motion.div>
          
          <motion.div variants={sectionVariants}>
            <PasswordSection
              expanded={passwordExpanded}
              toggleExpanded={() => setPasswordExpanded(!passwordExpanded)}
              passwordData={passwordData}
              onChange={handlePasswordChange}
            />
          </motion.div>
          
          <motion.div variants={sectionVariants}>
            <ButtonsSection 
              onSave={handleSave} 
              onCancel={() => window.history.back()} 
            />
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { Camera } from "lucide-react";
import styles from "./ProfilePhotoUpload.module.css";
import userService from "../../../services/userservices/UserService"; // 👈 adjust path as needed

export default function ProfilePhotoUpload() {
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Constraints
  const MAX_SIZE_MB = 5;
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

  const handleFile = async (file) => {
    if (!file) return;

    // === Constraints ===
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert("Only JPG and PNG files are allowed.");
      return;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert("File size must not exceed 5MB.");
      return;
    }
   // === Preview avatar locally ===
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // === Upload to backend ===
    try {
      setUploading(true);
      const response = await userService.uploadAvatar(file);
      console.log("Avatar uploaded:", response);

      if (response?.avatar_url) {
        setPreview(response.avatar_url); // use backend URL instead of local preview
      }
    } catch (err) {
      alert(err.message || "Failed to upload avatar");
    } finally {
      setUploading(false);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  // === Drag & Drop Handlers ===
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  return (
    <section
      className={`${styles.section} ${dragActive ? styles.dragActive : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div
        className={styles.avatar}
        aria-label="User profile picture"
        style={{
          backgroundImage: preview ? `url(${preview})` : "none",
        }}
      >
        {uploading && (
          <div className={styles.overlay}>Uploading...</div>
        )}
      </div>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileInputChange}
      />
      <button
        className={styles.uploadBtn}
        onClick={() => document.getElementById("fileInput").click()}
        type="button"
        aria-label="Change Photo"
        disabled={uploading}
      >
        <Camera size={18} />
        {uploading ? "Uploading..." : "Change Photo"}
      </button>
      <p className={styles.helperText}>
        Drag & Drop your avatar here, or click "Change Photo"
      </p>
    </section>
  );
}
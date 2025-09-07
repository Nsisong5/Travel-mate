import React, { useState } from "react";
import api from "./services/api/axios"; // your global axios instance

const AvatarUpload = () => {
  const [file, setFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user_id", 1); // later: get from context/auth

      const res = await api.post("/upload-avatar/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setAvatarUrl(res.data.avatar_url);
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-lg font-semibold mb-2">Upload Avatar</h2>
      
      <input type="file" onChange={handleFileChange} />
      
      <button 
        onClick={handleUpload}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Upload
      </button>

      {avatarUrl && (
        <div className="mt-4">
          <p>Uploaded Avatar:</p>
          <img src={avatarUrl} alt="avatar" className="w-32 h-32 rounded-full border" />
        </div>
      )}
    </div>
  );
};

export default AvatarUpload;
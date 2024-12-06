import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { updateUserSettings } from "../../services/api"; // API call for user settings
import { updatePassword } from "../../services/api"; // API call for password update

const Settings = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    farmerID: user?.farmerID || "", // Assuming user contains the farmerID
    name: user?.name || "",
    contactInfo: user?.contactInfo || "",
    role: user?.role || "",
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in passwordData) {
      setPasswordData({ ...passwordData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    console.log(formData.farmerID);
    const farmerID = formData.farmerID;
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    try {
      await updateUserSettings(formData, farmerID);
      setSuccessMessage("Settings updated successfully!");
    } catch (error) {
      setError("Failed to update settings. Please try again.");
    }
  };
  
  const handlePasswordUpdate = async (e) => {
    console.log(formData.farmerID);
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await updatePassword(passwordData, formData.farmerID);
      setSuccessMessage("Password updated successfully!");
      setPasswordData({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
    } catch (error) {
      setError("Failed to update password. Please try again.");
    }
  };
  
  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Update Settings
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      {successMessage && <Typography color="success">{successMessage}</Typography>}

      {/* Update User Info */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contact Info"
          name="contactInfo"
          value={formData.contactInfo}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Save Changes
        </Button>
      </form>

      {/* Update Password */}
      <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
        Change Password
      </Typography>
      <form onSubmit={handlePasswordUpdate}>
        <TextField
          label="Current Password"
          name="currentPassword"
          value={passwordData.currentPassword}
          onChange={handleChange}
          type="password"
          fullWidth
          margin="normal"
        />
       <TextField
  label="New Password"
  name="newPassword"
  type="password"
  value={passwordData.newPassword}
  onChange={handleChange}
  fullWidth
  margin="normal"
/>

        <TextField
          label="Confirm New Password"
          name="confirmNewPassword"
          value={passwordData.confirmNewPassword}
          onChange={handleChange}
          type="password"
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="secondary" fullWidth>
          Update Password
        </Button>
      </form>
    </Box>
  );
};

export default Settings;

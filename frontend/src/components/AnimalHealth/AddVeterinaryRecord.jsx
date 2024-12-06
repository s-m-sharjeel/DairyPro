import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel } from '@mui/material';
import axios from '../../services/api'; // Axios instance configured for API calls
import '../../index.css'; // Optional styling

const AddVeterinaryRecord = () => {
  const [cattleList, setCattleList] = useState([]);
  const [formData, setFormData] = useState({
    CattleID: '',
    Symptoms: '',
    Diagnosis: '',
    Treatment: '',
    VetName: ''
  });

  useEffect(() => {
    // Fetch cattle list (no cattle addition functionality here)
    axios.get('http://localhost:3001/api/cattle')
      .then(response => setCattleList(response.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const sysDate = currentDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    const sysTime = currentDate.toTimeString().split(' ')[0]; // Format as HH:MM:SS

    // Log form data before submission to ensure it's correct
    console.log('Form data:', formData);

    const recordData = {
      cattleID: formData.CattleID,   // Use camelCase as expected by backend
      date: sysDate,                 // Use camelCase as expected by backend
      time: sysTime,                 // Use camelCase as expected by backend
      symptoms: formData.Symptoms,   // Use camelCase as expected by backend
      diagnosis: formData.Diagnosis, // Use camelCase as expected by backend
      treatment: formData.Treatment, // Use camelCase as expected by backend
      vetName: formData.VetName      // Use camelCase as expected by backend
    };

    // Posting the veterinary record with the form data
    axios.post('http://localhost:3001/api/health', recordData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        alert('Veterinary record added successfully!');
        setFormData({
          CattleID: '',
          Symptoms: '',
          Diagnosis: '',
          Treatment: '',
          VetName: ''
        });
      })
      .catch(err => {
        console.error('Error adding veterinary record:', err);
        alert('Error adding veterinary record.');
      });
  };

  return (
    <div className="add-veterinary-record">
      <h2>Add Veterinary Record</h2>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Cattle</InputLabel>
          <select
            value={formData.CattleID}
            onChange={handleChange}
            name="CattleID"
            required
            style={{ width: '100%', padding: '10px', fontSize: '16px' }}
          >
            <option value="" disabled>Select Cattle</option>
            {cattleList.map((cattle) => (
              <option key={cattle.cattleID} value={cattle.cattleID}>
                {cattle.breed} - {cattle.cattleID}
              </option>
            ))}
          </select>
        </FormControl>

        <TextField
          label="Veterinarian Name"
          name="VetName"
          value={formData.VetName}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Symptoms"
          name="Symptoms"
          value={formData.Symptoms}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Diagnosis"
          name="Diagnosis"
          value={formData.Diagnosis}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Treatment"
          name="Treatment"
          value={formData.Treatment}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Record
        </Button>
      </form>
    </div>
  );
};

export default AddVeterinaryRecord;

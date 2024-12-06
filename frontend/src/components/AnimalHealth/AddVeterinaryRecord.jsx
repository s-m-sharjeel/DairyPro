import React, { useState, useEffect } from 'react';
import { TextField, Button, InputLabel, FormControl } from '@mui/material';
import axios from '../../services/api'; // Axios instance configured for API calls
import '../../index.css'; // Optional styling

const AddVeterinaryRecord = () => {
  const [cattleList, setCattleList] = useState([]);
  const [formData, setFormData] = useState({
    CattleID: '',
 // Changed to VetName for text input
    Date: '',
    Time: '',
    Symptoms: '',
    Diagnosis: '',
    Treatment: '',
    VetName: ''
  });

  useEffect(() => {
    // Fetch cattle list
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
    // Posting the veterinary record with the form data
    axios.post('http://localhost:3001/api/health', formData)
      .then(() => {
        alert('Veterinary record added successfully!');
        setFormData({
          CattleID: '',
           // Reset VetName field
          Date: '',
          Time: '',
          Symptoms: '',
          Diagnosis: '',
          Treatment: '',
          VetName: ''
        });
      })
      .catch(err => {
        console.error(err);
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
          label="Date"
          type="date"
          name="Date"
          value={formData.Date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
          margin="normal"
        />

        <TextField
          label="Time"
          type="time"
          name="Time"
          value={formData.Time}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
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

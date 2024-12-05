import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from '../../services/api'; // Axios instance configured for API calls
import '../../index.css'; // Optional styling

const AddVeterinaryRecord = () => {
  const [cattleList, setCattleList] = useState([]);
  const [vetsList, setVetsList] = useState([]);
  const [formData, setFormData] = useState({
    CattleID: '',
    VetID: '',
    Date: '',
    Time: '',
    Symptoms: '',
    Diagnosis: '',
    Treatment: ''
  });

  useEffect(() => {
    // Fetch cattle list
    axios.get('/cattle')
      .then(response => setCattleList(response.data))
      .catch(err => console.error(err));

    // Fetch vet list
    axios.get('/vets')
      .then(response => setVetsList(response.data))
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
    axios.post('/veterinary-records', formData)
      .then(() => {
        alert('Veterinary record added successfully!');
        setFormData({
          CattleID: '',
          VetID: '',
          Date: '',
          Time: '',
          Symptoms: '',
          Diagnosis: '',
          Treatment: ''
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
          <Select
            value={formData.CattleID}
            onChange={handleChange}
            name="CattleID"
            required
          >
            {cattleList.map((cattle) => (
              <MenuItem key={cattle.CattleID} value={cattle.CattleID}>
                {cattle.Breed} - {cattle.CattleID}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Veterinarian</InputLabel>
          <Select
            value={formData.VetID}
            onChange={handleChange}
            name="VetID"
            required
          >
            {vetsList.map((vet) => (
              <MenuItem key={vet.VetID} value={vet.VetID}>
                {vet.Name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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

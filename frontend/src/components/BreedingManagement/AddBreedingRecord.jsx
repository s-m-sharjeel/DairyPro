import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/api";

const AddBreedingRecord = () => {
  const [cows, setCows] = useState([]);
  const [bulls, setBulls] = useState([]);
  const [formData, setFormData] = useState({
    cowID: "",
    bullID: "",
    date: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cows and bulls from backend
    const fetchData = async () => {
      try {
        const cowResponse = await axios.get("/cows");
        const bullResponse = await axios.get("/bulls");
        setCows(cowResponse.data);
        setBulls(bullResponse.data);
      } catch (error) {
        console.error("Error fetching cows or bulls:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/breeding-records", formData);
      alert("Breeding Record Added Successfully!");
      navigate("/breeding-records"); // Redirect to the records list
    } catch (error) {
      console.error("Error adding breeding record:", error);
      alert("Failed to add breeding record.");
    }
  };

  return (
    <div className="add-breeding-record">
      <h2>Add Breeding Record</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Cow:
          <select name="cowID" value={formData.cowID} onChange={handleChange} required>
            <option value="">Select Cow</option>
            {cows.map((cow) => (
              <option key={cow.CowID} value={cow.CowID}>
                {cow.Breed} (ID: {cow.CowID})
              </option>
            ))}
          </select>
        </label>

        <label>
          Select Bull:
          <select name="bullID" value={formData.bullID} onChange={handleChange} required>
            <option value="">Select Bull</option>
            {bulls.map((bull) => (
              <option key={bull.BullID} value={bull.BullID}>
                {bull.Breed} (ID: {bull.BullID})
              </option>
            ))}
          </select>
        </label>

        <label>
          Breeding Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Add Breeding Record</button>
      </form>
    </div>
  );
};

export default AddBreedingRecord;

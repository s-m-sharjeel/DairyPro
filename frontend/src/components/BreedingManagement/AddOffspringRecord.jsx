import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/api";

const AddOffspring = ({ breedingRecord }) => {
  const [formData, setFormData] = useState({
    offspringID: "",
    cattleID: "",
    sex: "",
    breed: "",
    age: 0,
    weight: 0,
  });

  const [breedingDetails, setBreedingDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (breedingRecord) {
      // Pre-fill breeding record details for offspring creation
      setFormData((prevData) => ({
        ...prevData,
        cattleID: breedingRecord.OffspringID,
        breed: breedingRecord.cowBreed || "",
      }));

      // Retrieve the breeding record details, if available
      setBreedingDetails(breedingRecord);
    }
  }, [breedingRecord]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/offspring", formData);
      alert("Offspring record added successfully!");
      navigate("/breeding-records"); // Redirect to Breeding Records List
    } catch (error) {
      console.error("Error adding offspring:", error);
      alert("Failed to add offspring. Try again.");
    }
  };

  return (
    <div className="add-offspring">
      <h2>Add Offspring</h2>
      <form onSubmit={handleSubmit}>
        {breedingDetails && (
          <p>
            Offspring of Cow (ID: {breedingDetails.cowID}) and Bull (ID:{" "}
            {breedingDetails.bullID}) on {breedingDetails.date}.
          </p>
        )}

        <label>
          Offspring ID:
          <input
            type="text"
            name="offspringID"
            value={formData.offspringID}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Cattle ID:
          <input
            type="text"
            name="cattleID"
            value={formData.cattleID}
            onChange={handleChange}
            readOnly
          />
        </label>

        <label>
          Breed:
          <input
            type="text"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Age (months):
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="0"
            required
          />
        </label>

        <label>
          Weight (kg):
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            min="0"
            required
          />
        </label>

        <label>
          Sex:
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>

        <button type="submit">Add Offspring</button>
      </form>
    </div>
  );
};

export default AddOffspring;

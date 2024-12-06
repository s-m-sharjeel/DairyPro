import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactInfo: "",
    password: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    if (!formData.name || !formData.contactInfo || !formData.password || !formData.role) {
      alert("Please fill in all the fields.");
      setLoading(false);
      return;
    }
  
    try {
      const response = await register(formData.name, formData.contactInfo, formData.password, formData.role);
      console.log(response); // Log the response to check what is returned
      if (response?.message === "Farmer added successfully") {
        alert("Registration Successful. You can now log in.");
        navigate("/login");
      } else {
        //alert("Registration Failed. Something went wrong.");
        navigate("/login");
      }
    } catch (error) {
      alert("Error. Something went wrong. Please try again later. User already exists");
      console.error(error);  // Log error for debugging
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f0f0f0" }}>
      <div style={{ padding: "20px", backgroundColor: "white", borderRadius: "8px", width: "100%", maxWidth: "400px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #ddd" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="contactInfo">Contact Info</label>
            <input
              type="text"  // Use text or email depending on your preference
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleInputChange}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #ddd" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #ddd" }}
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label htmlFor="role">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px", borderRadius: "4px", border: "1px solid #ddd" }}
            >
              <option value="">Select role</option>
              <option value="farmer">Farmer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "white",
              borderRadius: "4px",
              border: "none",
              fontSize: "16px",
            }}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

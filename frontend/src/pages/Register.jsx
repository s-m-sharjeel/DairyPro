import { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import the custom AuthContext

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { register } = useAuth(); // Access register function from AuthContext

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

    // Basic validation for form fields
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      toast({
        title: "Field Error",
        description: "Please fill in all the fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    try {
      // Assuming `register` function in context handles API calls and updates context
      const response = await register(formData.name, formData.email, formData.password, formData.role);
      if (response?.token) {
        toast({
          title: "Registration Successful",
          description: "Welcome aboard! You can now log in.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login"); // Navigate to login page after successful registration
      } else {
        toast({
          title: "Registration Failed",
          description: "Something went wrong. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={"gray.50"}
    >
      <Box
        p={8}
        borderRadius="md"
        boxShadow="lg"
        bg="white"
        width="100%"
        maxWidth="400px"
      >
        <Heading mb={6} textAlign="center">
          Register
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="name" isRequired mb={4}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl id="email" isRequired mb={4}>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl id="password" isRequired mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl id="role" isRequired mb={6}>
            <FormLabel>Role</FormLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              placeholder="Select role"
            >
              <option value="farmer">Farmer</option>
              <option value="admin">Administrator</option>
            </Select>
          </FormControl>

          <Button
            width="100%"
            colorScheme="teal"
            isLoading={loading}
            type="submit"
          >
            Register
          </Button>
        </form>

        <Text mt={4} textAlign="center">
          Already have an account?{" "}
          <Button variant="link" color="teal.500" onClick={() => navigate("/login")}>
            Login
          </Button>
        </Text>
      </Box>
    </Flex>
  );
};

export default Register;

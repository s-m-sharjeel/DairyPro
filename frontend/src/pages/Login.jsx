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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the custom AuthContext

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth(); // Access login function from AuthContext

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

    // Basic validation for email and password
    if (!formData.email || !formData.password) {
      toast({
        title: "Field Error",
        description: "Please fill in both email and password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    try {
      // Assuming `login` function in context handles API calls and updates context
      const response = await login(formData.email, formData.password);
      if (response?.token) {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/dashboard"); // Navigate to dashboard on successful login
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Please try again.",
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
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="email" isRequired mb={4}>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl id="password" isRequired mb={6}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </FormControl>

          <Button
            width="100%"
            colorScheme="teal"
            isLoading={loading}
            type="submit"
          >
            Login
          </Button>
        </form>

        <Text mt={4} textAlign="center">
          Don't have an account?{" "}
          <Button variant="link" color="teal.500" onClick={() => navigate("/register")}>
            Register
          </Button>
        </Text>
      </Box>
    </Flex>
  );
};

export default Login;

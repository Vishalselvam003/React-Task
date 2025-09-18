import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";

const LoginForm = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  // handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/users");
      const users = await response.json();
        console.log(users);
    
      // find user by email + password
      const user = users.find(
        (u) => u.email === values.email && u.password === values.password
      );

      if (user) {
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate("/student-list"); 
        }, 1500);
      } else {
        setError("Invalid email or password!");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 3,
      }}
    >
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Don’t have an account? <Link to="/">Signup</Link>
        </Typography>
      </Paper>

      {/* Snackbar for success */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Login Successful!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginForm;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputAdornment,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  OutlinedInput,
  Snackbar,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {useNavigate } from "react-router-dom";

const StudentForm = () => {
  let url =useNavigate()
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    course: "",
    password: "",
    showPassword: false,
  });

  const [errors, setErrors] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const courses = [
    "Web Development",
    "Data Science",
    "UI/UX Design",
    "Mobile Development",
    "Other",
  ];

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleClickShowPassword = () => {
    setValues((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const validate = () => {
    const newErrors = {};
    if (!values.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!values.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/))
      newErrors.email = "Valid email required";
    if (!values.phone.match(/^\+?[0-9]{7,15}$/))
      newErrors.phone = "Valid phone number required";
    if (!values.dob) newErrors.dob = "Date of birth required";
    if (!values.gender) newErrors.gender = "Please select gender";
    if (!values.address.trim()) newErrors.address = "Address is required";
    if (!values.course) newErrors.course = "Please choose a course";
    if (values.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    const response = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      setOpenSnackbar(true);
      

      // Reset form after submit
      setValues({
        fullName: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        address: "",
        course: "",
        password: "",
        showPassword: false,
      });
      url('/login')
    } else {
      console.error("Failed to save data:", response.statusText);
    }
  } 
  catch (error) {
    console.error("Error:", error);
  }
};


  return (
    <Box sx={{ maxWidth: 500, mx: "auto", p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Student Registration Form
      </Typography>

      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Full Name */}
          <Grid size={6}>
            <TextField
              label="Full Name"
              fullWidth
              value={values.fullName}
              onChange={handleChange("fullName")}
              error={!!errors.fullName}
              helperText={errors.fullName}
            />
          </Grid>

          {/* Email */}
          <Grid size={6}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={values.email}
              onChange={handleChange("email")}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>

          {/* Phone Number */}
          <Grid size={6}>
            <TextField
              label="Phone Number"
              fullWidth
              value={values.phone}
              onChange={handleChange("phone")}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>

          {/* DOB */}
          <Grid size={6}>
            <TextField
              label="Date of Birth"
              type="date"
              fullWidth
              value={values.dob}
              onChange={handleChange("dob")}
              InputLabelProps={{ shrink: true }}
              error={!!errors.dob}
              helperText={errors.dob}
            />
          </Grid>



          {/* Address */}
          <Grid size={12}>
            <TextField
              label="Address"
              fullWidth
              multiline
              minRows={3}
              value={values.address}
              onChange={handleChange("address")}
              error={!!errors.address}
              helperText={errors.address}
            />
          </Grid>
          {/* Gender */}
          <Grid>
            <FormControl  component="fieldset" error={!!errors.gender}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                value={values.gender}
                onChange={handleChange("gender")}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
              {errors.gender && (
                <Typography variant="caption" color="error">
                  {errors.gender}
                </Typography>
              )}
            </FormControl>
          </Grid>
          {/* Course */}
          <Grid size={6}>
            <FormControl fullWidth error={!!errors.course}>
              <InputLabel id="course-label">Course Enrolled</InputLabel>
              <Select
                labelId="course-label"
                value={values.course}
                onChange={handleChange("course")}
              >
                {courses.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </Select>
              {errors.course && (
                <Typography variant="outlined" color="error">
                  {errors.course}
                </Typography>
              )}
            </FormControl>
          </Grid>

          {/* Password */}
          <Grid size={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {values.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              {errors.password && (
                <Typography variant="caption" color="error">
                  {errors.password}
                </Typography>
              )}
            </FormControl>
          </Grid>

          {/* Submit */}
          <Grid size={12}>
            <Button variant="contained" type="submit" fullWidth>
              Submit
            </Button>
          </Grid>
          <Grid size={12}>
              <h4>Already Signed Up? <Link to="/login">Login</Link></h4>
          </Grid>
        </Grid>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
          Registration submitted successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StudentForm;

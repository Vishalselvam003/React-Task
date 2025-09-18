import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editStudent, setEditStudent] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");

  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      setStudents(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" });
      setSnackbarMsg("Student deleted successfully!");
      setOpenSnackbar(true);
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditOpen = (student) => setEditStudent(student);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    if (!editStudent.fullName || !editStudent.email) {
      alert("Full Name and Email are required");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/users/${editStudent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editStudent),
      });

      if (!res.ok) throw new Error("Failed to update");

      setSnackbarMsg("Student updated successfully!");
      setOpenSnackbar(true);
      setEditStudent(null);
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ maxWidth: "95%", mx: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Student List
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.id}</TableCell>
                <TableCell>{s.fullName}</TableCell>
                <TableCell>{s.email}</TableCell>
                <TableCell>{s.phone}</TableCell>
                <TableCell>{s.dob}</TableCell>
                <TableCell>{s.gender}</TableCell>
                <TableCell>{s.address}</TableCell>
                <TableCell>{s.course}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditOpen(s)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(s.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={!!editStudent} onClose={() => setEditStudent(null)}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          {editStudent && (
            <Box sx={{ mt: 1 }}>
              <TextField
                label="Full Name"
                name="fullName"
                value={editStudent.fullName}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                name="email"
                value={editStudent.email}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone"
                name="phone"
                value={editStudent.phone}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="DOB"
                name="dob"
                type="date"
                value={editStudent.dob}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Gender"
                name="gender"
                value={editStudent.gender}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Address"
                name="address"
                value={editStudent.address}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Course"
                name="course"
                value={editStudent.course}
                onChange={handleEditChange}
                fullWidth
                margin="normal"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditStudent(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StudentList;

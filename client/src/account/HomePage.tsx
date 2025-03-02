import {
  Avatar,
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Divider,
} from "@mui/material";

import { useUpdateUserMutation, useUserInfoQuery } from "./accountApi";
import {
  GitHub,
  Twitter,
  LinkedIn,
  Instagram,
  Facebook,
  YouTube,
  Edit,
  Save,
} from "@mui/icons-material";
import { useState } from "react";

export default function ProfilePage() {
  const { data: user, refetch } = useUserInfoQuery();
  console.log(user);
  const [updateUser] = useUpdateUserMutation();
  const [isEditing, setEditing] = useState(false);
  const formatDateForInput = (date: string | Date | undefined): string => {
    if (!date) return ""; // Ako nema datuma, vrati prazan string
    const dateObj = typeof date === "string" ? new Date(date) : date; // Ako je string, konvertuj ga u Date
    return dateObj.toISOString().split("T")[0]; // Format u YYYY-MM-DD
  };

  const [userData, setUserData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    dateOfBirth: user?.dateOfBirth ? formatDateForInput(user.dateOfBirth) : "",
    gender: user?.gender || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: name === "dateOfBirth" ? formatDateForInput(value) : value,
    }));
  };
  const handleSave = async () => {
    if (!user || !user.id) {
      console.error("Greška: ID korisnika nije definisan.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("firstName", userData.firstName);
      formData.append("lastName", userData.lastName);
      formData.append("email", userData.email);
      formData.append("gender", userData.gender);

      if (userData.dateOfBirth) {
        formData.append("dateOfBirth", userData.dateOfBirth.toString());
      }

      await updateUser({ id: user.id, data: formData }).unwrap(); // ID je sada string
      setEditing(false);

      await refetch();
    } catch (error) {
      console.error("Greška pri ažuriranju korisničkih podataka:", error);
    }
  };

  return (
    <Box>
      {/* Header Image */}
      <Box
        sx={{
          height: 250,
          backgroundImage: "url('background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Profile Section */}
      <Grid
        container
        justifyContent="center"
        sx={{ position: "relative", top: -30 }}
      >
        <Avatar
          src="user.jpg"
          sx={{ width: 100, height: 100, border: "4px solid white" }}
        />
      </Grid>

      <Box textAlign="center" mt={1}>
        <Typography variant="h6">
          {user?.firstName} {user?.lastName}
        </Typography>
      </Box>

      {/* Social Icons */}
      <Box display="flex" justifyContent="center" gap={2} mt={1}>
        <Facebook color="primary" />
        <Twitter color="primary" />
        <LinkedIn color="primary" />
        <Instagram color="secondary" />
        <YouTube color="error" />
        <GitHub />
      </Box>

      {/* User Info Table */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt="12px"
        width="80%"
        mx="auto"
      >
        {isEditing ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="firstName"
                label="Ime"
                value={userData.firstName}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="lastName"
                label="Prezime"
                value={userData.lastName}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="email"
                label="E-mail"
                value={userData.email}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="dateOfBirth"
                label="Datum rođenja"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={userData.dateOfBirth}
                onChange={handleChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="gender"
                label="Pol"
                value={userData.gender}
                onChange={handleChange}
                size="small"
              />
            </Grid>
          </Grid>
        ) : (
          <Box textAlign="center">
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Ime i prezime:</strong> {userData.firstName}{" "}
              {userData.lastName}
            </Typography>
            <Divider/>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>E-mail:</strong> {userData.email}
            </Typography>
            <Divider/>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Datum rođenja:</strong>{" "}
              {userData.dateOfBirth
                ? new Date(userData.dateOfBirth).toLocaleDateString()
                : "N/A"}
            </Typography>
            <Divider/>
            <Typography variant="body2">
              <strong>Pol:</strong> {userData.gender}
            </Typography>
            <Divider/>
          </Box>
        )}

        {/* Dugme Edit / Save */}
        <Button
          startIcon={isEditing ? <Save /> : <Edit />}
          onClick={isEditing ? handleSave : () => setEditing(true)}
          variant="contained"
          sx={{ mt: 2 }}
        >
          {isEditing ? "Sačuvaj" : "Izmeni"}
        </Button>
      </Box>
    </Box>
  );
}

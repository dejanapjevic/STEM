import {
  Avatar,
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import {
  useChangePasswordMutation,
  useUpdateUserMutation,
  useUserInfoQuery,
} from "./accountApi";
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
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { data: user, refetch } = useUserInfoQuery();
  const [updateUser] = useUpdateUserMutation();
  const [changePassword] = useChangePasswordMutation();
  const [dialogchangePassword, setDialogChangePasswordOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const formatDateForInput = (date: string | Date | undefined): string => {
    if (!date) return "";
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toISOString().split("T")[0];
  };

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
  });
  const [trenutnaLozinka, setTrenutnaLozinka] = useState("");
  const [novaLozinka, setNovaLozinka] = useState("");
  const [novaLozinkaPonovno, setNovaLozinkaPonovno] = useState("");
  // Postavljanje userData kada se podaci učitaju
  useEffect(() => {
    if (user) {
      setUserData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        dateOfBirth: user.dateOfBirth
          ? formatDateForInput(user.dateOfBirth)
          : "",
        gender: user.gender || "",
      });
    }
  }, [user]);
  //funkcija za input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "trenutna lozinka") {
      setTrenutnaLozinka(value);
    } else if (name === "nova lozinka") {
      setNovaLozinka(value);
    } else if (name === "nova lozika") {
      setNovaLozinkaPonovno(value);
    } else {
      setUserData((prev) => ({
        ...prev,
        [name]: value, // Za druge podatke
      }));
    }
  };

  // Funkcija za Select
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveData = async () => {
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

      await updateUser({ id: user.id, data: formData }).unwrap();
      setDialogOpen(false);
      toast.success("Uspješno ste ažurirali lične podatke!");
      await refetch(); // Osvježavanje podataka nakon ažuriranja
    } catch (error) {
      console.error("Greška pri ažuriranju korisničkih podataka:", error);
    }
  };
  const handleChangePassword = async () => {
    if (novaLozinka !== novaLozinkaPonovno) {
      alert("Lozinke se ne poklapaju!");
      return;
    }

    try {
      await changePassword({
        currentPassword: trenutnaLozinka,
        newPassword: novaLozinka,
      }).unwrap();
      setDialogChangePasswordOpen(false);
      toast.success("Lozinka je uspješno promijenjena!");
    } catch (error) {
      console.error("Greška pri promjeni lozinke:", error);
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
        <Box textAlign="center">
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Ime i prezime:</strong> {userData.firstName}{" "}
            {userData.lastName}
          </Typography>
          <Divider />
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>E-mail:</strong> {userData.email}
          </Typography>
          <Divider />
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Datum rođenja:</strong>{" "}
            {userData.dateOfBirth
              ? new Date(userData.dateOfBirth).toLocaleDateString()
              : "N/A"}
          </Typography>
          <Divider />
          <Typography variant="body2">
            <strong>Pol:</strong> {userData.gender}
          </Typography>
          <Divider />
        </Box>

        {/* Dugme Edit */}
        <Button
          startIcon={<Edit />}
          onClick={() => setDialogOpen(true)}
          variant="contained"
          sx={{ mt: 2, width: "250px" }}
        >
          Izmjeni podatke
        </Button>
        <Button
          startIcon={<Edit />}
          onClick={() => setDialogChangePasswordOpen(true)}
          variant="contained"
          sx={{ mt: 2, width: "250px" }}
        >
          Nova lozinka
        </Button>
      </Box>

      {/* Dialog za izmene */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Izmjena korisničkih podataka</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="firstName"
                label="Ime"
                value={userData.firstName}
                onChange={handleInputChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="lastName"
                label="Prezime"
                value={userData.lastName}
                onChange={handleInputChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="email"
                label="E-mail"
                value={userData.email}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Pol</InputLabel>
                <Select
                  name="gender"
                  value={userData.gender}
                  onChange={handleSelectChange}
                  label="Pol"
                >
                  <MenuItem value="M">Muški</MenuItem>
                  <MenuItem value="Ž">Ženski</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Otkaži
          </Button>
          <Button
            onClick={handleSaveData}
            startIcon={<Save />}
            variant="contained"
          >
            Sačuvaj
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={dialogchangePassword}
        onClose={() => setDialogChangePasswordOpen(false)}
      >
        <DialogTitle>Izmjena korisničke lozinke</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                variant="standard"
                name="trenutna lozinka"
                label="Trenutna lozinka"
                onChange={handleInputChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                variant="standard"
                name="nova lozinka"
                label="Nova lozinka"
                onChange={handleInputChange}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                variant="standard"
                name="nova lozika"
                label="Ponovo unesi novu lozinku"
                onChange={handleInputChange}
                size="small"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogChangePasswordOpen(false)}>
            Otkaži
          </Button>
          <Button
            onClick={handleChangePassword}
            startIcon={<Save />}
            variant="contained"
          >
            Sačuvaj
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

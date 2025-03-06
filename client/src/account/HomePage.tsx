import {
  Avatar,
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  IconButton,
  Menu,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

import {
  GitHub,
  Twitter,
  LinkedIn,
  Instagram,
  Facebook,
  YouTube,
  Edit,
  Save,
  Article,
  Assignment,
  School,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  useChangePasswordMutation,
  useUpdateUserMutation,
  useUserInfoQuery,
} from "./accountApi";

export default function ProfilePage() {
  const { data: user, refetch } = useUserInfoQuery();
  const [updateUser] = useUpdateUserMutation();
  const [changePassword] = useChangePasswordMutation();
  const [dialogChangePassword, setDialogChangePasswordOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (user) {
      setUserData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        dateOfBirth: user.dateOfBirth
          ? new Date(user.dateOfBirth).toLocaleDateString()
          : "",
        gender: user.gender || "",
      });
    }
  }, [user]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "currentPassword") setCurrentPassword(value);
    else if (name === "newPassword") setNewPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
    else {
      setUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

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

      // Passing the FormData object
      await updateUser({ id: user.id, data: formData }).unwrap();
      setDialogOpen(false);
      handleClose();
      toast.success("Uspješno ste ažurirali lične podatke!");
      await refetch(); // Osvježavanje podataka nakon ažuriranja
    } catch (error) {
      console.error("Greška pri ažuriranju korisničkih podataka:", error);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Lozinke se ne poklapaju!");
      return;
    }
    try {
      await changePassword({
        currentPassword,
        newPassword,
      }).unwrap();
      setDialogChangePasswordOpen(false);
      toast.success("Lozinka je uspješno promijenjena!");
      setCurrentPassword("");
      setConfirmPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Greška prilikom promjene lozinke:", error);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          height: 160,
          backgroundImage: "url('background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Grid
        container
        justifyContent="center"
        sx={{ position: "relative", top: -30, display: "flex", gap: 2 }}
      >
        <Avatar
          src="user.jpg"
          sx={{
            width: 140,
            height: 140,
            border: "4px solid white",
            boxShadow: 2,
          }}
        />
        <IconButton
          onClick={handleClick}
          sx={{
            position: "absolute",
            top: "110px",
            right: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            borderRadius: "50%",
            padding: "5px",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <Edit />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => setDialogOpen(true)}>
            Promijeni lične podatke
          </MenuItem>
          <MenuItem onClick={() => setDialogChangePasswordOpen(true)}>
            Promijeni lozinku
          </MenuItem>
        </Menu>
      </Grid>

      <Box textAlign="center" sx={{ mt: 2 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", fontStyle: "italic" }}
        >
          DOBRODOŠLI NAZAD, {user?.firstName}!
        </Typography>
        <Typography variant="body1" sx={{ color: "gray" }}>
          {user?.email}
        </Typography>
      </Box>

      {/* Social Links */}
      <Box display="flex" justifyContent="center" gap={2} mt={3}>
        <Facebook color="primary" />
        <Twitter color="primary" />
        <LinkedIn color="primary" />
        <Instagram color="secondary" />
        <YouTube color="error" />
        <GitHub />
      </Box>

      {/* Options Section */}
      <Box display="flex" justifyContent="center" mt={4} gap={3}>
        <Card sx={{ width: 250, textAlign: "center", boxShadow: 3 }}>
          <CardContent>
            <Article fontSize="large" sx={{ color: "primary.main", mb: 2 }} />
            <Typography variant="h6">Sačuvani članci</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Pogledaj
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ width: 250, textAlign: "center", boxShadow: 3 }}>
          <CardContent>
            <Assignment
              fontSize="large"
              sx={{ color: "primary.main", mb: 2 }}
            />
            <Typography variant="h6">Moj STEM portfolio</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Pogledaj
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ width: 250, textAlign: "center", boxShadow: 3 }}>
          <CardContent>
            <School fontSize="large" sx={{ color: "primary.main", mb: 2 }} />
            <Typography variant="h6">Sačuvane lekcije</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Pogledaj
            </Button>
          </CardActions>
        </Card>
      </Box>

      {/* Edit Profile Dialog */}
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
                variant="standard"
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
                variant="standard"
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
                variant="standard"
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
                variant="standard"
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
                  <MenuItem value="M">M</MenuItem>
                  <MenuItem value="Ž">Ž</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} sx={{ color: "black" }}>
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

      {/* Change Password Dialog */}
      <Dialog
        open={dialogChangePassword}
        onClose={() => setDialogChangePasswordOpen(false)}
      >
        <DialogTitle>Izmjena korisničke lozinke</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            name="currentPassword"
            label="Trenutna lozinka"
            type="password"
            value={currentPassword}
            onChange={handleInputChange}
            size="small"
            variant="standard"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            name="newPassword"
            label="Nova lozinka"
            type="password"
            value={newPassword}
            onChange={handleInputChange}
            size="small"
            variant="standard"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            name="confirmPassword"
            label="Potvrdi novu lozinku"
            type="password"
            value={confirmPassword}
            onChange={handleInputChange}
            size="small"
            variant="standard"
          />
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

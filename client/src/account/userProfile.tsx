import React, { useState } from 'react';
import { Avatar, Button, TextField, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: 'Marko',
    surname: 'Marković',
    email: 'marko.markovic@example.com',
    gender: 'Muški',
    birthDate: '1995-05-14',
    profilePicture: 'https://www.w3schools.com/w3images/avatar2.png',
  });

  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openEditPassword, setOpenEditPassword] = useState(false);
  const [newName, setNewName] = useState(userData.name);
  const [newSurname, setNewSurname] = useState(userData.surname);
  const [newPassword, setNewPassword] = useState('');

  const handleChangeProfile = () => {
    setUserData({
      ...userData,
      name: newName,
      surname: newSurname,
    });
    setOpenEditProfile(false);
  };

  const handleChangePassword = () => {
    // Logika za promenu lozinke
    setOpenEditPassword(false);
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#121212',
      color: '#fff',
    }}>
      <Box sx={{
        backgroundColor: '#1f1f1f',
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        textAlign: 'center',
        width: 350,
      }}>
        <Avatar alt="Profilna slika" src={userData.profilePicture} sx={{
          width: 100,
          height: 100,
          marginBottom: 2,
          border: '3px solid #fff',
        }} />
        <Box sx={{
          marginBottom: 3,
        }}>
          <Typography variant="h5" sx={{
            fontWeight: 'bold',
            fontSize: '24px',
          }}>
            {`${userData.name} ${userData.surname}`}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 1 }}>
            Email: {userData.email}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 1 }}>
            Pol: {userData.gender}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 3 }}>
            Datum rođenja: {userData.birthDate}
          </Typography>
        </Box>

        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 1,
        }}>
          <Button variant="outlined" color="primary" onClick={() => setOpenEditProfile(true)} sx={{ width: '48%' }}>
            Izmeni lične podatke
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => setOpenEditPassword(true)} sx={{ width: '48%' }}>
            Izmeni lozinku
          </Button>
        </Box>
      </Box>

      {/* Dijalog za izmenu ličnih podataka */}
      <Dialog open={openEditProfile} onClose={() => setOpenEditProfile(false)}>
        <DialogTitle>Izmeni lične podatke</DialogTitle>
        <DialogContent sx={{ backgroundColor: '#1f1f1f', color: '#fff' }}>
          <TextField
            label="Ime"
            variant="outlined"
            fullWidth
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            margin="normal"
            sx={{
              input: { color: '#fff' },
            }}
          />
          <TextField
            label="Prezime"
            variant="outlined"
            fullWidth
            value={newSurname}
            onChange={(e) => setNewSurname(e.target.value)}
            margin="normal"
            sx={{
              input: { color: '#fff' },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#1f1f1f', color: '#fff' }}>
          <Button onClick={() => setOpenEditProfile(false)} color="primary">Otkaži</Button>
          <Button onClick={handleChangeProfile} color="primary">Potvrdi</Button>
        </DialogActions>
      </Dialog>

      {/* Dijalog za izmenu lozinke */}
      <Dialog open={openEditPassword} onClose={() => setOpenEditPassword(false)}>
        <DialogTitle>Izmeni lozinku</DialogTitle>
        <DialogContent sx={{ backgroundColor: '#1f1f1f', color: '#fff' }}>
          <TextField
            label="Nova lozinka"
            type="password"
            variant="outlined"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            margin="normal"
            sx={{
              input: { color: '#fff' },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#1f1f1f', color: '#fff' }}>
          <Button onClick={() => setOpenEditPassword(false)} color="primary">Otkaži</Button>
          <Button onClick={handleChangePassword} color="primary">Potvrdi</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserProfile;

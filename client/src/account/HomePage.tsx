import { Avatar, Box, Typography, Grid } from "@mui/material";

import { useUserInfoQuery } from "./accountApi";
import {
  GitHub,
  Twitter,
  LinkedIn,
  Instagram,
  Facebook,
  YouTube,
} from "@mui/icons-material";

export default function ProfilePage() {
  const { data: user } = useUserInfoQuery();

  return (
    <Box>
      {/* Header Image */}
      <Box
        sx={{
          height: 300,
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
        <Typography variant="body2" color="text.secondary">
          {user?.dateOfBirth
            ? new Date(user.dateOfBirth).toLocaleDateString()
            : "April 14th, 2018"}
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
        gap="4px"
        alignItems="center"
        
        mt="6px"
        
      >
        <Typography variant="body2">
          <strong>Ime i prezime:</strong> {user?.firstName} {user?.lastName}
        </Typography>
        <Typography variant="body2">
          <strong>E-mail:</strong> {user?.email}
        </Typography>

        <Typography variant="body2">
          <strong>Pol:</strong> {user?.gender}
        </Typography>
      </Box>
    </Box>
  );
}

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid2,
  Typography,
} from "@mui/material";
import { useUserInfoQuery } from "./accountApi";

export default function HomePage() {
  const { data: user } = useUserInfoQuery();

  return (
    <Grid2
      container
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={{
        height: "100vh",
      }}
    >
      <Grid2
        size={6}
        height="100vh"
        justifyContent="center"
        alignItems="center"
        style={{ position: "relative" }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" mt="30%" >
          <Avatar
            src="user.jpg"
            sx={{ width: 200, height: 200, margin: "0 auto 10px" }}
          />
          <Typography variant="h6">
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: {user?.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Pol: {user?.gender}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Datum rođenja:
            {user?.dateOfBirth
              ? new Date(user.dateOfBirth).toLocaleDateString()
              : "N/A"}
          </Typography>
        </Box>
      </Grid2>

      <Grid2
        size={6}
        style={{
          height: "100vh",
          backgroundImage:
            "linear-gradient(to left, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 1) 100%), url('z.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></Grid2>
    </Grid2>
  );
}

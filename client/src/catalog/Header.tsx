import {
  AppBar,
  Box,
  Button,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserInfoQuery } from "../account/accountApi";
import { useAppSelector } from "../store/store";
import { ArrowBackIos } from "@mui/icons-material";
import UserMenu from "./UserMenu";

export default function Header() {
  const { isLoading } = useAppSelector((state) => state.ui);
  const { data: user } = useUserInfoQuery();
  const navigate = useNavigate();
  const location = useLocation();
  const showBackButton =
    location.pathname === "/login" || location.pathname === "/register"; // Proveravamo rutu
  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            color: "black",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {" "}
          {location.pathname == "/inventory"
            ? "ADMINISTRACIJA"
            : "Dobrodošli u STEM istraživač"}
        </Typography>

        {user ? (
          <UserMenu user={user} />
        ) : (
          <>
            {showBackButton && ( // Prikazuje dugme samo ako je korisnik na /login ili /register
              <Button onClick={() => navigate("/home")}>
                <ArrowBackIos sx={{ color: "black" }} />
              </Button>
            )}
          </>
        )}
      </Toolbar>
      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress
            sx={{
              backgroundColor: "lightgray", // Boja pozadine
              "& .MuiLinearProgress-bar": {
                backgroundColor: "black", // Boja same progress trake
              },
            }}
          />
        </Box>
      )}
    </AppBar>
  );
}

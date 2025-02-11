import {
  AppBar,
  Box,
  Button,
  LinearProgress,
 
  Toolbar,
  Typography,
} from "@mui/material";
import {  useLocation, useNavigate } from "react-router-dom";
import { useUserInfoQuery } from "../account/accountApi";
import UserMenu from "../features/logged_in/UserMenu";
import { useAppSelector } from "../store/store";
import { ArrowBackIos } from "@mui/icons-material";

export default function Header() {
  const { isLoading } = useAppSelector((state) => state.ui);
  const { data: user } = useUserInfoQuery();
  const navigate = useNavigate();
  const location = useLocation();
  const showBackButton =
    location.pathname === "/login" || location.pathname === "/register"; // Proveravamo rutu
  return (
    <AppBar position="static" color="inherit">
      <Toolbar sx={{ border: 2, borderColor: "#5f4995" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            color: "#9C27B0",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {" "}
          {location.pathname == "/inventory"
            ? "ADMINISTRACIJA"
            : "Dobrodošli u STEM istraživač"}
        </Typography>
        <img
          src="icon.avif"
          style={{
            width: "3.8%",
            height: "auto",
            position: "absolute",
            left: "24%",
          }}
        ></img>
      

        {user ? (
          <UserMenu user={user} />
        ) : (
          <>
            {showBackButton && ( // Prikazuje dugme samo ako je korisnik na /login ili /register
              <Button onClick={() => navigate("/home")}>
                <ArrowBackIos sx={{ color: "#5f4995" }} />
              </Button>
            )}
          </>
        )}
      </Toolbar>
      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress color="secondary" />
        </Box>
      )}
    </AppBar>
  );
}

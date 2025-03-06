import {
  AppBar,
  Box,
  Button,
  LinearProgress,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation, useUserInfoQuery } from "../account/accountApi";
import { useAppSelector } from "../store/store";
import { ArrowBackIos } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import MySearch from "./Search";

export default function Header() {
  const { isLoading } = useAppSelector((state) => state.ui);
  const { data: user } = useUserInfoQuery();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null); // Korisnički meni
  const [adminMenuAnchor, setAdminMenuAnchor] = useState<HTMLElement | null>(null); // Administrativni meni
  const searchType = useAppSelector((state) => state.search.type);
  const showBackButton = location.pathname === "/login" || location.pathname === "/register";
  const isHomepage = location.pathname === "/homepage";

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget); // Otvori korisnički meni
  };

  const handleAdminMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAdminMenuAnchor(event.currentTarget); // Otvori administrativni meni
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Zatvori korisnički meni
    setAdminMenuAnchor(null); // Zatvori administrativni meni
  };

  return (
    <AppBar position="static" color="transparent" sx={{ boxShadow: "none", padding: "0 20px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Leva strana - pretraga */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 0.5, height: "65px" }}>
          {!isHomepage && <MySearch type={searchType} />} 
        </Box>

        {/* Sredina - navigacija */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Button onClick={() => navigate("/tutorials")} sx={{ borderBottom: "2px solid grey", borderRadius: "20px", width: "150px", color: "black" }}>
            Video lekcije
          </Button>
          <Button onClick={() => navigate("/catalog")} sx={{ borderBottom: "2px solid grey", borderRadius: "20px", width: "150px", color: "black" }}>
            STEM novosti
          </Button>
          <Button onClick={() => navigate("/quiz")} sx={{ borderBottom: "2px solid grey", borderRadius: "20px", width: "150px", color: "black" }}>
            STEM kviz
          </Button>
          <Button onClick={() => navigate("/career")} sx={{ borderBottom: "2px solid grey", borderRadius: "20px", width: "150px", color: "black" }}>
            Test validacije
          </Button>
          <Button onClick={() => navigate("/forum")} sx={{ borderBottom: "2px solid grey", borderRadius: "20px", width: "150px", color: "black" }}>
            Forum
          </Button>
        </Box>

        {/* Desna strana - korisnički meni */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {user && user.roles.includes("Admin") && (
            <>
              <Button
                onClick={handleAdminMenuClick}
                sx={{
                  borderBottom: '2px solid red',
                  borderRadius: '20px',
                  width: '140px',
                  color: 'red',
                }}
              >
                Administracija
              </Button>
              <Menu
                anchorEl={adminMenuAnchor} // Koristimo drugačiji anchorEl za administrativni meni
                open={Boolean(adminMenuAnchor)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    maxHeight: 250,
                    width: '260px',
                  },
                }}
              >
                <MenuItem onClick={() => navigate("/userInventory")}>Administracija korisnika</MenuItem>
                <MenuItem onClick={() => navigate("/quizInventory")}>Administracija kviza</MenuItem>
                <MenuItem onClick={() => navigate("/catalogInventory")}>Administracija članaka</MenuItem>
                <MenuItem onClick={() => navigate("/forumInventory")}>Administracija foruma</MenuItem>
                <MenuItem onClick={() => navigate("/tutorialInventory")}>Administracija video lekcija</MenuItem>
              </Menu>
            </>
          )}

          {user ? (
            <>
              <IconButton onClick={handleMenuClick} sx={{ color: "black" }}>
                <AccountCircleIcon sx={{ fontSize: 30 }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl} // Korisnički meni koristi svoj anchorEl
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                MenuListProps={{ "aria-labelledby": "user-menu" }}
              >
                <MenuItem onClick={() => navigate("/homepage")}>Moj nalog</MenuItem>
                <MenuItem onClick={logout}>Odjavi se</MenuItem>
              </Menu>
            </>
          ) : (
            showBackButton && (
              <Button
                onClick={() => navigate("/home")}
                sx={{
                  color: "black",
                  backgroundColor: "transparent",
                  border: "1px solid black",
                  borderRadius: "50%",
                  padding: "8px",
                  minWidth: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  },
                }}
              >
                <ArrowBackIos sx={{ fontSize: "18px" }} />
              </Button>
            )
          )}
        </Box>
      </Toolbar>

      {/* Loading indikacija */}
      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress
            sx={{
              backgroundColor: "lightgray",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "black",
              },
            }}
          />
        </Box>
      )}
    </AppBar>
  );
}

import {
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

import {
  AccountCircle,
  AdminPanelSettings,
  Article,
  Home,
  Logout,
  People,
  Quiz,
  Rule,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { User } from "../models/user";
import { useLogoutMutation } from "../account/accountApi";

type Props = {
  user: User;
};
export default function UserMenu({ user }: Props) {
  const [logout] = useLogoutMutation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  return (
    <div>
      <Button
        onClick={handleClick}
        style={{ fontWeight: "bold" }}
        size="large"
        sx={{ fontSize: "1.1rem", display: "flex", gap: 2, color: "black" }}
      >
        <AccountCircle sx={{ fontSize: 40 }} />
        {user.firstName + " " + user.lastName}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom", // Meni se otvara ispod dugmeta
          horizontal: "center", // Poravnanje na sredinu
        }}
        transformOrigin={{
          vertical: "top", // Meni se transformiše sa gornje strane
          horizontal: "center", // Poravnanje na sredinu
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
<MenuItem>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText onClick={() => navigate("/homepage")}>
            Početna
          </ListItemText>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <Article />
          </ListItemIcon>
          <ListItemText onClick={() => navigate("/catalog")}>
            Pročitaj STEM novosti
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Rule />
          </ListItemIcon>
          <ListItemText onClick={() => navigate("/quiz")}>
            Igraj STEM kviz
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Quiz />
          </ListItemIcon>
          <ListItemText onClick={() => navigate("/career")}>
            Uradi test validacije
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText onClick={() => navigate("/forum")}>
            Pridruži se forumu za diskusiju
          </ListItemText>
        </MenuItem>

        <Divider sx={{ color: "black" }} />
        {user && user.roles.includes("Admin") && (
          <>
            <MenuItem>
              <ListItemIcon>
                <AdminPanelSettings />
              </ListItemIcon>
              <ListItemText onClick={() => navigate("/cataloginventory")}>
                Administracija članaka
              </ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <AdminPanelSettings />
              </ListItemIcon>
              <ListItemText onClick={() => navigate("/userinventory")}>
                Administracija korisnika
              </ListItemText>
            </MenuItem>

            <MenuItem>
              <ListItemIcon>
                <AdminPanelSettings />
              </ListItemIcon>
              <ListItemText onClick={() => navigate("/foruminventory")}>
                Administracija foruma
              </ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <AdminPanelSettings />
              </ListItemIcon>
              <ListItemText onClick={() => navigate("/quizinventory")}>
                Administracija kviza
              </ListItemText>
            </MenuItem>
          </>
        )}

        <Divider sx={{ color: "black" }} />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>Odjavi se</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}

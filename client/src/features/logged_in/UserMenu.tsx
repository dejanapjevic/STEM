import { Button, Divider, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import {useState} from "react";
import { User } from "../../models/user";
import { Favorite, Logout, Person } from "@mui/icons-material";
import { useLogoutMutation } from "../account/accountApi";

type Props = {
    user:User;
}
export default function UserMenu({user}:Props) {
    const[logout] = useLogoutMutation();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
   
    return (
      <div>
        <Button 
          onClick={handleClick}
          style={{ color: '#b533ff', fontWeight:'bold' }}
          size="large"
          sx={{fontSize:'1.1rem'}}
        >
         {user.email}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem>
           <ListItemIcon>
            <Person/>
           </ListItemIcon>
             <ListItemText>Moj profil</ListItemText>
          </MenuItem>
          <MenuItem>
          <ListItemIcon>
            <Favorite/>
           </ListItemIcon>
             <ListItemText>Omiljeno</ListItemText>
             </MenuItem>
          <MenuItem >
          </MenuItem>
          <Divider/>
          <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout/>
           </ListItemIcon>
             <ListItemText>Odjavi se</ListItemText>
          </MenuItem>
        </Menu>
      </div>
    );
}

import { Button, Divider, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import {useState} from "react";
import { User } from "../../models/user";
import { AccountCircle, Favorite, Logout, People, Person, Quiz, Rule } from "@mui/icons-material";
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
          style={{fontWeight:'bold' }}
          size="large"
          sx={{fontSize:'1.1rem', display:'flex', gap:2, color: '#9C27B0'}}

        >
          <AccountCircle sx={{fontSize:40}}/>
         {user.firstName + ' ' +  user.lastName}
        </Button>
        <Menu 
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',  // Meni se otvara ispod dugmeta
            horizontal: 'center',  // Poravnanje na sredinu
          }}
          transformOrigin={{
            vertical: 'top',  // Meni se transformiše sa gornje strane
            horizontal: 'center',  // Poravnanje na sredinu
          }}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
         <MenuItem>
           <ListItemIcon>
            <Favorite/>
           </ListItemIcon>
             <ListItemText>Omiljeno</ListItemText>
          </MenuItem>
          <MenuItem>
           <ListItemIcon>
            <Rule/>
           </ListItemIcon>
             <ListItemText>Igraj STEM kviz</ListItemText>
          </MenuItem>
          <MenuItem>
          <ListItemIcon>
            <Quiz/>
           </ListItemIcon>
             <ListItemText>Uradi test validacije</ListItemText>
             </MenuItem>
          <MenuItem >
          
          <ListItemIcon>
            <People/>
           </ListItemIcon>
             <ListItemText>Pridruži se forumu za diskusiju</ListItemText>
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

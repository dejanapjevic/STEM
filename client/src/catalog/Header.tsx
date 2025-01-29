
import { AppBar, Box, Button, LinearProgress, List, ListItem, Toolbar, Typography } from '@mui/material';
import { Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useUserInfoQuery } from '../features/account/accountApi';
import UserMenu from '../features/logged_in/UserMenu';
import { useAppSelector } from '../store/store';
import { ArrowBackIos } from '@mui/icons-material';


const midLinks = [
  {title:'Prijavi se', path:'/login'},
  {title:'Registruj se', path:'/register'}
]

const navStyles= {color:'inherit',
   typography:'h6', 
   '&:hover' :{color: 'grey.500'},
    '&.active': {color:'primary.main'
    } }


export default function Header() {
   const {isLoading} = useAppSelector(state => state.ui);
  const {data:user} = useUserInfoQuery();
  const navigate=useNavigate();
  const location = useLocation(); 
  const showBackButton = location.pathname === "/login" || location.pathname === "/register"; // Proveravamo rutu
  return (
    
      <AppBar position="static" color='inherit'  >
        <Toolbar sx={{border:2, borderColor:'#5f4995'}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#5f4995', textTransform: 'uppercase', fontWeight:'bold' }} >
            Dobrodošli u STEM istraživač
          </Typography>
          {user ? ( 
            <UserMenu user={user}/>
          ) : (
            <>
             {showBackButton && ( // Prikazuje dugme samo ako je korisnik na /login ili /register
              <Button onClick={() => navigate("/home")} >
                <ArrowBackIos sx={{color:'#5f4995'}}/>
              </Button>
            )}


            <List sx={{display:'flex', fontSize:'1.3rem' }}>
            {midLinks.map(({title, path})=>(
              <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={{navStyles, width:'auto'}}
              >
                {title}
              </ListItem>
            ))}

          </List>
          </>
          )}
        </Toolbar>
        {isLoading && (
          <Box sx={{width:'100%'}}>
            <LinearProgress color='secondary'/>
          </Box>
        )} 
      </AppBar>
  );
}

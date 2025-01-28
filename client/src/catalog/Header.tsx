
import { AppBar, Box, LinearProgress, List, ListItem, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useUserInfoQuery } from '../features/account/accountApi';
import UserMenu from '../features/logged_in/UserMenu';
import { useAppSelector } from '../store/store';


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
  return (
      <AppBar position="static" color='inherit' sx={{border:'1', borderColor:'purple'}} >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#5f4995', textTransform: 'uppercase', fontWeight:'bold' }} >
            Dobrodošli u STEM istraživač
          </Typography>
          {user ? ( 
            <UserMenu user={user}/>
          ) : (
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

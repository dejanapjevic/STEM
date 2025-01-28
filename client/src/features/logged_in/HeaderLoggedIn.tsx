
import { AppBar, Box, LinearProgress, List, ListItem, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../store/store';

const midLinks = [
  {title:'Odjavi se', path:'/home'},
  {title:'Omiljeno', path:'/about'},
]

const navStyles= {color:'inherit',
   typography:'h6', 
   '&:hover' :{color: 'grey.500'},
    '&.active': {color:'primary.main'
    } }

export default function Header() {

  const {isLoading} = useAppSelector(state => state.ui);

  return (
      <AppBar position="static" color='inherit' sx={{borderTop:2, borderBottom:2, borderColor:'purple'}} >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:'#181d38' }}>
            Dobrodošli u STEM istraživač
          </Typography>
          <List sx={{display:'flex' }}>
            {midLinks.map(({title, path})=>(
              <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={navStyles}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Toolbar>
         {isLoading && (
          <Box sx={{width:'100%'}}>
            <LinearProgress color='secondary'/>
          </Box>
        )} 
      </AppBar>

  );
}
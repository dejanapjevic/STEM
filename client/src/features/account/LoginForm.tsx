import { LockOutlined } from "@mui/icons-material";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form";
import { LoginSchema, loginSchema} from "../../schemas/loginSchema";
import {zodResolver} from "@hookform/resolvers/zod";
import { useLazyUserInfoQuery, useLoginMutation} from "./accountApi";
export default function LoginForm() {

  const [login, {isLoading}] = useLoginMutation();
  const [fetchUserInfo] = useLazyUserInfoQuery();

  const location = useLocation();
  const {register, handleSubmit,formState: {errors}} = useForm<LoginSchema>({
    mode:'onTouched',
    resolver:zodResolver(loginSchema)
  });

  const navigate = useNavigate();

  const onSubmit = async (data : LoginSchema) => {
   
      await login(data); 
      await fetchUserInfo();
      navigate(location.state?.from  || '/catalog'); 
     
  }
  return (
    <>
   <Container component={Paper} maxWidth='sm' sx={{borderRadius:3, marginTop:12}}>
    <Box display='flex' flexDirection='column' alignItems='center' marginTop='8'>
        <LockOutlined sx={{mt:3, color:'secondary.main', fontSize:40}}/>
        <Typography variant="h4">
            Prijavi se
        </Typography>

        <Box component='form' onSubmit={handleSubmit(onSubmit)} width='100%' display='flex' flexDirection='column' gap={3} marginY={3}>
        <TextField fullWidth autoFocus label='Email'  autoComplete="email" 
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        />
        <TextField fullWidth  label='Lozinka' type="password"  autoComplete="current-password"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
        />
        <Button variant="contained" type="submit" disabled={isLoading}>Prijavi se</Button>
    
        <Typography sx={{textAlign:'center'}}>Nemate nalog?
       <Typography sx={{ml:2}} component={Link} to='/register' color="primary" >Registruj se</Typography>
       </Typography>
       </Box>
    </Box>
   </Container>
   <Box>
   <Button sx={{mt:10}}>Nazad na početnu</Button>
   </Box>
   </>
  )
}

import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "../../schemas/registerSchema";
import { useRegisterMutation } from "./accountApi"
import { useForm } from "react-hook-form";
import { LockOutlined } from "@mui/icons-material";
import { Container, Paper, Box, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function registerForm() {

    const[registerUser]=useRegisterMutation();
    const {register, handleSubmit,setError, formState:{errors, isValid, isLoading}} = useForm<RegisterSchema> ({
        mode:'onTouched',
        resolver:zodResolver(registerSchema)
    })

    const onSubmit = async (data:RegisterSchema) => {

        try {
            await registerUser(data).unwrap();
        } catch (error) {
           const apiError=error as{message:string};
           if(apiError.message && typeof apiError.message==='string') {
            const errorArray = apiError.message.split(',');
            errorArray.forEach(e => {
                if(e.includes('Password')) {
                    setError('password', {message:e})
                } else if(e.includes('Email')) {
                    setError('email', {message:e})
                }
            });
           }
        }
    }
  return (
    <Container component={Paper} maxWidth='sm' sx={{borderRadius:3, marginTop:12}}>
    <Box display='flex' flexDirection='column' alignItems='center' marginTop='8'>
        <LockOutlined sx={{mt:3, color:'secondary.main', fontSize:40}}/>
        <Typography variant="h4">
            Registruj se
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
        <Button variant="contained" type="submit" disabled={isLoading || !isValid}>Registruj se</Button>
    
        <Typography sx={{textAlign:'center'}}>Već imate nalog?
       <Typography sx={{ml:2}} component={Link} to='/login' color="primary" >Prijavi se</Typography>
       </Typography>
       </Box>
    </Box>
   </Container>
  )
}

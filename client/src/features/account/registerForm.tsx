import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "../../schemas/registerSchema";
import { useRegisterMutation, useSendWelcomeEmailMutation } from "./accountApi"
import { useForm } from "react-hook-form";
import { HowToReg} from "@mui/icons-material";
import { Container, Paper, Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Link } from "react-router-dom";

export default function registerForm() {

    const[registerUser]=useRegisterMutation();
    const [sendEmail] = useSendWelcomeEmailMutation();
    
    const {register, handleSubmit,setError, formState:{errors, isValid, isLoading}} = useForm<RegisterSchema> ({
        mode:'onTouched',
        resolver:zodResolver(registerSchema)
    })
    const onSubmit = async (data:RegisterSchema) => {

        try {
           await registerUser(data).unwrap();
           await sendEmail({ receptor: data.email });
           console.log('Email je poslat na adresu:', data.email);
           
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
    <Container component={Paper} maxWidth='sm'  sx={{borderRadius:3, marginTop:2,  borderColor: '#5f4995', border:2, mb:5}}>
    <Box display='flex' flexDirection='column' alignItems='center' marginTop='8' >
        <HowToReg sx={{mt:3, color:'secondary.main', fontSize:45}}/>
        <Typography variant="h5">
            Registruj se
        </Typography>

        <Box component='form' onSubmit={handleSubmit(onSubmit)} width='100%' display='flex' flexDirection='column' gap={3} marginY={3}>
        <TextField fullWidth color="secondary" label='Ime'   autoComplete="current-firstName"
        {...register('firstName')}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
        />
        <TextField fullWidth color="secondary" label='Prezime'   autoComplete="current-lastName"
        {...register('lastName')}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
        />

        <TextField fullWidth color="secondary" autoFocus label='Email'  autoComplete="email" 
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        />
        <TextField fullWidth color="secondary" label='Lozinka' type="password"  autoComplete="current-password"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
        />
       <FormControl fullWidth error={!!errors.gender}>
  <InputLabel id="gender-label">Pol</InputLabel>
  <Select
    labelId="gender-label"
    label="Pol"
    {...register('gender')}
    defaultValue="" // Početna vrednost može biti prazna ili neko drugo vrednost, npr. "M"
  >
    <MenuItem value="M">M</MenuItem>
    <MenuItem value="Ž">Ž</MenuItem>
  </Select>
  </FormControl>

  <TextField
  fullWidth
  color="secondary"
  label="Datum rođenja"
  type="date"
  InputLabelProps={{
    shrink: true, // Pomaže da labela ostane ispravno prikazana kad korisnik izabere datum
  }}
  {...register('dateOfBirth')}
  error={!!errors.dateOfBirth}
  helperText={errors.dateOfBirth?.message}
/>
        <Button variant="contained" type="submit" disabled={isLoading} sx={{backgroundColor:'#9C27B0'}}>Registruj se</Button>
    
        <Typography sx={{textAlign:'center'}}>Već imate nalog?
       <Typography sx={{ml:2}} component={Link} to='/login' color="primary" >Prijavi se</Typography>
       </Typography>
       </Box>
    </Box>
   </Container>
  )
}

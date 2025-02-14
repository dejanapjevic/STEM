import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "../schemas/registerSchema";
import { useRegisterMutation, useSendWelcomeEmailMutation } from "./accountApi";
import { useForm } from "react-hook-form";
import { HowToReg, KeyboardBackspace } from "@mui/icons-material";
import {
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid2,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function registerForm() {
  const [registerUser] = useRegisterMutation();
  const [sendEmail] = useSendWelcomeEmailMutation();
 const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isLoading },
  } = useForm<RegisterSchema>({
    mode: "onTouched",
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = async (data: RegisterSchema) => {
    try {
      await registerUser(data).unwrap();
      await sendEmail({ receptor: data.email });
      console.log("Email je poslat na adresu:", data.email);
    } catch (error) {
      const apiError = error as { message: string };
      if (apiError.message && typeof apiError.message === "string") {
        const errorArray = apiError.message.split(",");
        errorArray.forEach((e) => {
          if (e.includes("Password")) {
            setError("password", { message: e });
          } else if (e.includes("Email")) {
            setError("email", { message: e });
          }
        });
      }
    }
  };
  return (
    <Grid2 container display="flex" alignItems="center" justifyContent="center">
      <Grid2 size={6} padding={8}>
        <KeyboardBackspace
                  sx={{
                    position: "absolute", // Fiksirajte poziciju ikone
                    top: "10px", // Postavite razmak od gornjeg dela
                    left: "10px", // Postavite razmak od desnog dela
                    cursor: "pointer", // Opcionalno, za kursor ruke
                  }}
                  onClick={() => navigate("/home")}
                  />
        <Box display="flex" flexDirection="column" alignItems="center">
          <HowToReg sx={{ mt: 3, color: "blue", fontSize: 45 }} />
          <Typography variant="h5">Registruj se</Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            width="100%"
            display="flex"
            flexDirection="column"
            gap={3}
            marginY={3}
          >
            <Grid2 container spacing={3}>
              <Grid2 size={6}>
                <TextField
                  fullWidth
                  label="Ime"
                  autoComplete="current-firstName"
                  {...register("firstName")}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  fullWidth
                  label="Prezime"
                  autoComplete="current-lastName"
                  {...register("lastName")}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </Grid2>
              <Grid2 size={12}>
                <TextField
                  fullWidth
                  label="Email"
                  autoComplete="email"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid2>
              <Grid2 size={12}>
                <TextField
                  fullWidth
                  label="Lozinka"
                  type="password"
                  autoComplete="current-password"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid2>
              <Grid2 size={6}>
                <FormControl fullWidth error={!!errors.gender}>
                  <InputLabel id="gender-label">Pol</InputLabel>
                  <Select
                    labelId="gender-label"
                    label="Pol"
                    {...register("gender")}
                    defaultValue="" // Početna vrednost može biti prazna ili neko drugo vrednost, npr. "M"
                  >
                    <MenuItem value="M">M</MenuItem>
                    <MenuItem value="Ž">Ž</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  fullWidth
                  label="Datum rođenja"
                  type="date"
                  InputLabelProps={{
                    shrink: true, // Pomaže da labela ostane ispravno prikazana kad korisnik izabere datum
                  }}
                  {...register("dateOfBirth")}
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth?.message}
                />
              </Grid2>
            </Grid2>
            <Button
              variant="contained"
              type="submit"
              disabled={isLoading}
              sx={{ backgroundColor: "black" }}
            >
              Registruj se
            </Button>

            <Typography sx={{ textAlign: "center" }}>
              Već imate nalog?
              <Typography
                sx={{
                  ml: 2,
                  color: "black",
                  "&:hover": {
                    fontWeight: "bold",
                    color: "blue",
                  },
                }}
                component={Link}
                to="/login"
                color="black"
              >
                Prijavi se
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Grid2>
      <Grid2
        size={6}
        style={{
          height: "100vh",
          backgroundImage:
            "linear-gradient(to left, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 1) 100%), url('z.jpg')",
          backgroundSize: "cover", // Slika će pokriti celu površinu
          backgroundPosition: "center", // Slika će biti centrirana
          backgroundRepeat: "no-repeat", // Slika se neće ponavljati
        }}
      ></Grid2>
    </Grid2>
  );
}

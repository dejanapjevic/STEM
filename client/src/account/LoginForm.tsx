import { KeyboardBackspace, LockOutlined } from "@mui/icons-material";
import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginSchema, loginSchema } from "../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLazyUserInfoQuery, useLoginMutation } from "./accountApi";
import "../../styles/forms.css";

export default function LoginForm() {
  const [login, { isLoading }] = useLoginMutation();
  const [fetchUserInfo] = useLazyUserInfoQuery();

  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: LoginSchema) => {
    await login(data);
    await fetchUserInfo();
    navigate(location.state?.from || "/catalog");
  };
  return (
    <Grid2
      container
      display="flex"
      alignItems="center"
      justifyContent="center"
      style={{
        height: "100vh",
      }}
    >
      <Grid2
        size={6}
        height="100vh"
        justifyContent="center"
        alignContent="center"
        style={{ position: "relative" }}
      >
        <KeyboardBackspace
          sx={{
            position: "absolute", // Fiksirajte poziciju ikone
            top: "10px", // Postavite razmak od gornjeg dela
            left: "10px", // Postavite razmak od desnog dela
            cursor: "pointer", // Opcionalno, za kursor ruke
          }}
          onClick={() => navigate("/home")}
        />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          padding="5%"
        >
          <LockOutlined sx={{ mt: 3, color: "blue", fontSize: 50 }} />
          <Typography variant="h4">Prijavi se</Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            width="100%"
            display="flex"
            flexDirection="column"
            gap={3}
            marginY={3}
          >
            <TextField
              fullWidth
              label="E-mail"
              autoComplete="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              fullWidth
              label="Lozinka"
              type="password"
              autoComplete="current-password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              variant="contained"
              type="submit"
              disabled={isLoading}
              sx={{ backgroundColor: "black" }}
            >
              Prijavi se
            </Button>

            <Typography sx={{ textAlign: "center" }}>
              Nemate nalog?
              <Typography
                sx={{
                  ml: 2,
                  "&:hover": {
                    fontWeight: "bold",
                    color: "blue", // postavi bold font na hover
                  },
                }}
                component={Link}
                to="/register"
                color="black"
              >
                Registruj se
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

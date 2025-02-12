import {
  Box,
  Paper,
  Typography,
  Grid2,
  Button,
  CircularProgress,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import AppTextInput from "../components/AppTextInput";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddUserMutation, useFetchUsersQuery } from "../account/accountApi";
import { toast } from "react-toastify";
import { addUserSchema } from "../schemas/AddUserSchema";
interface UserFormValues {
  roles: string[];
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
}
interface Props {
  onCancel: () => void;
  onSuccess: () => void;
}
export default function UserForm({ onCancel, onSuccess }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(addUserSchema), // Povezivanje šeme sa formom
    defaultValues: {
      roles: [],
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
    },
  });
  const [addUser, { isLoading: isSubmitting }] = useAddUserMutation();
  const { refetch } = useFetchUsersQuery();
  const onSubmit = async (data: any) => {
    try {
      await addUser(data);
      onSuccess(); // Pozivamo onSuccess nakon dodavanja pitanja
      refetch();
      toast.success("Korisnik je uspješno dodat!");
    } catch (error) {
      console.error("Greška pri dodavanju korisnika:", error);
    }
  };
  return (
    <Box component={Paper} sx={{ p: 2, m: 40, mt: 2, mx: "auto" }}>
      <Typography variant="h5" sx={{ mb: 4 }}>
        Novi korisnik
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={3}>
          <Grid2 size={6}>
            <AppTextInput
              name="firstName"
              label="Ime"
              control={control} // Prosleđujemo control za povezivanje sa react-hook-form
            />
          </Grid2>

          <Grid2 size={6}>
            <AppTextInput name="lastName" label="Prezime" control={control} />
          </Grid2>
          <Grid2 size={6}>
            <AppTextInput name="email" label="E-mail" control={control} />
          </Grid2>
          <Grid2 size={6}>
            <AppTextInput name="password" label="Lozinka" control={control} />
          </Grid2>
          <Grid2 size={6}>
            <Controller
              name="dateOfBirth"
              control={control} // Prosleđuješ control iz useForm
              render={({ field }) => (
                <TextField
                  fullWidth
                  color="secondary"
                  label="Datum rođenja"
                  type="date"
                  InputLabelProps={{
                    shrink: true, // Labela ostaje vidljiva čak i kada je datum unet
                  }}
                  {...field} // Povezuje vrednost sa formom i omogućava praćenje promena
                  error={!!errors.dateOfBirth} // Ako postoji greška, prikazuje crveni okvir
                  helperText={errors.dateOfBirth?.message} // Ako postoji greška, prikazuje tekst greške
                />
              )}
            />
          </Grid2>
          <Grid2 size={10}>
            <InputLabel id="gender-label">Pol</InputLabel>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="gender-label"
                  label="Pol"
                  defaultValue=""
                >
                  <MenuItem value="M">M</MenuItem>
                  <MenuItem value="Ž">Ž</MenuItem>
                </Select>
              )}
            />
          </Grid2>
          <Grid2 size={12}>
            <FormControl component="fieldset">
              {/* <InputLabel id="role-label" shrink>
                Uloge
              </InputLabel> */}
              <FormGroup row>
                <Controller
                  name="roles"
                  control={control}
                  render={({ field }) => (
                    <>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={field.value.includes("Member")}
                            onChange={(e) => {
                              const newValue = e.target.checked
                                ? [...field.value, "Member"]
                                : field.value.filter(
                                    (role) => role !== "Member"
                                  );
                              field.onChange(newValue);
                            }}
                          />
                        }
                        label="Member"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={field.value.includes("Admin")}
                            onChange={(e) => {
                              const newValue = e.target.checked
                                ? [...field.value, "Admin"]
                                : field.value.filter(
                                    (role) => role !== "Admin"
                                  );
                              field.onChange(newValue);
                            }}
                          />
                        }
                        label="Admin"
                      />
                    </>
                  )}
                />
              </FormGroup>
            </FormControl>
          </Grid2>
        </Grid2>

        <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
          <Button variant="contained" color="inherit" onClick={onCancel}>
            Cancel
          </Button>
          <Button color="success" variant="contained" type="submit">
            {isSubmitting ? <CircularProgress /> : "Sačuvaj korisnika"}
          </Button>
        </Box>
      </form>
    </Box>
  );
}

import { TextField, TextFieldProps } from "@mui/material";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string
  name: keyof T
} & UseControllerProps<T> & TextFieldProps

/*label: string – Očekuje tekstualni label (naziv) polja.
UseControllerProps – Ovi props-i dolaze iz react-hook-form-ove useController funkcije, što znači da će ova komponenta
 moći da radi sa react-hook-form za upravljanje podacima u formama.
TextFieldProps – Ovim preuzimamo sve props-e od Material UI TextField komponente, što omogućava fleksibilnost prilikom korišćenja.
*/

export default function AppTextInput<T extends FieldValues>(props: Props<T>) {
  const { fieldState, field } = useController({ ...props});
  return (
    <TextField
      {...props} // Kopira sve proslijeđene props-e u TextField
      {...field} // Povezuje TextField sa React Hook Form-om
      multiline={props.multiline} //Ako se prosledi prop "multiline", koristi ga
      rows={props.rows} // Ako se prosledi prop "rows", koristi ga
      type={props.type} // Postavlja tip input-a (npr. "text", "password", "email")
      fullWidth
      value={field.value || ''}
      variant="outlined"
      error={!!fieldState.error} // Ako postoji greška, prikazuje crveni okvir
      helperText={fieldState.error?.message} // Prikazuje poruku greške ispod polja
    />
  )
}
/*
seController({...props}) vraća objekat sa:
field – Sadrži osnovne funkcionalnosti polja (onChange, onBlur, value, ref itd.).
fieldState – Sadrži informacije o validaciji polja (da li je polje validno, da li ima grešku itd.).
useController povezuje TextField sa react-hook-form, omogućavajući automatsko praćenje 
unetih podataka, validacije i prikazivanje grešaka bez potrebe da sve to ručno radimo u svakoj formi
*/

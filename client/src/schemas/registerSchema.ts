import {z} from 'zod';

const passwordValidation = new RegExp (
    /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/
)

export const registerSchema = z.object( {
    email:z.string().email({ message: 'Molimo unesite validnu email adresu.' }), 
    password:z.string().regex(passwordValidation, {
        message:'Lozinka mora sadržati 1 mali karakter, 1 veliki karakter, 1 broj, 1 specijalni karakter i biti dužine 6-10'
    }),
    firstName: z.string().min(1, 'Ime je obavezno'), // Dodaj validaciju za ime
  lastName: z.string().min(1, 'Prezime je obavezno'), 
  dateOfBirth: z
  .string()
  .refine((date) => !isNaN(Date.parse(date)), {
    message: 'Datum rođenja nije validan',
  })
  .transform((dateString) => new Date(dateString)) // Transformiši string u Date objekat
  .superRefine((date, ctx) => {
    if (date > new Date()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Datum rođenja ne može biti u budućnosti',
        path: ['dateOfBirth'],
      });
    }
  }),
  gender: z.enum(['M', 'Ž'], {
    errorMap: () => ({ message: 'Pol mora biti M ili Ž' }), // Ispravka zareza i zatvaranja stringa
  }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
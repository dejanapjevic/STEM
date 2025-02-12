import { z } from "zod";

const passwordValidation = new RegExp(
  /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?!.*\s).*$/ // Ispravljen specijalni karakter
);

export const addUserSchema = z.object({
  email: z.string().email({ message: "Molimo unesite validnu email adresu." }),
  password: z.string().regex(passwordValidation, {
    message:
      "Lozinka mora sadržati 1 mali karakter, 1 veliki karakter, 1 broj, 1 specijalni karakter i biti dužine 6-10",
  }),
  firstName: z.string().min(1, "Ime je obavezno"),
  lastName: z.string().min(1, "Prezime je obavezno"),
  dateOfBirth: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Datum rođenja nije validan",
    })
    .transform((dateString) => new Date(dateString))
    .superRefine((date, ctx) => {
      if (date > new Date()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Datum rođenja ne može biti u budućnosti",
          path: ["dateOfBirth"],
        });
      }
    }),
  gender: z.enum(["M", "Ž"], {
    errorMap: () => ({ message: "Pol mora biti M ili Ž" }),
  }),
  roles: z.array(z.enum(["Member", "Admin"])).default([]),
});
export type AddUserSchema = z.infer<typeof addUserSchema>;

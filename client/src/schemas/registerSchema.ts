import {z} from 'zod';

const passwordValidation = new RegExp (
    /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/
)

export const registerSchema = z.object( {
    email:z.string().email(),
    password:z.string().regex(passwordValidation, {
        message:'Lozinka mora sadržati 1 mali karakter, 1 veliki karakter, 1 broj, 1 specijalni karakter i biti dužine 6-10'
    }) 
})

export type RegisterSchema = z.infer<typeof registerSchema>;
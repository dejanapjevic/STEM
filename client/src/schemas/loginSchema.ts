import {z} from 'zod';

export const loginSchema = z.object( {
    email:z.string().email(),
    password:z.string().min(6, {
        message:'Lozinka mora imati barem 6 karaktera'
    })
});

export type LoginSchema=z.infer<typeof loginSchema>;
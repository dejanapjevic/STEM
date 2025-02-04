import { z } from "zod";

const fileSchema=z.instanceof(File).refine(file => file.size>0, {
    message:'Morate dodati sliku'
}).transform(file => ({
    ...file,
    preview:URL.createObjectURL(file)
}))

export const createArticleSchema = z.object({
    
    title : z.string({required_error:'Unesite članak'}),
    description:z.string({required_error:'Unesite opis '}).min(10, {
        message:'Opis ćlanka mora imati barem 10 karaktera'}),
    content:z.string({required_error:'Unesite sadržaj'}).min(50, {
        message:'Sadržaj članka mora imati barem 50 karaktera'}),
    category:z.string({required_error:'Unesite kategoriju'}),
    pictureUrl:z.string().optional(),
   file : fileSchema.optional()
})
   /*  }).refine((data)=>data.pictureUrl || data.file, {
        message:'Molim vas, dodajte sliku',
        path:['file']
    }) */
 
    export type CreateArticleSchema = z.infer<typeof createArticleSchema>;

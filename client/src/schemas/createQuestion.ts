import { z } from "zod";

// Kreiranje Zod šeme za validaciju
const createQuestionSchema = z.object({
  title: z.string().min(1, { message: "Pitanje je obavezno" }),
  option1: z.string().min(1, { message: "Opcija 1 je obavezna" }),
  option2: z.string().min(1, { message: "Opcija 2 je obavezna" }),
  option3: z.string().min(1, { message: "Opcija 3 je obavezna" }),
  option4: z.string().min(1, { message: "Opcija 4 je obavezna" }),
  answer: z.string().min(1, { message: "Tačan odgovor je obavezan" }),
}).refine((data) => {
  // Uslov da sve opcije budu različite
  const options = [data.option1, data.option2, data.option3, data.option4];
  const uniqueOptions = new Set(options);
  return uniqueOptions.size === options.length; // Proverava da li su sve opcije jedinstvene
}, {
  message: "Ponuđeni odgovori moraju biti različiti",
  path: ["title"], // Postavljanje greške na prvu opciju
}).refine((data) => {
  // Uslov da odgovor mora biti jedna od opcija
  const options = [data.option1, data.option2, data.option3, data.option4];
  return options.includes(data.answer);
}, {
  message: "Odgovor mora biti jedna od ponuđenih opcija",
  path: ["answer"], // Postavljanje greške na odgovor
});

export default createQuestionSchema;

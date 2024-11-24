import { Typography } from "@mui/material";
import '../../../styles/App.css';
export default function AboutPage() {
    return(
       
        <>
        <img src="/i.jpg" alt="stem-image" />
        <Typography variant="h6" sx={{margin:10}}>
 Aplikacija je posvećena promociji STEM obrazovanja, pružajući korisnicima najnovije informacije i resurse iz oblasti nauke, tehnologije,
 inženjerstva i matematike.Kroz pažljivo selektovane članke, interaktivne testove znanja i angažovane forume za diskusiju, omogućavamo
 korisnicima da istraže i unaprijede svoje razumjevanje ključnih STEM oblasti.Naša misija je da inspirišemo i podstaknemo korisnike svih uzrasta
 da se upuste u svijet nauke i tehnologije, razvijajući kritičko mišljenje i rješavanje problema kroz edukativne aktivnosti.</Typography>
 </>     
        
    )
}
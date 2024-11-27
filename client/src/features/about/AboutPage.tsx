import '../../../styles/App.css';
import Header from '../../components/Header';
export default function AboutPage() {
    return(
        <>
        <Header></Header> 
        <div style={{display:"flex", flexDirection:"row", marginTop:"2%", overflowY:'hidden'}} >
        <img src="/i.jpg" alt="stem-image" />
        <p style={{position:"relative" ,top:"200px", fontStyle:"oblique", fontWeight:"bold",marginRight:'100px'}}>
        Aplikacija je posvećena promociji STEM obrazovanja, pružajući korisnicima najnovije informacije i resurse iz oblasti nauke, tehnologije,
 inženjerstva i matematike.Kroz pažljivo selektovane članke, interaktivne testove znanja i angažovane forume za diskusiju, omogućavamo
 korisnicima da istraže i unaprijede svoje razumjevanje ključnih STEM oblasti.Naša misija je da inspirišemo i podstaknemo korisnike svih uzrasta
 da se upuste u svijet nauke i tehnologije, razvijajući kritičko mišljenje i rješavanje problema kroz edukativne aktivnosti.
        </p>
  </div>     
  </>
        
    )
}

import { Alert, AlertTitle, Button, ButtonGroup, List, ListItem } from '@mui/material';
import '../../../styles/App.css';

import { useLazyGet400ErrorQuery, useLazyGet401ErrorQuery, useLazyGet404ErrorQuery, useLazyGet500ErrorQuery, useLazyGetValidationErrorQuery } from '../../api/ErrorApi';
import { useState } from 'react';
import Header from '../logged_in/HeaderLoggedIn';
export default function AboutPage() {

const [validationErrors, setValidationErrors] = useState<string[]>([]);

const [trigger400Error] = useLazyGet400ErrorQuery();
const [trigger401Error]=useLazyGet401ErrorQuery();
const [trigger404Error]=useLazyGet404ErrorQuery();
const [trigger500Error]=useLazyGet500ErrorQuery();
const[triggerValidationError] = useLazyGetValidationErrorQuery();

const getValidationError = async () => {
  try {
    await triggerValidationError().unwrap();
  } catch (error: unknown) {
    if(error && typeof error === 'object' && 'message' in error 
      && typeof(error as {message:unknown}).message ==='string') {
    const errorArray = (error as {message:string}).message.split(', ');
    //da li imamo error, da li je error tipa object i da li je message properti unutar objekta
    setValidationErrors(errorArray);
  }
  }
}
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
  <ButtonGroup fullWidth sx={{marginBottom:'2%'}}>
  <Button variant='outlined' onClick={() => trigger400Error().catch(err=>console.log(err))}>400</Button>
  <Button variant='outlined' onClick={() => trigger401Error()}>401</Button>
  <Button variant='outlined' onClick={() => trigger404Error()}>404</Button>
  <Button variant='outlined' onClick={() => trigger500Error()}>500</Button>
  <Button variant='outlined'onClick={getValidationError}>Validation Error</Button>
</ButtonGroup>
{validationErrors.length >0 && (
  <Alert severity='error'>
<AlertTitle>Validation errors</AlertTitle>
<List>
    {validationErrors.map(err=>(
      <ListItem key={err}>{err}</ListItem>
    ))}
</List>
  </Alert>
)}
  </>
        
    )
}
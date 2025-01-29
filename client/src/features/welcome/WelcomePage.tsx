import { useEffect } from "react";
import { useSendWelcomeEmailMutation } from "../account/accountApi";

export default  function WelcomePage() {
  const [sendEmail] = useSendWelcomeEmailMutation();
  useEffect(() => {
    // Kada se komponenta renderuje, pošalji email
    const sendWelcomeEmail = async () => {
      const emailData = { receptor: 'dejanapjevic@hotmail.com' };

      // Logujemo podatke pre nego što ih pošaljemo
      console.log('Poslati podaci:', emailData);
      try {
        await sendEmail(emailData);  // Prosleđivanje email adrese
        console.log('Email poslat!');
      } catch (error) {
        console.error('Greška prilikom slanja emaila:', error);
        
      }
    };

    sendWelcomeEmail();
  }, [sendEmail]);  //
  return (
    <div>WelcomePage</div>
  )
}

using System;
using System.Net;
using System.Net.Mail;

namespace API.Services
{
    public interface IEmailService
    {
        Task SendWelcomeEmail(string receptor);
    }
    public class EmailService : IEmailService
    {

        private readonly IConfiguration configuration;
        public EmailService(IConfiguration configuration) //da bi klasa mogla koristiti konfiguraciju
        {
            this.configuration = configuration;
        }

        private string GenerateWelcomeBody()
        {
            return @"
        <html>
            <body style='font-family: Arial, sans-serif; background-color: #f4f7f6; color: #333; padding: 20px;'>
                <table role='presentation' style='width: 100%; border: none; background-color: #fff; border-radius: 10px; padding: 20px;'>
                    <tr>
                        <td>
                            <h1 style='color: #5f4995;'>Čestitamo na uspešnoj registraciji!</h1>
                            <p style='font-size: 18px; line-height: 1.6;'>
                                 Drago nam je što ste postali deo STEM zajednice u našoj aplikaciji, posvećenoj istraživanjima u oblasti nauke, tehnologije, inženjeringa i matematike.
                            </p>
                            <p style='font-size: 18px; line-height: 1.6;'>
                                STEM je akronim koji označava četiri ključna područja – nauku, tehnologiju, inženjering i matematiku – koji su od esencijalnog značaja za razvoj savremene društvene, ekonomske i kulturne sfere. Ova aplikacija pruža platformu koja omogućava povezivanje, učenje i deljenje najnovijih istraživanja, inovacija i tehnoloških dostignuća u tim oblastima.
                            </p>
                            <p style='font-size: 18px; line-height: 1.6;'>
                                Kroz STEM aplikaciju, imaćete priliku da istražujete, učite, komunicirate sa ekspertima i postanete deo dinamične zajednice koja menja svet kroz istraživanja i inovacije. Započnite vaše putovanje sa nama i istražite neograničene mogućnosti koje STEM svet pruža!
                            </p>
                        
                            <p style='font-size: 18px; line-height: 1.6;'>
                                Srećno istraživanje, <br> 
                            </p>
                           <p style='text-align: center; font-size: 14px; color: #888;'>Ako imate bilo kakvih pitanja ili sugestija, slobodno nas kontaktirajte putem našeg support tima.</p>
                        </td>
                    </tr>
                </table>
            </body>
        </html>";
        }


        public async Task SendWelcomeEmail(string receptor)
        {
            var email = configuration.GetValue<string>("EMAIL_CONFIGURATION:EMAIL");
            var password = configuration.GetValue<string>("EMAIL_CONFIGURATION:PASSWORD");
            var host = configuration.GetValue<string>("EMAIL_CONFIGURATION:HOST");
            var port = configuration.GetValue<int>("EMAIL_CONFIGURATION:PORT");


            var smtpClient = new SmtpClient(host, port);
            smtpClient.EnableSsl = true;
            smtpClient.UseDefaultCredentials = false;

            smtpClient.Credentials = new NetworkCredential(email, password);

           var body = GenerateWelcomeBody();
           var subject = "Dobrodošli u STEM istraživač";

            var message = new MailMessage
            {
                From = new MailAddress(email, "STEM istraživač"), // Pravi e-mail + naziv aplikacije
                Subject = subject,
                Body = body,
                IsBodyHtml = true // Ako je tijelo HTML format, kod mene jeste
            };
            
            message.To.Add(receptor);
            await smtpClient.SendMailAsync(message);
        }

      public async Task SendResetPasswordEmail(string receptor, string newPasswordMessage)
{
    var email = configuration.GetValue<string>("EMAIL_CONFIGURATION:EMAIL");
    var password = configuration.GetValue<string>("EMAIL_CONFIGURATION:PASSWORD");
    var host = configuration.GetValue<string>("EMAIL_CONFIGURATION:HOST");
    var port = configuration.GetValue<int>("EMAIL_CONFIGURATION:PORT");

    var smtpClient = new SmtpClient(host, port)
    {
        EnableSsl = true,
        UseDefaultCredentials = false,
        Credentials = new NetworkCredential(email, password)
    };

    var subject = "Nova lozinka - STEM istraživač";
    var body = $@"
        <html>
            <body style='font-family: Arial, sans-serif; background-color: #f4f7f6; color: #333; padding: 20px;'>
                <table role='presentation' style='width: 100%; border: none; background-color: #fff; border-radius: 10px; padding: 20px;'>
                    <tr>
                        <td>
                            <h1 style='color: #5f4995;'>Vaša nova lozinka</h1>
                            <p style='font-size: 18px; line-height: 1.6;'>
                                Dobijate ovaj e-mail jer je traženoo resetovanje lozinke za Vaš nalog.
                            </p>
                            <p style='font-size: 18px; line-height: 1.6;'>
                                Vaša nova lozinka je: <strong>{newPasswordMessage}</strong>
                            </p>
                            <p style='font-size: 18px; line-height: 1.6;'>
                                Preporučujemo da se odmah prijavite i promijenite lozinku iz sigurnosnih razloga.
                            </p>
                            <p style='text-align: center; font-size: 14px; color: #888;'>Ako niste tražili reset lozinke, možete ignorisati ovaj e-mail.</p>
                        </td>
                    </tr>
                </table>
            </body>
        </html>";

    var mailMessage = new MailMessage
    {
        From = new MailAddress(email, "STEM istraživač"),
        Subject = subject,
        Body = body,
        IsBodyHtml = true
    };

    mailMessage.To.Add(receptor);
    await smtpClient.SendMailAsync(mailMessage);
}

    }
}
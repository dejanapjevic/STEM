using System;
using API.DTOs;
using API.Services;
using Hangfire;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EmailsController : BaseApiController
    {
        private readonly IEmailService emailService;
        public EmailsController(IEmailService emailService)
        {
            this.emailService = emailService;
        }

        /* [HttpPost]
        public async Task<IActionResult> SendEmail([FromBody] EmailDTO emailReceptor)
        {
            if (string.IsNullOrEmpty(emailReceptor.Receptor))
            {
                // Ako je receptor prazan, baci grešku ili loguj
                return BadRequest("Receptor email je obavezan.");
            }
            await emailService.SendWelcomeEmail(emailReceptor.Receptor);
            return Ok();
        } */

        [HttpPost]
        public IActionResult SendEmail([FromBody] EmailDTO emailReceptor)
        {
            if (string.IsNullOrEmpty(emailReceptor.Receptor))
            {
                return BadRequest("Receptor email je obavezan.");
            }

            // Kreira Hangfire job koji se izvršava jednom
            BackgroundJob.Enqueue(() => emailService.SendWelcomeEmail(emailReceptor.Receptor));
    
            return Ok("Email će biti poslat u pozadini.");
        }

    }


}
/*Izgleda da je problem u tome što pokušavaš da proslediš receptor kao običan string u body, dok je API zahtev zapravo očekivao JSON objekat.
 Da bi rešila ovo, moraš koristiti odgovarajući oblik za telo zahteva (body), koji mora biti u JSON formatu, čak i ako šalješ samo jedan parametar.
Ako želiš da šalješ receptor kao string u JSON formatu, tvoje telo zahteva bi trebalo da izgleda ovako:
Ispravka:
U backendu, moraš koristiti model za parametar umesto običnog stringa.
 Na primer, koristiš DTO (Data Transfer Object) za prosleđivanje podataka kao JSON objekta:*/
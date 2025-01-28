using System;
using System.ComponentModel.DataAnnotations;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController(SignInManager<User> signInMenager) : BaseApiController
    {
        /*SignInManager<User> je korišćen za upravljanje korisničkom autentifikacijom, 
        a RegisterDTO je objekat koji prenosi podatke sa klijenta, kao što su email i lozinka korisnika.*/
        [HttpPost("register")]

        public async Task<ActionResult> RegisterUser(RegisterDTO registerDto) {
// DTO (Data Transfer Object) je jednostavan objekat koji sadrži samo podatke, bez logike.
            var user = new User {UserName=registerDto.Email, Email=registerDto.Email};
//va metoda će pokušati da kreira korisnika i vratiti rezultat, koji može biti uspešan ili neuspešan. 
//Taj rezultat se čuva u promenljivoj result.
            var result = await signInMenager.UserManager.CreateAsync(user, registerDto.Password);

            if(!result.Succeeded) {
                foreach(var error in result.Errors) {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }
//Kada pozoveš AddToRoleAsync, UserManager koristi ove tabele da bi uspostavio vezu između korisnika i uloge u bazi
            await signInMenager.UserManager.AddToRoleAsync(user, "Member");
            return Ok();

        }
        //[Authorize] //samo se moze pozvati ako je korisnik authenticated

        [HttpGet("user-info")]
/*Ova metoda ima za cilj da vrati informacije o trenutno prijavljenom korisniku, uključujući njegov email, 
korisničko ime i uloge, ako je korisnik autentifikovan.
U suprotnom, vraća odgovarajući statusni kod (kao što je NoContent ili Unauthorized).*/
        public async Task<ActionResult> GetUserInfo() {

            if(User.Identity?.IsAuthenticated==false)  return NoContent(); //nece poslati error
            var user = await signInMenager.UserManager.GetUserAsync(User);

            if(user==null) return Unauthorized();

            var roles  = await signInMenager.UserManager.GetRolesAsync(user);

            return Ok(new {
                user.Email,
                user.UserName,
                Roles = roles
            });
        }

        [HttpPost("logout")]

        public async Task<ActionResult> Logout () {
            await signInMenager.SignOutAsync();
            //odjavljuje i brise cookie
            return NoContent();
        }
    }
}
/*Kada pozoveš CreateAsync metodu, UserManager koristi IdentityUser klasu (ili tvoju prilagođenu verziju klase korisnika) 
i mapira objekat na tabelu AspNetUsers u bazi podataka.*/
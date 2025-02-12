using System;
using System.ComponentModel.DataAnnotations;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController(SignInManager<User> signInMenager, STEMContext context, IMapper mapper, UserManager<User> userManager) : BaseApiController
    {

        private readonly STEMContext _context = context;
        private readonly IMapper _mapper = mapper;
        /*SignInManager<User> je korišćen za upravljanje korisničkom autentifikacijom, 
        a RegisterDTO je objekat koji prenosi podatke sa klijenta, kao što su email i lozinka korisnika.*/
        [HttpPost("register")]

        public async Task<ActionResult> RegisterUser(RegisterDTO registerDto)
        {
            // DTO (Data Transfer Object) je jednostavan objekat koji sadrži samo podatke, bez logike.
            var user = new User
            {
                UserName = registerDto.Email,
                Email = registerDto.Email,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Gender = registerDto.Gender,
                DateOfBirth = registerDto.DateOfBirth
            };
            //va metoda će pokušati da kreira korisnika i vratiti rezultat, koji može biti uspešan ili neuspešan. 
            //Taj rezultat se čuva u promenljivoj result.
            var result = await signInMenager.UserManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
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
        public async Task<ActionResult> GetUserInfo()
        {

            if (User.Identity?.IsAuthenticated == false) return NoContent(); //nece poslati error
            var user = await signInMenager.UserManager.GetUserAsync(User);

            if (user == null) return Unauthorized();

            var roles = await signInMenager.UserManager.GetRolesAsync(user);

            return Ok(new
            {
                user.Email,
                user.UserName,
                user.FirstName,
                user.LastName,
                user.Gender,
                user.DateOfBirth,
                Roles = roles
            });
        }

        [HttpPost("logout")]

        public async Task<ActionResult> Logout()
        {
            await signInMenager.SignOutAsync();
            //odjavljuje i brise cookie
            return NoContent();
        }

        [HttpGet("get-users")]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();

            if (users == null || users.Count == 0)
                return NoContent();

            var usersList = new List<object>();

            foreach (var user in users)
            {
                var roles = await signInMenager.UserManager.GetRolesAsync(user);
                usersList.Add(new
                {
                    user.Id,
                    user.Email,
                    user.UserName,
                    user.FirstName,
                    user.LastName,
                    user.Gender,
                    user.DateOfBirth,


                    Roles = roles
                });
            }

            return Ok(usersList);
        }

        [HttpGet("get-user-by-id/{id}")]
        public async Task<ActionResult<User>> GetUserById(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();
            else return Ok(user);
        }
        [HttpDelete("delete-user/{id}")]
        public async Task<ActionResult> DeleteUser(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();
            _context.Users.Remove(user);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return NoContent();
            return BadRequest(new ProblemDetails { Title = "Problem pri brisanju članka" });
        }

        [HttpPost("add-user")]
        public async Task<ActionResult<User>> AddUser([FromBody] CreateUserDTO userDto)
        {
            var user = new User
            {
                UserName = userDto.Email,
                Email = userDto.Email,
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                Gender = userDto.Gender,
                DateOfBirth = userDto.DateOfBirth
            };

            // Kreiranje korisnika pomoću UserManager-a
            var result = await userManager.CreateAsync(user, userDto.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            if (userDto.Roles != null && userDto.Roles.Any())
            {
                var roleResult = await userManager.AddToRolesAsync(user, userDto.Roles);
                if (!roleResult.Succeeded)
                {
                    return BadRequest(roleResult.Errors);
                }
            }

            return Ok(user);
        }


    }
}
/*Kada pozoveš CreateAsync metodu, UserManager koristi IdentityUser klasu (ili tvoju prilagođenu verziju klase korisnika) 
i mapira objekat na tabelu AspNetUsers u bazi podataka.*/
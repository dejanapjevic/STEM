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
using API.Extensions;
using API.RequestHelpers;
using API.Services;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly SignInManager<User> _signInMenager;
        private readonly STEMContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly EmailService _emailService;

        public AccountController(SignInManager<User> signInManager, STEMContext context, IMapper mapper, UserManager<User> userManager, EmailService emailService)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
            _signInMenager = signInManager;
            _emailService = emailService;
        }
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
            var result = await _signInMenager.UserManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }

                return ValidationProblem();
            }
            //Kada pozoveš AddToRoleAsync, UserManager koristi ove tabele da bi uspostavio vezu između korisnika i uloge u bazi
            await _signInMenager.UserManager.AddToRoleAsync(user, "Member");
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
            var user = await _signInMenager.UserManager.GetUserAsync(User);

            if (user == null) return Unauthorized();

            var roles = await _signInMenager.UserManager.GetRolesAsync(user);

            return Ok(new
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

        [HttpPost("logout")]

        public async Task<ActionResult> Logout()
        {
            await _signInMenager.SignOutAsync();
            //odjavljuje i brise cookie
            return NoContent();
        }

        [HttpGet("get-users")]
        public async Task<ActionResult<List<User>>> GetUsers([FromQuery] UserParams userParams)
        {
            var usersQuery = _context.Users.AsQueryable().SearchUsers(userParams.SearchTerm);
            //var users = await usersQuery.ToListAsync();
            var users = await PagedList<User>.ToPagedList(usersQuery, userParams.PageNumber, userParams.PageSize);

            if (users == null || users.Count == 0)
                return NoContent();

            var usersList = new List<object>();

            foreach (var user in users)
            {
                var roles = await _signInMenager.UserManager.GetRolesAsync(user);
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
            Response.AddPaginationHeader(users.Metadata);

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
            var userTopics = _context.Topics.Where(t => t.UserId == id); // pretpostavljam da postoji UserId u ForumTopics
            _context.Topics.RemoveRange(userTopics);
            var userReplies = _context.Replies.Where(t => t.UserId == id);
            _context.Replies.RemoveRange(userReplies);
            // Spasi promene (ovo će obrisati sve teme korisnika)
            await _context.SaveChangesAsync();

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
            var result = await _userManager.CreateAsync(user, userDto.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            if (userDto.Roles != null && userDto.Roles.Any())
            {
                var roleResult = await _userManager.AddToRolesAsync(user, userDto.Roles);
                if (!roleResult.Succeeded)
                {
                    return BadRequest(roleResult.Errors);
                }
            }

            return Ok(user);
        }
        [HttpPut("update-user")]
        public async Task<ActionResult> UpdateUser([FromForm] UpdateUserDTO userDto)
        {
            Console.WriteLine($"Primljen ID: {userDto.Id}");
            var user = await _context.Users.FindAsync(userDto.Id);

            if (user == null) return NotFound();

            var originalUser = _context.Entry(user).CurrentValues.Clone(); // Čuvamo originalne vrednosti

            _mapper.Map(userDto, user);

            // Ako nema promjena, vraćamo poruku
            if (_context.Entry(user).CurrentValues.Properties.All(p =>
                Equals(_context.Entry(user).OriginalValues[p], _context.Entry(user).CurrentValues[p])))
            {
                return BadRequest(new ProblemDetails { Title = "Niste unijeli nikakvu promjenu" });
            }

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok(new { message = "Korisnik uspešno ažuriran" });

            return BadRequest(new ProblemDetails { Title = "Problem pri ažuriranju korisnika" });
        }
        private static string GenerateRandomPassword()
        {
            var random = new Random();
            string upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            string lower = "abcdefghijklmnopqrstuvwxyz";
            string digits = "0123456789";
            string special = "!@#$%^&*()-_=+";

            string password =
                upper[random.Next(upper.Length)].ToString() +
                lower[random.Next(lower.Length)].ToString() +
                digits[random.Next(digits.Length)].ToString() +
                special[random.Next(special.Length)].ToString() +
                new string(Enumerable.Repeat(upper + lower + digits + special, 4)
                    .Select(s => s[random.Next(s.Length)]).ToArray()); // Ostali nasumični karakteri

            return new string(password.ToCharArray().OrderBy(x => random.Next()).ToArray());
        }




        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO resetPasswordDto)
        {
            var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);
            if (user == null) return NotFound("Korisnik sa ovom e-mail adresom ne postoji");

            string newPassword = GenerateRandomPassword();
            var resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
            var isValid = await _userManager.VerifyUserTokenAsync(user,
                 TokenOptions.DefaultProvider, "ResetPassword", resetToken);
            Console.WriteLine($"Token validan: {isValid}");

            var result = await _userManager.ResetPasswordAsync(user, resetToken, newPassword);
            if (!result.Succeeded)
                return BadRequest(result.Errors.Select(e => e.Description));

            await _emailService.SendResetPasswordEmail(user.Email, newPassword);
            return Ok(new { message = "Nova lozinka je poslata na vašu e-mail adresu." });

        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDTO changePasswordDTO)
        {
            if (changePasswordDTO == null) return BadRequest("Neispravan zahtjev");
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return Unauthorized("Korisnik nije pronađen.");
            var isPasswordValid = await _userManager.CheckPasswordAsync(user, changePasswordDTO.CurrentPassword);
            if (!isPasswordValid)
                return BadRequest("Trenutna lozinka je netačna.");
            var result = await _userManager.ChangePasswordAsync(user, changePasswordDTO.CurrentPassword, changePasswordDTO.NewPassword);

            if (!result.Succeeded)
                return BadRequest(result.Errors.Select(e => e.Description));

            return Ok(new { message = "Lozinka je promijenjena." });
        }
        [HttpGet("isLoggedIn")]
        public IActionResult IsLoggedIn()
        {
            if (User.Identity?.IsAuthenticated == true)
            {
                return Ok(new { isAuthenticated = true });
            }
            return Ok(new { isAuthenticated = false });
        }


    }
}
/*Kada pozoveš CreateAsync metodu, UserManager koristi IdentityUser klasu (ili tvoju prilagođenu verziju klase korisnika) 
i mapira objekat na tabelu AspNetUsers u bazi podataka.*/
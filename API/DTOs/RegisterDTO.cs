using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDTO
    {
        [Required]
        public string Email { get; set; } = string.Empty;
        public required string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; } // Može biti "M", "Ž", "Ostalo"
        public DateTime DateOfBirth { get; set; }


    }
}
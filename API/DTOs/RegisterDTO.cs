using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDTO
    {
        [Required]
        public  string Email { get; set; } = string.Empty;
        public required string Password { get; set; }
    }
}
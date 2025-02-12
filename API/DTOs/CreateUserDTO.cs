using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CreateUserDTO : RegisterDTO
    {
        [Required]

        public string[] Roles { get; set; }


    }
}
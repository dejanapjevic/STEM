using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CreateTutorialDTO
    {
        [Required]
        public string Name { get; set; }
        public string ImagePath { get; set; }


    }
}
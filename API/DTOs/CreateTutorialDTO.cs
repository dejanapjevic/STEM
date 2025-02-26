using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class CreateTutorialDTO
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        
        public string Category {get; set;}

    }
}
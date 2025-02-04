using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UpdateArticleDTO
    {
        public int Id { get; set; }
        [Required] //ne smije biti null kad se salje zahtjev API-ju
        public String Title { get; set; }
        [Required]
        public String Description { get; set; }
        [Required]
        public String Content { get; set; }
        [Required]
        public String Category { get; set; }
        
        public String PictureUrl { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace API.DTOs
{
    public class CreateArticleDTO
    {
        [Required]
        public String Title { get; set; }
        [Required]
        public String Description { get; set; }
        [Required]
        public String Content { get; set; }
        [Required]
        public String Category { get; set; }
        
        //public IFormFile File { get; set; }
        public string PictureUrl { get; set; }
    }
}
/*DTO-ove koristimo umesto direktnog korišćenja entiteta (Article) u API metodama, jer:

 * Štite podatke – Klijent ne može direktno manipulisati podacima u bazi.
 *Kontrolišu unos podataka – Možemo dodati validaciju ([Required], [MaxLength], [Range] itd.).
 *Povećavaju sigurnost – Sakrivamo osetljive podatke iz baze.
 *Fleksibilniji model prenosa – Možemo slati samo podatke koji su potrebni za određenu operaciju.*/
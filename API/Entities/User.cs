using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class User : IdentityUser
    {
        //propertiji dostupni iz klase IdentityUser
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; } // Može biti "M", "Ž", "Ostalo"
        public DateTime DateOfBirth { get; set; }
    

        
    }
}
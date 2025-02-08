using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Topic
    {
        public int Id { get; set; }  // Primarni ključ
        public String UserId { get; set; }  // Strani ključ ka User tabeli
        public string Title { get; set; }  // Naslov teme

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigaciono svojstvo ka korisniku
        public User User { get; set; }

        // public ICollection<Reply> Replies { get; set; } = new List<Reply>(); 

    }
}
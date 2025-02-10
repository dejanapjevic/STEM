using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Topic
    {
        public int Id { get; set; }
        public String UserId { get; set; }
        public string Title { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigaciono svojstvo ka korisniku
        public User User { get; set; }



    }
}
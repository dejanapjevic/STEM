using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class UserProgress
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int VideoId { get; set; }
        public bool isWatched { get; set; }
        public User User { get; set; }
        public Video Video { get; set; }
    }
}
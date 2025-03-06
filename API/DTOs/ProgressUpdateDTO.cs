using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ProgressUpdateDTO
    {

        public string UserId { get; set; }
        public int VideoId { get; set; }
        public bool IsWatched { get; set; }


    }
}
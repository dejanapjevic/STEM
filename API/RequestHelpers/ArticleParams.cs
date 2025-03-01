using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.RequestHelpers;

#nullable enable

namespace API.Controllers
{
    public class ArticleParams : PaginationParams
    {
        public string? OrderBy { get; set; }
        public string? SearchTerm { get; set; }
        public string? Categories { get; set; }
    }

}
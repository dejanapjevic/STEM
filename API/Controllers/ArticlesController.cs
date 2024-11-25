
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
     [ApiController]
[Route("api/[controller]")]

    public class ArticlesController : ControllerBase
    {
        private readonly STEMContext _context;
        public ArticlesController(STEMContext context)
        {
            _context = context;
            
        }
        [HttpGet]
        public async Task<ActionResult<List<Article>>> GetArticles() {

            return await _context.Articles.ToListAsync();
            
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Article>> GetArticle(int id) {
            return await  _context.Articles.FindAsync(id);
        }
    }
}
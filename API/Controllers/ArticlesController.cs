
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ArticlesController : BaseApiController
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
            
            var article = await  _context.Articles.FindAsync(id);
            if(article==null) return NotFound();

            return article;
        }
        
        [HttpGet("type/{type}")]
        public async Task<ActionResult<List<Article>>> GetArticlesByType(string type) {

        var filteredArticles = await _context.Articles
        .Where(a => a.Category == type)  
        .ToListAsync();
        return Ok(filteredArticles);
    }


}
}
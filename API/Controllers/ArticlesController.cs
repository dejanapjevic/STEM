using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
#nullable enable
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
        public async Task<ActionResult<List<Article>>> GetArticles([FromQuery]ArticleParams articleParams) {
            //trazi info u query string-u
            var query= _context.Articles
            .Sort(articleParams.OrderBy)
            .Search(articleParams.SearchTerm)
            .Filter(articleParams.Categories)
            .AsQueryable(); //Ovo pretvara sve gore navedene operacije u upit koji još nije izvršen.
          
          var articles = await PagedList<Article>.ToPagedList(query, articleParams.PageNumber, articleParams.PageSize);
       //ovo iznad nista ne radi sa bazom, pravi tree u memoriji
             //ovom linijom koda saljemo zahtjev ka bazi

             Response.AddPaginationHeader(articles.Metadata);
             
             return articles;
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

    [HttpGet("filters")]
    public async Task<IActionResult> GetFilters () {
        var categories = await _context.Articles.Select (x=>x.Category).Distinct().ToListAsync();

        return Ok(categories);
    }
}
}
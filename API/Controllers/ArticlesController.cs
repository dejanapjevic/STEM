using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
#nullable enable
namespace API.Controllers
{
    public class ArticlesController : BaseApiController
    {
        private readonly STEMContext _context;
        private readonly IMapper _mapper;

        public ArticlesController(STEMContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<Article>>> GetArticles([FromQuery] ArticleParams articleParams)
        {
            //trazi info u query string-u

            //  if(User.Identity?.IsAuthenticated==false)  return NoContent(); //nece poslati error
            var query = _context.Articles
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

        [HttpGet("{id}", Name = "GetArticle")]
        public async Task<ActionResult<Article>> GetArticle(int id)
        {

            var article = await _context.Articles.FindAsync(id);
            if (article == null) return NotFound();

            return article;
        }

        [HttpGet("type/{type}")]
        public async Task<ActionResult<List<Article>>> GetArticlesByType(string type)
        {

            var filteredArticles = await _context.Articles
            .Where(a => a.Category == type)
            .ToListAsync();
            return Ok(filteredArticles);
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var categories = await _context.Articles.Select(x => x.Category).Distinct().ToListAsync();

            return Ok(categories);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Article>> CreateArticle([FromForm] CreateArticleDTO articleDto)
        {

            var article = _mapper.Map<Article>(articleDto);

            _context.Articles.Add(article);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetArticle", new { Id = article.Id }, article);

            return BadRequest(new ProblemDetails { Title = "Problem pri kreiranju novog članka" });
        }

        [Authorize(Roles = "Admin")]
        [HttpPut]
        public async Task<ActionResult> UpdateArticle([FromForm] UpdateArticleDTO articleDto)
        {

            var article = await _context.Articles.FindAsync(articleDto.Id);
            if (article == null) return NotFound();
            _mapper.Map(articleDto, article);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return NoContent();
            return BadRequest(new ProblemDetails { Title = "Problem pri ažuriranju članka.Niste unijeli nikakvu promjenu" });

        }
        /*article je entitet (tip Article) koji je već prisutan u bazi 
        podataka i koji treba da bude ažuriran sa novim vrednostima koje dolaze iz articleDto*/
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteArticle(int id)
        {
            var article = await _context.Articles.FindAsync(id);
            if (article == null) return NotFound();
            _context.Articles.Remove(article);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return NoContent();
            return BadRequest(new ProblemDetails { Title = "Problem pri brisanju članka" });
        }

        [HttpPost("upload")]
        public  ActionResult UploadFile(IFormFile file) {
           // return Ok(new UploadImageHandler().Upload(file));
            return Ok(new { pictureUrl = new UploadImageHandler().Upload(file) });

        }
        

    }

}
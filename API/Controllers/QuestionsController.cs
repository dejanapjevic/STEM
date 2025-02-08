using API.Data;

using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class QuestionsController : BaseApiController
    {
        private readonly STEMContext _context;

        public QuestionsController(STEMContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Question>>> GetQuestions()
        {

            var questions = await _context.Questions.ToListAsync();
            return Ok(questions);
        }
        [HttpGet("randomQuestions")]
        public async Task<ActionResult<List<Question>>> GetRandomQuestions()
        {

            var randomQuestions = _context.Questions
                                        .AsEnumerable()                // Prebacivanje na klijentsku stranu
                                        .OrderBy(q => Guid.NewGuid())  // Nasumično sortiranje
                                        .Take(6)                       // Uzimanje prvih 5
                                        .ToList();

            return Ok(randomQuestions);
        }
        [HttpGet("careerOptions")]
        public async Task<ActionResult<List<CareerOption>>> GetCareerQuestions()
        {
            var careerQuestions = await _context.CareerOptions.ToListAsync();
            return Ok(careerQuestions);
        }

    }
}
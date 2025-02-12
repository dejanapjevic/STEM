using API.Data;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class QuizTestController : BaseApiController
    {
        private readonly STEMContext _context;
        private readonly IMapper _mapper;
        public QuizTestController(STEMContext context, IMapper mapper)
        {
            _context = context;
            _mapper=mapper;
        }

        [HttpGet("all-quiz-questions")]

        public async Task<ActionResult<List<Question>>> GetQuestions()
        {

            var questions = await _context.Questions.ToListAsync();
            if (questions == null) return NotFound();
            return Ok(questions);
        }

        [HttpGet("question-by-id/{id}", Name = "GetQuestionById")]
        public async Task<ActionResult<Topic>> GetQuestionById(int id)
        {
            var question = await _context.Questions.FindAsync(id);


            if (question == null)
            {
                return NotFound();
            }

            return Ok(question);
        }
        [HttpDelete("delete-question/{id}")]
        public async Task<ActionResult> DeleteQuestion(int id)
        {
            var question = await _context.Questions.FindAsync(id);
            if (question == null) return NotFound();
            _context.Questions.Remove(question);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return NoContent();
            else return BadRequest(new ProblemDetails { Title = "Problem prilikom brisanja pitanja" });
        }
        [HttpGet("randomQuestions")]
        public async Task<ActionResult<List<Question>>> GetRandomQuestions()
        {

            var questions = await _context.Questions.ToListAsync();  // Asinhrono preuzimanje svih pitanja iz baze

            var randomQuestions = questions
                                  .OrderBy(q => Guid.NewGuid())  // Nasumično sortiranje na klijentskoj strani
                                  .Take(6)                       // Uzimanje prvih 6
                                  .ToList();

            return Ok(randomQuestions);
        }
        [HttpPost("add-question")]
        public async Task<ActionResult<Question>> CreateQuestion([FromBody] CreateQuestionDTO questionDto)
        {
      

            var question = _mapper.Map<Question>(questionDto);

            _context.Questions.Add(question);
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetQuestionById", new { Id = question.Id }, question);

            return BadRequest(new ProblemDetails { Title = "Problem pri kreiranju pitanja" });
        }


        [HttpGet("careerOptions")]
        public async Task<ActionResult<List<CareerOption>>> GetCareerQuestions()
        {
            var careerQuestions = await _context.CareerOptions.ToListAsync();
            return Ok(careerQuestions);
        }

    }
}
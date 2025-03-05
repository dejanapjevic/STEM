

using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class TutorialsController : BaseApiController
    {
        private readonly string _videoFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "videos");
        private readonly STEMContext _context;
        public TutorialsController(STEMContext context)
        {
            _context = context;
        }

       
        [HttpDelete("delete-tutorial/{id}")]
        public async Task<ActionResult> DeleteTutorial(int id)
        {
            var tutorial = await _context.Tutorials.FindAsync(id);
            if (tutorial == null) return NotFound();
            _context.Tutorials.Remove(tutorial);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return NoContent();
            else return BadRequest(new ProblemDetails { Title = "Problem prilikom brisanja tutorijala" });
        }
        [HttpPost("upload")]
        public async Task<IActionResult> UploadVideo([FromForm] VideoUploadDto videoUploadDto)
        {
            // Provera da li je fajl validan
            if (videoUploadDto.File == null || videoUploadDto.File.Length == 0)
                return BadRequest("No file uploaded.");

            // Kreiranje foldera ako ne postoji
            if (!Directory.Exists(_videoFolderPath))
                Directory.CreateDirectory(_videoFolderPath);

            // Snimanje fajla u wwwroot/videos
            var filePath = Path.Combine(_videoFolderPath, videoUploadDto.File.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await videoUploadDto.File.CopyToAsync(stream);
            }
            Console.WriteLine($"Received file: {videoUploadDto.File.FileName}, Title: {videoUploadDto.Title}");

            // Vraćamo putanju do fajla (relativnu putanju za frontend)
            var fileUrl = $"/videos/{videoUploadDto.File.FileName}";

            // Kreiranje video objekta i čuvanje u bazi
            var video = new Video
            {
                Title = videoUploadDto.Title,
                Path = fileUrl,
                TutorialId = videoUploadDto.TutorialId
            };

            try
            {
                _context.Videos.Add(video);
                await _context.SaveChangesAsync();
                return Ok(new { path = fileUrl });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error saving video: {ex.Message}");
                Console.WriteLine($"Inner Exception: {ex.InnerException?.Message}");
                return StatusCode(500, new { message = "Internal server error", error = ex.Message, innerError = ex.InnerException?.Message });
            }

        }


        [HttpGet("get-all-videos")]
        public async Task<ActionResult<List<Video>>> GetAllVideos()
        {
            
            var videos = await _context.Videos.ToListAsync();
            if (videos == null) return NotFound();
            return Ok(videos);
        }
        [HttpPost("add-tutorial")]
        public async Task<IActionResult> CreateTutorial([FromForm] CreateTutorialDTO tutorialDto)
        {
            if (tutorialDto == null)
            {
                return BadRequest("Podaci za tutorijal su neispravni..");
            }
            var tutorial = new Tutorial
            {
                Name = tutorialDto.Name,

                Category = tutorialDto.Category,
                Description = tutorialDto.Description,
            };
            _context.Tutorials.Add(tutorial);
            await _context.SaveChangesAsync();
            return Ok(tutorial);
        }

        [HttpGet("get-all-tutorials")]
        public async Task<ActionResult<List<Tutorial>>> GetTutorials([FromQuery] TutorialParams tutorialParams)
        {
            var query = _context.Tutorials
            .AsQueryable()
            .SearchTutorials(tutorialParams.SearchTerm);
            var tutorials = await PagedList<Tutorial>.ToPagedList(query, tutorialParams.PageNumber, tutorialParams.PageSize);

            if (tutorials == null) return NotFound();
            Response.AddPaginationHeader(tutorials.Metadata);
            return Ok(tutorials);
        }
        [HttpGet("get-tutorials-with-videos")]
        public async Task<IActionResult> GetTutorialsWithVideos([FromQuery] TutorialParams tutorialParams)
        {

            var query = _context.Tutorials
                   .AsQueryable()
                   .SearchTutorials(tutorialParams.SearchTerm)
                    .Where(t => _context.Videos.Any(v => v.TutorialId == t.Id)); ;
            var tutorials = await PagedList<Tutorial>.ToPagedList(query, tutorialParams.PageNumber, tutorialParams.PageSize);

            if (tutorials == null) return NotFound();
            Response.AddPaginationHeader(tutorials.Metadata);
            return Ok(tutorials);
        }


        [HttpGet("get-videos-by-tutorials")]
        public IActionResult GetVideosByTutorials([FromQuery] string ids)
        {
            if (string.IsNullOrEmpty(ids))
                return BadRequest("No tutorial IDs provided.");

            var tutorialIds = ids.Split(',').Select(int.Parse).ToList();

            var videos = _context.Videos
                                 .Where(v => tutorialIds.Contains(v.TutorialId))
                                 .ToList();

            return Ok(videos);
        }

    }
}
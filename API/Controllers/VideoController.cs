

using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class VideoController : BaseApiController
    {
        private readonly string _videoFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "videos");
        private readonly STEMContext _context;
        public VideoController(STEMContext context)
        {
            _context = context;
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
            /*  var videoDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "videos");
             if (!Directory.Exists(videoDirectory))
                 return Ok(new List<string>()); // Ako nema videa, vraćamo prazan niz

             var videoFiles = Directory.GetFiles(videoDirectory)
                 .Select(Path.GetFileName)
                 .Select(fileName => $"/videos/{fileName}") // Kreiramo putanje
                 .ToList();

             return Ok(videoFiles); */
            var videos = await _context.Videos.ToListAsync();
            if (videos == null) return NotFound();
            return Ok(videos);
        }
        [HttpPost("add-tutorial")]
        public async Task<IActionResult> CreateTutorial([FromBody] CreateTutorialDTO tutorialDto)
        {
            if (tutorialDto == null)
            {
                return BadRequest("Podaci za tutorijal su neispravni..");
            }
            var tutorial = new Tutorial
            {
                Name = tutorialDto.Name,
               
                Category=tutorialDto.Category,
                Description=tutorialDto.Description,
            };
            _context.Tutorials.Add(tutorial);
            await _context.SaveChangesAsync();
            return Ok(tutorial);
        }

        [HttpGet("get-all-tutorials")]
        public async Task<ActionResult<List<Tutorial>>> GetTutorials()
        {
            var tutorials = await _context.Tutorials.ToListAsync();
            if (tutorials == null) return NotFound();
            return Ok(tutorials);
        }


    }
}
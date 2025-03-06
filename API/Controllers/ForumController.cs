using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Hubs;
using API.RequestHelpers;
using Hangfire;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ForumController : BaseApiController
    {
        private readonly STEMContext _context;
        private readonly ForumService _forumService;
        private readonly IHubContext<NotificationHub> _hubContext;
        public ForumController(STEMContext context, ForumService forumService, IHubContext<NotificationHub> hubContext)
        {
            _context = context;
            _forumService = forumService;
            _hubContext = hubContext;
        }
        /* 
                [HttpGet("topics")]
                public async Task<ActionResult<List<Topic>>> GetTopics([FromQuery] ForumParams forumParams)
                {
                    var forumQuery = _context.Topics.AsQueryable().SearchTopics(forumParams.SearchTerm)
                    .Include(t => t.User)
                    .OrderByDescending(t => t.CreatedAt);
                    var topics = await PagedList<Topic>.ToPagedList(forumQuery, forumParams.PageNumber, forumParams.PageSize);
                    if (topics == null) return NoContent();

                    Response.AddPaginationHeader(topics.Metadata);
                    return Ok(topics);
                } */

        [HttpGet("topics")]
        public async Task<ActionResult<List<object>>> GetTopics([FromQuery] ForumParams forumParams)
        {
            var forumQuery = _context.Topics
                .AsQueryable()
                .SearchTopics(forumParams.SearchTerm)
                .Include(t => t.User)
                .OrderByDescending(t => t.CreatedAt)
                .Select(t => new
                {
                    t.Id,
                    t.Title,
                    t.CreatedAt,
                    User = new
                    {
                        t.User.Id,
                        t.User.UserName,
                        t.User.FirstName,
                        t.User.LastName
                    },
                    ReplyCount = _context.Replies.Count(r => r.TopicId == t.Id) // Brojanje odgovora
                });

            var topics = await PagedList<object>.ToPagedList(forumQuery, forumParams.PageNumber, forumParams.PageSize);
            if (topics == null) return NoContent();

            Response.AddPaginationHeader(topics.Metadata);
            return Ok(topics);
        }



        [HttpGet("{id}")]
        public async Task<ActionResult<Topic>> GetTopicById(int id)
        {
            var topic = await _context.Topics
        .Include(t => t.User) // Učitaj korisnika povezanog sa temom
        .FirstOrDefaultAsync(t => t.Id == id); // Nađi temu prema ID-u

            if (topic == null)
            {
                return NotFound();
            }

            return Ok(topic);
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTopic(int id)
        {
            var topic = await _context.Topics.FindAsync(id);
            if (topic == null) return NotFound();
            _context.Topics.Remove(topic);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return NoContent();
            else return BadRequest(new ProblemDetails { Title = "Problem prilikom brisanja teme" });
        }

        [Authorize]
        [HttpPost("AddTopic")]
        public async Task<IActionResult> CreateTopic([FromBody] CreateTopicDTO request)
        {
            try
            {
                // Provjera da li je zahtev validan
                if (request == null || string.IsNullOrEmpty(request.Title))
                {
                    return BadRequest("Naziv teme je obavezan.");
                }

                // Dobijanje korisničkog ID-a iz trenutne autentifikacije
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;


                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized("Korisnik nije autentifikovan.");
                }
                var userExists = await _context.Users.AnyAsync(u => u.Id == userId);
                if (!userExists)
                {
                    return BadRequest("Korisnik ne postoji.");

                }

                // Kreiranje nove teme
                var topic = new Topic
                {
                    UserId = userId, // Korisnički ID koji je preuzet sa autentifikacije
                    Title = request.Title,
                    CreatedAt = DateTime.UtcNow
                };

                // Dodavanje nove teme u bazu
                _context.Topics.Add(topic);
                await _context.SaveChangesAsync();

                // Vraćanje kreirane teme kao odgovor
                return CreatedAtAction(nameof(GetTopicById), new { id = topic.Id }, topic);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message, innerException = ex.InnerException?.Message });
            }
        }
        [Authorize]
        [HttpPost("AddReply")]
        public async Task<IActionResult> CreateReply([FromBody] CreateReplyDTO replyDto)
        {
            if (replyDto == null || string.IsNullOrEmpty(replyDto.Text))
            {
                return BadRequest("Sadržaj dgovora je obavezan.");
            }
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("Korisnik nije prijavljen.");
            }
            var user = await _context.Users.FindAsync(userId);
            //da li tema postoji
            var topic = await _context.Topics.FindAsync(replyDto.TopicId);
            if (topic == null)
            {
                return NotFound("Tema nije pronađena.");
            }
            var reply = new Reply
            {
                Text = replyDto.Text,
                CreatedAt = DateTime.UtcNow,
                UserId = userId,
                TopicId = replyDto.TopicId,
            };
            _context.Replies.Add(reply);
            await _context.SaveChangesAsync();


            try
            {
                var topicOwnerId = topic.UserId;

                //await _hubContext.Clients.All.SendAsync("ReceiveNotification", "Neko je odgovorio na vašu temu.");
                await _hubContext.Clients.Group(topicOwnerId).SendAsync
                ("ForumReplyNotification", $"{user.FirstName} {user.LastName} je dodao/la odgovor na Vašu temu '{topic.Title}' ");
                Console.WriteLine("odgovor...");
            }
            catch (Exception ex)
            {

                Console.WriteLine("Greška pri slanju poruke: " + ex.Message);
            }

            return Ok(new { message = "Odgovor je uspješno dodat." });


        }

        [HttpGet("GetRepliesByTopic/{topicId}")]
        public async Task<ActionResult> GetRepliesByTopic(int topicId)
        {
            var replies = await _context.Replies
       .Where(r => r.TopicId == topicId)
       .OrderByDescending(r => r.CreatedAt) // Opcionalno: sortiranje najnovijih odgovora na vrh
       .Select(r => new
       {
           r.Id,
           r.Text,
           r.CreatedAt,
           r.UserId,
           firstName = r.User.FirstName,
           lastName = r.User.LastName
       })
       .ToListAsync();

            if (replies == null || replies.Count == 0)
            {
                return NoContent();
            }

            return Ok(replies);
        }

        [HttpPost("CreateRecurringJob")]
        public ActionResult CreateRecurringJob()
        {
            var options = new RecurringJobOptions
            {
                TimeZone = TimeZoneInfo.Local // Postavljanje vremenske zone
            };
            RecurringJob.AddOrUpdate("DeleteOldTopics", () => _forumService.DeleteOldTopics(),
             "00 15 * * *", options
           );
            return Ok();
        }



    }
}
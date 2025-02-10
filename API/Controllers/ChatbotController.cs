using System.Net.Http.Headers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ChatbotController : BaseApiController
    {
        private readonly HttpClient _httpClient;
        private readonly string _openAiApiKey;

        public ChatbotController(IConfiguration configuration, HttpClient httpClient)
        {
            _httpClient = httpClient;
            _openAiApiKey = configuration.GetValue<string>("OpenAI:ApiKey");
        }

        [HttpPost]
        public async Task<IActionResult> GetResponse([FromBody] ChatRequest request)
        {
            var payload = new
            {
                model = "gpt-3.5-turbo",
                messages = new[]
                {
                    new { role = "system", content = "Ti si AI asistent za STEM obrazovanje." },
                    new { role = "user", content = request.Question }
                }
            };

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _openAiApiKey);

            // Šaljemo zahtev
            var response = await _httpClient.PostAsJsonAsync("https://api.openai.com/v1/chat/completions", payload);

            // Čitamo odgovor kao string i ispisujemo u konzoli
            var responseContent = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"OpenAI API Response: {response.StatusCode} - {responseContent}");

            if (!response.IsSuccessStatusCode)
            {
                return StatusCode((int)response.StatusCode, new { error = "Greška prilikom slanja zahteva", details = responseContent });
            }

            var result = await response.Content.ReadFromJsonAsync<ChatResponse>();

            return Ok(result?.Choices?.FirstOrDefault()?.Message?.Content ?? "Nema odgovora.");
        }
    }

    public class ChatRequest
    {
        public string Question { get; set; }
    }

    public class ChatResponse
    {
        public List<Choice> Choices { get; set; }
    }

    public class Choice
    {
        public Message Message { get; set; }
    }

    public class Message
    {
        public string Content { get; set; }
    }
}

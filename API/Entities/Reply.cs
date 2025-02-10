
namespace API.Entities
{
    public class Reply
    {
        public int Id { get; set; } // Primarni ključ
        public string Text { get; set; } // Tekst odgovora
        public DateTime Date { get; set; } = DateTime.UtcNow;

        public string UserId { get; set; } // Strani ključ ka korisniku
        public User User { get; set; } // Navigacija do korisnika

        public int TopicId { get; set; } // Strani ključ ka temi
        public Topic Topic { get; set; } // Navigacija do teme
    }


}

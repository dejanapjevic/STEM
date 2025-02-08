
namespace API.Entities
{
    public class Reply
    {
    public int Id { get; set; }  
    public string UserId { get; set; }  
    public int TopicId { get; set; } 
    public string Text { get; set; }  
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;



    public User User { get; set; }  // Navigacija prema korisniku
    public Topic Topic { get; set; }  // Navig
        
    }
}
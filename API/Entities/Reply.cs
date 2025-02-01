
namespace API.Entities
{
    public class Reply
    {
        public int Id { get; set; }
         public int UserId { get; set; }
        public string Content { get; set; }
        public DateTime DateTime { get; set; }
        public int CommentId { get; set; }
        
    }
}
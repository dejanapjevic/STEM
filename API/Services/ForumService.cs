using API.Data;

public class ForumService
{
    private readonly STEMContext _context;

    public ForumService(STEMContext context)
    {
        _context = context;
    }
 //Pronalazi sve topike koji su stariji od 3 meseca.ko ih ima, briše ih iz baze
   public void DeleteOldTopics()
        {
            Console.WriteLine("Job za brisanje tema pokrenut");
            var threeMonthsAgo = DateTime.UtcNow.AddMonths(-3);
            var oldTopics = _context.Topics
            .Where(t => t.CreatedAt < threeMonthsAgo)
            .ToList();
            if (oldTopics.Any())
            {
                _context.Topics.RemoveRange(oldTopics);
                _context.SaveChanges();
                Console.WriteLine($"{oldTopics.Count} starih tema obrisano");
            }
            else
            {
                Console.WriteLine("Nema tema za brisanje");
            }
        }
}

using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class STEMContext : DbContext
    {
        //konstruktor
        public STEMContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Article> Articles { get; set; }
    }
}
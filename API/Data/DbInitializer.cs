
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DbInitializer
    {
        private string _json;

        public DbInitializer()
        {
            // U konstruktoru učitaj JSON fajl
            _json = File.ReadAllText("Data/articles.json");
        }
        public static void InitDb(WebApplication app)
        {
            using var scope = app.Services.CreateScope();

            var context = scope.ServiceProvider.GetRequiredService<STEMContext>()
            ?? throw new InvalidOperationException("Failed to retrieve STEM context");

            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>()
            ?? throw new InvalidOperationException("Failed to retrieve user manager");

            var dbInitializer = new DbInitializer();
            SeedData(context, userManager, dbInitializer).GetAwaiter().GetResult();
            // SeedData(context, userManager).GetAwaiter().GetResult(); //provjeri ovo za await

        }

        private static async Task SeedData(STEMContext context, UserManager<User> userManager, DbInitializer dbInitializer)
        {

            context.Database.Migrate();

            if (!userManager.Users.Any())
            {

                var user = new User
                {
                    UserName = "dejana@test.com",
                    Email = "dejana@test.com",
                    FirstName = "Dejana",
                    LastName = "Pjević",
                    Gender = "Z",
                    DateOfBirth = new DateTime(2001, 11, 12)
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "admin@test.com",
                    Email = "admin@test.com",
                    FirstName = "Admin",
                    LastName = "Admin",
                    Gender = "M",
                    DateOfBirth = new DateTime(2001, 11, 12)
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, ["Member", "Admin"]);
            }

            if (context.Articles.Any()) return;

            var articles = JsonSerializer.Deserialize<List<Article>>(dbInitializer._json);

            // Dodaj artikle u bazu, npr:
            context.Articles.AddRange(articles);
            await context.SaveChangesAsync();


        }

    }
}
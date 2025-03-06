
using System.Text.Json;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DbInitializer
    {
        private string _jsonArticles;
        private string _jsonQuestions;
        private string _jsonCareerOptions;

        public DbInitializer()
        {
            // U konstruktoru učitaj JSON fajl
            _jsonArticles = File.ReadAllText("Data/articles.json");
            _jsonQuestions = File.ReadAllText("Data/questions.json");
            _jsonCareerOptions = File.ReadAllText("Data/careerOptions.json");
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
                    Gender = "Ž",
                    DateOfBirth = new DateTime(2001, 11, 12)
                };

                var result = await userManager.CreateAsync(user, "Pa$$w0rd"); //promjena
                await userManager.AddToRoleAsync(user, "Member");



               if (result.Succeeded) // Provera da li je korisnik uspešno kreiran
        {
            await userManager.AddToRoleAsync(user, "Member");

            // Sada imamo korisnikov ID, možemo kreirati Topic
            var topic = new Topic
            {
                Title = "Koji je najbolji kurs za učenje React-a?",
                UserId = user.Id, // Korišćenje ID-a tek kreiranog korisnika
                CreatedAt = DateTime.UtcNow
            };

            context.Topics.Add(topic);
           // await context.SaveChangesAsync(); // Čuvamo promene u bazi
        }



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

                //await context.SaveChangesAsync();
            }


            if (context.Articles.Any()) return;

            var articles = JsonSerializer.Deserialize<List<Article>>(dbInitializer._jsonArticles);
            var questions = JsonSerializer.Deserialize<List<Question>>(dbInitializer._jsonQuestions);
            var careerOptions = JsonSerializer.Deserialize<List<CareerOption>>(dbInitializer._jsonCareerOptions);

            context.Articles.AddRange(articles);
            context.Questions.AddRange(questions);
            context.CareerOptions.AddRange(careerOptions);




            await context.SaveChangesAsync();


        }

    }
}
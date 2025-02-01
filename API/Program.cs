using API.Data;
using API.Entities;
using API.Middleware;
using API.RequestHelpers;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddDbContext<STEMContext>(opt => {
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();
builder.Services.AddTransient<ExceptionMiddleware>();
builder.Services.AddIdentityApiEndpoints<User>(opt=> {
    opt.User.RequireUniqueEmail=true;
})
   .AddRoles<IdentityRole>() //omogućavajući dodeljivanje uloga ( Admin, Member).
   .AddEntityFrameworkStores<STEMContext>(); //podrška za čuvanje korisničkih podataka u Entity Framework bazi 

builder.Services.AddTransient<IEmailService, EmailService>();
var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
  app.MapScalarApiReference();
    app.MapOpenApi();
}

app.UseHttpsRedirection();

 app.UseCors(opt=> {
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000").AllowCredentials();
}); 

app.UseAuthentication();

app.UseAuthorization(); //sta je tom korisniku dozvoljeno da vidi

app.MapControllers();
// endpoint-i vezani za autentifikaciju korisnika sada imaju prefiks "api", što je dobra praksa kod REST API-ja.
app.MapGroup("api").MapIdentityApi<User>(); 

var scope = app.Services.CreateScope();
//var context = scope.ServiceProvider.GetRequiredService<STEMContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();

DbInitializer.InitDb(app);

app.Run();


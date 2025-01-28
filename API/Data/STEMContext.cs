using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class STEMContext(DbContextOptions options) : IdentityDbContext<User>(options)
    {
      public required DbSet<Article> Articles { get; set; }

      protected override void OnModelCreating(ModelBuilder builder) {

        base.OnModelCreating(builder);
        
        builder.Entity<IdentityRole>()
         .HasData(
            new IdentityRole {Id="2fb6eef4-e5fc-41c7-ad76-f02658c3fd97", Name="Member", NormalizedName="MEMBER"},
            new IdentityRole {Id="62c896d5-9b6d-4e8f-80bc-bb6e9c64c357", Name="Admin", NormalizedName="ADMIN"}
         );
      }
    }

}
/* uilder.Entity<IdentityRole>(): Ovaj kod koristi ModelBuilder da konfiguriše entitet IdentityRole
 (koji je predviđen za skladištenje uloga korisnika u bazi podataka).
HasData(...): Metoda HasData omogućava unos podataka direktno u bazu prilikom migracije. 
Ovdje dodajete dve unapred definisane uloge (roles): "Member" i "Admin".
Id: Jedinstveni identifikator uloge (UUID, odnosno globalno jedinstveni identifikator). U ovom slučaju, ručno dodeljujete ID za svaku ulogu. Ovo je bitno jer želite da se ID ne menja tokom migracija.
Name: Prikazivo ime uloge, npr. "Member" ili "Admin".
NormalizedName: Normalizovano ime, obično u velikim slovima, što se koristi za brže poređenje u bazi podataka.
U ovom slučaju, vi ručno dodeljujete UUID (Id) za svaku ulogu. Ovo je korisno jer želite da identifikatori tih uloga budu stabilni, tj. da se ne menjaju sa svakom migracijom.
Ako biste dozvolili Entity Frameworku da automatski generiše ID-eve prilikom migracije, svaki put kad izvršite migraciju, ti ID-evi bi se mogli promeniti, što bi izazvalo probleme u aplikaciji
 (npr. povezanost korisnika sa ulogama)
*/
namespace API.RequestHelpers
{
    public class PaginationMetaData
    {
        public int TotalCount { get; set; }
        public int PageSize { get; set; }
         public int CurrentPage { get; set; }
          public int TotalPages { get; set; } //zavisno od total count i page size
    }
}
/*Ova klasa služi za čuvanje informacija o paginaciji i obično se koristi u API odgovorima 
 bi klijent znao ukupne podatke o paginaciji.
 PaginationParams je klasa koja prima parametre od korisnika (broj stranice i veličinu stranice) za paginaciju.
PaginationMetaData je klasa koja vraća metapodatke o paginaciji u API odgovoru.*/
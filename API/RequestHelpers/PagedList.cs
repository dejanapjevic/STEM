using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers
{
    public class PagedList<T> : List<T> 
    {
        public PagedList(List<T> items, int count, int pageNumber, int pageSize)
        {
            Metadata = new PaginationMetaData
            {
                TotalCount=count, // Ukupno stavki u bazi
                PageSize=pageSize, // Broj stavki po stranici
                CurrentPage=pageNumber, // Trenutna stranica
                TotalPages=(int)Math.Ceiling(count/(double)pageSize), //npr 1.2 zaokruzimo na 2 stranice ukupno
            };

            AddRange(items);
        }
        public PaginationMetaData Metadata { get; set; }

        public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query, int pageNumber, int pageSize) {  
            var count = await query.CountAsync(); //maks broj stavki koje imamo u upitu
            var items = await query.Skip((pageNumber-1)*pageSize).Take(pageSize).ToListAsync();
            //npr imamo 18 itemsa, a page size je 5, prvi zahtjev je 1-1=0 * 0 je 0, preskacemo 0 records, uzimamo 5 records
            //str broj 2-1 = 1 *5 = 5 , 5 preskacemo i prikazemo daljih 5..

            return new PagedList<T>(items,count,pageNumber,pageSize);
            
        }
    }
}
/* Ova klasa PagedList<T> omogućava stranicenje podataka. Pruža listu objekata koja sadrži informacije o broju stranica, 
ukupnom broju podataka i druge metapodatke vezane za stranicenje. Razmotrimo je detaljno, korak po korak: */
//Generički tip T: Ova klasa može raditi sa bilo kojim tipom objekta.
using API.Entities;
#nullable enable

namespace API.Extensions
{
    public static class ArticleExtensions
    {
         public static IQueryable <Article> Sort (this IQueryable<Article> query, string? orderBy) {
            query = orderBy switch {
                "title" => query.OrderBy(x=>x.Title),
                "titleDesc" => query.OrderByDescending(x=>x.Title),
                _ => query.OrderBy(x=>x.Title),
            };
            return  query; //vraca upit ali ne poziv iz baze
        } 
        //To znači da možemo pozvati Sort direktno na bilo koji IQueryable<Article> objekat, kao da je to njegova ugrađena metoda.
      
        public static IQueryable<Article> Search (this IQueryable<Article> query, string? searchTerm) {

            if(string.IsNullOrEmpty(searchTerm)) return query;
            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return  query.Where(x => x.Title.ToLower().Contains(lowerCaseSearchTerm));
        }

        public static IQueryable<Article> Filter (this IQueryable<Article> query, string? categories) 
        {
            var categoryList = new List<String>();
            if(!string.IsNullOrEmpty(categories)) {
                categoryList.AddRange(categories.ToLower().Split(",").ToList());
            }

            query=query.Where(x => categoryList.Count==0 || categoryList.Contains(x.Category.ToLower()));

            return query;
        }
    }
}
/* Ključna reč this u this IQueryable<Article> query znači da sada bilo koji IQueryable<Article> može koristiti ovu metodu.
Pošto DbSet<Article> implementira IQueryable<Article>, možemo je pozvati direktno na _context.Articles! 
Articles je DbSet<Article>, koji implementira IQueryable<Article>.Zbog toga može da koristi extension metodu Sort. Sort NE izvršava upit!
Ona samo dodaje OrderBy u upit koji će biti poslat bazi. query je sada IQueryable<Article>, što znači da još uvek imamo samo definisan upit.
Tek kada napišemo await query.ToListAsync(), tada će se upit zaista izvršiti u bazi. */
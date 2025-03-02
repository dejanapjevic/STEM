
using API.Entities;
#nullable enable
namespace API.Extensions
{
    public static class TutorialExstension
    {
        public static IQueryable<Tutorial> SearchTutorials(this IQueryable<Tutorial> query, string? searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(x => x.Name.ToLower().Contains(lowerCaseSearchTerm));
        }
    }
}
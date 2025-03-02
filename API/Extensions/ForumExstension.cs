using API.Entities;
#nullable enable
namespace API.Extensions
{
    public static class ForumExtensions
    {
        public static IQueryable<Topic> SearchTopics(this IQueryable<Topic> query, string? searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query;
            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();
            return query.Where(x => x.Title.ToLower().Contains(lowerCaseSearchTerm));

        }
    }
}
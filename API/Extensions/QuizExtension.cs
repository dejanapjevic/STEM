using API.Entities;
#nullable enable
namespace API.Extensions
{
    public static class QuizExtension
    {
        public static IQueryable<Question> SearchQuestions(this IQueryable<Question> query, string? searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query;
            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();
            return query.Where(x => x.Title.ToLower().Contains(lowerCaseSearchTerm));

        }
    }
}


using API.Entities;

namespace API.Extensions
{
    public static class UserExtensions
    {
        public static IQueryable<User> SearchUsers(this IQueryable<User> query, string? searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(x => x.FirstName.ToLower().Contains(lowerCaseSearchTerm) ||
                                    x.LastName.ToLower().Contains(lowerCaseSearchTerm));
        }

    }
}
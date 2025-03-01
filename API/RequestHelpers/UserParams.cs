#nullable enable
namespace API.RequestHelpers
{
    public class UserParams : PaginationParams
    {
        public string? SearchTerm { get; set; }
    }
}
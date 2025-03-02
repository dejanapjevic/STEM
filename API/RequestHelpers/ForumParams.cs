
#nullable enable
namespace API.RequestHelpers
{
    public class ForumParams:PaginationParams
    {
        public string? SearchTerm { get; set; }
    }
}
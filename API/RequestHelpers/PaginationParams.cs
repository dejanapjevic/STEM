
namespace API.RequestHelpers
{
    public class PaginationParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;

        private int _pageSize=8; //defaultno, broj elemenata po stranici
        public int PageSize
        {
            get => _pageSize; //return _pageSize; alternativno
            set => _pageSize = value > MaxPageSize ?  MaxPageSize : value;
        }
        
    }
}
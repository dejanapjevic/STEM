
using API.DTOs;
using API.Entities;
using AutoMapper;
#nullable enable
namespace API.RequestHelpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<CreateArticleDTO, Article>();
            CreateMap<UpdateArticleDTO, Article>();
            CreateMap<CreateQuestionDTO, Question>();
            CreateMap<CreateUserDTO, User>();
            CreateMap<UpdateUserDTO, User>();
        }
    }
}
using AutoMapper;
using SisCommerceAPI.Models.Dto;
using SisCommerceAPI.Models.Identity;

namespace SisCommerceAPI.Mapping;
public class SisECommerceProfile : Profile
{
    public SisECommerceProfile()
    {
        CreateMap<User, UserDto>().ReverseMap();
        CreateMap<User, UserUpdateDto>().ReverseMap();
        CreateMap<User, UserLoginDto>().ReverseMap();
    }
}

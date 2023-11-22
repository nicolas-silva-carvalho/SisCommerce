using SisCommerceAPI.Models.Dto;

namespace SisCommerceAPI.Services.Interfaces;

public interface ITokenService
{
    Task<string> CreateToken(UserUpdateDto userUpdateDto);
}

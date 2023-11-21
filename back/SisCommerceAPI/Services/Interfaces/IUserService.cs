using Microsoft.AspNetCore.Identity;
using SisCommerceAPI.Models.Dto;
using SisCommerceAPI.Models.Identity;

namespace SisCommerceAPI.Services.Interfaces;

public interface IUserService
{
    Task<List<User>> GetUsersAsync();
    Task<User> GetUserByIdAsync(int id);
    Task<User> GetUserByEmailAsync(string email);
    Task<bool> UserExists(string email);
    Task<UserUpdateDto> GetUserUpdateByEmailAsync(string email);
    Task<SignInResult> CheckUserPasswordAsync(UserUpdateDto userUpdateDto, string password);
    Task<UserDto> CreatAccountAsync(UserDto userDto);
    Task<UserUpdateDto> UpdateAccountAsync(UserUpdateDto userUpdateDto);
}

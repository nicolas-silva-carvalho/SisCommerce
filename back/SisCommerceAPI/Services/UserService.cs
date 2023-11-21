using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SisCommerceAPI.DataBase;
using SisCommerceAPI.Models.Dto;
using SisCommerceAPI.Models.Identity;
using SisCommerceAPI.Services.Interfaces;

namespace SisCommerceAPI.Services;

public class UserService : IUserService
{
    private readonly Context _context;
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly IMapper _mapper;

    public UserService(Context context, UserManager<User> userManager, SignInManager<User> signInManager, IMapper mapper)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _mapper = mapper;
        _context = context;
    }

    public async Task<User> GetUserByEmailAsync(string email)
    {
        return await _context.Users.SingleOrDefaultAsync(x => x.Email == email.ToLower());
    }

    public async Task<User> GetUserByIdAsync(int id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<List<User>> GetUsersAsync()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task<SignInResult> CheckUserPasswordAsync(UserUpdateDto userUpdateDto, string password)
    {
        try
        {
            var user = await _userManager.Users.SingleOrDefaultAsync(user => user.Email == userUpdateDto.Email);

            return await _signInManager.CheckPasswordSignInAsync(user, password, false);
        }
        catch (System.Exception ex)
        {
            throw new Exception($"Erro ao tentar verificar senha. Erro: {ex.Message}");
        }
    }

    public async Task<UserDto> CreatAccountAsync(UserDto userDto)
    {
        try
        {
            var user = _mapper.Map<User>(userDto);
            
            var result = await _userManager.CreateAsync(user, userDto.Password);

            if(result.Succeeded)
            {
                var userReturn = _mapper.Map<UserDto>(user);
                return userReturn;
            }

            return null;
        }
        catch (System.Exception ex)
        {
            throw new Exception($"Erro ao tentar criar usuário. Erro: {ex.Message}");
        }
    }

    public async Task<UserUpdateDto> GetUserUpdateByEmailAsync(string email)
    {
        try
        {
            var user = await GetUserByEmailAsync(email);

            if(user == null ) return null;

            var userUpdate = _mapper.Map<UserUpdateDto>(user);

            return userUpdate;
        }
        catch (System.Exception ex)
        {
            throw new Exception($"Erro ao tentar pegar usuário por e-mail. Erro: {ex.Message}");
        }
    }

    public async Task<UserUpdateDto> UpdateAccountAsync(UserUpdateDto userUpdateDto)
    {
        try
        {
            var user = await GetUserByEmailAsync(userUpdateDto.Email);

            if(user == null ) return null;

            _mapper.Map(userUpdateDto, user);

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var result = await _userManager.ResetPasswordAsync(user, token, userUpdateDto.Password);

            _context.Users.Update(user);
            

            await _context.SaveChangesAsync();
            
            var userRetorno = await GetUserByEmailAsync(user.Email);

            return _mapper.Map<UserUpdateDto>(userRetorno);
            
        }
        catch (System.Exception ex)
        {
            throw new Exception($"Erro ao tentar atualizar usuário. Erro: {ex.Message}");
        }
    }

    public async Task<bool> UserExists(string email)
    {
        try
        {
            return await _userManager.Users.AnyAsync(user => user.Email == email.ToLower());
        }
        catch (System.Exception ex)
        {
            throw new Exception($"Erro ao verificar se usuário existe. Erro: {ex.Message}");
        }
    }
}

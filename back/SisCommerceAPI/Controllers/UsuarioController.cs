using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SisCommerceAPI.Extensions;
using SisCommerceAPI.Models.Dto;
using SisCommerceAPI.Services.Interfaces;

namespace SisCommerceAPI.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class UsuarioController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ITokenService _tokenService;

    public UsuarioController(IUserService userService, ITokenService tokenService)
    {
        _userService = userService;
        _tokenService = tokenService;
    }

    [HttpGet("GetUser")]
    public async Task<IActionResult> GetUser()
    {
        try
        {
            var userName = User.FindFirst(ClaimTypes.Email)?.Value;
            var user = await _userService.GetUserByEmailAsync(userName);
            return Ok(user);
        }
        catch (System.Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar usuário. Erro {ex.Message}");
        }
    }

    [HttpPost("RegisterUser")]
    [AllowAnonymous]
    public async Task<IActionResult> RegisterUser(UserDto userDto)
    {
        try
        {
            if (await _userService.UserExists(userDto.Email)) return BadRequest("Usuário já existe");

            if (await _userService.CreatAccountAsync(userDto) != null) return Ok("Usuário cadastrado");

            return BadRequest("Usuário não criado, tente novamente mais tarde!");
        }
        catch (System.Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar usuário. Erro {ex.Message}");
        }
    }

    [HttpPost("Login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login(UserLoginDto userLoginDto)
    {
        try
        {
            var user = await _userService.GetUserUpdateByEmailAsync(userLoginDto.Email);
            if (user == null) return Unauthorized("Usuário ou senha incorreto");

            var result = await _userService.CheckUserPasswordAsync(user, userLoginDto.Password);
            if (!result.Succeeded) return Unauthorized();

            return Ok(new 
            {
                nome = user.PrimeiroNome,
                token = _tokenService.CreateToken(user).Result
            });
        }
        catch (System.Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar usuário. Erro {ex.Message}");
        }
    }

    [HttpPut("UpdateUser")]
    public async Task<IActionResult> UpdateUser(UserUpdateDto userUpdateDto)
    {
        try
        {
            var user = await _userService.GetUserUpdateByEmailAsync(User.GetUserEmail());
            if (user == null) return Unauthorized("Usuário inválido");

            var userU = await _userService.UpdateAccountAsync(userUpdateDto);
            if (userU == null) return NoContent();

            return Ok(userU);
        }
        catch (System.Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao tentar recuperar usuário. Erro {ex.Message}");
        }
    }
}

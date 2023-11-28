using Microsoft.AspNetCore.Identity;
using SisCommerceAPI.Models.Enum;

namespace SisCommerceAPI.Models.Identity;

public class User : IdentityUser<int>
{
    public string PrimeiroNome { get; set; }
    public string UltimoNome { get; set; }
    public string Username { get; set; }
    public Funcao Funcao { get; set; }
    public string? ImagemURL { get; set; }
    public List<UserRole> UserRoles { get; set; }
}

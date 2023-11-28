using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SisCommerceAPI.Models.Dto;
public class UserDto
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string Username { get; set; }
    public string PrimeiroNome { get; set; }
    public string UltimoNome { get; set; }
}

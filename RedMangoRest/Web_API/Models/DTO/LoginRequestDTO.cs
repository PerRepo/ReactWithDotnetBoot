using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web_API.Models.DTO
{
    public class LoginRequestDTO
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
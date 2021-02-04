using ChatrelDBL.ViewModels;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;

namespace ChatrelPaymentWebAPI.Services
{
    public class JwT
    {
        private static double dTimeout = 15;
        

        public JwT(IOptions<AppSettings> appSettings)
        {
        
        }

        public static string GenerateNewToken(UserVM user, AppSettings appSettings)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(appSettings.sSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                                 new Claim(ClaimTypes.NameIdentifier, user.User.sGBID),
                                 new Claim(ClaimTypes.DateOfBirth, user.User.dtDOB.ToString()),
                                 new Claim(ClaimTypes.Email, user.User.sLoginGmail)
                }),
                Expires = DateTime.UtcNow.AddMinutes(dTimeout),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}

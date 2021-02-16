using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace CTAWebAPI.Services
{
    public class PasswordHash
    {
        public static string CreateSalt()
        {
            //Generate a cryptographic random number.
            RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
            byte[] randomBytes = new byte[128 / 8];
            rng.GetBytes(randomBytes);
            return Convert.ToBase64String(randomBytes);
        }

        public static string GenerateHash(string password, string salt)
        {
            var passwordBytes = KeyDerivation.Pbkdf2(
                                password: password,
                                salt: Encoding.UTF8.GetBytes(salt),
                                prf: KeyDerivationPrf.HMACSHA512,
                                iterationCount: 10000,
                                numBytesRequested: 256 / 8);

            return Convert.ToBase64String(passwordBytes);
        }

        public static bool AreEqual(string password, string hashFromDB, string salt)
        {
            string newHashedPin = GenerateHash(password, salt);
            return newHashedPin.Equals(hashFromDB);
        }
    }
}

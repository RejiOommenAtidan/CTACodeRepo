using CTADBL.BaseClasses;
using CTADBL.BaseClassesRepositories;
using CTADBL.Entities;
using CTAWebAPI.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace CTAWebAPI.Controllers
{
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    //[APIKeyAuth]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DBConnectionInfo _info;
        public UsersController(DBConnectionInfo info)
        {
            _info = info;
        }
        [HttpGet]
        public IActionResult Get()
        {
            UserRepository userRepo = new UserRepository(_info.ConnectionString);
            IEnumerable<User> users = userRepo.GetAllUser();
            //var sendArray = users.ToArray();
            //return Ok(sendArray);
            return Ok(users);
        }
    }
}

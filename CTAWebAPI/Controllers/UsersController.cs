using CTADBL.BaseClasses;
using CTADBL.BaseClassesRepositories;
using CTADBL.Entities;
using CTAWebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
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
            #region Get Users
            try
            {
                //if (id==null) {
                //    return BadRequest("Id Cannot be null");
                //}
                UserRepository userRepo = new UserRepository(_info.ConnectionString);
                IEnumerable<User> users = userRepo.GetAllUser();
                //var sendArray = users.ToArray();
                //return Ok(sendArray);
                //4** - BadRequest
                //BadRequest
                //5**
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            } 
            #endregion
        }
        [AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddUser(User user)
        {
            #region Get Users
            try
            {
                if (ModelState.IsValid)
                {
                    if (user == null)
                    {
                        return BadRequest("User object cannot be NULL");
                    }
                    UserRepository userRepo = new UserRepository(_info.ConnectionString);
                    userRepo.Add(user);
                    return Ok(user);
                }
                else
                {
                    var errors = ModelState.Select(x => x.Value.Errors)
                               .Where(y => y.Count > 0)
                               .ToList();
                    return BadRequest(errors);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
    }
}

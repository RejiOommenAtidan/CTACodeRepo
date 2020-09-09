using CTADBL.BaseClasses;
using CTADBL.BaseClassRepositories;
using CTADBL.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace CTAWebAPI.Controllers
{
    [EnableCors("AllowOrigin")]
    //[APIKeyAuth]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly UserRepository _userRepository;
        public UserController(DBConnectionInfo info)
        {
            _info = info;
            _userRepository = new UserRepository(_info.sConnectionString);
        }
        #endregion

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetUsers()
        {
            #region Get All Users
            try
            {
                IEnumerable<User> allUsers = _userRepository.GetAllUsers();
                return Ok(allUsers);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        [HttpGet("GetUser/Id={Id}")]
        [Route("[action]")]
        public IActionResult GetUser(string Id)
        {
            #region Get Single User
            try
            {
                User singleuser = _userRepository.GetUserById(Id);
                return Ok(singleuser);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Add Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddUser(User user)
        {
            #region Add User
            try
            {
                if (ModelState.IsValid)
                {
                    if (user == null)
                    {
                        return BadRequest("User object cannot be NULL");
                    }
                    _userRepository.Add(user);
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
        #endregion

        #region Edit Call
        [HttpPost("EditUser/Id={Id}")]
        [Route("[action]")]
        public IActionResult EditUser(string Id, [FromBody] User user)
        {
            #region Edit User
            try
            {
                if (ModelState.IsValid)
                {
                    if (Id == null)
                    {
                        return BadRequest("User Param ID cannot be NULL");
                    }
                    if (user == null)
                    {
                        return BadRequest("User object cannot be NULL");
                    }
                    if (Id!=user.Id.ToString()) 
                    {
                        return BadRequest("ID's ain't Matching");
                    }
                    if (UserExists(Id))
                    {
                        _userRepository.Update(user);
                        return Ok("User with ID: " + Id + " updated Successfully");
                    }
                    else
                    {
                        return BadRequest("User with ID:" + Id + " does not exist");
                    }
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
        #endregion

        #region Delete Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult DeleteUser(object body)
        {
            #region Delete User
            try
            {
                //TODO: check for correct way of sending string from body
                string Id = JsonSerializer.Serialize(body);

                if (!string.IsNullOrEmpty(Id))
                {
                    if (UserExists(Id))
                    {
                        User fetchedUser = _userRepository.GetUserById(Id);
                        _userRepository.Delete(fetchedUser);
                        return Ok("User with ID: " + Id + " removed Successfully");
                    }
                    else
                    {
                        return BadRequest("User with ID: " + Id + " does not exist");
                    }
                }
                else
                {
                    return BadRequest("User Id Cannot be null");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Check if User Exists
        private bool UserExists(string Id)
        {
            try
            {
                User fetchedUser = _userRepository.GetUserById(Id);
                if (fetchedUser != null)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Exception in User Exists Function, Exception Message: " + ex.Message);
            }
        }
        #endregion
    }
}

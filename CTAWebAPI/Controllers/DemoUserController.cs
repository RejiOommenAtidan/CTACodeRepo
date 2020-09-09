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
    [Route("api/[controller]")]
    //[APIKeyAuth]
    [ApiController]
    public class DemoUserController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly DemoUserRepository _demoUserRepository;
        public DemoUserController(DBConnectionInfo info)
        {
            _info = info;
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
                
                IEnumerable<DemoUser> users = _demoUserRepository.GetAllUser();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetUsersUsingSP()
        {
            #region Get Users using SP call
            try
            {
                IEnumerable<DemoUser> users = _demoUserRepository.GetUsersUsingSP();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        [HttpGet("GetUser/userID={userID}")]
        [Route("[action]")]
        public IActionResult GetUser(string userID)
        {
            #region Get Single User
            try
            {
                DemoUser fetchedUser = _demoUserRepository.GetUserById(userID);
                return Ok(fetchedUser);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        [HttpGet("GetUserUsingSP/userID={userID}")]
        [Route("[action]")]
        public IActionResult GetUserUsingSP(string userID)
        {
            #region Get Single User Using SP
            try
            {
                
                DemoUser fetchedUser = _demoUserRepository.GetUserUsingSP(userID);
                return Ok(fetchedUser);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Add Call
        //TODO: Tell
        //[AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddUser(DemoUser user)
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

                    _demoUserRepository.Add(user);
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
        [HttpPost("EditUser/userID={userID}")]
        [Route("[action]")]
        public IActionResult EditUser(string userID, [FromBody] DemoUser user)
        {
            #region Edit User
            try
            {
                if (ModelState.IsValid)
                {
                    if (userID == null)
                    {
                        return BadRequest("User Param ID cannot be NULL");
                    }
                    if (user == null)
                    {
                        return BadRequest("User object cannot be NULL");
                    }
                    if (userID != user.User_Id.ToString())
                    {
                        return BadRequest("ID's ain't Matching");
                    }
                    if (UserExists(userID))
                    {

                        _demoUserRepository.Update(user);
                        return Ok("User with ID: " + userID + " updated Successfully");
                    }
                    else
                    {
                        return BadRequest("User with ID:" + userID + " does not exist");
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
                string userID = JsonSerializer.Serialize(body);

                if (!string.IsNullOrEmpty(userID))
                {
                    if (UserExists(userID))
                    {
                        
                        DemoUser fetchedUser = _demoUserRepository.GetUserById(userID);
                        _demoUserRepository.Delete(fetchedUser);
                        return Ok("User with ID: " + userID + " removed Successfully");
                    }
                    else
                    {
                        return BadRequest("User with ID: " + userID + " does not exist");
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
        private bool UserExists(string userID)
        {
            try
            {
                DemoUser fetchedUser = _demoUserRepository.GetUserById(userID);
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

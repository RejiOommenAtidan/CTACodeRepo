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
    public class UserRightsController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        public UserRightsController(DBConnectionInfo info)
        {
            _info = info;
        }
        #endregion

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetUserRights()
        {
            #region Get All UserRights
            try
            {
                UserRightsRepository userRightsRepo = new UserRightsRepository(_info.ConnectionString);
                IEnumerable<UserRights> userrights = userRightsRepo.GetAllUserRights();
                return Ok(userrights);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        
        [HttpGet("GetUserRight/userRightsID={ID}")]
        [Route("[action]")]
        public IActionResult GetUserRight(string ID)
        {
            #region Get Single UserRight
            try
            {
                UserRightsRepository userRightsRepo = new UserRightsRepository(_info.ConnectionString);
                UserRights fetchedUser = userRightsRepo.GetUserRightsById(ID);
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
        public IActionResult AddUserRights(UserRights userrights)
        {
            #region Add UserRights
            try
            {
                if (ModelState.IsValid)
                {
                    if (userrights == null)
                    {
                        return BadRequest("UserRights object cannot be NULL");
                    }
                    UserRightsRepository userRightsRepo = new UserRightsRepository(_info.ConnectionString);
                    userRightsRepo.Add(userrights);
                    return Ok(userrights);
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
        [HttpPost("EditUserRights/ID={ID}")]
        [Route("[action]")]
        public IActionResult EditUserRights(string ID, [FromBody] UserRights userrights)
        {
            #region Edit UserRights
            try
            {
                if (ModelState.IsValid)
                {
                    if (userrights == null)
                    {
                        return BadRequest("UserRights object cannot be NULL");
                    }
                    if (UserRightsExists(ID))
                    {
                        UserRightsRepository userRightsRepository = new UserRightsRepository(_info.ConnectionString);
                        //user.User_Id
                        userRightsRepository.Update(userrights);
                        return Ok("UserRights with ID: " + ID + " updated Successfully");
                    }
                    else
                    {
                        return BadRequest("UserRights with ID:" + ID + " does not exist");
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
        public IActionResult DeleteUserRights(object body)
        {
            #region Delete UserRights
            try
            {
                //TODO: check for correct way of sending string from body
                string ID = JsonSerializer.Serialize(body);

                if (!string.IsNullOrEmpty(ID))
                {
                    if (UserRightsExists(ID))
                    {
                        UserRightsRepository userRightsRepository = new UserRightsRepository(_info.ConnectionString);
                        UserRights fetchedUser = userRightsRepository.GetUserRightsById(ID);
                        userRightsRepository.Delete(fetchedUser);
                        return Ok("UserRights with ID: " + ID + " removed Successfully");
                    }
                    else
                    {
                        return BadRequest("UserRights with ID: " + ID + " does not exist");
                    }
                }
                else
                {
                    return BadRequest("UserRights Id Cannot be null");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Check if UserRights Exists
        private bool UserRightsExists(string ID)
        {
            try
            {
                UserRightsRepository userRightsRepository = new UserRightsRepository(_info.ConnectionString);
                UserRights fetchedUser = userRightsRepository.GetUserRightsById(ID);
                if (fetchedUser != null)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Exception in UserRights Exists Function, Exception Message: " + ex.Message);
            }
        }
        #endregion

    }
}

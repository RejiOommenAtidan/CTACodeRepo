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
        private readonly UserRightsRepository  _userRightsRepository;
        public UserRightsController(DBConnectionInfo info)
        {
            _info = info;
            _userRightsRepository = new UserRightsRepository(_info.sConnectionString);
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
               
                IEnumerable<UserRights> userrights = _userRightsRepository.GetAllUserRights();
                return Ok(userrights);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        
        [HttpGet("GetUserRights/ID={ID}")]
        [Route("[action]")]
        public IActionResult GetUserRight(string ID)
        {
            #region Get Single UserRight
            try
            {
              
                UserRights fetchedUserRights = _userRightsRepository.GetUserRightsById(ID);
                return Ok(fetchedUserRights);
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
                    userrights.dtEntered = DateTime.Now;
                    userrights.dtUpdated = DateTime.Now;

                    _userRightsRepository.Add(userrights);
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
                   
                    if (UserRightsExists(ID))
                    {
                        UserRights fetcheduserrights = _userRightsRepository.GetUserRightsById(ID);
                        userrights.dtEntered = fetcheduserrights.dtEntered;
                        userrights.dtUpdated = DateTime.Now;
                        //user.User_Id
                        _userRightsRepository.Update(userrights);
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
        public IActionResult DeleteUserRights(UserRights userRights)
        {
            #region Delete UserRights
            try
            {


                string userRightsId = userRights.Id.ToString();        
                if (!string.IsNullOrEmpty(userRightsId))
                {
                    if (UserRightsExists(userRightsId))
                    {
                       
                        UserRights fetchedUser = _userRightsRepository.GetUserRightsById(userRightsId);
                        _userRightsRepository.Delete(fetchedUser);
                        return Ok("UserRights with ID: " + userRightsId + " removed Successfully");
                    }
                    else
                    {
                        return BadRequest("UserRights with ID: " + userRightsId + " does not exist");
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
               
                UserRights fetchedUser = _userRightsRepository.GetUserRightsById(ID);
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

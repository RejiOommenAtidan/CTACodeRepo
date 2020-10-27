using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Masters;
using CTADBL.BaseClassRepositories.Transactions;
using CTADBL.Entities;
using CTADBL.ViewModels;
using CTADBL.ViewModelsRepositories;
using CTAWebAPI.Helpers;
using CTAWebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Reflection;
using System.Security.Claims;
using System.Text;

namespace CTAWebAPI.Controllers.Transactions
{
    [Authorize]
    [EnableCors("AllowOrigin")]
    //[APIKeyAuth]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        #region Constructor
        private readonly double dTimeout = 1;
        private readonly DBConnectionInfo _info;
        private readonly UserRepository _userRepository;
        private readonly UserVMRepository _userVMRepository;
        private readonly CTAConfigRepository _ctaConfigRepository;
        private readonly CTALogger _ctaLogger;
        private readonly AppSettings _appSettings;
        private readonly UserRightsRepository _userRightsRepository;
        private readonly UsersVMRepository _usersVMRepository;
        public UserController(DBConnectionInfo info, IOptions<AppSettings> appSettings)
        {
            _info = info;
            _userRepository = new UserRepository(_info.sConnectionString);
            _ctaLogger = new CTALogger(_info);
            _userVMRepository = new UserVMRepository(_info.sConnectionString);
            _appSettings = appSettings.Value;
            _userRightsRepository = new UserRightsRepository(_info.sConnectionString);
            _usersVMRepository = new UsersVMRepository(_info.sConnectionString);
            _ctaConfigRepository = new CTAConfigRepository(_info.sConnectionString);
        }
        #endregion

        #region Get Calls
        //[Authorize(Roles = User)]
        //[Authorize(Roles = Role.Admin,)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetUsers()
        {
            #region Get Users
            try
            {
                IEnumerable<User> allUsers = _userRepository.GetAllUsers();

                #region Information Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion

                return Ok(allUsers);
            }
            catch (Exception ex)
            {
                #region Exception Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetAllUsers()
        {
            #region Get All Users for User Manage Screen
            try
            {
                //CTAConfig ctaConfig = _ctaConfigRepository.GetConfigByKey("SelectTotalRecordCount");
                //bool isParsable = int.TryParse(ctaConfig.sValue, out int rows);
                //if (!isParsable)
                //    return BadRequest("Invalid Row Count in Masters Table");


                int records = Convert.ToInt32(CTAConfigRepository.GetValueByKey("SelectTotalRecordCount"));
                IEnumerable<UsersVM> allUsers = _usersVMRepository.GetUsersWithUserRightsName(records);
                #region Information Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion

                return Ok(allUsers);
            }
            catch (Exception ex)
            {
                #region Exception Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        [HttpGet("GetUser/Id={Id}")]
        [Route("[action]")]
        public IActionResult GetUser(string Id)
        {
            #region Get User
            try
            {
                User user = _userRepository.GetUserById(Id);

                #region Information Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion

                return Ok(user);
            }
            catch (Exception ex)
            {
                #region Exception Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion

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
                    user.dtEntered = DateTime.Now;
                    user.dtUpdated = DateTime.Now;
                    user.nActive = 1;
                    _userRepository.Add(user);

                    #region Information Logging
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called", null, user.nEnteredBy);
                    #endregion

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
                #region Exception Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, user.nEnteredBy);
                #endregion

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

                    if (Id != user.Id.ToString())
                    {
                        return BadRequest("User ID's ain't Matching");
                    }

                    if (UserExists(Id))
                    {
                        User fetchedUser = _userRepository.GetUserById(Id);
                        user.nEnteredBy = fetchedUser.nEnteredBy;
                        user.dtEntered = fetchedUser.dtEntered;
                        user.dtUpdated = DateTime.Now;
                        user.nActive = 1;
                        _userRepository.Update(user);

                        #region Audit Log
                        CTALogger.LogAuditRecord(fetchedUser, user, null, null, 5, fetchedUser.Id, user.nUpdatedBy);
                        #endregion

                        #region Alert Logging 
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", null, user.nEnteredBy);
                        #endregion

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
                #region Exception Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, user.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion 

        #region Delete Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult DeleteUser(User user)
        {
            #region Delete User
            try
            {
                string userID = user.Id.ToString();
                if (!string.IsNullOrEmpty(userID))
                {
                    if (UserExists(userID))
                    {
                        User fetchedUser = _userRepository.GetUserById(userID);
                        _userRepository.Delete(fetchedUser);

                        #region Alert Logging
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 4), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", null, user.nEnteredBy);
                        #endregion

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
                #region Exception Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 4), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, user.nEnteredBy);
                #endregion

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

        #region Auth User
        [AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        public IActionResult AuthenticateUser(User userFromUI)
        {
            #region Authenticate User
            try
            {
                #region Params Check
                if (string.IsNullOrEmpty(userFromUI.sUsername))
                    return BadRequest("Username cannot be NULL OR Empty");
                if (string.IsNullOrEmpty(userFromUI.sPassword))
                    return BadRequest("Password cannot be NULL OR Empty");
                #endregion

                #region Equality Check
                User userFromDB = _userRepository.GetUserByUsername(userFromUI.sUsername);
                if (userFromDB == null)
                {
                    return NotFound("User Not Found with Username: " + userFromUI.sUsername);
                }
                //Note: Equals is Case Sensitive
                if (userFromUI.sPassword.Equals(userFromDB.sPassword))
                {
                    #region Generating UserVM
                    UserVM userVMFromDB = _userVMRepository.AuthenticateUser(userFromDB.Id);
                    if (userVMFromDB == null)
                    {
                        return BadRequest("UserVM Generation Failed");
                    }
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = Encoding.ASCII.GetBytes(_appSettings.sSecret);
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                    new Claim(ClaimTypes.Name, userVMFromDB.oUser.Id.ToString()),
                    new Claim(ClaimTypes.Role, userVMFromDB.oUserRights.sUserRightsName)
                        }),
                        Expires = DateTime.UtcNow.AddDays(dTimeout),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    //WriteToken
                    userVMFromDB.sJWTToken = tokenHandler.WriteToken(token);
                    //Make Password NULL
                    userVMFromDB.oUser.sPassword = null;
                    return Ok(userVMFromDB);
                    #endregion
                }
                else
                    return Unauthorized("Incorrect Password");
                #endregion        
            }
            catch (Exception ex)
            {
                //TODO: ex.Message || ex.StackTrace
                #region Exception Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace,userFromUI.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Change Password
        [HttpPost]
        [Route("[action]")]
        public IActionResult ChangePassword(ChangePasswordVM changePasswordVM)
        {
            #region Change Password
            try
            {
                if (ModelState.IsValid)
                {
                    #region Params Check
                    if (string.IsNullOrEmpty(changePasswordVM.sOldPassword))
                        return BadRequest("Old Password cannot be NULL OR Empty");
                    if (string.IsNullOrEmpty(changePasswordVM.sNewPassword))
                        return BadRequest("New Password cannot be NULL OR Empty");
                    if (string.IsNullOrEmpty(changePasswordVM.sConfirmNewPassword))
                        return BadRequest("Confirm New Password cannot be NULL OR Empty");
                    #endregion

                    User fetchedFromDB = _userRepository.GetUserById(changePasswordVM.nUserId.ToString());
                    if (fetchedFromDB == null)
                        return NotFound("User With Id: " + changePasswordVM.nUserId + " Not Found");

                    if (changePasswordVM.sOldPassword.Equals(fetchedFromDB.sPassword))
                    {
                        if (changePasswordVM.sNewPassword.Equals(changePasswordVM.sConfirmNewPassword))
                        {
                            fetchedFromDB.sPassword = changePasswordVM.sNewPassword;
                            fetchedFromDB.nUpdatedBy = changePasswordVM.nUserId;
                            fetchedFromDB.dtUpdated = DateTime.Now;
                            _userRepository.Update(fetchedFromDB);

                            #region Alert Logging 
                            _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", null, changePasswordVM.nUserId);
                            #endregion

                            return Ok("User with Id: " + fetchedFromDB.Id + " Password Updated Successfully");
                        }
                        else
                            return BadRequest("New Password & Coonfirm New Password are Different");
                    }
                    else
                        return BadRequest("Incorrect Old Password");
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
                #region Exception Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, changePasswordVM.nUserId);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion
    }
}

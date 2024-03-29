﻿using CTADBL.BaseClasses.Masters;
using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Masters;
using CTADBL.BaseClassRepositories.Transactions;
using CTADBL.Entities;
using CTAWebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using TimeZoneConverter;

namespace CTAWebAPI.Controllers.Masters
{
    [AuthorizeRole(FeatureID = 19)]
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    //[APIKeyAuth]
    [ApiController]
    public class UserRightsController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly UserRightsRepository  _userRightsRepository;
        private readonly FeatureRepository _featureRepository;
        private readonly FeatureUserrightsRepository _featureUserrightsRepository;
        private readonly CTALogger _ctaLogger;
        public UserRightsController(DBConnectionInfo info)
        {
            _info = info;
            _userRightsRepository = new UserRightsRepository(_info.sConnectionString);
            _featureRepository = new FeatureRepository(_info.sConnectionString);
            _featureUserrightsRepository = new FeatureUserrightsRepository(_info.sConnectionString);
            _ctaLogger = new CTALogger(_info);
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
                #region Information Logging 
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion
                return Ok(userrights);
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion
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
                #region Information Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion
                return Ok(fetchedUserRights);
            }
            catch (Exception ex)
            {
                #region Exception Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message,ex.StackTrace);
                #endregion
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
        public IActionResult AddUserRights(UserRights userRights)
        {
            #region Add UserRights
            try
            {
                if (ModelState.IsValid)
                {
                    DuplicateCheck<UserRights> check = new DuplicateCheck<UserRights>(userRights, _info.sConnectionString);
                    string[] props = { "sUserRightsName" };
                    string message;
                    if (check.IsDuplicate(userRights.Id, props, out message))
                    {
                        return Problem(message, null, 403);
                    }
                    userRights.dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                    userRights.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));

                    _userRightsRepository.Add(userRights);

                    #region Get Added Userright for getting Id
                    UserRights addedUserRight = _userRightsRepository.GetUserRightsByUserRightsName(userRights.sUserRightsName);
                    #endregion

                    #region Get All Features, Map & Add
                    IEnumerable<Feature> lFeatures = _featureRepository.GetAllFeatures();
                    foreach(Feature oFeature in lFeatures)
                    {
                        //1-Home
                        //2-Search
                        //46-Change Password
                        if (oFeature.Id == 1 || oFeature.Id == 2 || oFeature.Id == 46)
                        {
                            FeatureUserrights lnkFeatureUserrights = new FeatureUserrights
                            {
                                nFeatureID = oFeature.Id,
                                nUserRightsID = addedUserRight.Id,
                                bRights = true,
                                dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time")),
                                nEnteredBy = userRights.nEnteredBy
                            };
                            _featureUserrightsRepository.Add(lnkFeatureUserrights);
                        }
                        else {
                            
                            FeatureUserrights lnkFeatureUserrights = new FeatureUserrights
                            {
                                nFeatureID = oFeature.Id,
                                nUserRightsID = addedUserRight.Id,
                                bRights = false, //Making Rights Initially to False, let Admin Give Rights
                                dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time")),
                                nEnteredBy = userRights.nEnteredBy
                            };
                            _featureUserrightsRepository.Add(lnkFeatureUserrights);
                        }
                    }
                    #endregion

                    #region Information Logging
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called", null, userRights.nEnteredBy);
                    #endregion

                    return Ok(addedUserRight);
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message,ex.StackTrace, userRights.nEnteredBy);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Edit Call
        [HttpPost("EditUserRights/ID={ID}")]
        [Route("[action]")]
        public IActionResult EditUserRights(string ID, [FromBody] UserRights userRights)
        {
            #region Edit UserRights
            try
            {
                if (ModelState.IsValid)
                {
                   
                    if (UserRightsExists(ID))
                    {
                        DuplicateCheck<UserRights> check = new DuplicateCheck<UserRights>(userRights, _info.sConnectionString);
                        string[] props = { "sUserRightsName" };
                        string message;
                        if (check.IsDuplicate(userRights.Id, props, out message))
                        {
                            return Problem(message, null, 403);
                        }
                        UserRights fetcheduserRights = _userRightsRepository.GetUserRightsById(ID);
                        userRights.nEnteredBy = fetcheduserRights.nEnteredBy;
                        userRights.dtEntered = fetcheduserRights.dtEntered;
                        userRights.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                        _userRightsRepository.Update(userRights);

                        #region Audit Log
                        CTALogger.LogAuditRecord(fetcheduserRights, userRights, null, null, 20, fetcheduserRights.Id, userRights.nUpdatedBy);
                        #endregion

                        #region Alert Logging 
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", null, userRights.nUpdatedBy);
                        #endregion

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

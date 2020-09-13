using CTADBL.BaseClasses;
using CTADBL.BaseClassRepositories;
using CTADBL.Entities;
using CTAWebAPI.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace CTAWebAPI.Controllers
{
    [EnableCors("AllowOrigin")]
    //[APIKeyAuth]
    [Route("api/[controller]")]
    [ApiController]
    public class GivenGBIDController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly GivenGBIDRepository _givenGBIDRepository;
        public GivenGBIDController(DBConnectionInfo info)
        {
            _info = info;
            _givenGBIDRepository = new GivenGBIDRepository(_info.sConnectionString);
        }
        #endregion

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetGivenGBIDs()
        {
            #region Get Given GBIDs
            try
            {
                IEnumerable<GivenGBID> givenGBIDs = _givenGBIDRepository.GetAllGivenGBID();

                #region Information Logging 
                string sActionType = Enum.GetName(typeof(Operations), 2);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 1);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = currentMethodName + " Method Called";
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription);
                #endregion

                return Ok(givenGBIDs);
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                string sActionType = Enum.GetName(typeof(Operations), 2);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 3);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = "Exception in " + currentMethodName;
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        [HttpGet("GetGivenGBID/Id={Id}")]
        [Route("[action]")]
        public IActionResult GetGivenGBID(string Id)
        {
            #region Get Given GBID
            try
            {
                GivenGBID givenGBID = _givenGBIDRepository.GetGivenGBID(Id);

                #region Information Logging 
                string sActionType = Enum.GetName(typeof(Operations), 2);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 1);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = currentMethodName + " Method Called";
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription);
                #endregion

                return Ok(givenGBID);
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                string sActionType = Enum.GetName(typeof(Operations), 2);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 3);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = "Exception in " + currentMethodName;
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Add Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddGivenGBID(GivenGBID givenGBID)
        {
            #region Add Given GBID
            try
            {
                if (ModelState.IsValid)
                {
                    givenGBID.dtEntered = DateTime.Now;
                    givenGBID.dtUpdated = DateTime.Now;
                    _givenGBIDRepository.Add(givenGBID);

                    #region Information Logging 
                    string sActionType = Enum.GetName(typeof(Operations), 1);
                    string sModuleName = (GetType().Name).Replace("Controller", "");
                    string sEventName = Enum.GetName(typeof(LogLevels), 1);
                    string currentMethodName = MethodBase.GetCurrentMethod().Name;
                    string sDescription = currentMethodName + " Method Called";
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, givenGBID.nEnteredBy);
                    #endregion

                    return Ok(givenGBID);
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
                string sActionType = Enum.GetName(typeof(Operations), 1);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 3);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = "Exception in " + currentMethodName;
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, givenGBID.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Edit Call
        [HttpPost("EditGivenGBID/Id={Id}")]
        [Route("[action]")]
        public IActionResult EditGivenGBID(string Id, [FromBody] GivenGBID givenGBID)
        {
            #region Edit User
            try
            {
                if (ModelState.IsValid)
                {
                    if (Id == null)
                    {
                        return BadRequest("GBID param cannot be NULL");
                    }
                    if (Id != givenGBID.Id.ToString())
                    {
                        return BadRequest("Given GBID's ain't Matching");
                    }
                    if (GivenGBIDExists(Id))
                    {
                        _givenGBIDRepository.Update(givenGBID);

                        #region Alert Logging 
                        string sActionType = Enum.GetName(typeof(Operations), 3);
                        string sModuleName = (GetType().Name).Replace("Controller", "");
                        string sEventName = Enum.GetName(typeof(LogLevels), 2);
                        string currentMethodName = MethodBase.GetCurrentMethod().Name;
                        string sDescription = currentMethodName + " Method Called";
                        CTALogger logger = new CTALogger(_info);
                        logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, givenGBID.nEnteredBy);
                        #endregion

                        return Ok("Given GB with ID: " + Id + " updated Successfully");
                    }
                    else
                    {
                        return BadRequest("Given GB with ID:" + Id + " does not exist");
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
                string sActionType = Enum.GetName(typeof(Operations), 3);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 3);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = "Exception in " + currentMethodName;
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, givenGBID.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Delete Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult DeleteGivenGBID(GivenGBID givenGBID)
        {
            #region Delete GBID
            try
            {

                string gbID = givenGBID.Id.ToString();
                if (!string.IsNullOrEmpty(gbID))
                {
                    if (GivenGBIDExists(gbID))
                    {
                        GivenGBID fetchedGBID = _givenGBIDRepository.GetGivenGBID(gbID);
                        _givenGBIDRepository.Delete(fetchedGBID);

                        #region Alert Logging 
                        string sActionType = Enum.GetName(typeof(Operations), 4);
                        string sModuleName = (GetType().Name).Replace("Controller", "");
                        string sEventName = Enum.GetName(typeof(LogLevels), 2);
                        string currentMethodName = MethodBase.GetCurrentMethod().Name;
                        string sDescription = currentMethodName + " Method Called";
                        CTALogger logger = new CTALogger(_info);
                        logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, givenGBID.nEnteredBy);
                        #endregion

                        return Ok("Given GB with ID: " + gbID + " removed Successfully");
                    }
                    else
                    {
                        return BadRequest("Given GB with ID: " + gbID + " does not exist");
                    }
                }
                else
                {
                    return BadRequest("Given GB Id Cannot be null");
                }

            }
            catch (Exception ex)
            {
                #region Exception Logging 
                string sActionType = Enum.GetName(typeof(Operations), 4);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 3);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = "Exception in " + currentMethodName;
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, givenGBID.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Check if Given GBID Exists
        private bool GivenGBIDExists(string Id)
        {
            try
            {
                GivenGBID fetchedGBId = _givenGBIDRepository.GetGivenGBID(Id);
                if (fetchedGBId != null)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Exception in Given GBID Exists Function, Exception Message: " + ex.Message);
            }
        }
        #endregion
    }
}

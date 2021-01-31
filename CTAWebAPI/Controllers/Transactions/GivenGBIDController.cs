using CTADBL.BaseClasses.Transactions;
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

namespace CTAWebAPI.Controllers.Transactions
{
    //[Authorize]
    [EnableCors("AllowOrigin")]
    //[APIKeyAuth]
    [Route("api/[controller]")]
    [ApiController]
    public class GivenGBIDController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly GivenGBIDRepository _givenGBIDRepository;
        private readonly MadebRepository _madebRepository;
        private readonly CTALogger _ctaLogger;
        public GivenGBIDController(DBConnectionInfo info)
        {
            _info = info;
            _givenGBIDRepository = new GivenGBIDRepository(_info.sConnectionString);
            _madebRepository = new MadebRepository(_info.sConnectionString);
            _ctaLogger = new CTALogger(_info);
        }
        #endregion

        #region Get Calls

        #region Get All Given GBID
        [AuthorizeRole(FeatureID = 10)] // This call is made by New Entry only.
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetGivenGBIDs()
        {
            
            try
            {
                IEnumerable<GivenGBID> givenGBIDs = _givenGBIDRepository.GetAllGivenGBID();

                #region Information Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion

                return Ok(givenGBIDs);
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message,ex.StackTrace);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            
        }
        #endregion
        [AuthorizeRole(FeatureID = 9)]
        #region Get Given GBID record by Id
        [HttpGet("GetGivenGBID/Id={Id}")]
        [Route("[action]")]
        public IActionResult GetGivenGBID(string Id)
        {
            #region Get Given GBID
            try
            {
                GivenGBID givenGBID = _givenGBIDRepository.GetGivenGBID(Id);

                #region Information Logging  
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion

                return Ok(givenGBID);
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


        #region Get Random GBID
        [AuthorizeRole(FeatureID = 9)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetRandomGBID()
        {
            #region Get Random GB ID
            int randomGBID = _givenGBIDRepository.GetRandomGBID();
            return Ok(randomGBID);
            #endregion
        }
        #endregion

        #region Get All Given GBID records for a date
        [AuthorizeRole(FeatureID = 9)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetGivenGBIDByDate (DateTime date)
        {
            try
            {
                IEnumerable<GivenGBID> result = _givenGBIDRepository.GetGivenGBIDByDate(date);
                if(result != null)
                {
                    #region Information Logging 
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(result);
                }
                else
                {
                    return NoContent();
                }

            }
            catch(Exception ex)
            {
                #region Exception Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion
                
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        #endregion

        #endregion End all Get Calls

        #region Add Call
        [AuthorizeRole(FeatureID = 9)]
        [Route("[action]")]
        [HttpPost("AddGivenGBID/dtReceived={dtReceived}")]
        public IActionResult AddGivenGBID(DateTime dtReceived,GivenGBID givenGBID)
        {
            #region Add Given GBID
            try
            {
                if (ModelState.IsValid)
                {
                    
                    if (_madebRepository.AddGBIDByFormNo(givenGBID.nFormNo, dtReceived, givenGBID.nGBId.ToString()))
                    {
                        /* Changed by Rajen*/
                        givenGBID.dtDate = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                        /* Changed by Rajen*/

                        givenGBID.dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                        givenGBID.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                        _givenGBIDRepository.Add(givenGBID);
                        #region Information Logging 
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called", null, givenGBID.nEnteredBy);
                        #endregion

                        return Ok(givenGBID);
                    }
                    else
                    {
                        return BadRequest("Madeb is not Sarso Madeb");
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message,ex.StackTrace, givenGBID.nEnteredBy);
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
            #region Edit Given GBID
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
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", null, givenGBID.nUpdatedBy);
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message,ex.StackTrace, givenGBID.nEnteredBy);
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
            #region Delete Given GBID
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
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 4), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", null, givenGBID.nEnteredBy);
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 4), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message,ex.StackTrace, givenGBID.nEnteredBy);
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

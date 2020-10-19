using CTADBL.BaseClasses.Masters;
using CTADBL.BaseClassRepositories.Masters;
using CTADBL.Entities;
using CTAWebAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace CTAWebAPI.Controllers.Masters
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChartelController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly ChartelRepository _chartelRepository;
        private readonly CTALogger _ctaLogger;
        public ChartelController(DBConnectionInfo info)
        {
            _info = info;
            _chartelRepository = new ChartelRepository(_info.sConnectionString);
            _ctaLogger = new CTALogger(_info);
        }
        #endregion

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetAllChartel()
        {
            #region Get All Chartel
            try
            {

                IEnumerable<Chartel> chartels = _chartelRepository.GetAllChartel();
                #region Information Logging 
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion
                return Ok(chartels);
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

        [HttpGet("GetChartelById/ID={ID}")]
        [Route("[action]")]
        public IActionResult GetChartelById(string ID)
        {
            #region Get Single Chartel
            try
            {

                Chartel chartel = _chartelRepository.GetChartelById(ID);
                #region Information Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion
                return Ok(chartel);
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
        //TODO: Tell
        //[AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddChartel(Chartel chartel)
        {
            #region Add Chartel
            try
            {
                if (ModelState.IsValid)
                {
                    chartel.dtEntered = DateTime.Now;

                    _chartelRepository.Add(chartel);

                    #region Information Logging
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called", null, chartel.nEnteredBy);
                    #endregion
                    return Ok(chartel);
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, chartel.nEnteredBy);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Edit Call
        [HttpPost("EditChartel/ID={ID}")]
        [Route("[action]")]
        public IActionResult EditChartel(string ID, [FromBody] Chartel chartel)
        {
            #region Edit Chartel
            try
            {
                if (ModelState.IsValid)
                {

                    if (ChartelExists(ID))
                    {
                        Chartel fetchedChartel = _chartelRepository.GetChartelById(ID);
                        chartel.dtEntered = fetchedChartel.dtEntered;
                        _chartelRepository.Update(chartel);
                        #region Alert Logging 
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", null, chartel.nEnteredBy);
                        #endregion
                        return Ok("Chartel with ID: " + ID + " updated Successfully");
                    }
                    else
                    {
                        return BadRequest("Chartel with ID:" + ID + " does not exist");
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, chartel.nEnteredBy);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Delete Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult DeleteChartel(Chartel chartel)
        {
            #region Delete Chartel
            try
            {
                //TODO: check for correct way of sending string from body
                string chartelId = chartel.Id.ToString();
                if (!string.IsNullOrEmpty(chartelId))
                {
                    if (ChartelExists(chartelId))
                    {

                        Chartel fetchedChartel = _chartelRepository.GetChartelById(chartelId);
                        _chartelRepository.Delete(fetchedChartel);
                        return Ok("Chartel with ID: " + fetchedChartel + " removed Successfully");
                    }
                    else
                    {
                        return BadRequest("Chartel with ID: " + chartelId + " does not exist");
                    }
                }
                else
                {
                    return BadRequest("Chartel Id Cannot be NULL");
                }

            }
            catch (Exception ex)
            {
                #region Exception Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 4), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, chartel.nEnteredBy);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Check if Chartel Exists
        private bool ChartelExists(string ID)
        {
            try
            {
                Chartel fetchedChartel = _chartelRepository.GetChartelById(ID);
                if (fetchedChartel != null)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Exception in Chartel Exists Function, Exception Message: " + ex.Message);
            }
        }
        #endregion
    }
}

using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Transactions;
using CTADBL.Entities;
using CTAWebAPI.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace CTAWebAPI.Controllers.Transactions
{
    [EnableCors("AllowOrigin")]
    //[APIKeyAuth]
    [Route("api/[controller]")]
    [ApiController]
    public class FeatureUserrightsController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly FeatureUserrightsRepository _featureUserrightsRepository;
        private readonly CTALogger _ctaLogger;
        public FeatureUserrightsController(DBConnectionInfo info)
        {
            _info = info;
            _featureUserrightsRepository = new FeatureUserrightsRepository(_info.sConnectionString);
            _ctaLogger = new CTALogger(_info);
        }
        #endregion

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetFeatureUserrights()
        {
            #region Get Users
            try
            {
                IEnumerable<FeatureUserrights> allfeatureuserrights = _featureUserrightsRepository.GetAllFeatureUserrights();

                #region Information Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion

                return Ok(allfeatureuserrights);
            }
            catch (Exception ex)
            {
                #region Exception Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        [HttpGet("GetFeatureUserrightById/Id={Id}")]
        [Route("[action]")]
        public IActionResult GetFeatureUserrightById(string Id)
        {
            #region Get FeatureUserright
            try
            {
                FeatureUserrights featureUserright = _featureUserrightsRepository.GetFeatureUserrightsById(Id);

                #region Information Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion

                return Ok(featureUserright);
            }
            catch (Exception ex)
            {
                #region Exception Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Add Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddFeatureUserright(FeatureUserrights featureUserrights)
        {
            #region Add Feature User rights
            try
            {
                if (ModelState.IsValid)
                {
                    featureUserrights.dtEntered = DateTime.Now;
                    _featureUserrightsRepository.Add(featureUserrights);

                    #region Information Logging
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called", featureUserrights.nEnteredBy);
                    #endregion

                    return Ok(featureUserrights);
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name, featureUserrights.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Edit Call
        [HttpPost("EditFeatureUserright/Id={Id}")]
        [Route("[action]")]
        public IActionResult EditFeatureUserright(string Id, [FromBody] FeatureUserrights featureUserright)
        {
            #region Edit Feature User right
            try
            {
                if (ModelState.IsValid)
                {
                    if (Id == null)
                    {
                        return BadRequest("Mapping Param ID cannot be NULL");
                    }

                    if (Id != featureUserright.Id.ToString())
                    {
                        return BadRequest("Mapping ID's ain't Matching");
                    }

                    if (FeatureUserrightExists(Id))
                    {
                        FeatureUserrights fetchedFeatureUserright = _featureUserrightsRepository.GetFeatureUserrightsById(Id);
                        featureUserright.dtEntered = fetchedFeatureUserright.dtEntered;
                        _featureUserrightsRepository.Update(fetchedFeatureUserright);

                        #region Alert Logging 
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", featureUserright.nEnteredBy);
                        #endregion

                        return Ok("Mapping with ID: " + Id + " updated Successfully");
                    }
                    else
                    {
                        return BadRequest("Mapping with ID:" + Id + " does not exist");
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name, featureUserright.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion 

        #region Delete Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult DeleteFeatureUserright(FeatureUserrights featureUserrights)
        {
            #region Delete Feature User right
            try
            {
                string mappingID = featureUserrights.Id.ToString();
                if (!string.IsNullOrEmpty(mappingID))
                {
                    if (FeatureUserrightExists(mappingID))
                    {
                        FeatureUserrights fetchedFeatureUserright = _featureUserrightsRepository.GetFeatureUserrightsById(mappingID);
                        _featureUserrightsRepository.Delete(fetchedFeatureUserright);

                        #region Alert Logging
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 4), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", featureUserrights.nEnteredBy);
                        #endregion

                        return Ok("Mapping with ID: " + mappingID + " removed Successfully");
                    }
                    else
                    {
                        return BadRequest("Mapping with ID: " + mappingID + " does not exist");
                    }
                }
                else
                {
                    return BadRequest("Mapping Id Cannot be NULL");
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 4), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name, featureUserrights.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Check if Mapping Exists
        private bool FeatureUserrightExists(string Id)
        {
            try
            { 
                FeatureUserrights fetchedfeatureUserright = _featureUserrightsRepository.GetFeatureUserrightsById(Id);
                if (fetchedfeatureUserright != null)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Exception in Feature Userright Exists Function, Exception Message: " + ex.Message);
            }
        }
        #endregion
    }
}

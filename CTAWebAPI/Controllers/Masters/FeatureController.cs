using CTADBL.BaseClasses.Masters;
using CTADBL.BaseClassRepositories.Masters;
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

namespace CTAWebAPI.Controllers.Masters
{
    [Authorize]
    [EnableCors("AllowOrigin")]
    //[APIKeyAuth]
    [Route("api/[controller]")]
    [ApiController]
    public class FeatureController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly FeatureRepository _featureRepository;
        private readonly CTALogger _ctaLogger;
        public FeatureController(DBConnectionInfo info)
        {
            _info = info;
            _featureRepository = new FeatureRepository(_info.sConnectionString);
            _ctaLogger = new CTALogger(_info);
        }
        #endregion

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetFeatures()
        {
            #region Get Features
            try
            {
                IEnumerable<Feature> allFeatures = _featureRepository.GetAllFeatures();

                #region Information Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion

                return Ok(allFeatures);
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

        [HttpGet("GetFeature/Id={Id}")]
        [Route("[action]")]
        public IActionResult GetFeature(string Id)
        {
            #region Get Feature
            try
            {
                Feature feature = _featureRepository.GetFeatureById(Id);

                #region Information Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion

                return Ok(feature);
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
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddFeature(Feature feature)
        {
            #region Add Feature
            try
            {
                if (ModelState.IsValid)
                {
                    feature.dtEntered = DateTime.Now;
                    feature.dtUpdated = DateTime.Now;

                    _featureRepository.Add(feature);

                    #region Information Logging
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called", null, feature.nEnteredBy);
                    #endregion

                    return Ok(feature);
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace,feature.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Edit Call
        [HttpPost("EditFeature/Id={Id}")]
        [Route("[action]")]
        public IActionResult EditFeature(string Id, [FromBody] Feature feature)
        {
            #region Edit Feature
            try
            {
                if (ModelState.IsValid)
                {
                    if (Id == null)
                    {
                        return BadRequest("Feature Param ID cannot be NULL");
                    }

                    if (Id != feature.Id.ToString())
                    {
                        return BadRequest("Feature ID's ain't Matching");
                    }

                    if (FeatureExists(Id))
                    {
                        Feature fetchedFeature = _featureRepository.GetFeatureById(Id);
                        feature.nEnteredBy = fetchedFeature.nEnteredBy;
                        feature.dtEntered = fetchedFeature.dtEntered;
                        feature.dtUpdated = DateTime.Now;
                        _featureRepository.Update(feature);

                        #region Audit Log
                        CTALogger.LogAuditRecord(fetchedFeature, feature, null, null, 28, fetchedFeature.Id, feature.nUpdatedBy);
                        #endregion

                        #region Alert Logging 
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", null, feature.nUpdatedBy);
                        #endregion

                        return Ok("Feature with ID: " + Id + " updated Successfully");
                    }
                    else
                    {
                        return BadRequest("Feature with ID:" + Id + " does not exist");
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace,feature.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion 

        #region Delete Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult DeleteFeature(Feature feature)
        {
            #region Delete User
            try
            {
                string featureID = feature.Id.ToString();
                if (!string.IsNullOrEmpty(featureID))
                {
                    if (FeatureExists(featureID))
                    {
                        Feature fetchedFeature = _featureRepository.GetFeatureById(featureID);
                        _featureRepository.Delete(fetchedFeature);

                        #region Alert Logging
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 4), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", null, feature.nEnteredBy);
                        #endregion

                        return Ok("Feature with ID: " + featureID + " removed Successfully");
                    }
                    else
                    {
                        return BadRequest("Feature with ID: " + featureID + " does not exist");
                    }
                }
                else
                {
                    return BadRequest("Feature Id Cannot be NULL");
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 4), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message,ex.StackTrace, feature.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Check if Feature Exists
        private bool FeatureExists(string Id)
        {
            try
            {
                Feature fetchedFeature = _featureRepository.GetFeatureById(Id);
                if (fetchedFeature != null)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Exception in Feature Exists Function, Exception Message: " + ex.Message);
            }
        }
        #endregion
    }
}

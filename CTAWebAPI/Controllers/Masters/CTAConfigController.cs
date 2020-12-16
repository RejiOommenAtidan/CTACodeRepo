using CTADBL.BaseClasses.Masters;
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

namespace CTAWebAPI.Controllers.Masters
{
    [Authorize]
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    //[APIKeyAuth]
    [ApiController]
    public class CTAConfigController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly CTAConfigRepository _ctaConfigRepository;
        private readonly AuditLogRepository _auditLogRepository;
        private readonly CTALogger _ctaLogger;
        public CTAConfigController(DBConnectionInfo info)
        {
            _info = info;
            _ctaConfigRepository = new CTAConfigRepository(_info.sConnectionString);
            _auditLogRepository = new AuditLogRepository(_info.sConnectionString);
            _ctaLogger = new CTALogger(_info);
        }
        #endregion

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetAllCTAConfig()
        {
            #region Get All CTA Config
            try
            {
                IEnumerable<CTAConfig> ctaConfigs = _ctaConfigRepository.GetAllConfig();

                #region Information Logging 
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion

                return Ok(ctaConfigs);
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

        [HttpGet("GetCTAConfigById/ID={ID}")]
        [Route("[action]")]
        public IActionResult GetCTAConfigById(string ID)
        {
            #region Get Single CTAConfig
            try
            {
                CTAConfig ctaConfig = _ctaConfigRepository.GetConfigById(ID);

                #region Information Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion

                return Ok(ctaConfig);
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

        [HttpGet("GetCTAConfigByKey/Key={Key}")]
        [Route("[action]")]
        public IActionResult GetCTAConfigByKey(string Key)
        {
            #region Get Single CTAConfig by Key
            try
            {
                CTAConfig ctaConfig = _ctaConfigRepository.GetConfigByKey(Key);

                #region Information Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion

                return Ok(ctaConfig);
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
        public IActionResult AddCTAConfig(CTAConfig ctaConfig)
        {
            #region Add CTA Config
            try
            {
                if (ModelState.IsValid)
                {
                    DuplicateCheck<CTAConfig> check = new DuplicateCheck<CTAConfig>(ctaConfig, _info.sConnectionString);
                    string[] props = { "sKey" };
                    string message;
                    if (check.IsDuplicate(ctaConfig.Id, props, out message))
                    {
                        return Problem(message, null, 403);
                    }
                    ctaConfig.dtUpdated = DateTime.Now;
                    _ctaConfigRepository.Add(ctaConfig);

                    #region Information Logging
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called", null, ctaConfig.nUpdatedBy);
                    #endregion

                    return Ok(ctaConfig);
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, ctaConfig.nUpdatedBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Edit Call
        [HttpPost("EditCTAConfig/ID={ID}")]
        [Route("[action]")]
        public IActionResult EditCTAConfig(string ID, [FromBody] CTAConfig ctaConfig)
        {
            #region Edit Chartel
            try
            {
                if (ModelState.IsValid)
                {

                    if (CTAConfigExists(ID))
                    {
                        DuplicateCheck<CTAConfig> check = new DuplicateCheck<CTAConfig>(ctaConfig, _info.sConnectionString);
                        string[] props = { "sKey" };
                        string message;
                        if (check.IsDuplicate(ctaConfig.Id, props, out message))
                        {
                            return Problem(message, null, 403);
                        }
                        CTAConfig fetchedCTAConfig = _ctaConfigRepository.GetConfigById(ID);
                        ctaConfig.dtUpdated = fetchedCTAConfig.dtUpdated;
                        _ctaConfigRepository.Update(ctaConfig);

                        #region Audit Log
                        CTALogger.LogAuditRecord(fetchedCTAConfig,ctaConfig,null,null,32,fetchedCTAConfig.Id,ctaConfig.nUpdatedBy);
                        #endregion

                        #region Alert Logging 
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", null, ctaConfig.nUpdatedBy);
                        #endregion

                        return Ok("CTAConfig with ID: " + ID + " updated Successfully");
                    }
                    else
                    {
                        return BadRequest("CTAConfig with ID:" + ID + " does not exist");
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, ctaConfig.nUpdatedBy);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Delete Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult DeleteCTAConfig(CTAConfig ctaConfig)
        {
            #region Delete CTA Config
            try
            {
                string ctaConfigID = ctaConfig.Id.ToString();
                if (!string.IsNullOrEmpty(ctaConfigID))
                {
                    if (CTAConfigExists(ctaConfigID))
                    {

                        CTAConfig fetchedCTAConfig = _ctaConfigRepository.GetConfigById(ctaConfigID);

                        _ctaConfigRepository.Delete(fetchedCTAConfig);

                        #region Alert Logging 
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", null, ctaConfig.nUpdatedBy);
                        #endregion

                        return Ok("CTAConfig with ID: " + ctaConfigID + " removed Successfully");
                    }
                    else
                    {
                        return BadRequest("CTAConfig with ID: " + ctaConfigID + " does not exist");
                    }
                }
                else
                {
                    return BadRequest("CTAConfig Id Cannot be NULL");
                }

            }
            catch (Exception ex)
            {
                #region Exception Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 4), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, ctaConfig.nUpdatedBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Check if Config CTA Exists
        private bool CTAConfigExists(string ID)
        {
            try
            {
                CTAConfig fetchedCTAConfig = _ctaConfigRepository.GetConfigById(ID);
                if (fetchedCTAConfig != null)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Exception in CTAConfig Exists Function, Exception Message: " + ex.Message);
            }
        }
        #endregion
    }
}

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
    
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    //[APIKeyAuth]
    [ApiController]
    public class RegionController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly RegionRepository _regionRepository;
        private readonly CTALogger _ctaLogger;
        public RegionController(DBConnectionInfo info)
        {
            _info = info;
            _regionRepository = new RegionRepository(_info.sConnectionString);
            _ctaLogger = new CTALogger(_info);
        }
        #endregion

        #region Get Calls
        [AuthorizeRole(FeatureID = 13)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetRegion()
        {
            #region Get All Region
            try
            {
               
                IEnumerable<Region> region = _regionRepository.GetAllRegion();
                #region Information Logging 
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion
                return Ok(region);
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message,ex.StackTrace);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        [AuthorizeRole(FeatureID = 21)]
        [HttpGet("GetRegion/ID={ID}")]
        [Route("[action]")]
        public IActionResult GetRegion(string ID)
        {
            #region Get Single UserRight
            try
            {
       
                Region fetchedRegion = _regionRepository.GetRegionById(ID);
                #region Information Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion
                return Ok(fetchedRegion);
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
        [AuthorizeRole(FeatureID = 21)]
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddRegion(Region region)
        {
            #region Add Region
            try
            {
                if (ModelState.IsValid)
                {
                    DuplicateCheck<Region> check = new DuplicateCheck<Region>(region, _info.sConnectionString);
                    string[] props = { "sRegion_code", "sRegion_name" };
                    string message;
                    if (check.IsDuplicate(region.Id, props, out message))
                    {
                        return Problem(message, null, 403);
                    }

                    region.dtEntered = DateTime.Now;
                    region.dtUpdated = DateTime.Now;

                    _regionRepository.Add(region);

                    #region Information Logging
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called", null, region.nEnteredBy);
                    #endregion
                    return Ok(region);
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message,ex.StackTrace, region.nEnteredBy);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Edit Call
        [AuthorizeRole(FeatureID = 21)]
        [HttpPost("EditRegion/ID={ID}")]
        [Route("[action]")]
        public IActionResult EditRegion(string ID, [FromBody] Region region)
        {
            #region Edit Region
            try
            {
                if (ModelState.IsValid)
                {
                   
                    if (RegionExists(ID))
                    {
                        DuplicateCheck<Region> check = new DuplicateCheck<Region>(region, _info.sConnectionString);
                        string[] props = { "sRegion_code", "sRegion_name" };
                        string message;
                        if (check.IsDuplicate(region.Id, props, out message))
                        {
                            return Problem(message, null, 403);
                        }

                        Region fetchedregion = _regionRepository.GetRegionById(ID);
                        region.dtEntered = fetchedregion.dtEntered;
                        region.nEnteredBy = fetchedregion.nEnteredBy;
                        region.dtUpdated = DateTime.Now;
                        _regionRepository.Update(region);

                        #region Audit Log
                        CTALogger.LogAuditRecord(fetchedregion, region, null, null, 21, fetchedregion.Id, region.nUpdatedBy);
                        #endregion

                        #region Alert Logging 
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", null, region.nUpdatedBy);
                        #endregion

                        return Ok("Region with ID: " + ID + " updated Successfully");
                    }
                    else
                    {
                        return BadRequest("Region with ID:" + ID + " does not exist");
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
        [AuthorizeRole(FeatureID = 21)]
        [HttpPost]
        [Route("[action]")]
        public IActionResult DeleteRegion(Region region)
        {
            #region Delete Region
            try
            {
                //TODO: check for correct way of sending string from body

                string regionId = region.Id.ToString();
                if (!string.IsNullOrEmpty(regionId))
                {
                    if (RegionExists(regionId))
                    {
                        
                        Region fetchedRegion = _regionRepository.GetRegionById(regionId);
                        _regionRepository.Delete(fetchedRegion);
                        return Ok("Region with ID: " + regionId + " removed Successfully");
                    }
                    else
                    {
                        return BadRequest("Region with ID: " + regionId + " does not exist");
                    }
                }
                else
                {
                    return BadRequest("Region Id Cannot be null");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Check if Region Exists
        private bool RegionExists(string ID)
        {
            try
            {
             
                Region fetchedRegion = _regionRepository.GetRegionById(ID);
                if (fetchedRegion != null)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Exception in Region Exists Function, Exception Message: " + ex.Message);
            }
        }
        #endregion

    }
}

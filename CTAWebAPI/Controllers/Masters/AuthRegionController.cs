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
    [AuthorizeRole(FeatureID = 22)]
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    //[APIKeyAuth]
    [ApiController]
    public class AuthRegionController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly AuthRegionRepository _authRegionRepository;
        public AuthRegionController(DBConnectionInfo info)
        {
            _info = info;
            _authRegionRepository = new AuthRegionRepository(_info.sConnectionString);
        }
        #endregion

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetAuthRegions()
        {
            #region Get All AuthRegions
            try
            {
                IEnumerable<AuthRegion> authRegions = _authRegionRepository.GetAllAuthRegions();
                if(authRegions.Count() > 0 )
                {
                    #region Information Logging 
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(authRegions);
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }
                
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

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetAuthRegionById(string Id)
        {
            try
            {
                AuthRegion authRegion = _authRegionRepository.GetAuthRegionById(Id);
                if (authRegion != null)
                {
                    #region Information Logging
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(authRegion);
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion 
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        
        #endregion
        
        #region Add Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddAuthRegion(AuthRegion authRegion)
        {
            #region Add AuthRegion
            try
            {
                if (ModelState.IsValid)
                {
                    /* If model state is valid, do we reach this condition ? */

                    //if (authRegion == null)
                    //{
                    //    return BadRequest("User object cannot be NULL");
                    //}
                    string message = "";
                    if (_authRegionRepository.isDuplicate(authRegion, new string[] { "sCountryID", "sAuthRegion" }, out message))
                    {
                        return Problem(message, null, 403);
                    }
                    authRegion.dtEntered = DateTime.Now;
                    authRegion.dtUpdated = DateTime.Now;

                    /* TO DO: Catch User ID and update the following properties
                     * nEnteredBy
                     * nUpdatedBy
                     */

                    int insert = _authRegionRepository.Add(authRegion);
                    if (insert > 0)
                    {
                        #region Information Logging 
                        CTALogger logger = new CTALogger(_info);
                        logger.LogRecord(((Operations)1).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", null, authRegion.nEnteredBy);
                        #endregion
                        return Ok(authRegion);
                    }


                    else
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError, "There was an error while inserting the record.");
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
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message,ex.StackTrace ,authRegion.nEnteredBy);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Edit Call
        [HttpPost("EditAuthRegion/RegionID={RegionID}")]
        [Route("[action]")]
        public IActionResult EditAuthRegion(string RegionID, [FromBody] AuthRegion regionToUpdate)
        {
            #region Edit AuthRegion
            try
            {
                AuthRegion region = _authRegionRepository.GetAuthRegionById(RegionID);
                if (region != null && regionToUpdate != null && RegionID == regionToUpdate.ID.ToString())
                {

                    if (ModelState.IsValid)
                    {
                        regionToUpdate.nEnteredBy = region.nEnteredBy;
                        regionToUpdate.dtEntered = region.dtEntered;
                        //to uncomment later
                        //regionToUpdate.nEnteredBy = // catch current user id here
                        regionToUpdate.dtUpdated = DateTime.Now;
                        int updated = _authRegionRepository.Update(regionToUpdate);
                        if (updated > 0)
                        {
                            #region Audit Log
                            CTALogger.LogAuditRecord(region, regionToUpdate, null, null, 22, region.ID, regionToUpdate.nUpdatedBy);
                            #endregion

                            #region Alert Logging
                            CTALogger logger = new CTALogger(_info);
                            logger.LogRecord(((Operations)3).ToString(), GetType().Name.Replace("Controller", ""), ((LogLevels)2).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", null, regionToUpdate.nUpdatedBy);
                            #endregion

                            return Ok(string.Format("Region with ID: {0} updated Successfully", RegionID));
                        }
                        else
                            return StatusCode(StatusCodes.Status500InternalServerError, "There was an error while updating the record.");
                    }
                    else
                    {
                        var errors = ModelState.Select(x => x.Value.Errors)
                               .Where(y => y.Count > 0)
                               .ToList();
                        return BadRequest(errors);
                    }
                }
                else
                {
                    return BadRequest("AuthRegion Update data invalid. Try again.");
                    //return BadRequest(String.Format("Region with ID: {0} does not exist", RegionID));
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(((Operations)3).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message,ex.StackTrace,regionToUpdate.nEnteredBy );
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Delete Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult DeleteAuthRegion(AuthRegion regionToDelete)
        {
            #region Delete AuthRegion
            try
            {
                AuthRegion region = _authRegionRepository.GetAuthRegionById(regionToDelete.ID.ToString());
                if(region != null && regionToDelete != null)
                {
                    if(region.sAuthRegion == regionToDelete.sAuthRegion && region.sCountryID == regionToDelete.sCountryID)
                    {
                        int deleted = _authRegionRepository.Delete(regionToDelete);// Delete method should return boolean for success.
                        if(deleted > 0)
                        {
                            #region Alert Logging 
                            CTALogger logger = new CTALogger(_info);
                            logger.LogRecord(((Operations)4).ToString(), GetType().Name.Replace("Controller", ""), ((LogLevels)2).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", null, regionToDelete.nEnteredBy);
                            #endregion
                            return Ok(string.Format("Region with ID: {0} deleted successfully", regionToDelete.ID));
                        }
                            
                        else
                            return StatusCode(StatusCodes.Status500InternalServerError, "There was an error while deleting the record.");
                    }
                    else
                    {
                        return BadRequest(string.Format("Region with ID: {0} does not exists", regionToDelete.ID));
                    }
                }
                else
                {
                    return BadRequest("Cannot delete 'null' region.");
                }

            }
            catch (Exception ex)
            {
                #region Exception Logging 
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(((Operations)4).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace,regionToDelete.nEnteredBy);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion
    }
}
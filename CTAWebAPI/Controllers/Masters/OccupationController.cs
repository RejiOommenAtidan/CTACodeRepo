﻿using CTADBL.BaseClasses.Masters;
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
using TimeZoneConverter;

namespace CTAWebAPI.Controllers.Masters
{
    [AuthorizeRole(FeatureID = 24)]
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    //[APIKeyAuth]
    [ApiController]
    public class OccupationController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly OccupationRepository _occupationRepository;
        public OccupationController(DBConnectionInfo info)
        {
            _info = info;
            _occupationRepository = new OccupationRepository(_info.sConnectionString);
        }
        #endregion

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetOccupations()
        {
            #region Get All Occupations
            try
            {
                IEnumerable<Occupation> occupation = _occupationRepository.GetAllOccupations();
                if (occupation.Count() > 0)
                {
                    #region Information Logging 
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(occupation);
                }
                else
                {
                    #region Exception Logging 
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name+", Occupation Count Less Than 0", "No Stacktrace");
                    #endregion
                    return StatusCode(StatusCodes.Status404NotFound);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetOccupationById(string Id)
        {
            try
            {
                Occupation occupation = _occupationRepository.GetOccupationById(Id);
                if (occupation != null)
                {
                    #region Information Logging
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(occupation);
                }
                else
                {
                    #region Exception Logging
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Occupation Not Found", "No Stacktrace");
                    #endregion
                    return StatusCode(StatusCodes.Status404NotFound);
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        #endregion

        #region Add Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddOccupation(Occupation occupation)
        {
            #region Add Occupation
            try
            {
                if (ModelState.IsValid)
                {
                    DuplicateCheck<Occupation> check = new DuplicateCheck<Occupation>(occupation, _info.sConnectionString);
                    string[] props = { "sOccupationDesc"};
                    string message;
                    if (check.IsDuplicate(occupation.Id, props, out message))
                    {
                        return Problem(message, null, 403);
                    }
                    occupation.dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                    occupation.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                    
                    /* TO DO: Catch User ID and update the following properties
                     * nEnteredBy
                     * nUpdatedBy
                     */

                    int inserted = _occupationRepository.Add(occupation);
                    if (inserted > 0)
                    {
                        #region Information Logging 
                        CTALogger logger = new CTALogger(_info);
                        logger.LogRecord(((Operations)1).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", null, occupation.nEnteredBy);
                        #endregion
                        return Ok(occupation);
                    }
                    
                    else
                        return StatusCode(StatusCodes.Status500InternalServerError, "There was an error while inserting the record.");
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
                logger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message,ex.StackTrace,occupation.nEnteredBy);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Edit Call
        [HttpPost("EditOccupation/occupationId={occupationId}")]
        [Route("[action]")]
        public IActionResult EditOccupation(string occupationId, [FromBody] Occupation occupationToUpdate)
        {
            #region Edit Occupation
            try
            {
                Occupation occupation = _occupationRepository.GetOccupationById(occupationId);
                if (occupation != null && occupationToUpdate != null && occupationId == occupationToUpdate.Id.ToString())
                {
                    if (ModelState.IsValid)
                    {
                        DuplicateCheck<Occupation> check = new DuplicateCheck<Occupation>(occupation, _info.sConnectionString);
                        string[] props = { "sOccupationDesc" };
                        string message;
                        if (check.IsDuplicate(occupation.Id, props, out message))
                        {
                            return Problem(message, null, 403);
                        }
                        occupationToUpdate.nEnteredBy = occupation.nEnteredBy;
                        occupationToUpdate.dtEntered = occupation.dtEntered;
                        occupationToUpdate.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                            

                        /*To Do:
                        ===> occupationToUpdate.nUpdatedBy =  //catch current user id here
                        */

                        int updated = _occupationRepository.Update(occupationToUpdate);
                        if (updated > 0)
                        {
                            #region Audit Log
                            CTALogger.LogAuditRecord(occupation, occupationToUpdate, null, null, 24, occupation.Id, occupationToUpdate.nUpdatedBy);
                            #endregion

                            #region Alert Logging
                            CTALogger logger = new CTALogger(_info);
                            logger.LogRecord(((Operations)3).ToString(), GetType().Name.Replace("Controller", ""), ((LogLevels)2).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", null, occupationToUpdate.nUpdatedBy);
                            #endregion

                            return Ok(string.Format("Occupation with ID: {0} updated Successfully", occupationId));
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
                    return BadRequest("Occupation Update data invalid. Try again.");
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(((Operations)3).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message,ex.StackTrace, occupationToUpdate.nEnteredBy);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Delete Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult DeleteOccupation(Occupation occupationToDelete)
        {
            #region Delete Occupation
            try
            {
                Occupation occupation = _occupationRepository.GetOccupationById(occupationToDelete.Id.ToString());
                if (occupationToDelete != null && occupation != null)
                {
                    if (occupation.sOccupationDesc == occupationToDelete.sOccupationDesc && occupation.sOccupationDescTibetan == occupationToDelete.sOccupationDescTibetan)
                    {
                        int deleted = _occupationRepository.Delete(occupationToDelete);
                        if (deleted > 0)
                        {
                            #region Alert Logging 
                            CTALogger logger = new CTALogger(_info);
                            logger.LogRecord(((Operations)4).ToString(), GetType().Name.Replace("Controller", ""), ((LogLevels)2).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", null, occupationToDelete.nEnteredBy);
                            #endregion
                            return Ok(String.Format("Occupation with ID: {0} deleted successfully", occupationToDelete.Id));
                        }
                        else
                            return StatusCode(StatusCodes.Status500InternalServerError, "There was an error while deleting the record.");
                    }
                    else
                    {
                        return BadRequest(String.Format("Occupation Delete request could not be carried out. Try again."));
                    }
                }
                else
                {
                    return BadRequest(String.Format("Occupation record with Id {0} not found.", occupationToDelete.Id));
                }

            }
            catch (Exception ex)
            {
                #region Exception Logging 
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(((Operations)4).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message,ex.StackTrace,occupationToDelete.nEnteredBy);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion
    }
}

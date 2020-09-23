﻿using CTADBL.BaseClasses.Masters;
using CTADBL.BaseClassRepositories.Masters;
using CTADBL.Entities;
using CTAWebAPI.Services;
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
    public class MadebTypeController : ControllerBase
    {
        private readonly DBConnectionInfo _info;
        private readonly MadebTypeRepository _madebTypeRepository;

        public MadebTypeController (DBConnectionInfo info)
        {
            _info = info;
            _madebTypeRepository = new MadebTypeRepository(_info.sConnectionString);
        }

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetMadebTypes()
        {
            #region Get All MadebTypes
            try
            {
                IEnumerable<MadebType> madebType = _madebTypeRepository.GetAllMadebTypes();

                if (madebType != null)
                {
                    #region Information Logging 
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", 1);
                    #endregion
                    return Ok(madebType);
                }
                else
                {
                    #region Exception Logging 
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name, 1);
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
        public IActionResult GetMadebTypeById(string Id)
        {
            try
            {
                MadebType madebType = _madebTypeRepository.GetMadebTypeById(Id);
                if(madebType != null)
                {
                    #region Information Logging
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", 1);
                    #endregion
                    return Ok(madebType);
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
                logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name, 1);
                #endregion 
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        #endregion

        #region Add Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddMadebType(MadebType madebType)
        {
            #region Add MadebType
            try
            {
                if (ModelState.IsValid)
                {
                    madebType.dtEntered = DateTime.Now;
                    madebType.dtUpdated = DateTime.Now;

                    /* TO DO: Catch User ID and update the following properties
                     * nEnteredBy
                     * nUpdatedBy
                     */

                    int inserted = _madebTypeRepository.Add(madebType);
                    if(inserted > 0)
                    {
                        #region Information Logging 
                        CTALogger logger = new CTALogger(_info);
                        logger.LogRecord(((Operations)1).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", 1);
                        #endregion
                        return Ok(madebType);
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
                logger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name, 1);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Edit Call
        [HttpPost("EditMadebType/madebTypeID={madebTypeID}")]
        [Route("[action]")]
        public IActionResult EditMadebType(string madebTypeID, [FromBody] MadebType madebTypeToUpdate)
        {
            #region Edit MadebType
            try
            {
                MadebType madebType = _madebTypeRepository.GetMadebTypeById(madebTypeID);
                if (madebType != null && madebTypeToUpdate != null && madebTypeID == madebTypeToUpdate.Id.ToString())
                {

                    if (ModelState.IsValid)
                    {
                        madebTypeToUpdate.dtEntered = madebType.dtEntered;
                        madebTypeToUpdate.dtUpdated = DateTime.Now;
                        
                        /*To Do:
                        ===> countryToUpdate.nUpdatedBy =  //catch current user id here
                        */
                        
                        int updated = _madebTypeRepository.Update(madebTypeToUpdate);
                        if (updated > 0)
                        {
                            #region Alert Logging
                            CTALogger logger = new CTALogger(_info);
                            logger.LogRecord(((Operations)3).ToString(), GetType().Name.Replace("Controller", ""), ((LogLevels)2).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", 1);
                            #endregion

                            return Ok(String.Format("Madeb Type with ID: {0} updated Successfully", madebTypeID));
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
                    return BadRequest("Madeb Type Update data invalid. Try again.");
                   
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(((Operations)3).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name, 1);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Delete Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult DeleteMadebType(MadebType madebTypeToDelete)
        {
            #region Delete MadebType
            try
            {
                MadebType madebType = _madebTypeRepository.GetMadebTypeById(madebTypeToDelete.Id.ToString());
                if (madebTypeToDelete != null && madebType != null)
                {
                    if (madebType.sMadebType == madebTypeToDelete.sMadebType)
                    {
                        int deleted = _madebTypeRepository.Delete(madebTypeToDelete);
                        if (deleted > 0)
                        {
                            #region Alert Logging 
                            CTALogger logger = new CTALogger(_info);
                            logger.LogRecord(((Operations)4).ToString(), GetType().Name.Replace("Controller", ""), ((LogLevels)2).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", 1);
                            #endregion
                            return Ok(String.Format("Madeb Type with ID: {0} deleted successfully", madebTypeToDelete.Id));
                        }
                        else
                            return StatusCode(StatusCodes.Status500InternalServerError, "There was an error while deleting the record.");
                    }
                    else
                    {
                        return BadRequest(String.Format("Madeb Type with Id: {0} does not contain Madeb type {1}", madebTypeToDelete.Id, madebTypeToDelete.sMadebType));
                    }
                }
                else
                {
                    return BadRequest(String.Format("Madeb Type record with Id {0} not found.", madebTypeToDelete.Id));
                }

            }
            catch (Exception ex)
            {
                #region Exception Logging 
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(((Operations)4).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name, 1);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion
    }
}
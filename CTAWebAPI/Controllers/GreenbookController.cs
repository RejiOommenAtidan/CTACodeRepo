﻿using CTADBL.BaseClasses;
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
    [Route("api/[controller]")]
    //[APIKeyAuth]
    [ApiController]
    public class GreenbookController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly GreenbookRepository _greenbookRepository;
        public GreenbookController(DBConnectionInfo info)
        {
            _info = info;
            _greenbookRepository = new GreenbookRepository(_info.sConnectionString);
        }
        #endregion

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetGreenbooks()
        {
            #region Get All Greenbooks
            try
            {
                IEnumerable<Greenbook> greenbooks = _greenbookRepository.GetAllGreenBooks();

                #region Information Logging 
                string sActionType = Enum.GetName(typeof(Operations), 2);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 1);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = currentMethodName + " Method Called";
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription);
                #endregion

                return Ok(greenbooks);
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

        [HttpGet("GetGreenbook/Id={Id}")]
        [Route("[action]")]
        public IActionResult GetGreenbook(string Id)
        {
            #region Get Greenbook
            try
            {
                Greenbook fetchedGreenbook = _greenbookRepository.GetGreenboookById(Id);

                #region Information Logging 
                string sActionType = Enum.GetName(typeof(Operations), 2);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 1);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = currentMethodName + " Method Called";
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription);
                #endregion

                return Ok(fetchedGreenbook);
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
        public IActionResult AddGreenbook(Greenbook greenbook)
        {
            #region Add Greenbook
            try
            {
                if (ModelState.IsValid)
                {
                    greenbook.dtEntered = DateTime.Now;
                    greenbook.dtUpdated = DateTime.Now;
                    _greenbookRepository.Add(greenbook);

                    #region Information Logging 
                    string sActionType = Enum.GetName(typeof(Operations), 1);
                    string sModuleName = (GetType().Name).Replace("Controller", "");
                    string sEventName = Enum.GetName(typeof(LogLevels), 1);
                    string currentMethodName = MethodBase.GetCurrentMethod().Name;
                    string sDescription = currentMethodName + " Method Called";
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, greenbook.nEnteredBy);
                    #endregion

                    return Ok(greenbook);
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
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, greenbook.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Edit Call
        [HttpPost("EditGreenbook/Id={Id}")]
        [Route("[action]")]
        public IActionResult EditGreenbook(string Id, [FromBody] Greenbook greenbook)
        {
            #region Edit Greenbook
            try
            {
                if (ModelState.IsValid)
                {
                    if (Id == null)
                    {
                        return BadRequest("Greenbook Param ID cannot be NULL");
                    }

                    if (Id != greenbook.Id.ToString())
                    {
                        return BadRequest("Green book ID's ain't Matching");
                    }
                    if (GreenbookExists(Id))
                    {
                        Greenbook fetchedGreenbook = _greenbookRepository.GetGreenboookById(Id);
                        greenbook.dtEntered = fetchedGreenbook.dtEntered;
                        greenbook.dtUpdated = DateTime.Now;
                        _greenbookRepository.Update(greenbook);

                        #region Alert Logging 
                        string sActionType = Enum.GetName(typeof(Operations), 3);
                        string sModuleName = (GetType().Name).Replace("Controller", "");
                        string sEventName = Enum.GetName(typeof(LogLevels), 2);
                        string currentMethodName = MethodBase.GetCurrentMethod().Name;
                        string sDescription = currentMethodName + " Method Called";
                        CTALogger logger = new CTALogger(_info);
                        logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, greenbook.nEnteredBy);
                        #endregion

                        return Ok("Greenbook with ID: " + Id + " updated Successfully");
                    }
                    else
                    {
                        return BadRequest("Greenbook with ID:" + Id + " does not exist");
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
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, greenbook.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Delete Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult DeleteGreenbook(Greenbook greenbook)
        {
            #region Delete Greenbook
            try
            {
                string greenbookID = greenbook.Id.ToString();
                if (!string.IsNullOrEmpty(greenbookID))
                {
                    if (GreenbookExists(greenbookID))
                    {
                        Greenbook fetchedGreenbook = _greenbookRepository.GetGreenboookById(greenbookID);
                        _greenbookRepository.Delete(fetchedGreenbook);

                        #region Alert Logging 
                        string sActionType = Enum.GetName(typeof(Operations), 4);
                        string sModuleName = (GetType().Name).Replace("Controller", "");
                        string sEventName = Enum.GetName(typeof(LogLevels), 2);
                        string currentMethodName = MethodBase.GetCurrentMethod().Name;
                        string sDescription = currentMethodName + " Method Called";
                        CTALogger logger = new CTALogger(_info);
                        logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, greenbook.nEnteredBy);
                        #endregion

                        return Ok("Greenbook with ID: " + greenbookID + " removed Successfully");
                    }
                    else
                    {
                        return BadRequest("Greenbook with ID: " + greenbookID + " does not exist");
                    }
                }
                else
                {
                    return BadRequest("Greenbook Id Cannot be null");
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
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, greenbook.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Check if Greenbook Exists
        private bool GreenbookExists(string Id)
        {
            try
            {
                Greenbook fetchedGreenbook = _greenbookRepository.GetGreenboookById(Id);
                if (fetchedGreenbook != null)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Exception in Greenbook Exists Function, Exception Message: " + ex.Message);
            }
        }
        #endregion
    }
}

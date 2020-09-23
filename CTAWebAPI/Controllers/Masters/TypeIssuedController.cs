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
    public class TypeIssuedController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly TypeIssuedRepository _typedIssuedRepository;
        private readonly CTALogger _ctaLogger;
        public TypeIssuedController(DBConnectionInfo info)
        {
            _info = info;
            _typedIssuedRepository = new TypeIssuedRepository(_info.sConnectionString);
            _ctaLogger = new CTALogger(_info);
        }
        #endregion

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetTypeIssued()
        {
            #region Get All TypeIssued
            try
            {
               
                IEnumerable<TypeIssued> typeissued = _typedIssuedRepository.GetAllTypeIssued();
                #region Information Logging 
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", 1);
                #endregion
                return Ok(typeissued);
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name, 1);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        [HttpGet("GetTypeIssued/ID={ID}")]
        [Route("[action]")]
        public IActionResult GetTypeIssued(string ID)
        {
            #region Get Single TypeIssued
            try
            {
              
                TypeIssued fetchedtypeissued = _typedIssuedRepository.GetTypeIssuedById(ID);
                #region Information Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion
                return Ok(fetchedtypeissued);
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
        //TODO: Tell
        //[AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddTypeIssued(TypeIssued typeissued)
        {
            #region Add TypeIssued
            try
            {
                if (ModelState.IsValid)
                {
                    typeissued.dtEntered = DateTime.Now;
                    typeissued.dtUpdated = DateTime.Now;

                    _typedIssuedRepository.Add(typeissued);

                    #region Information Logging
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called", typeissued.nEnteredBy);
                    #endregion
                    return Ok(typeissued);
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name, typeissued.nEnteredBy);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Edit Call
        [HttpPost("EditTypeIssued/ID={ID}")]
        [Route("[action]")]
        public IActionResult EditTypeIssued(string ID, [FromBody] TypeIssued typeissued)
        {
            #region Edit TypeIssued
            try
            {
                if (ModelState.IsValid)
                {
                    
                    if (TypeIssuedExists(ID))
                    {

                        TypeIssued fetchedtypeissued = _typedIssuedRepository.GetTypeIssuedById(ID);
                        typeissued.dtEntered = fetchedtypeissued.dtEntered;
                        typeissued.dtUpdated = DateTime.Now;
                        //user.User_Id
                        _typedIssuedRepository.Update(typeissued);
                        return Ok("TypeIssued with ID: " + ID + " updated Successfully");
                    }
                    else
                    {
                        return BadRequest("TypeIssued with ID:" + ID + " does not exist");
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
        [HttpPost]
        [Route("[action]")]
        public IActionResult DeleteTypeIssued(TypeIssued typeissued)
        {
            #region Delete TypeIssued
            try
            {
                //TODO: check for correct way of sending string from body
                string typeIssuedId = typeissued.Id.ToString();
                if (!string.IsNullOrEmpty(typeIssuedId))
                {
                    if (TypeIssuedExists(typeIssuedId))
                    {
                        
                        TypeIssued fetchedTypeIssued = _typedIssuedRepository.GetTypeIssuedById(typeIssuedId);
                        _typedIssuedRepository.Delete(fetchedTypeIssued);
                        return Ok("TypeIssued with ID: " + typeIssuedId + " removed Successfully");
                    }
                    else
                    {
                        return BadRequest("TypeIssued with ID: " + typeIssuedId + " does not exist");
                    }
                }
                else
                {
                    return BadRequest("TypeIssued Id Cannot be null");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Check if TypeIssued Exists
        private bool TypeIssuedExists(string ID)
        {
            try
            {
               
                TypeIssued fetchedTypeIssued = _typedIssuedRepository.GetTypeIssuedById(ID);
                if (fetchedTypeIssued != null)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Exception in TypeIssued Exists Function, Exception Message: " + ex.Message);
            }
        }
        #endregion
    }
}
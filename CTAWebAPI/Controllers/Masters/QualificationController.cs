using CTADBL.BaseClasses.Masters;
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
    public class QualificationController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly QualificationRepository _qualificationRepository;
        private readonly CTALogger _ctaLogger;
        public QualificationController(DBConnectionInfo info)
        {
            _info = info;
             _qualificationRepository = new QualificationRepository(_info.sConnectionString);
            _ctaLogger = new CTALogger(_info);
        }
        #endregion

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetQualification()
        {
            #region Get All Qualification
            try
            {
                
                IEnumerable<Qualification> qualification = _qualificationRepository.GetAllQualification();
                #region Information Logging 
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", 1);
                #endregion
                return Ok(qualification);
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

        [HttpGet("GetQualification/ID={ID}")]
        [Route("[action]")]
        public IActionResult GetQualification(string ID)
        {
            #region Get Single Qualification
            try
            {
               
                Qualification fetchedQualification = _qualificationRepository.GetQualificationById(ID);
                #region Information Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion
                return Ok(fetchedQualification);
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
        public IActionResult AddQualification(Qualification qualification)
        {
            #region Add Qualification
            try
            {
                if (ModelState.IsValid)
                {
                    qualification.dtEntered = DateTime.Now;
                    qualification.dtUpdated = DateTime.Now;

                    _qualificationRepository.Add(qualification);
                    #region Information Logging
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called", qualification.nEnteredBy);
                    #endregion
                    return Ok(qualification);
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name, qualification.nEnteredBy);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Edit Call
        [HttpPost("EditQualification/ID={ID}")]
        [Route("[action]")]
        public IActionResult EditQualification(string ID, [FromBody] Qualification qualification)
        {
            #region Edit Qualification
            try
            {
                if (ModelState.IsValid)
                {
                    
                    if (QualificationExists(ID))
                    {
                        Qualification fetchedqualification = _qualificationRepository.GetQualificationById(ID);
                        qualification.dtEntered = fetchedqualification.dtEntered;
                        qualification.dtUpdated = DateTime.Now;
                        //user.User_Id
                        _qualificationRepository.Update(qualification);
                        return Ok("Qualification with ID: " + ID + " updated Successfully");
                    }
                    else
                    {
                        return BadRequest("Qualification with ID:" + ID + " does not exist");
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
        public IActionResult DeleteQualification(Qualification qualification)
        {
            #region Delete Qualification
            try
            {
                //TODO: check for correct way of sending string from body
                string qualificationId = qualification.Id.ToString();

                if (!string.IsNullOrEmpty(qualificationId))
                {
                    if (QualificationExists(qualificationId))
                    {
                       
                        Qualification fetchedQualification = _qualificationRepository.GetQualificationById(qualificationId);
                        _qualificationRepository.Delete(fetchedQualification);
                        return Ok("Qualification with ID: " + qualificationId + " removed Successfully");
                    }
                    else
                    {
                        return BadRequest("Qualification with ID: " + qualificationId + " does not exist");
                    }
                }
                else
                {
                    return BadRequest("Qualification Id Cannot be null");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Check if Qualification Exists
        private bool QualificationExists(string ID)
        {
            try
            {
               
                Qualification fetchedQualification = _qualificationRepository.GetQualificationById(ID);
                if (fetchedQualification != null)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Exception in Qualification Exists Function, Exception Message: " + ex.Message);
            }
        }
        #endregion

    }
}

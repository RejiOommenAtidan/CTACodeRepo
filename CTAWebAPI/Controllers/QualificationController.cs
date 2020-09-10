using CTADBL.BaseClasses;

using CTADBL.BaseClassRepositories;
using CTADBL.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace CTAWebAPI.Controllers
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
        public QualificationController(DBConnectionInfo info)
        {
            _info = info;
             _qualificationRepository = new QualificationRepository(_info.sConnectionString);
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
                QualificationRepository qualificationRepo = new QualificationRepository(_info.sConnectionString);
                IEnumerable<Qualification> qualification = qualificationRepo.GetAllQualification();
                return Ok(qualification);
            }
            catch (Exception ex)
            {
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
                QualificationRepository qualificationRepo = new QualificationRepository(_info.sConnectionString);
                Qualification fetchedQualification = qualificationRepo.GetQualificationById(ID);
                return Ok(fetchedQualification);
            }
            catch (Exception ex)
            {
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
                    if (qualification == null)
                    {
                        return BadRequest("Qualification object cannot be NULL");
                    }

                    _qualificationRepository.Add(qualification);
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
                    if (qualification == null)
                    {
                        return BadRequest("Qualification object cannot be NULL");
                    }
                    if (QualificationExists(ID))
                    {

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
        public IActionResult DeleteQualification(object body)
        {
            #region Delete Qualification
            try
            {
                //TODO: check for correct way of sending string from body
                string ID = JsonSerializer.Serialize(body);

                if (!string.IsNullOrEmpty(ID))
                {
                    if (QualificationExists(ID))
                    {
                       
                        Qualification fetchedQualification = _qualificationRepository.GetQualificationById(ID);
                        _qualificationRepository.Delete(fetchedQualification);
                        return Ok("Qualification with ID: " + ID + " removed Successfully");
                    }
                    else
                    {
                        return BadRequest("Qualification with ID: " + ID + " does not exist");
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

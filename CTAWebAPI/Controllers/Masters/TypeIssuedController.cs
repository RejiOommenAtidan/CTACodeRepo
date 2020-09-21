using CTADBL.BaseClasses.Masters;
using CTADBL.BaseClassRepositories.Masters;
using CTADBL.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

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
        public TypeIssuedController(DBConnectionInfo info)
        {
            _info = info;
            _typedIssuedRepository = new TypeIssuedRepository(_info.sConnectionString);
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
                return Ok(typeissued);
            }
            catch (Exception ex)
            {
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
                return Ok(fetchedtypeissued);
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

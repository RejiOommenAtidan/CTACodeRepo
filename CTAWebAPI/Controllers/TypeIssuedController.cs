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
    public class TypeIssuedController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        public TypeIssuedController(DBConnectionInfo info)
        {
            _info = info;
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
                TypeIssuedRepository typeIssuedRepo = new TypeIssuedRepository(_info.ConnectionString);
                IEnumerable<TypeIssued> typeissued = typeIssuedRepo.GetAllTypeIssued();
                return Ok(typeissued);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        [HttpGet("GetTypeIssued/TypeIssuedID={ID}")]
        [Route("[action]")]
        public IActionResult GetTypeIssued(string ID)
        {
            #region Get Single TypeIssued
            try
            {
                TypeIssuedRepository typeIssuedRepo = new TypeIssuedRepository(_info.ConnectionString);
                TypeIssued fetchedtypeissued = typeIssuedRepo.GetTypeIssuedById(ID);
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
                    if (typeissued == null)
                    {
                        return BadRequest("TypeIssued object cannot be NULL");
                    }
                    TypeIssuedRepository typeIssuedRepo = new TypeIssuedRepository(_info.ConnectionString);
                    typeIssuedRepo.Add(typeissued);
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
                    if (typeissued == null)
                    {
                        return BadRequest("TypeIssued object cannot be NULL");
                    }
                    if (TypeIssuedExists(ID))
                    {
                        TypeIssuedRepository typeIssuedRepository = new TypeIssuedRepository(_info.ConnectionString);
                        //user.User_Id
                        typeIssuedRepository.Update(typeissued);
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
        public IActionResult DeleteTypeIssued(object body)
        {
            #region Delete TypeIssued
            try
            {
                //TODO: check for correct way of sending string from body
                string ID = JsonSerializer.Serialize(body);

                if (!string.IsNullOrEmpty(ID))
                {
                    if (TypeIssuedExists(ID))
                    {
                        TypeIssuedRepository typeIssuedRepository = new TypeIssuedRepository(_info.ConnectionString);
                        TypeIssued fetchedTypeIssued = typeIssuedRepository.GetTypeIssuedById(ID);
                        typeIssuedRepository.Delete(fetchedTypeIssued);
                        return Ok("TypeIssued with ID: " + ID + " removed Successfully");
                    }
                    else
                    {
                        return BadRequest("TypeIssued with ID: " + ID + " does not exist");
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
                TypeIssuedRepository typeIssuedRepository = new TypeIssuedRepository(_info.ConnectionString);
                TypeIssued fetchedTypeIssued = typeIssuedRepository.GetTypeIssuedById(ID);
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

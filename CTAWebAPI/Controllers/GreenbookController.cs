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
                return Ok(greenbooks);
            }
            catch (Exception ex)
            {
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
                return Ok(fetchedGreenbook);
            }
            catch (Exception ex)
            {
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
                    if (greenbook == null)
                    {
                        return BadRequest("Greenbook object cannot be NULL");
                    }
                    _greenbookRepository.Add(greenbook);
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
                    if (greenbook == null)
                    {
                        return BadRequest("Greenbook object cannot be NULL");
                    }
                    if (Id != greenbook.Id.ToString())
                    {
                        return BadRequest("ID's ain't Matching");
                    }
                    if (GreenbookExists(Id))
                    {
                        _greenbookRepository.Update(greenbook);
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
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Delete Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult DeleteGreenbook(object body)
        {
            #region Delete Greenbook
            try
            {
                //TODO: check for correct way of sending string from body
                string Id = JsonSerializer.Serialize(body);

                if (!string.IsNullOrEmpty(Id))
                {
                    if (GreenbookExists(Id))
                    {
                        Greenbook greenbook = _greenbookRepository.GetGreenboookById(Id);
                        _greenbookRepository.Delete(greenbook);
                        return Ok("Greenbook with ID: " + Id + " removed Successfully");
                    }
                    else
                    {
                        return BadRequest("Greenbook with ID: " + Id + " does not exist");
                    }
                }
                else
                {
                    return BadRequest("Greenbook Id Cannot be null");
                }

            }
            catch (Exception ex)
            {
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

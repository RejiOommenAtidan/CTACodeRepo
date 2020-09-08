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
    public class MadebController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        public MadebController(DBConnectionInfo info)
        {
            _info = info;
        }
        #endregion

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetMadebs()
        {
            #region Get All Madebs
            try
            {
                MadebRepository madebRepository = new MadebRepository(_info.sConnectionString);
                IEnumerable<Madeb> madebs = madebRepository.GetAllMadebs();
                return Ok(madebs);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        [HttpGet("GetMadeb/Id={Id}")]
        [Route("[action]")]
        public IActionResult GetMadeb(string Id)
        {
            #region Get Madeb
            try
            {
                MadebRepository madebRepository = new MadebRepository(_info.sConnectionString);
                Madeb madeb = madebRepository.GetMadebById(Id);
                return Ok(madeb);
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
        public IActionResult AddMadeb(Madeb madeb)
        {
            #region Add Madeb
            try
            {
                if (ModelState.IsValid)
                {
                    if (madeb == null)
                    {
                        return BadRequest("Madeb object cannot be NULL");
                    }

                    MadebRepository madebRepository = new MadebRepository(_info.sConnectionString);
                    madebRepository.Add(madeb);
                    return Ok(madeb);
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
        [HttpPost("EditMadeb/Id={Id}")]
        [Route("[action]")]
        public IActionResult EditMadeb(string Id, [FromBody] Madeb madeb)
        {
            #region Edit Madeb
            try
            {
                if (ModelState.IsValid)
                {
                    if (Id == null)
                    {
                        return BadRequest("Madeb Param ID cannot be NULL");
                    }
                    if (madeb == null)
                    {
                        return BadRequest("Madeb object cannot be NULL");
                    }
                    if (Id != madeb.Id.ToString())
                    {
                        return BadRequest("ID's ain't Matching");
                    }
                    if (MadebExists(Id))
                    {
                        MadebRepository madebRepository = new MadebRepository(_info.sConnectionString);
                        madebRepository.Update(madeb);
                        return Ok("Madeb with ID: " + Id + " updated Successfully");
                    }
                    else
                    {
                        return BadRequest("Madeb with ID:" + Id + " does not exist");
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
        public IActionResult DeleteMadeb(object body)
        {
            #region Delete User
            try
            {
                //TODO: check for correct way of sending string from body
                string Id = JsonSerializer.Serialize(body);

                if (!string.IsNullOrEmpty(Id))
                {
                    if (MadebExists(Id))
                    {
                        MadebRepository madebRepository = new MadebRepository(_info.sConnectionString);
                        Madeb fetchedMadeb = madebRepository.GetMadebById(Id);
                        madebRepository.Delete(fetchedMadeb);
                        return Ok("Madeb with ID: " + Id + " removed Successfully");
                    }
                    else
                    {
                        return BadRequest("Madeb with ID: " + Id + " does not exist");
                    }
                }
                else
                {
                    return BadRequest("Madeb Id Cannot be null");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Check if Madeb Exists
        private bool MadebExists(string Id)
        {
            try
            {
                MadebRepository madebRepository = new MadebRepository(_info.sConnectionString);
                Madeb fetchedMadeb = madebRepository.GetMadebById(Id);
                if (fetchedMadeb != null)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Exception in Madeb Exists Function, Exception Message: " + ex.Message);
            }
        }
        #endregion
    }
}

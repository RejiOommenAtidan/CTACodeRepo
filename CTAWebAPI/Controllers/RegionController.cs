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
    public class RegionController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly RegionRepository _regionRepository;
        public RegionController(DBConnectionInfo info)
        {
            _info = info;
            _regionRepository = new RegionRepository(_info.sConnectionString);
        }
        #endregion

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetRegion()
        {
            #region Get All Region
            try
            {
               
                IEnumerable<Region> region = _regionRepository.GetAllRegion();
                return Ok(region);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        [HttpGet("GetRegion/ID={ID}")]
        [Route("[action]")]
        public IActionResult GetRegion(string ID)
        {
            #region Get Single UserRight
            try
            {
       
                Region fetchedRegion = _regionRepository.GetRegionById(ID);
                return Ok(fetchedRegion);
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
        public IActionResult AddRegion(Region region)
        {
            #region Add Region
            try
            {
                if (ModelState.IsValid)
                {
                    if (region == null)
                    {
                        return BadRequest("Region object cannot be NULL");
                    }

                    _regionRepository.Add(region);
                    return Ok(region);
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
        [HttpPost("EditRegion/ID={ID}")]
        [Route("[action]")]
        public IActionResult EditRegion(string ID, [FromBody] Region region)
        {
            #region Edit Region
            try
            {
                if (ModelState.IsValid)
                {
                    if (region == null)
                    {
                        return BadRequest("Region object cannot be NULL");
                    }
                    if (RegionExists(ID))
                    {

                        //user.User_Id
                        _regionRepository.Update(region);
                        return Ok("Region with ID: " + ID + " updated Successfully");
                    }
                    else
                    {
                        return BadRequest("Region with ID:" + ID + " does not exist");
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
        public IActionResult DeleteRegion(object body)
        {
            #region Delete Region
            try
            {
                //TODO: check for correct way of sending string from body
                string ID = JsonSerializer.Serialize(body);

                if (!string.IsNullOrEmpty(ID))
                {
                    if (RegionExists(ID))
                    {
                        
                        Region fetchedRegion = _regionRepository.GetRegionById(ID);
                        _regionRepository.Delete(fetchedRegion);
                        return Ok("Region with ID: " + ID + " removed Successfully");
                    }
                    else
                    {
                        return BadRequest("Region with ID: " + ID + " does not exist");
                    }
                }
                else
                {
                    return BadRequest("Region Id Cannot be null");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Check if Region Exists
        private bool RegionExists(string ID)
        {
            try
            {
             
                Region fetchedRegion = _regionRepository.GetRegionById(ID);
                if (fetchedRegion != null)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Exception in Region Exists Function, Exception Message: " + ex.Message);
            }
        }
        #endregion

    }
}

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
    public class AuthRegionController : ControllerBase
    {
        private readonly DBConnectionInfo _info;
        private readonly AuthRegionRepository authRegionRepository;

        #region Constructor

        public AuthRegionController(DBConnectionInfo info)
        {
            _info = info;
            authRegionRepository = new AuthRegionRepository(_info.sConnectionString);
        }
        #endregion

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetAuthRegions()
        {
            #region Get All AuthRegions
            try
            {
                IEnumerable<AuthRegion> authRegions = authRegionRepository.GetAllAuthRegions();
                return Ok(authRegions);
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
        public IActionResult AddAuthRegion(AuthRegion authRegion)
        {
            #region Add User
            try
            {
                if (ModelState.IsValid)
                {
                    /* If model state is valid, do we reach this condition ? */

                    //if (authRegion == null)
                    //{
                    //    return BadRequest("User object cannot be NULL");
                    //}

                    authRegionRepository.Add(authRegion);
                    return Ok(authRegion);
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
        [HttpPost("EditAuthRegion/RegionID={RegionID}")]
        [Route("[action]")]
        public IActionResult EditAuthRegion(string RegionID, [FromBody] AuthRegion regionToUpdate)
        {
            #region Edit User
            try
            {
                if (ModelState.IsValid)
                {
                    if (regionToUpdate == null)
                    {
                        return BadRequest("AuthRegion object cannot be NULL");
                    }

                    if (RegionID != regionToUpdate.ID.ToString())
                    {
                        return BadRequest("AuthRegion ID does not match");
                    }

                    AuthRegion region = authRegionRepository.GetAuthRegionById(RegionID);
                    if(region != null) // Checks if region exists with this ID.
                    {
                        authRegionRepository.Update(regionToUpdate);
                        return Ok(String.Format("Region with ID: {0} updated Successfully", RegionID));
                    }
                    else
                    {
                        return BadRequest(String.Format("Region with ID: {0} does not exist", RegionID));
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
        public IActionResult DeleteAuthRegion(AuthRegion regionToDelete)
        {
            #region Delete AuthRegion
            try
            {
                AuthRegion region = authRegionRepository.GetAuthRegionById(regionToDelete.ID.ToString());
                if(region != null)
                {
                    if(region.sAuthRegion == regionToDelete.sAuthRegion && region.sCountryID == regionToDelete.sCountryID)
                    {
                        authRegionRepository.Delete(regionToDelete);// Delete method should return boolean for success.
                        return Ok(string.Format("Region with ID: {0} deleted successfully", regionToDelete.ID));
                    }
                    else
                    {
                        return BadRequest(string.Format("Region with ID: {0} does not exists", regionToDelete.ID));
                    }
                }
                else
                {
                    return BadRequest("Cannot delete 'null' region.");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion
    }
}
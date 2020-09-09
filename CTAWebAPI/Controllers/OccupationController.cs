using CTADBL.BaseClasses;
using CTADBL.BaseClassRepositories;
using CTADBL.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CTAWebAPI.Controllers
{
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    //[APIKeyAuth]
    [ApiController]
    public class OccupationController : ControllerBase
    {
        private readonly DBConnectionInfo _info;
        private readonly OccupationRepository _occupationRepository;
        public OccupationController(DBConnectionInfo info)
        {
            _info = info;
            _occupationRepository = new OccupationRepository(_info.sConnectionString);
        }

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetOccupations()
        {
            #region Get All Occupations
            try
            {
                IEnumerable<Occupation> occupation = _occupationRepository.GetAllOccupations();
                if (occupation != null)
                {
                    return Ok(occupation);
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetOccupationById(string Id)
        {
            try
            {
                Occupation occupation = _occupationRepository.GetOccupationById(Id);
                if (occupation != null)
                {
                    return Ok(occupation);
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        #endregion

        #region Add Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddOccupation(Occupation occupation)
        {
            #region Add Occupation
            try
            {
                if (ModelState.IsValid)
                {
                    _occupationRepository.Add(occupation);
                    return Ok(occupation);
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
        [HttpPost("EditOccupation/occupationId={occupationId}")]
        [Route("[action]")]
        public IActionResult EditOccupation(string occupationId, [FromBody] Occupation occupationToUpdate)
        {
            #region Edit Occupation
            try
            {
                Occupation occupation = _occupationRepository.GetOccupationById(occupationId);
                if (occupation != null && occupationToUpdate != null && occupationId == occupationToUpdate.Id.ToString())
                {
                    if (ModelState.IsValid)
                    {
                        _occupationRepository.Update(occupationToUpdate);
                        return Ok(String.Format("Occupation with ID: {0} updated Successfully", occupationId));
                    }
                    else
                    {
                        var errors = ModelState.Select(x => x.Value.Errors)
                               .Where(y => y.Count > 0)
                               .ToList();
                        return BadRequest(errors);
                    }
                }
                else
                {
                    return BadRequest("Occupation Update data invalid. Try again.");
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
        public IActionResult DeleteOccupation(Occupation occupationToDelete)
        {
            #region Delete Occupation
            try
            {
                Occupation occupation = _occupationRepository.GetOccupationById(occupationToDelete.Id.ToString());
                if (occupationToDelete != null && occupation != null)
                {
                    if (occupation.sOccupationDesc == occupationToDelete.sOccupationDesc && occupation.sOccupationDescTibetan == occupationToDelete.sOccupationDescTibetan)
                    {
                        _occupationRepository.Delete(occupationToDelete);// Delete method should return boolean for success.
                        return Ok(String.Format("Occupation with ID: {0} deleted successfully", occupationToDelete.Id));
                    }
                    else
                    {
                        return BadRequest(String.Format("Occupation Delete request could not be carried out. Try again."));
                    }
                }
                else
                {
                    return BadRequest(String.Format("Occupation record with Id {0} not found.", occupationToDelete.Id));
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

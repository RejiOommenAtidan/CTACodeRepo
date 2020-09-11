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
    public class MadebTypeController : ControllerBase
    {
        private readonly DBConnectionInfo _info;
        private readonly MadebTypeRepository _madebTypeRepository;

        public MadebTypeController (DBConnectionInfo info)
        {
            _info = info;
            _madebTypeRepository = new MadebTypeRepository(_info.sConnectionString);
        }

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetMadebTypes()
        {
            #region Get All MadebTypes
            try
            {
                IEnumerable<MadebType> madebType = _madebTypeRepository.GetAllMadebTypes();

                if (madebType != null)
                {
                    return Ok(madebType);
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
        public IActionResult GetMadebTypeById(string Id)
        {
            try
            {
                MadebType madebType = _madebTypeRepository.GetMadebTypeById(Id);
                if(madebType != null)
                {
                    return Ok(madebType);
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
        public IActionResult AddMadebType(MadebType madebType)
        {
            #region Add MadebType
            try
            {
                if (ModelState.IsValid)
                {
                    madebType.dtEntered = DateTime.Now;
                    madebType.dtUpdated = DateTime.Now;

                    /* TO DO: Catch User ID and update the following properties
                     * nEnteredBy
                     * nUpdatedBy
                     */

                    int inserted = _madebTypeRepository.Add(madebType);
                    if(inserted > 0)
                        return Ok(madebType);
                    else
                        return StatusCode(StatusCodes.Status500InternalServerError, "There was an error while inserting the record.");
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
        [HttpPost("EditMadebType/madebTypeID={madebTypeID}")]
        [Route("[action]")]
        public IActionResult EditMadebType(string madebTypeID, [FromBody] MadebType madebTypeToUpdate)
        {
            #region Edit MadebType
            try
            {
                MadebType madebType = _madebTypeRepository.GetMadebTypeById(madebTypeID);
                if (madebType != null && madebTypeToUpdate != null && madebTypeID == madebTypeToUpdate.Id.ToString())
                {

                    if (ModelState.IsValid)
                    {
                        madebTypeToUpdate.dtEntered = madebType.dtEntered;
                        madebTypeToUpdate.dtUpdated = DateTime.Now;
                        
                        /*To Do:
                        ===> countryToUpdate.nUpdatedBy =  //catch current user id here
                        */
                        
                        int updated = _madebTypeRepository.Update(madebTypeToUpdate);
                        if(updated > 0)
                            return Ok(String.Format("Madeb Type with ID: {0} updated Successfully", madebTypeID));
                        else
                            return StatusCode(StatusCodes.Status500InternalServerError, "There was an error while updating the record.");
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
                    return BadRequest("Madeb Type Update data invalid. Try again.");
                   
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
        public IActionResult DeleteMadebType(MadebType madebTypeToDelete)
        {
            #region Delete MadebType
            try
            {
                MadebType madebType = _madebTypeRepository.GetMadebTypeById(madebTypeToDelete.Id.ToString());
                if (madebTypeToDelete != null && madebType != null)
                {
                    if (madebType.sMadebType == madebTypeToDelete.sMadebType)
                    {
                        int deleted = _madebTypeRepository.Delete(madebTypeToDelete);
                        if(deleted > 0)
                            return Ok(String.Format("Madeb Type with ID: {0} deleted successfully", madebTypeToDelete.Id));
                        else
                            return StatusCode(StatusCodes.Status500InternalServerError, "There was an error while deleting the record.");
                    }
                    else
                    {
                        return BadRequest(String.Format("Madeb Type with Id: {0} does not contain Madeb type {1}", madebTypeToDelete.Id, madebTypeToDelete.sMadebType));
                    }
                }
                else
                {
                    return BadRequest(String.Format("Madeb Type record with Id {0} not found.", madebTypeToDelete.Id));
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

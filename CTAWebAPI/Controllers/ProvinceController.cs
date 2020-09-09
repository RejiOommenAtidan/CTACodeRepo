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
    public class ProvinceController : Controller
    {
        private readonly ProvinceRepository _provinceRepository;

        public ProvinceController (DBConnectionInfo info)
        {
            _provinceRepository = new ProvinceRepository(info.sConnectionString);
        }

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetProvinces()
        {
            #region Get All Provinces
            try
            {
                IEnumerable<Province> provinces = _provinceRepository.GetAllProvinces();
                if(provinces != null)
                {
                    return Ok(provinces);
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
        public IActionResult GetProvinceById(string Id)
        {
            try
            {
                Province province = _provinceRepository.GetProvinceById(Id);
                if (province != null)
                {
                    return Ok(province);
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
        public IActionResult AddProvince(Province province)
        {
            #region Add Province
            try
            {
                if (ModelState.IsValid)
                {
                    _provinceRepository.Add(province);
                    return Ok(province);
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
        [HttpPost("EditProvince/provinceID={provinceID}")]
        [Route("[action]")]
        public IActionResult EditProvince(string provinceID, [FromBody] Province provinceToUpdate)
        {
            #region Edit Province
            try
            {
                Province province = _provinceRepository.GetProvinceById(provinceID);
                if (province != null && provinceToUpdate != null && provinceID == provinceToUpdate.Id.ToString())
                {

                    if (ModelState.IsValid)
                    {
                        _provinceRepository.Update(provinceToUpdate);
                        return Ok(String.Format("Province with ID: {0} updated Successfully", provinceID));
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
                    return BadRequest("Province Update data invalid. Try again.");

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
        public IActionResult DeleteProvince(Province provinceToDelete)
        {
            #region Delete Province
            try
            {
                Province province = _provinceRepository.GetProvinceById(provinceToDelete.Id.ToString());
                if (provinceToDelete != null && province != null)
                {
                    if (province.sProvince == provinceToDelete.sProvince)
                    {
                        _provinceRepository.Delete(provinceToDelete);// Delete method should return boolean for success.
                        return Ok(String.Format("Province with ID: {0} deleted successfully", provinceToDelete.Id));
                    }
                    else
                    {
                        return BadRequest(String.Format("Province with Id: {0} does not contain Province \"{1}\"", provinceToDelete.Id, provinceToDelete.sProvince));
                    }
                }
                else
                {
                    return BadRequest(String.Format("Province record with Id {0} not found.", provinceToDelete.Id));
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

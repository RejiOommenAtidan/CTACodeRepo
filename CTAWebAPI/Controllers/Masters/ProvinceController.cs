using CTADBL.BaseClasses.Masters;
using CTADBL.BaseClassRepositories.Masters;
using CTADBL.Entities;
using CTAWebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace CTAWebAPI.Controllers.Masters
{
    [AuthorizeRole(FeatureID: 25)]
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    //[APIKeyAuth]
    [ApiController]
    public class ProvinceController : Controller
    {
        #region Constructor
        private readonly ProvinceRepository _provinceRepository;
        private readonly DBConnectionInfo _info;

        public ProvinceController (DBConnectionInfo info)
        {
            _info = info;
            _provinceRepository = new ProvinceRepository(info.sConnectionString);
        }
        #endregion

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetProvinces()
        {
            #region Get All Provinces
            try
            {
                IEnumerable<Province> provinces = _provinceRepository.GetAllProvinces();
                if(provinces.Count() > 0)
                {
                    #region Information Logging 
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name+ " Method Called");
                    #endregion
                    return Ok(provinces);
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }
                
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message,ex.StackTrace);
                #endregion
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
                    #region Information Logging
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(province);
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }

            }
            catch (Exception ex)
            {
                #region Exception Logging
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message,ex.StackTrace);
                #endregion 
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
                    DuplicateCheck<Province> check = new DuplicateCheck<Province>(province, _info.sConnectionString);
                    string[] props = { "sProvince" };
                    string message;
                    if (check.IsDuplicate(province.Id, props, out message))
                    {
                        return Problem(message, null, 403);
                    }
                    province.dtEntered = DateTime.Now;
                    province.dtUpdated = DateTime.Now;

                    /* TO DO: Catch User ID and update the following properties
                     * nEnteredBy
                     * nUpdatedBy
                     */
                    
                    int inserted = _provinceRepository.Add(province);
                    if(inserted > 0)
                    {
                        #region Information Logging 
                        CTALogger logger = new CTALogger(_info);
                        logger.LogRecord(((Operations)1).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", null, province.nEnteredBy);
                        #endregion
                        return Ok(province);
                    }
                    else 
                    {
                        string error = "Error encountered with insert.";
                        return StatusCode(StatusCodes.Status500InternalServerError, error);
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
                #region Exception Logging 
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace,province.nEnteredBy);
                #endregion
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
                        DuplicateCheck<Province> check = new DuplicateCheck<Province>(provinceToUpdate, _info.sConnectionString);
                        string[] props = { "sProvince" };
                        string message;
                        if (check.IsDuplicate(provinceToUpdate.Id, props, out message))
                        {
                            return Problem(message, null, 403);
                        }
                        provinceToUpdate.nEnteredBy = province.nEnteredBy;
                        provinceToUpdate.dtEntered = province.dtEntered;
                        provinceToUpdate.dtUpdated = DateTime.Now;

                        //to uncomment later
                        //provinceToUpdate.nEnteredBy = //catch current user id here;

                        int updated = _provinceRepository.Update(provinceToUpdate);
                        if(updated > 0)
                        {
                            #region Audit Log
                            CTALogger.LogAuditRecord(province, provinceToUpdate, null, null, 25, province.Id, provinceToUpdate.nUpdatedBy);
                            #endregion

                            #region Alert Logging
                            CTALogger logger = new CTALogger(_info);
                            logger.LogRecord(((Operations)3).ToString(), GetType().Name.Replace("Controller", ""), ((LogLevels)2).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", null, provinceToUpdate.nUpdatedBy);
                            #endregion

                            Province updatedProvince = _provinceRepository.GetProvinceById(provinceID);

                            return Ok(string.Format("Province with ID: {0} updated Successfully", provinceID));
                        }
                        else
                        {
                            return StatusCode(StatusCodes.Status500InternalServerError);
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
                else
                {
                    return BadRequest("Province Update data invalid. Try again.");
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(((Operations)3).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message,ex.StackTrace,provinceToUpdate.nEnteredBy);
                #endregion
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
                        int deleted = _provinceRepository.Delete(provinceToDelete);// Delete method should return boolean for success.
                        if (deleted > 0)
                        {
                            #region Alert Logging 
                            CTALogger logger = new CTALogger(_info);
                            logger.LogRecord(((Operations)4).ToString(), GetType().Name.Replace("Controller", ""), ((LogLevels)2).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", null, provinceToDelete.nEnteredBy);
                            #endregion
                            return Ok(String.Format("Province with ID: {0} deleted successfully", provinceToDelete.Id));
                        }
                            
                        else
                            return StatusCode(StatusCodes.Status500InternalServerError);
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
                #region Exception Logging 
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(((Operations)4).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message,ex.StackTrace,provinceToDelete.nEnteredBy);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion
    }
}

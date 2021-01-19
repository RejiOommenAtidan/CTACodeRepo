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
using System.Text.Json;

namespace CTAWebAPI.Controllers.Masters
{
    //[AuthorizeRole(FeatureID =23)]
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly CountryRepository _countryRepository;
        public CountryController(DBConnectionInfo info)
        {
            _info = info;
            _countryRepository = new CountryRepository(_info.sConnectionString);
        }
        #endregion

        #region Get Calls
        //[HttpGet]
        //[Route("[action]")]
        [NonAction]
        public IActionResult GetCountriesCommon()
        {
            #region Get All Countries
            try
            {
                IEnumerable<Country> countries = _countryRepository.GetAllCountries();
                if(countries.Count() > 0)
                {
                    #region Information Logging 
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(countries);
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
                logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message,ex.StackTrace );
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        [AuthorizeRole(FeatureID = 23)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetCountries()
        {
            return GetCountriesCommon();
        }

        [AuthorizeRole(FeatureID = 22)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetCountriesForAuthRegion()
        {
            return GetCountriesCommon();
        }


        [AuthorizeRole(FeatureID = 2)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetCountriesForSearch()
        {
            return GetCountriesCommon();
        }

        [AuthorizeRole(FeatureID = 52)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetCountriesForChatrelReport()
        {
            return GetCountriesCommon();
        }

        [AuthorizeRole(FeatureID = 23)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetCountryById(string Id)
        {
            #region Get Country by Id
            try
            {
                Country country = _countryRepository.GetCountryById(Id);
                if (country != null)
                {
                    #region Information Logging
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(country);
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

        #endregion

        #region Add Call
        [AuthorizeRole(FeatureID = 23)]
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddCountry(Country country)
        {
            #region Add Country
            try
            {
                if (ModelState.IsValid)
                {

                    /* IF model is valid, do we reach this condition ? */
                    //if (country == null)
                    //{
                    //    return BadRequest("Country cannot be NULL");
                    //}
                    //if (_countryRepository.CountryIdExists(country.sCountryID))
                    //{
                    //    return StatusCode(StatusCodes.Status400BadRequest, "CountryID already exists.");
                    //}

                    DuplicateCheck<Country> check = new DuplicateCheck<Country>(country, _info.sConnectionString);
                    string[] props = { "sCountryID", "sCountry" };
                    string message;
                    if (check.IsDuplicate(country.ID, props, out message))
                    {
                        return Problem(message, null, 403);
                    }

                    country.dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
                    country.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
                    
                    /* TO DO: Catch User ID and update the following properties
                     * nEnteredBy
                     * nUpdatedBy
                     */

                    int inserted = _countryRepository.Add(country);
                    if (inserted > 0)
                    {
                        #region Information Logging 
                        CTALogger logger = new CTALogger(_info);
                        logger.LogRecord(((Operations)1).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", null,country.nEnteredBy);
                        #endregion
                        return Ok(country);
                    }
                        
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
                #region Exception Logging 
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message,ex.StackTrace,country.nEnteredBy );
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Edit Call
        [AuthorizeRole(FeatureID = 23)]
        [HttpPost("EditCountry/CountryID={ID}")] /* Are we to match table id*/
        [Route("[action]")]
        public IActionResult EditCountry(string ID, [FromBody] Country countryToUpdate)
        {
            #region Edit Country
            try
            {
                Country country = _countryRepository.GetCountryById(ID);
                if(country != null && ID == countryToUpdate.ID.ToString())
                {
                    if (country.sCountryID == countryToUpdate.sCountryID)
                    {
                        if (ModelState.IsValid)
                        {
                            DuplicateCheck<Country> check = new DuplicateCheck<Country>(countryToUpdate, _info.sConnectionString);
                            string[] props = { "sCountryID", "sCountry" };
                            string message;
                            if (check.IsDuplicate(countryToUpdate.ID, props, out message))
                            {
                                return Problem(message, null, 403);
                            }

                            countryToUpdate.nEnteredBy = country.nEnteredBy;
                            countryToUpdate.dtEntered = country.dtEntered;
                            //to uncomment later
                            //countryToUpdate.nUpdatedBy =  //catch current user id here
                            countryToUpdate.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));
                            int updated = _countryRepository.Update(countryToUpdate);
                            if (updated > 0)
                            {
                                #region Audit Log
                                CTALogger.LogAuditRecord(country, countryToUpdate, null, null, 23, country.ID, countryToUpdate.nUpdatedBy);
                                #endregion

                                #region Alert Logging
                                CTALogger logger = new CTALogger(_info);
                                logger.LogRecord(((Operations)3).ToString(), GetType().Name.Replace("Controller", ""), ((LogLevels)2).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", null, countryToUpdate.nUpdatedBy);
                                #endregion

                                return Ok(string.Format("Country with ID: {0} updated Successfully", ID));
                            }
                            
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
                        return StatusCode(StatusCodes.Status400BadRequest, "CountryID can't be modified.");
                    }
                }
                else
                {
                    return BadRequest(String.Format("Country with ID: {0} does not exist", ID));
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(((Operations)3).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace,countryToUpdate.nEnteredBy);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Delete Call
        [AuthorizeRole(FeatureID = 23)]
        [HttpPost]
        [Route("[action]")]
        public IActionResult DeleteCountry(Country countryToDelete)
        {
            #region Delete AuthRegion
            try
            {
                Country country = _countryRepository.GetCountryById(countryToDelete.ID.ToString());
                if (country != null && countryToDelete != null)
                {
                    if (country.sCountry == countryToDelete.sCountry && country.sCountryID == countryToDelete.sCountryID)
                    {
                        int deleted = _countryRepository.Delete(countryToDelete);// Delete method should return boolean for success.
                        if(deleted > 0)
                        {
                            #region Alert Logging 
                            CTALogger logger = new CTALogger(_info);
                            logger.LogRecord(((Operations)4).ToString(), GetType().Name.Replace("Controller", ""), ((LogLevels)2).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", null, countryToDelete.nEnteredBy);
                            #endregion
                            return Ok(string.Format("Region with ID: {0} deleted successfully", countryToDelete.ID));
                        }
                        
                        else
                            return StatusCode(StatusCodes.Status500InternalServerError, "There was an error while deleting the record.");

                    }
                    else
                    {
                        return BadRequest(string.Format("Region with ID: {0} does not exists", countryToDelete.ID));
                    }
                }
                else
                {
                    return BadRequest("Cannot delete 'null' region.");
                }

            }
            catch (Exception ex)
            {
                #region Exception Logging 
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(((Operations)4).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message,ex.StackTrace,countryToDelete.nEnteredBy);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Search
        //[HttpGet]
        //[Route("[action]")]
        //public IActionResult SearchCountries(string sCountry)
        //{
        //    if (String.IsNullOrEmpty(sCountry))
        //    {
        //        return RedirectToAction("GetCountries");
        //        //return BadRequest("Search parameter not specified");
        //    }
        //    try
        //    {
        //        IEnumerable<Country> result = _countryRepository.SearchCountries(sCountry);
        //        if(result != null && result.Count() > 0)
        //        {
        //            return Ok(result);
        //        }
        //        return NoContent();
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(StatusCodes.Status500InternalServerError);
        //    }
        //}
        [AuthorizeRole(FeatureID = 23)]
        [HttpPost]
        [Route("[action]")]
        public IActionResult SearchCountries(Object country) 
        {
            if(String.IsNullOrEmpty(country.ToString()))
            {
                return RedirectToAction("GetCountries");
            }
            try
            {
                IEnumerable<Country> countries = _countryRepository.SearchCountries(country.ToString());
                if(countries != null && countries.Count() > 0)
                {
                    return Ok(countries);
                }
                else
                {
                    return NoContent();
                }
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        #endregion
    }
}

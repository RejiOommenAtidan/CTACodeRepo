using CTADBL.BaseClasses.Masters;
using CTADBL.BaseClassRepositories.Masters;
using CTADBL.Entities;
using CTAWebAPI.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace CTAWebAPI.Controllers.Masters
{
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly DBConnectionInfo _info;
        private readonly CountryRepository _countryRepository;

        #region Constructor

        public CountryController(DBConnectionInfo info)
        {
            _info = info;
            _countryRepository = new CountryRepository(_info.sConnectionString);
        }
        #endregion

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetCountries()
        {
            #region Get All Countries
            try
            {
                IEnumerable<Country> countries = _countryRepository.GetAllCountries();
                if(countries != null)
                {
                    #region Information Logging 
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", 1);
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
                logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name, 1);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
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
                    logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", 1);
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
                logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name, 1);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        #endregion

        #region Add Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddCountry(Country country)
        {
            #region Add User
            try
            {
                if (ModelState.IsValid)
                {

                    /* IF model is valid, do we reach this condition ? */
                    //if (country == null)
                    //{
                    //    return BadRequest("Country cannot be NULL");
                    //}
                    if (_countryRepository.CountryIdExists(country.sCountryID))
                    {
                        return StatusCode(StatusCodes.Status400BadRequest, "CountryID already exists.");
                    }
                    country.dtEntered = DateTime.Now;
                    country.dtUpdated = DateTime.Now;
                    
                    /* TO DO: Catch User ID and update the following properties
                     * nEnteredBy
                     * nUpdatedBy
                     */

                    int inserted = _countryRepository.Add(country);
                    if (inserted > 0)
                    {
                        #region Information Logging 
                        CTALogger logger = new CTALogger(_info);
                        logger.LogRecord(((Operations)1).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", 1);
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
                logger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name, 1);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Edit Call
        [HttpPost("EditCountry/CountryID={ID}")] /* Are we to match table id*/
        [Route("[action]")]
        public IActionResult EditCountry(string ID, [FromBody] Country countryToUpdate)
        {
            #region Edit User
            try
            {
                Country country = _countryRepository.GetCountryById(ID);
                if(country != null && ID == countryToUpdate.ID.ToString())
                {
                    if (country.sCountryID == countryToUpdate.sCountryID)
                    {
                        if (ModelState.IsValid)
                        {
                            countryToUpdate.dtEntered = country.dtEntered;
                            //to uncomment later
                            //countryToUpdate.nUpdatedBy =  //catch current user id here
                            countryToUpdate.dtUpdated = DateTime.Now;
                            int updated = _countryRepository.Update(countryToUpdate);
                            if (updated > 0)
                            {
                                #region Alert Logging
                                CTALogger logger = new CTALogger(_info);
                                logger.LogRecord(((Operations)3).ToString(), GetType().Name.Replace("Controller", ""), ((LogLevels)2).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", 1);
                                #endregion
                                return Ok(String.Format("Country with ID: {0} updated Successfully", ID));
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
                logger.LogRecord(((Operations)3).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name, 1);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Delete Call
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
                            logger.LogRecord(((Operations)4).ToString(), GetType().Name.Replace("Controller", ""), ((LogLevels)2).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", 1);
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
                logger.LogRecord(((Operations)4).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name, 1);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

    }
}

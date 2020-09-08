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
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly DBConnectionInfo _info;
        private readonly CountryRepository countryRepository;

        #region Constructor

        public CountryController(DBConnectionInfo info)
        {
            _info = info;
            countryRepository = new CountryRepository(_info.ConnectionString);
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
                IEnumerable<Country> countries = countryRepository.GetAllCountries();
                return Ok(countries);
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

                    countryRepository.Add(country);
                    return Ok(country);
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
        [HttpPost("EditCountry/CountryID={ID}")] /* Are we to match table id*/
        [Route("[action]")]
        public IActionResult EditCountry(string ID, [FromBody] Country countryToUpdate)
        {
            #region Edit User
            try
            {
                if (ModelState.IsValid)
                {
                    if (countryToUpdate == null)
                    {
                        return BadRequest("Country cannot be NULL");
                    }

                    if (ID != countryToUpdate.ID.ToString())
                    {
                        return BadRequest("Country ID does not match");
                    }

                    Country country = countryRepository.GetCountryById(ID);
                    if (country != null) // Checks if country exists with this ID.
                    {
                        countryRepository.Update(countryToUpdate);
                        return Ok(String.Format("Country with ID: {0} updated Successfully", ID));
                    }
                    else
                    {
                        return BadRequest(String.Format("Country with ID: {0} does not exist", ID));
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
        public IActionResult DeleteCountry(Country countryToDelete)
        {
            #region Delete AuthRegion
            try
            {
                Country country = countryRepository.GetCountryById(countryToDelete.ID.ToString());
                if (country != null)
                {
                    if (country.sCountry == countryToDelete.sCountry && country.sCountryID == countryToDelete.sCountryID)
                    {
                        countryRepository.Delete(countryToDelete);// Delete method should return boolean for success.
                        return Ok(string.Format("Region with ID: {0} deleted successfully", countryToDelete.ID));
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
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

    }
}

using System;
using CTADBL.BaseClasses;
using CTADBL.BaseClassRepositories;
using CTADBL.ViewModelsRepositories;
using CTADBL.ViewModels;
using CTADBL.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;


namespace CTAWebAPI.Controllers
{
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    //[APIKeyAuth]
    [ApiController]
    public class AuthRegionCountryController : Controller
    {
        private readonly DBConnectionInfo _info;
        private readonly AuthRegionCountryRepository _authRegionCountryRepository;

        #region Constructor

        public AuthRegionCountryController(DBConnectionInfo info)
        {
            _info = info;
            _authRegionCountryRepository = new AuthRegionCountryRepository(_info.sConnectionString);
        }
        #endregion


        [HttpGet]
        [Route("[action]")]
        public IActionResult GetAllAuthRegionsCountryName()
        {
            try
            {
                IEnumerable<AuthRegionCountry> authRegionCountries = _authRegionCountryRepository.GetAuthRegionsCountryName();
                if (authRegionCountries != null)
                {
                    return Ok(authRegionCountries);
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
    }
}

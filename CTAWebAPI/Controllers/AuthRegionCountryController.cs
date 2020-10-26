using CTADBL.Entities;
using CTADBL.ViewModels;
using CTADBL.ViewModelsRepositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace CTAWebAPI.Controllers
{
    [Authorize]
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

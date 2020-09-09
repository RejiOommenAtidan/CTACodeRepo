using CTADBL.BaseClasses;
using CTADBL.BaseClassRepositories;
using CTADBL.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace CTAWebAPI.Controllers
{
    [EnableCors("AllowOrigin")]
    //[APIKeyAuth]
    [Route("api/[controller]")]
    [ApiController]
    public class RecentlySearchedGBController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly RecentlySearchedGBRepository _recentlySearchedGBRepository;
        public RecentlySearchedGBController(DBConnectionInfo info)
        {
            _info = info;
            _recentlySearchedGBRepository = new RecentlySearchedGBRepository(_info.sConnectionString);
        }
        #endregion

        #region Get Recently Searched GB's
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetRecentlySearchedGBs()
        {
            #region Get Recently Searched GB's
            try
            {
                IEnumerable<RecentlySearchedGB> recentGBs = _recentlySearchedGBRepository.GetAllRecentlySearchedGB();
                return Ok(recentGBs);
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

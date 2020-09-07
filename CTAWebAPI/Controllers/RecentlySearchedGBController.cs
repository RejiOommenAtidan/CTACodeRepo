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
    [Route("api/[controller]")]
    [ApiController]
    public class RecentlySearchedGBController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        public RecentlySearchedGBController(DBConnectionInfo info)
        {
            _info = info;
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
                RecentlySearchedGBRepository recentRepo = new RecentlySearchedGBRepository(_info.ConnectionString);
                IEnumerable<RecentlySearchedGB> recentGBs = recentRepo.GetAllRecentlySearchedGB();
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

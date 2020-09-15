using CTADBL.BaseClasses;
using CTADBL.BaseClassRepositories;
using CTADBL.Entities;
using CTAWebAPI.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Reflection;

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

                #region Information Logging 
                string sActionType = Enum.GetName(typeof(Operations), 2);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 1);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = currentMethodName + " Method Called";
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription);
                #endregion

                return Ok(recentGBs);
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                string sActionType = Enum.GetName(typeof(Operations), 2);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 3);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = "Exception in " + currentMethodName;
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion
    }
}

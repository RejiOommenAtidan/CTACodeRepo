﻿using CTADBL.BaseClassRepositories.Transactions;
using CTADBL.Entities;
using CTADBL.ViewModels;
using CTADBL.ViewModelsRepositories;
using CTAWebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Reflection;

namespace CTAWebAPI.Controllers.Transactions
{
    //[Authorize]
    [EnableCors("AllowOrigin")]
    //[APIKeyAuth]
    [Route("api/[controller]")]
    [ApiController]
    public class RecentlySearchedGBController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly RecentlySearchedGBRepository _recentlySearchedGBRepository;
        private readonly RecentlySearchedGBVMRepository _recentlySearchedGBVMRepository;
        private readonly CTALogger _ctaLogger;
        public RecentlySearchedGBController(DBConnectionInfo info)
        {
            _info = info;
            _recentlySearchedGBRepository = new RecentlySearchedGBRepository(_info.sConnectionString);
            _recentlySearchedGBVMRepository = new RecentlySearchedGBVMRepository(_info.sConnectionString);
            _ctaLogger = new CTALogger(_info);
        }
        #endregion

        #region Get Recently Searched GB's
        [AuthorizeRole(FeatureID = 2)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetRecentlySearchedGBs(int records, int nUserId)
        {
            if(records < 0 || nUserId < 0)
            {
                return BadRequest("Invalid search parameters passed.");
            }
            
            #region Get Recently Searched GB's
            try
            {
                IEnumerable<RecentlySearchedGBVM> recentGBs = _recentlySearchedGBVMRepository.GetRecentSearches(records, nUserId);

                #region Information Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion

                return Ok(recentGBs);
            }
            catch (Exception ex)
            {
                #region Exception Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion
    }
}

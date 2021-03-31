using ChatrelDBL.BaseClasses.Masters;
using ChatrelDBL.BaseClassRepositories.Masters;
using ChatrelDBL.Entities;
using ChatrelPaymentWebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using TimeZoneConverter;

namespace ChatrelPaymentWebAPI.Controllers
{
    //[Authorize]
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    //[APIKeyAuth]
    [ApiController]
    public class AuthRegionController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly AuthRegionRepository _authRegionRepository;
        private readonly ChatrelLogger _chatrelLogger;
        public AuthRegionController(DBConnectionInfo info)
        {
            _info = info;
            _authRegionRepository = new AuthRegionRepository(_info.sConnectionString);
            _chatrelLogger = new ChatrelLogger(info);
        }
        #endregion

        #region Get Calls
        [AuthorizeToken]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetAuthRegions()
        {
            #region Get All AuthRegions
            try
            {
                IEnumerable<AuthRegion> authRegions = _authRegionRepository.GetAllAuthRegions();
                if (authRegions.Count() > 0)
                {
                    #region Information Logging 
                    
                    _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", "", 1);
                    #endregion
                    return Ok(authRegions);
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }

            }
            catch (Exception ex)
            {
                #region Exception Logging 

                _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, 1);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        [AuthorizeToken]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetAuthRegionById(string Id)
        {
            try
            {
                AuthRegion authRegion = _authRegionRepository.GetAuthRegionById(Id);
                if (authRegion != null)
                {
                    #region Information Logging

                    _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(authRegion);
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging

                _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion 
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        #endregion
    }
}

using CTADBL.Entities;
using CTADBL.BaseClassRepositories.Transactions;
using CTADBL.ViewModels;
using CTADBL.ViewModelsRepositories;
using CTAWebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
namespace CTAWebAPI.Controllers.Transactions
{

    [Authorize]
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    //[APIKeyAuth]
    [ApiController]
    public class ReportController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly ReportRepository _reportRepository;
        private readonly CTALogger _ctaLogger;


        public ReportController(DBConnectionInfo info)
        {
            _info = info;
            _reportRepository = new ReportRepository(_info.sConnectionString);
            _ctaLogger = new CTALogger(_info);
        }
        #endregion


        #region Get Calls

        #region GetReportGreenBookIssuedIndividual
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetReportIssuedIndividual(string sMadebDisplayKey, DateTime dtRecordFrom, DateTime dtRecordTo, string sGroupBy, string sOrderBy)
        {
          
            try
            {
                var result = _reportRepository.GetReportGreenBookIssuedIndividual(sMadebDisplayKey, dtRecordFrom, dtRecordTo, sGroupBy, sOrderBy);
                if (result != null)
                {
                    return Ok(result);
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
        #endregion

        #region GetReportGreenBookIssuedOverAll
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetReportIssuedOverAll(string sMadebDisplayKey, DateTime dtRecordFrom, DateTime dtRecordTo, string sOrderBy)
        {
           
            try
            {
                var result = _reportRepository.GetReportGreenBookIssuedOverAll(sMadebDisplayKey, dtRecordFrom, dtRecordTo, sOrderBy);
                if (result != null)
                {
                    return Ok(result);
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
        #endregion


        #endregion

    }
}

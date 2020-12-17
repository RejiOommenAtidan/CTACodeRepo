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

using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Http.Features;
using System.Net;

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

        #region GetReportGreenBookIssuedOverAll
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetReportIssuedOverAll(int sMadebDisplayKey, DateTime dtRecordFrom, DateTime dtRecordTo, string sGroupBy, string sOrderBy)
        {
          
            try
            {
                var result = _reportRepository.GetReportGreenBookIssuedOverAll(sMadebDisplayKey, dtRecordFrom, dtRecordTo, sGroupBy, sOrderBy);
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

        #region GetReportGreenBookIssuedIndividual
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetReportIssuedIndividual(int sMadebDisplayKey, DateTime dtRecordFrom, DateTime dtRecordTo, string sOrderBy)
        {
           
            try
            {
                var result = _reportRepository.GetReportGreenBookIssuedIndividual(sMadebDisplayKey, dtRecordFrom, dtRecordTo, sOrderBy);
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

        #region GetReportCTABelow6Years
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetReportCTABelow6Years(string sOrderBy)
        {

            try
            {
                var result = _reportRepository.GetReportCTABelow6Years(sOrderBy);
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

        #region GetReportCTANewEntryFromDay
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetReportCTANewEntryFromDay(DateTime dtRecordFrom)
        {

            try
            {
                var result = _reportRepository.GetReportCTANewEntryFromDay(dtRecordFrom);
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

        #region GetReportCTAChangesLogForChildren
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetReportCTAChangesLogForChildren(DateTime dtRecordFrom)
        {

            try
            {
                var result = _reportRepository.GetReportCTAChangesLogForChildren(dtRecordFrom);
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

        #region GetReportCTAChangesLog
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetReportCTAChangesLog(DateTime dtRecordFrom)
        {

            try
            {
                var result = _reportRepository.GetReportCTAChangesLog(dtRecordFrom);
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

        #region GetReportCTAMadebRegionOrCountryWise
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetReportCTAMadebRegionOrCountryWise(int sMadebDisplayKey, DateTime dtRecordFrom, DateTime dtRecordTo, string sOrderBy)
        {

            try
            {
                var result = _reportRepository.GetReportCTAMadebRegionOrCountryWise(sMadebDisplayKey, dtRecordFrom, dtRecordTo, sOrderBy);
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

        #region GetReportCTADeceasedRegionOrCountryWise
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetReportCTADeceasedRegionOrCountryWise(DateTime dtRecordFrom, DateTime dtRecordTo, string sOrderBy)
        {

            try
            {
                var result = _reportRepository.GetReportCTADeceasedRegionOrCountryWise(dtRecordFrom, dtRecordTo, sOrderBy);
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

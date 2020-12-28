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
        [AuthorizeRole(FeatureID = 33)]
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
        [AuthorizeRole(FeatureID = 34)]
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
        [AuthorizeRole(FeatureID = 38)]
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
        [AuthorizeRole(FeatureID = 37)]
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
        [AuthorizeRole(FeatureID = 36)]
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
        [AuthorizeRole(FeatureID = 35)]
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
        //[HttpGet]
        //[Route("[action]")]
        [NonAction]
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

        [AuthorizeRole(FeatureID = 40)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetReportCTAMadebRegionOrCountryWiseSarso(int sMadebDisplayKey, DateTime dtRecordFrom, DateTime dtRecordTo, string sOrderBy)
        {
            return GetReportCTAMadebRegionOrCountryWise(sMadebDisplayKey, dtRecordFrom, dtRecordTo, sOrderBy);
        }

        [AuthorizeRole(FeatureID = 41)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetReportCTAMadebRegionOrCountryWiseNorchoe(int sMadebDisplayKey, DateTime dtRecordFrom, DateTime dtRecordTo, string sOrderBy)
        {
            return GetReportCTAMadebRegionOrCountryWise(sMadebDisplayKey, dtRecordFrom, dtRecordTo, sOrderBy);
        }

        [AuthorizeRole(FeatureID = 42)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetReportCTAMadebRegionOrCountryWiseBhorlak(int sMadebDisplayKey, DateTime dtRecordFrom, DateTime dtRecordTo, string sOrderBy)
        {
            return GetReportCTAMadebRegionOrCountryWise(sMadebDisplayKey, dtRecordFrom, dtRecordTo, sOrderBy);
        }

        [AuthorizeRole(FeatureID = 43)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetReportCTAMadebRegionOrCountryWiseBookFull(int sMadebDisplayKey, DateTime dtRecordFrom, DateTime dtRecordTo, string sOrderBy)
        {
            return GetReportCTAMadebRegionOrCountryWise(sMadebDisplayKey, dtRecordFrom, dtRecordTo, sOrderBy);
        }


        [AuthorizeRole(FeatureID = 44)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetReportCTAMadebRegionOrCountryWiseBriefgb(int sMadebDisplayKey, DateTime dtRecordFrom, DateTime dtRecordTo, string sOrderBy)
        {
            return GetReportCTAMadebRegionOrCountryWise(sMadebDisplayKey, dtRecordFrom, dtRecordTo, sOrderBy);
        }


        [AuthorizeRole(FeatureID = 45)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetReportCTAMadebRegionOrCountryWiseAbroad(int sMadebDisplayKey, DateTime dtRecordFrom, DateTime dtRecordTo, string sOrderBy)
        {
            return GetReportCTAMadebRegionOrCountryWise(sMadebDisplayKey, dtRecordFrom, dtRecordTo, sOrderBy);
        }

        #endregion



        #region GetReportCTADeceasedRegionOrCountryWise
        [AuthorizeRole(FeatureID = 39)]
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

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
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace CTAWebAPI.Controllers
{
    //[Authorize("Roles=Admin")]
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    //[APIKeyAuth]
    [ApiController]
    public class MadebAuthRegionVMController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly MadebAuthRegionVMRepository _madebAuthRegionVMRepository;
        public MadebAuthRegionVMController(DBConnectionInfo info)
        {
            _info = info;
            _madebAuthRegionVMRepository = new MadebAuthRegionVMRepository(_info.sConnectionString);
        }
        #endregion


        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetMadebs()
        {
            #region Get All Madebs
            try
            {
                IEnumerable<MadebAuthRegionVM> madebs = _madebAuthRegionVMRepository.GetAllMadebs();
                if (madebs.Count() > 0)
                {
                    #region Information Logging 
                    string sActionType = Enum.GetName(typeof(Operations), 2);
                    string sModuleName = (GetType().Name).Replace("Controller", "");
                    string sEventName = Enum.GetName(typeof(LogLevels), 1);
                    string currentMethodName = MethodBase.GetCurrentMethod().Name;
                    string sDescription = currentMethodName + " Method Called";
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(sActionType, sModuleName, sEventName, sDescription);
                    #endregion

                    return Ok(madebs);
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                string sActionType = Enum.GetName(typeof(Operations), 2);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 3);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = "Exception in " + currentMethodName+", Message: "+ex.Message;
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription,ex.StackTrace);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        [HttpGet("GetMadebById/Id={Id}")]
        [Route("[action]")]
        public IActionResult GetMadebById(string Id)
        {
            #region Get Madeb
            try
            {
                MadebAuthRegionVM madeb = _madebAuthRegionVMRepository.GetMadebById(Id);
                if (madeb != null)
                {
                    #region Information Logging 
                    string sActionType = Enum.GetName(typeof(Operations), 2);
                    string sModuleName = (GetType().Name).Replace("Controller", "");
                    string sEventName = Enum.GetName(typeof(LogLevels), 1);
                    string currentMethodName = MethodBase.GetCurrentMethod().Name;
                    string sDescription = currentMethodName + " Method Called";
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(sActionType, sModuleName, sEventName, sDescription);
                    #endregion
                    return Ok(madeb);
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }

            }
            catch (Exception ex)
            {
                #region Exception Logging 
                string sActionType = Enum.GetName(typeof(Operations), 2);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 3);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = "Exception in " + currentMethodName + ", Message: " + ex.Message;
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription,ex.StackTrace);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        [AuthorizeRole(FeatureID = 0)]
        [HttpGet("GetMadebsByType/MadebType={madebType}")]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetMadebsByType(int madebType)
        {
            #region Get Madeb
            try
            {
                IEnumerable<MadebAuthRegionVM> madebs = _madebAuthRegionVMRepository.GetMadebsByType(madebType);
                if (madebs.Count() > 0)
                {
                    #region Information Logging 
                    string sActionType = Enum.GetName(typeof(Operations), 2);
                    string sModuleName = (GetType().Name).Replace("Controller", "");
                    string sEventName = Enum.GetName(typeof(LogLevels), 1);
                    string currentMethodName = MethodBase.GetCurrentMethod().Name;
                    string sDescription = currentMethodName + " Method Called";
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(sActionType, sModuleName, sEventName, sDescription);
                    #endregion

                    return Ok(madebs);
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }

            }
            catch (Exception ex)
            {
                #region Exception Logging 
                string sActionType = Enum.GetName(typeof(Operations), 2);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 3);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = "Exception in " + currentMethodName + ", Message: " + ex.Message;
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription,ex.StackTrace);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }


        [HttpGet("GetMadebByFormNumber/formNumber={formNumber}")]
        [Route("[action]")]
        public IActionResult GetMadebByFormNumber(int formNumber)
        {
            #region Get Madeb
            try
            {
                MadebAuthRegionVM madeb = _madebAuthRegionVMRepository.GetMadebByFormNumber(formNumber);
                if (madeb != null)
                {
                    #region Information Logging 
                    string sActionType = Enum.GetName(typeof(Operations), 2);
                    string sModuleName = (GetType().Name).Replace("Controller", "");
                    string sEventName = Enum.GetName(typeof(LogLevels), 1);
                    string currentMethodName = MethodBase.GetCurrentMethod().Name;
                    string sDescription = currentMethodName + " Method Called";
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(sActionType, sModuleName, sEventName, sDescription);
                    #endregion

                    return Ok(madeb);
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                string sActionType = Enum.GetName(typeof(Operations), 2);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 3);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = "Exception in " + currentMethodName + ", Message: " + ex.Message;
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription,ex.StackTrace);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        [HttpGet("GetMadebsByAuthRegion/authRegion={authRegion}")]
        [Route("[action]")]
        public IActionResult GetMadebsByAuthRegion(int authRegion)
        {
            #region Get Madeb
            try
            {
                IEnumerable <MadebAuthRegionVM> madebs = _madebAuthRegionVMRepository.GetMadebsByAuthRegion(authRegion);
                if (madebs.Count() > 0)
                {
                    #region Information Logging 
                    string sActionType = Enum.GetName(typeof(Operations), 2);
                    string sModuleName = (GetType().Name).Replace("Controller", "");
                    string sEventName = Enum.GetName(typeof(LogLevels), 1);
                    string currentMethodName = MethodBase.GetCurrentMethod().Name;
                    string sDescription = currentMethodName + " Method Called";
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(sActionType, sModuleName, sEventName, sDescription);
                    #endregion

                    return Ok(madebs);
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                string sActionType = Enum.GetName(typeof(Operations), 2);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 3);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = "Exception in " + currentMethodName + ", Message: " + ex.Message;
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription,ex.StackTrace);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        [HttpGet("GetMadebsByIssueAction/issueAction={issueAction}")]
        [Route("[action]")]
        public IActionResult GetMadebsByIssueAction(int issueAction)
        {
            #region Get Madeb
            try
            {
                IEnumerable<MadebAuthRegionVM> madebs = _madebAuthRegionVMRepository.GetMadebsByIssueAction(issueAction);
                if (madebs.Count() > 0)
                {
                    #region Information Logging 
                    string sActionType = Enum.GetName(typeof(Operations), 2);
                    string sModuleName = (GetType().Name).Replace("Controller", "");
                    string sEventName = Enum.GetName(typeof(LogLevels), 1);
                    string currentMethodName = MethodBase.GetCurrentMethod().Name;
                    string sDescription = currentMethodName + " Method Called";
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(sActionType, sModuleName, sEventName, sDescription);
                    #endregion

                    return Ok(madebs);
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                string sActionType = Enum.GetName(typeof(Operations), 2);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 3);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = "Exception in " + currentMethodName + ", Message: " + ex.Message;
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription,ex.StackTrace);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion


        #region Search
        [AuthorizeRole(FeatureID = 0)]
        [HttpPost("ColumnSearchMadeb/madebType={madebType}")]
        [Route("[action]")]
        public IActionResult ColumnSearchMadeb(int madebType, [FromBody] MadebSearchVM madeb)
        {
            if(madeb == null)
            {
                return BadRequest("Bad Request, search object is null.");
            }
            try
            {
                IEnumerable<MadebAuthRegionVM> madebs = _madebAuthRegionVMRepository.ColumnSearchMadebs(madebType, madeb);
                if(madebs != null && madebs.Count() > 0)
                {
                    #region Information Logging 
                    string sActionType = Enum.GetName(typeof(Operations), 2);
                    string sModuleName = (GetType().Name).Replace("Controller", "");
                    string sEventName = Enum.GetName(typeof(LogLevels), 1);
                    string currentMethodName = MethodBase.GetCurrentMethod().Name;
                    string sDescription = currentMethodName + " Method Called";
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(sActionType, sModuleName, sEventName, sDescription);
                    #endregion
                    return Ok(madebs);
                }
                else
                {
                    #region Information Logging 
                    string sActionType = Enum.GetName(typeof(Operations), 2);
                    string sModuleName = (GetType().Name).Replace("Controller", "");
                    string sEventName = Enum.GetName(typeof(LogLevels), 1);
                    string currentMethodName = MethodBase.GetCurrentMethod().Name;
                    string sDescription = currentMethodName + " Method Called";
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(sActionType, sModuleName, sEventName, sDescription);
                    #endregion
                    return NoContent();
                }
                
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                string sActionType = Enum.GetName(typeof(Operations), 2);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 3);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = "Exception in " + currentMethodName + ", Message: " + ex.Message;
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, ex.StackTrace);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }

        }

        #endregion

        #region Common Search
        [AuthorizeRole(FeatureID = 0)]
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> SearchMadebsAlternate(string parameter, int madebType)
        {
            if (String.IsNullOrEmpty(parameter))
            {
                return RedirectToAction("GetMadebsByType", new { madebType });
                //return BadRequest("Search parameter not specified");
            }
            try
            {
                IEnumerable<MadebAuthRegionVM> result = await _madebAuthRegionVMRepository.SearchMadebsAlternate(parameter, madebType);
                if (result != null && result.Count() > 0)
                {
                    return Ok(result);
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        #endregion
    }
}

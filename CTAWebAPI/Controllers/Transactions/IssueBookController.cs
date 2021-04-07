using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Transactions;
using CTADBL.Entities;
using CTAWebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using TimeZoneConverter;

namespace CTAWebAPI.Controllers.Transactions
{
    
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    //[APIKeyAuth]
    [ApiController]
    public class IssueBookController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly IssueBookRepository _issueBookRepository;
        private readonly MadebRepository _madebRepository;
     
        public IssueBookController(DBConnectionInfo info)
        {
            _info = info;
            _issueBookRepository = new IssueBookRepository(_info.sConnectionString);
            _madebRepository = new MadebRepository(_info.sConnectionString);

        }
        #endregion

        #region Get Calls
        [AuthorizeRole(FeatureID = 14)]
        [HttpGet("GetIssueBookByGBId/GBId={GBId}")]
        [Route("[action]")]
        public IActionResult GetIssueBookByGbId(int GBId)
        {
            #region Get IssueBook
            try
            {

                IEnumerable<IssueBook> issueBooks = _issueBookRepository.GetIssueBookByGbId(GBId);
                if (issueBooks.Count() > 0)
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

                    return Ok(issueBooks);
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
        [AuthorizeRole(FeatureID = 14)]
        [HttpGet("GetIssueBookJoin/GBId={GBId}")]
        [Route("[action]")]
        public IActionResult GetIssueBookJoin(int GBId)
        {
            Object forms = _issueBookRepository.GetIssueBookJoin(GBId);
            return Ok(forms);
        }
        [AuthorizeRole(FeatureID = 14)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetLatestIssueBookJoin()
        {
            Object forms = _issueBookRepository.GetLatestIssueBookJoin();
            return Ok(forms);
        }


        #endregion

        #region Add Call
        [AuthorizeRole(FeatureID = 14)]
        [Route("[action]")]
        [HttpPost("AddIssueBook/MadebId={MadebId}&nIssuedOrNotID={nIssuedOrNotID:int}&dtIssuedDate={dtIssuedDate}")]
        public IActionResult AddIssueBook(string MadebId , int nIssuedOrNotID, DateTime dtIssuedDate, [FromBody] IssueBook issueBook)
        {
            
            #region Add IssueBook
            try
            {
                if (ModelState.IsValid)
                {
                    issueBook.dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                    issueBook.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                    issueBook.sFormNumber = issueBook.nFormNumber.ToString();
                    _issueBookRepository.Add(issueBook, MadebId, nIssuedOrNotID, dtIssuedDate);
                    
                    #region Information Logging 
                    string sActionType = Enum.GetName(typeof(Operations), 1);
                    string sModuleName = (GetType().Name).Replace("Controller", "");
                    string sEventName = Enum.GetName(typeof(LogLevels), 1);
                    string currentMethodName = MethodBase.GetCurrentMethod().Name;
                    string sDescription = currentMethodName + " Method Called";
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, null, issueBook.nEnteredBy);
                    #endregion

                    return Ok(issueBook);
                }
                else
                {
                    var errors = ModelState.Select(x => x.Value.Errors)
                               .Where(y => y.Count > 0)
                               .ToList();
                    return BadRequest(errors);
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                string sActionType = Enum.GetName(typeof(Operations), 1);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 3);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = "Exception in " + currentMethodName + ", Message: " + ex.Message;
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription,ex.StackTrace, issueBook.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Edit Call
        [AuthorizeRole(FeatureID = 14)]
        [HttpPost("EditIssueBook/Id={Id}")]
        [Route("[action]")]
        public IActionResult EditIssueBook(string Id, [FromBody] IssueBook issueBook)
        {
            #region Edit Issue Book
            try
            {
                if (ModelState.IsValid)
                {
                    if (Id == null)
                    {
                        return BadRequest("IssueBook Param ID cannot be NULL");
                    }

                    if (Id != issueBook.Id.ToString())
                    {
                        return BadRequest("IssueBook ID's ain't Matching");
                    }
                    if (IssueBookExists(Id))
                    {
                        IssueBook fetchedIssueBook = _issueBookRepository.GetIssueBookById(Id);
                        issueBook.nEnteredBy = fetchedIssueBook.nEnteredBy;
                        issueBook.dtEntered = fetchedIssueBook.dtEntered;
                        issueBook.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                        _issueBookRepository.Update(issueBook);

                        #region Audit Log
                        CTALogger.LogAuditRecord(fetchedIssueBook, issueBook, issueBook.nGBID.ToString(), issueBook.nAuthRegionId, 14, fetchedIssueBook.Id, issueBook.nUpdatedBy);
                        #endregion

                        #region Alert Logging 
                        string sActionType = Enum.GetName(typeof(Operations), 3);
                        string sModuleName = (GetType().Name).Replace("Controller", "");
                        string sEventName = Enum.GetName(typeof(LogLevels), 2);
                        string currentMethodName = MethodBase.GetCurrentMethod().Name;
                        string sDescription = currentMethodName + " Method Called";
                        CTALogger logger = new CTALogger(_info);
                        logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, null, issueBook.nUpdatedBy);
                        #endregion

                        return Ok("IssueBook with ID: " + Id + " updated Successfully");
                    }
                    else
                    {
                        return BadRequest("IssueBook with ID:" + Id + " does not exist");
                    }
                }
                else
                {
                    var errors = ModelState.Select(x => x.Value.Errors)
                               .Where(y => y.Count > 0)
                               .ToList();
                    return BadRequest(errors);
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                string sActionType = Enum.GetName(typeof(Operations), 3);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 3);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = "Exception in " + currentMethodName + ", Message: " + ex.Message;
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription,ex.StackTrace, issueBook.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Delete Call
        [AuthorizeRole(FeatureID = 14)]
        [HttpPost]
        [Route("[action]")]
        public IActionResult DeleteIssueBook(IssueBook issueBook)
        {
            #region Delete IssueBook
            try
            {
                //string m1 = JsonConvert.SerializeObject(issueBook);
                string issueBookID = issueBook.Id.ToString();
                if (!string.IsNullOrEmpty(issueBookID))
                {
                    if (IssueBookExists(issueBookID))
                    {
                        IssueBook fetchedIssueBook = _issueBookRepository.GetIssueBookById(issueBookID);
                        //if (JsonConvert.SerializeObject(issueBook) == JsonConvert.SerializeObject(fetchedIssueBook))
                        if (issueBook.Id == fetchedIssueBook.Id)
                        {
                            _issueBookRepository.Delete(fetchedIssueBook);
                            #region Alert Logging 
                            string sActionType = Enum.GetName(typeof(Operations), 4);
                            string sModuleName = (GetType().Name).Replace("Controller", "");
                            string sEventName = Enum.GetName(typeof(LogLevels), 2);
                            string currentMethodName = MethodBase.GetCurrentMethod().Name;
                            string sDescription = currentMethodName + " Method Called";
                            CTALogger logger = new CTALogger(_info);
                            logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, null, issueBook.nEnteredBy);
                            #endregion

                            return Ok("IssueBook with ID: " + issueBookID + " removed Successfully");
                        }
                        else
                        {
                            return BadRequest("IssueBook Object does not match with Database");
                        }
                    }
                    else
                    {
                        return BadRequest("IssueBook with ID: " + issueBookID + " does not exist");
                    }
                }
                else
                {
                    return BadRequest("IssueBook Id Cannot be null");
                }

            }
            catch (Exception ex)
            {
                #region Exception Logging 
                string sActionType = Enum.GetName(typeof(Operations), 4);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 3);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = "Exception in " + currentMethodName + ", Message: " + ex.Message;
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription,ex.StackTrace, issueBook.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Check if IssueBook Exists
        private bool IssueBookExists(string Id)
        {
            try
            {
                IssueBook fetchedIssueBook = _issueBookRepository.GetIssueBookById(Id);
                if (fetchedIssueBook != null)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Exception in IssueBook Exists Function, Exception Message: " + ex.Message);
            }
        }
        #endregion
    }
}

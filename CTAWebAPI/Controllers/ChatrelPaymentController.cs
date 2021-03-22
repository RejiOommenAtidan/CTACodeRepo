using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Masters;
using CTADBL.BaseClassRepositories.Transactions;
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
using MailKit.Net.Smtp;
using MimeKit;
using System.Threading.Tasks;
using TimeZoneConverter;
using System.Security.Claims;

namespace CTAWebAPI.Controllers
{
    //[Authorize]
    [EnableCors("AllowOrigin")]
    //[APIKeyAuth]
    [Route("api/[controller]")]
    [ApiController]
    public class ChatrelPaymentController : ControllerBase
    {
        private readonly DBConnectionInfo _info;
        private readonly ChatrelPaymentRepository _chatrelPaymentRepository;
        private readonly ChatrelPaymentVMRepository _chatrelPaymentVMRepository;
        private readonly GreenbookRepository _greenBookRepository;
        private readonly CTALogger _ctaLogger;
        public ChatrelPaymentController(DBConnectionInfo info)
        {
            _info = info;
            _chatrelPaymentRepository = new ChatrelPaymentRepository(info.sConnectionString);
            _chatrelPaymentVMRepository = new ChatrelPaymentVMRepository(info.sConnectionString);
            _greenBookRepository = new GreenbookRepository(info.sConnectionString);
            _ctaLogger = new CTALogger(info);
        }

        #region Add new Payment record
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddNewChatrelPayment(ChatrelPaymentVM payment)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    string message = _chatrelPaymentVMRepository.Add(payment);
                    if (message == "Records inserted successfully.")
                    {
                        #region Information Logging
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called", null, payment.chatrelPayment.nEnteredBy);
                        #endregion
                        return Ok(message);
                    }
                    return Problem(message);
                }
                catch (Exception ex)
                {
                    #region Exception Logging
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, payment.chatrelPayment.nEnteredBy);
                    #endregion

                    return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
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
        #endregion

        #region Get Payment Records
        [AuthorizeRole(FeatureID = 48)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetAllChatrelPayments()
        {
            try
            {
                IEnumerable<Object> result = _chatrelPaymentVMRepository.GetAllChatrelPayments();
                if (result != null && result.Count() > 0)
                {
                    #region Information Logging 
                    _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(result);
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                #region Exception Logging 

                _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        #endregion
        #region Display Chatrel Payment
        [HttpGet]
        [Route("[action]")]
        public IActionResult DisplayChatrelPayment(string sGBID)
        {
            if (String.IsNullOrEmpty(sGBID) || String.IsNullOrWhiteSpace(sGBID))
            {
                return BadRequest("Required parameters are missing.");
            }
            try
            {
                Object chatrel = _chatrelPaymentRepository.DisplayChatrelPayment(sGBID);
                if (chatrel != null)
                {
                    if (chatrel.ToString() == "Greenbook ID does not Exist.")
                    {
                        #region Information Logging 
                        _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                        #endregion
                        return NotFound(chatrel.ToString());
                    }
                    if (chatrel.ToString() == "Paid Until Value not found")
                    {
                        #region Information Logging 
                        _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                        #endregion
                        return NotFound("Paid Until data not available. Contact CTA.");
                    }
                    #region Information Logging 
                    _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(chatrel);
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 

                _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError);

            }
        }
        #endregion
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetFamilyDetails(string sGBID)
        {
            if (String.IsNullOrEmpty(sGBID) || String.IsNullOrWhiteSpace(sGBID))
            {
                return BadRequest("Required parameters are missing.");
            }
            try
            {
                Object familyDetails = _chatrelPaymentRepository.GetFamilyDetails(sGBID);
                if (familyDetails != null)
                {
                    #region Information Logging 
                    _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(familyDetails);
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 

                _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError);

            }
        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetPaymentHistory(string sGBID)
        {
            if (String.IsNullOrEmpty(sGBID) || String.IsNullOrWhiteSpace(sGBID))
            {
                return BadRequest("Required parameters are missing.");
            }
            try
            {
                Object paymentHistory = _chatrelPaymentRepository.GetPaymentHistory(sGBID);
                if (paymentHistory != null)
                {
                    #region Information Logging 
                    _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(paymentHistory);
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 

                _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError);

            }
        }


        [HttpGet]
        [Route("[action]")]
        public IActionResult VerifyFriendDetails(string sFirstName, string sLastName, string sGBID, DateTime dtDOB)
        {
            if (String.IsNullOrEmpty(sGBID) || String.IsNullOrWhiteSpace(sGBID) || String.IsNullOrEmpty(sFirstName) || String.IsNullOrWhiteSpace(sFirstName) || String.IsNullOrEmpty(sLastName) || String.IsNullOrWhiteSpace(sLastName))
            {
                return BadRequest("Required parameters are missing.");
            }
            if (dtDOB == null)
            {
                return BadRequest("Required parameters are missing.");
            }
            try
            {
                bool verified = _chatrelPaymentRepository.VerifyFriendDetails(sFirstName, sLastName, sGBID, dtDOB);
                if (verified)
                {
                    #region Information Logging 
                    _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(verified);
                }
                else
                {
                    return Ok(verified);
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 

                _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError);

            }
        }

        // Method of SubmitDispute not in use in Admin Module, hence removed it from here.


        [AuthorizeRole(FeatureID = 50)]
        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> SearchUsers(string sGBID, string sFirstName = null, string sFathersName = null, string sMothersName = null)
        {
            if (String.IsNullOrEmpty(sGBID.Trim()))
            {
                return BadRequest("Greenbook Id not provided");
            }
            try
            {
                IEnumerable<object> result = await _chatrelPaymentVMRepository.SearchUsers(sGBID, sFirstName, sFathersName, sMothersName);
                if (result.Count() > 0)
                {
                    #region Information Logging 
                    _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(result);
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 

                _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }


        [AuthorizeRole(FeatureID = 50)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetUserProfileFromGBID(string sGBID)
        {
            if (String.IsNullOrEmpty(sGBID.Trim()))
            {
                return BadRequest("Greenbook Id not provided");
            }
            try
            {
                Object result = _chatrelPaymentVMRepository.GetUserProfileFromGBID(sGBID);
                if (result != null)
                {
                    #region Information Logging 
                    _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(result);
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 

                _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }


        [AuthorizeRole(FeatureID = 49)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetPaymentBreakup(string receiptNumber)
        {
            if (String.IsNullOrEmpty(receiptNumber.Trim()))
            {
                return BadRequest("Receipt Number not provided");
            }
            try
            {
                IEnumerable<Object> result = _chatrelPaymentVMRepository.GetPaymentBreakup(receiptNumber);
                if (result != null && result.Count() > 0)
                {
                    #region Information Logging 
                    _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(result);
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 

                _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }


        [AuthorizeRole(FeatureID = 52)]
        [HttpPost]
        [Route("[action]")]
        public IActionResult GetChatrelPaymentReport([FromBody] ChatrelReportVM chatrelReportVM)
        {

            try
            {
                IEnumerable<Object> result = _chatrelPaymentVMRepository.GetChatrelPaymentReport(chatrelReportVM);
                if (result != null && result.Count() > 0)
                {
                    #region Information Logging 
                    _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(result);
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 

                _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        #region Quick Search in Chatrel List
        //[AuthorizeRole(FeatureID = 52)]
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> GetQuickChatrelList([FromBody] Dictionary<string, string> searchParams = null)
        {
            try
            {
                IEnumerable<Object> result = await _chatrelPaymentVMRepository.GetQuickChatrelList(searchParams);

                if (result != null && result.Count() > 0)
                {
                    #region Information Logging 
                    _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(result);
                }
                else
                {
                    return Ok("No Data");
                }

            }
            catch (Exception ex)
            {
                #region Exception Logging 
                _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        #endregion


        #region UpdateGoogleAccount
        [AuthorizeRole(FeatureID = 50)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult UpdateGoogleAccount(string sGBID,string sLoginGmail)
        {
            if (String.IsNullOrEmpty(sGBID) || String.IsNullOrWhiteSpace(sLoginGmail))
            {
                return BadRequest("Required parameters are missing.");
            }
            try
            {
                string userId = User.Claims.Where(claim => claim.Type == ClaimTypes.Name).Select(claim => claim.Value).FirstOrDefault();
                DateTime dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                var result = _greenBookRepository.UpdateGoogleAccount(sGBID, sLoginGmail, userId, dtUpdated);
                //Object familyDetails = _chatrelPaymentRepository.GetFamilyDetails(sGBID);
                if (result)
                {
                    #region Information Logging 
                    _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok();
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 

                _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError);

            }
        }
        #endregion

        #region Chatrel Defaulter List
        [AuthorizeRole(FeatureID = 50)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetDefaulterList(int? nAuthRegionID = null, string sCountryID = null)
        {
            try
            {
                string userId = User.Claims.Where(claim => claim.Type == ClaimTypes.Name).Select(claim => claim.Value).FirstOrDefault();
                DateTime dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                string message = String.Empty;
                var result = _greenBookRepository.GetDefaulterList(nAuthRegionID, sCountryID, out message);
                //Object familyDetails = _chatrelPaymentRepository.GetFamilyDetails(sGBID);
                if (result.Count() > 0)
                {
                    #region Information Logging 
                    _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(new { result, message });
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 

                _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError);

            }
        }
        #endregion
    }
}

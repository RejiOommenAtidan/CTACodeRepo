using ChatrelDBL.BaseClasses.Transactions;
using ChatrelDBL.BaseClassRepositories.Masters;
using ChatrelDBL.BaseClassRepositories.Transactions;
using ChatrelDBL.Entities;
using ChatrelDBL.ViewModels;
using ChatrelDBL.ViewModelsRepositories;
using ChatrelPaymentWebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Core.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using MailKit.Net.Smtp;
using MimeKit;

namespace ChatrelPaymentWebAPI.Controllers
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
        private readonly GreenbookRepository _greenbookRepository;
        private readonly ChatrelLogger _chatrelLogger;

        public ChatrelPaymentController(DBConnectionInfo info)
        {
            _info = info;
            _chatrelPaymentRepository = new ChatrelPaymentRepository(info.sConnectionString);
            _chatrelPaymentVMRepository = new ChatrelPaymentVMRepository(info.sConnectionString);
            _greenbookRepository = new GreenbookRepository(info.sConnectionString);
            _chatrelLogger = new ChatrelLogger(info);
            
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
                    Object message = _chatrelPaymentVMRepository.Add(payment);
                    if (message != null)
                    {
                        #region Information Logging
                        _chatrelLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called", null, payment.chatrelPayment.nEnteredBy);
                        #endregion
                        return Ok(message);
                    }
                    return Problem(message.ToString());
                }
                catch (Exception ex)
                {
                    #region Exception Logging
                    _chatrelLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, payment.chatrelPayment.nEnteredBy);
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
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetAllChatrelPayments()
        {
            try
            {
                IEnumerable<ChatrelPayment> result = _chatrelPaymentRepository.GetAllChatrelPayments();
                if (result != null && result.Count() > 0)
                {
                    #region Information Logging 
                    _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(result);
                }
                return NoContent();
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
                        _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", "", Convert.ToInt32(sGBID));
                        #endregion
                        return NotFound(chatrel.ToString());
                    }
                    if (chatrel.ToString() == "Paid Until Value not found")
                    {
                        #region Information Logging 
                        _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", "", Convert.ToInt32(sGBID));
                        #endregion
                        return NotFound("Paid Until data not available. Contact CTA.");
                    }
                    #region Information Logging 
                    _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", "", Convert.ToInt32(sGBID));
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

                _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, Convert.ToInt32(sGBID));
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError);

            }
        }

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
                Object chatrel = _chatrelPaymentRepository.GetFamilyDetails(sGBID);
                if (chatrel != null)
                {
                    #region Information Logging 
                    _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called","", Convert.ToInt32(sGBID));
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

                _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, Convert.ToInt32(sGBID));
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
                    _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", "", Convert.ToInt32(sGBID));
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

                _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, Convert.ToInt32(sGBID));
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
                    _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", "", Convert.ToInt32(sGBID));
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

                _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, Convert.ToInt32(sGBID));
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError);

            }
        }

        #region Submit Dispute
        [HttpPost]
        [Route("[action]")]
        public IActionResult SubmitDispute(Dictionary<string, dynamic> dict)
        {

            //To do: Add attachment to the email.

            var mailText = dict["description"].ToString();
            string attachment = dict["file"].ToString();
            var sName = dict["sName"].ToString();
            var sGBID = dict["sGBID"].ToString();
            var sFileName = dict["sTitle"].ToString();
            var sFileExtension= dict["sFileExtension"].ToString();
            var emailFrom = "aayush.pandya@atidan.com";
            var emailTo = "aayushpandya.dev@gmail.com";

            attachment = attachment.Substring(attachment.IndexOf("base64,") + 7);

            byte[] attach = Convert.FromBase64String(attachment);

            MimeMessage message = new MimeMessage();
            MailboxAddress from = new MailboxAddress(sName, emailFrom);
            MailboxAddress to = new MailboxAddress("CTA Team", emailTo);

            BodyBuilder messageBody = new BodyBuilder();
            messageBody.TextBody = mailText;
            messageBody.Attachments.Add(sFileName+"."+sFileExtension, attach);


            message.From.Add(from);
            message.To.Add(to);
            message.Subject = String.Format("Email from {0}, GreenBook Id: {1}", sName, sGBID);

            message.Date = DateTime.Now;
            message.Body = messageBody.ToMessageBody();
            // Message ready. Now to use smtp client to despatch message
            SmtpClient smtpClient = new SmtpClient();
            smtpClient.Connect("smtp-mail.outlook.com", 25, false);
            smtpClient.Authenticate("aayush.pandya@atidan.com", "A@yush@123");
            smtpClient.Send(message);
            smtpClient.Disconnect(true);
            smtpClient.Dispose();
            return Ok("Email sent successfully.");

        }
        #endregion


        #region Authenticate User
        [HttpPost]
        [Route("[action]")]
        //public IActionResult AuthenticateGBID(string sGBID, DateTime dtDOB, string sEmail, string sFirstName, string sLastName)
        public IActionResult AuthenticateGBID(Dictionary<string, string> dict)
        {
            string sGBID = dict.ContainsKey("sGBID") ? dict["sGBID"] : "";
            string sEmail = dict.ContainsKey("sEmail") ? dict["sEmail"] : "";
            string sFirstName = dict.ContainsKey("sFirstName") ? dict["sFirstName"] : "";
            string sLastName = dict.ContainsKey("sLastName") ? dict["sLastName"] : "";
            DateTime? dtDOB = dict.ContainsKey("dtDOB") ? (DateTime?)DateTime.Parse(dict["dtDOB"]) : null;

            if (String.IsNullOrEmpty(sGBID) || String.IsNullOrWhiteSpace(sGBID) || String.IsNullOrWhiteSpace(sEmail) || String.IsNullOrEmpty(sEmail) || String.IsNullOrEmpty(sFirstName) || String.IsNullOrWhiteSpace(sFirstName) || String.IsNullOrEmpty(sLastName) || String.IsNullOrWhiteSpace(sLastName) || dtDOB == null )
            {
                return BadRequest("Parameters invalid.");
            }
            else
            {
                try
                {
                    Greenbook greenbook = _greenbookRepository.GetGreenbookByGBID(sGBID);
                    if (greenbook.dtDOB == dtDOB && greenbook.sEmail == sEmail /*&& greenbook.sFirstName == sFirstName && greenbook.sLastName == sLastName*/)
                    {
                        #region Information Logging 
                        _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called",null,Convert.ToInt32(greenbook.sGBID));
                        #endregion


                        // should we set a cookie or a token?
                        return Ok("Verified");
                    }
                    else
                    {
                        return Ok("Failed");
                    }
                }
                catch (Exception ex)
                {
                    #region Exception Logging 

                    _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                    #endregion
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }
            
            
        }
        #endregion
       // [Authorize]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetReceipt(string sReceiptNumber)
        {
            // User.
            if (String.IsNullOrEmpty(sReceiptNumber.Trim()))
            {
                return BadRequest();
            }
            try
            {
                var receipt = _chatrelPaymentVMRepository.GetReceipt(sReceiptNumber);
                if(receipt != null)
                {
                    return Ok(receipt);
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        //[HttpGet]
        //[Route("[action]")]
        //public IActionResult GoogleLogin()
        //{
            
        //}

    }
}

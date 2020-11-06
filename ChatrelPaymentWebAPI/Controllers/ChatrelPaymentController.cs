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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

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
        private readonly ChatrelLogger _chatrelLogger;
        public ChatrelPaymentController(DBConnectionInfo info)
        {
            _info = info;
            _chatrelPaymentRepository = new ChatrelPaymentRepository(info.sConnectionString);
            _chatrelPaymentVMRepository = new ChatrelPaymentVMRepository(info.sConnectionString);
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
                    string message = _chatrelPaymentVMRepository.Add(payment);
                    if (message == "Records inserted successfully.")
                    {
                        #region Information Logging
                        _chatrelLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called", null, payment.chatrelPayment.nEnteredBy);
                        #endregion
                        return Ok(message);
                    }
                    return Problem(message);
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
                    #region Information Logging 
                    _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
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

                _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
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
                    _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
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

                _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError);

            }
        }

    }
}

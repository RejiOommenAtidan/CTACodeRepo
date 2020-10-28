using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Masters;
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

namespace CTAWebAPI.Controllers
{
    [Authorize]
    [EnableCors("AllowOrigin")]
    //[APIKeyAuth]
    [Route("api/[controller]")]
    [ApiController]
    public class ChatrelPaymentController : ControllerBase
    {
        private readonly DBConnectionInfo _info;
        private readonly ChatrelPaymentRepository _chatrelPaymentRepository;
        private readonly CTALogger _ctaLogger;
        public ChatrelPaymentController(DBConnectionInfo info)
        {
            _info = info;
            _chatrelPaymentRepository = new ChatrelPaymentRepository(info.sConnectionString);
            _ctaLogger = new CTALogger(info);
    }

        #region Add new Payment record
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddNewChatrelPayment(ChatrelPayment payment)
        {
            if(ModelState.IsValid)
            {
                try
                {
                    int success = _chatrelPaymentRepository.Add(payment);
                    if(success > 0)
                    {
                        #region Information Logging
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called", null, payment.nEnteredBy);
                        #endregion
                        return Ok();
                    }
                    return Problem("There was a problem in this Payment Transaction");
                }
                catch(Exception ex)
                {
                    #region Exception Logging
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, payment.nEnteredBy);
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

        public IActionResult GetAllChatrelPayments()
        {
            try
            {
                IEnumerable<ChatrelPayment> result = _chatrelPaymentRepository.GetAllChatrelPayments();
                if(result != null && result.Count() > 0)
                {
                    #region Information Logging 
                    _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(result);
                }
                return NoContent();
            }
            catch(Exception ex)
            {
                #region Exception Logging 
                
                _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        #endregion


    }
}

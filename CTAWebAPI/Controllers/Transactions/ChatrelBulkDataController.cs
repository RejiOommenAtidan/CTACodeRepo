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


namespace CTAWebAPI.Controllers.Transactions
{
    //[Authorize]
    [EnableCors("AllowOrigin")]
    //[APIKeyAuth]
    [Route("api/[controller]")]
    [ApiController]
    public class ChatrelBulkDataController : ControllerBase
    {

        private readonly DBConnectionInfo _info;
        private readonly ChatrelBulkDataRepository _chatrelBulkDataRepository;
        private readonly CTALogger _ctaLogger;
        public ChatrelBulkDataController(DBConnectionInfo info)
        {
            _info = info;
            _chatrelBulkDataRepository = new ChatrelBulkDataRepository(info.sConnectionString);
            _ctaLogger = new CTALogger(info);
        }

        [HttpPost]
        [Route("[action]")]
        public IActionResult VerifyBulkImport(IEnumerable<ChatrelBulkData> chatrelBulkData)
        {
            if (chatrelBulkData == null || chatrelBulkData.Count() <= 0)
            {
                return BadRequest("Null object");
            }
            try
            {
                string sBatchNumber = _chatrelBulkDataRepository.InsertBulkImport(chatrelBulkData);
                if (!String.IsNullOrEmpty(sBatchNumber))
                {

                    var data = _chatrelBulkDataRepository.GetChatrelBulkDataByBatchNumber(sBatchNumber);

                    #region Information Logging 
                    _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(data);
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

        [HttpPost]
        [Route("[action]")]
        public IActionResult SubmitBulkData(string sBatchNumber)
        {
            if (String.IsNullOrEmpty(sBatchNumber.Trim()))
            {
                return BadRequest("No data");
            }
            try
            {
                bool result = _chatrelBulkDataRepository.SubmitBulkData(sBatchNumber);
                if (result)
                {
                    return Ok();
                }
                else
                {
                    return Problem("Problem saving Bulk Data");
                }
            }
            catch(Exception ex)
            {
                #region Exception Logging 

                _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}

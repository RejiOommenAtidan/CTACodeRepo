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
        [AuthorizeRole(FeatureID = 51)]
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
                (string sBatchNumber, bool status) = _chatrelBulkDataRepository.InsertBulkImport(chatrelBulkData);
                if (status)
                {
                    var data = _chatrelBulkDataRepository.GetChatrelBulkDataByBatchNumber(sBatchNumber);

                    #region Information Logging 
                    _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(data);
                }
                else
                {
                    _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + sBatchNumber);
                    return StatusCode(StatusCodes.Status500InternalServerError, sBatchNumber);
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 

                _ctaLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [AuthorizeRole(FeatureID = 51)]
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
                int result = _chatrelBulkDataRepository.SubmitBulkData(sBatchNumber);
                if (result >= 0)
                {
                    return Ok(result);
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
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}

using CTADBL.BaseClasses.Masters;
using CTADBL.BaseClassRepositories.Masters;
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

namespace CTAWebAPI.Controllers.Masters
{
    [Authorize]
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    //[APIKeyAuth]
    [ApiController]
    public class ChatrelController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly ChatrelRepository _chatrelRepository;
        private readonly CTALogger _ctaLogger;
        public ChatrelController(DBConnectionInfo info)
        {
            _info = info;
            _chatrelRepository = new ChatrelRepository(_info.sConnectionString);
            _ctaLogger = new CTALogger(_info);
        }
        #endregion

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetAllChatrel()
        {
            #region Get All Chatrel
            try
            {

                IEnumerable<Chatrel> chatrels = _chatrelRepository.GetAllChatrel();
                #region Information Logging 
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion
                return Ok(chatrels);
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        [HttpGet("GetChatrelById/ID={ID}")]
        [Route("[action]")]
        public IActionResult GetChatrelById(string ID)
        {
            #region Get Single Chatrel
            try
            {

                Chatrel chatrel = _chatrelRepository.GetChatrelById(ID);

                #region Information Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion

                return Ok(chatrel);
            }
            catch (Exception ex)
            {
                #region Exception Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Add Call
        //TODO: Tell
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddChatrel(Chatrel chatrel)
        {
            #region Add Chatrel
            try
            {
                if (ModelState.IsValid)
                {
                    chatrel.dtEntered = DateTime.Now;

                    _chatrelRepository.Add(chatrel);

                    #region Information Logging
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called", null, chatrel.nEnteredBy);
                    #endregion

                    return Ok(chatrel);
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, chatrel.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Edit Call
        [HttpPost("EditChatrel/ID={ID}")]
        [Route("[action]")]
        public IActionResult EditChatrel(string ID, [FromBody] Chatrel chatrel)
        {
            #region Edit Chatrel
            try
            {
                if (ModelState.IsValid)
                {

                    if (ChatrelExists(ID))
                    {
                        Chatrel fetchedChatrel = _chatrelRepository.GetChatrelById(ID);
                        chatrel.dtEntered = fetchedChatrel.dtEntered;
                        _chatrelRepository.Update(chatrel);

                        #region Audit Log
                        CTALogger.LogAuditRecord(fetchedChatrel, chatrel, null, null, 25, fetchedChatrel.Id, chatrel.nEnteredBy);
                        #endregion

                        #region Alert Logging 
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", null, chatrel.nEnteredBy);
                        #endregion

                        return Ok("Chatrel with ID: " + ID + " updated Successfully");
                    }
                    else
                    {
                        return BadRequest("Chatrel with ID:" + ID + " does not exist");
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, chatrel.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Delete Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult DeleteChatrel(Chatrel chatrel)
        {
            #region Delete Chatrel
            try
            {
                //TODO: check for correct way of sending string from body
                string chatrelID = chatrel.Id.ToString();
                if (!string.IsNullOrEmpty(chatrelID))
                {
                    if (ChatrelExists(chatrelID))
                    {

                        Chatrel fetchedChatrel = _chatrelRepository.GetChatrelById(chatrelID);
                        _chatrelRepository.Delete(fetchedChatrel);

                        #region Alert Logging 
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", null, chatrel.nEnteredBy);
                        #endregion


                        return Ok("Chatrel with ID: " + fetchedChatrel + " removed Successfully");
                    }
                    else
                    {
                        return BadRequest("Chatrel with ID: " + chatrelID + " does not exist");
                    }
                }
                else
                {
                    return BadRequest("Chatrel Id Cannot be NULL");
                }

            }
            catch (Exception ex)
            {
                #region Exception Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 4), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, chatrel.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Check if Chatrel Exists
        private bool ChatrelExists(string ID)
        {
            try
            {
                Chatrel fetchedChatrel = _chatrelRepository.GetChatrelById(ID);
                if (fetchedChatrel != null)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Exception in Chatrel Exists Function, Exception Message: " + ex.Message);
            }
        }
        #endregion
    }
}

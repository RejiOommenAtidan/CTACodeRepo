//using CTADBL.BaseClasses;
//using CTADBL.BaseClassRepositories;
//using CTADBL.Entities;
//using Microsoft.AspNetCore.Cors;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text.Json;

//namespace CTAWebAPI.Controllers.Transactions
//{
//    [EnableCors("AllowOrigin")]
//    //[APIKeyAuth]
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ActionLoggerController : ControllerBase
//    {
//        #region Constructor
//        private readonly DBConnectionInfo _info;
//        private readonly ActionLoggerRepository _actionLoggerRepository;
//        public ActionLoggerController(DBConnectionInfo info)
//        {
//            _info = info;
//            _actionLoggerRepository = new ActionLoggerRepository(_info.sConnectionString);
//        }
//        #endregion

//        #region Get Calls
//        [HttpGet]
//        [Route("[action]")]
//        public IActionResult GetActionLogs()
//        {
//            #region Get All Users
//            try
//            {
//                IEnumerable<ActionLogger> allActionLogs = _actionLoggerRepository.GetAllLogs();
//                return Ok(allActionLogs);
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
//            }
//            #endregion
//        }

//        [HttpGet("GetActionLog/Id={Id}")]
//        [Route("[action]")]
//        public IActionResult GetActionLog(string Id)
//        {
//            #region Get Single Action Log
//            try
//            {
//                ActionLogger singleActionLogger = _actionLoggerRepository.GetLogById(Id);
//                return Ok(singleActionLogger);
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
//            }
//            #endregion
//        }
//        #endregion

//        #region Add Call
//        [HttpPost]
//        [Route("[action]")]
//        public IActionResult AddActionLogger(ActionLogger actionLogger)
//        {
//            #region Add User
//            try
//            {
//                if (ModelState.IsValid)
//                {
//                    if (actionLogger == null)
//                    {
//                        return BadRequest("Action Logger object cannot be NULL");
//                    }
//                    //FORMAT
//                    //actionLogger.dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time")).ToString("yyyy-MM-dd HH:mm:ss");
//                    //user.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time")).ToString("yyyy-MM-dd HH:mm:ss");

//                    _actionLoggerRepository.Add(actionLogger);
//                    return Ok(actionLogger);
//                }
//                else
//                {
//                    var errors = ModelState.Select(x => x.Value.Errors)
//                               .Where(y => y.Count > 0)
//                               .ToList();
//                    return BadRequest(errors);
//                }
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
//            }
//            #endregion
//        }
//        #endregion

//        #region Edit Call
//        [HttpPost("EditActionLogger/Id={Id}")]
//        [Route("[action]")]
//        public IActionResult EditActionLogger(string Id, [FromBody] ActionLogger actionLogger)
//        {
//            #region Edit Action Logger
//            try
//            {
//                if (ModelState.IsValid)
//                {
//                    if (Id == null)
//                    {
//                        return BadRequest("Action Logger Param ID cannot be NULL");
//                    }
//                    if (actionLogger == null)
//                    {
//                        return BadRequest("Action Logger object cannot be NULL");
//                    }
//                    if (Id != actionLogger.Id.ToString())
//                    {
//                        return BadRequest("ID's ain't Matching");
//                    }
//                    if (ActionLoggerExists(Id))
//                    {
//                        _actionLoggerRepository.Update(actionLogger);
//                        return Ok("Action Logger with ID: " + Id + " updated Successfully");
//                    }
//                    else
//                    {
//                        return BadRequest("Action Logger with ID:" + Id + " does not exist");
//                    }
//                }
//                else
//                {
//                    var errors = ModelState.Select(x => x.Value.Errors)
//                               .Where(y => y.Count > 0)
//                               .ToList();
//                    return BadRequest(errors);
//                }
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
//            }
//            #endregion
//        }
//        #endregion

//        #region Delete Call
//        [HttpPost]
//        [Route("[action]")]
//        public IActionResult DeleteActionLogger(object body)
//        {
//            #region Delete User
//            try
//            {
//                //TODO: check for correct way of sending string from body
//                string Id = JsonSerializer.Serialize(body);

//                if (!string.IsNullOrEmpty(Id))
//                {
//                    if (ActionLoggerExists(Id))
//                    {
//                        ActionLogger fetchedActionLogger = _actionLoggerRepository.GetLogById(Id);
//                        _actionLoggerRepository.Delete(fetchedActionLogger);
//                        return Ok("Action Logger with ID: " + Id + " removed Successfully");
//                    }
//                    else
//                    {
//                        return BadRequest("Action Logger with ID: " + Id + " does not exist");
//                    }
//                }
//                else
//                {
//                    return BadRequest("Action Logger Id Cannot be null");
//                }

//            }
//            catch (Exception ex)
//            {
//                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
//            }
//            #endregion
//        }
//        #endregion

//        #region Check if Action Logger Exists
//        private bool ActionLoggerExists(string Id)
//        {
//            try
//            {
//                ActionLogger fetchedActionLog = _actionLoggerRepository.GetLogById(Id);
//                if (fetchedActionLog != null)
//                    return true;
//                else
//                    return false;
//            }
//            catch (Exception ex)
//            {
//                throw new Exception("Exception in Action Logger Exists Function, Exception Message: " + ex.Message);
//            }
//        }
//        #endregion
//    }
//}

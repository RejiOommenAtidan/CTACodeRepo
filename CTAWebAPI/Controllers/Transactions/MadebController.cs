using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Transactions;
using CTADBL.Entities;
using CTADBL.ViewModels;
using CTADBL.ViewModelsRepositories;
using CTAWebAPI.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace CTAWebAPI.Controllers.Transactions
{
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    //[APIKeyAuth]
    [ApiController]
    public class MadebController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly MadebRepository _madebRepository;
        private readonly MadebNewRecordVMRepository _madebNewRecordVMRepository;
        public MadebController(DBConnectionInfo info)
        {
            _info = info;
            _madebRepository = new MadebRepository(_info.sConnectionString);
            _madebNewRecordVMRepository = new MadebNewRecordVMRepository(_info.sConnectionString);
        }
        #endregion

        #region Get Calls

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetNewEmptyMadeb()
        {
            #region Get Users using SP call
            try
            {
                MadebNewRecordVM madebNewRecord = _madebNewRecordVMRepository.GetNewEmptyMadeb();
                if (madebNewRecord != null)
                {
                    return Ok(madebNewRecord);
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }


            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }


        [HttpGet]
        [Route("[action]")]
        public IActionResult GetMadebs()
        {
            #region Get All Madebs
            try
            {
                IEnumerable<Madeb> madebs = _madebRepository.GetAllMadebs();
                if(madebs.Count() > 0)
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
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, ex.StackTrace);
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
                Madeb madeb = _madebRepository.GetMadebById(Id);
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
                else {
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
        

        [HttpGet("GetMadebsByType/MadebType={madebType}")]
        [Route("[action]")]
        public IActionResult GetMadebsByType(int madebType)
        {
            #region Get Madeb
            try
            {
                IEnumerable<Madeb> madebs = _madebRepository.GetMadebsByType(madebType);
                if(madebs.Count() > 0)
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
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, ex.StackTrace);
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
                Madeb madeb = _madebRepository.GetMadebByFormNumber(formNumber);
                if(madeb != null)
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

        [HttpGet("GetMadebByAuthRegion/authRegion={authRegion}")]
        [Route("[action]")]
        public IActionResult GetMadebByAuthRegion(int authRegion)
        {
            #region Get Madeb
            try
            {
                IEnumerable<Madeb> madebs = _madebRepository.GetMadebByAuthRegion(authRegion);
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


        [HttpGet]
        [Route("[action]")]
        public IActionResult GetFormsWithoutGBId()
        {
            try
            {
                Object forms = _madebRepository.GetFormsWithoutGBId();
                return Ok(forms);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            
        }

        [HttpGet("GetMadebforIssueBook/GBId={GBId}")]
        [Route("[action]")]
        public IActionResult GetMadebforIssueBook(string GBId)
        {
            Object forms = _madebRepository.GetMadebforIssueBook(GBId);
            return Ok(forms);
        }




        #endregion

        #region Add Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddMadeb(Madeb madeb)
        {
            #region Add Madeb
            try
            {
                if (ModelState.IsValid)
                {
                    madeb.dtEntered = DateTime.Now;
                    madeb.dtUpdated = DateTime.Now;
                    _madebRepository.Add(madeb);

                    #region Information Logging 
                    string sActionType = Enum.GetName(typeof(Operations), 1);
                    string sModuleName = (GetType().Name).Replace("Controller", "");
                    string sEventName = Enum.GetName(typeof(LogLevels), 1);
                    string currentMethodName = MethodBase.GetCurrentMethod().Name;
                    string sDescription = currentMethodName + " Method Called";
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, null, madeb.nEnteredBy);
                    #endregion

                    return Ok(madeb);
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
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription,ex.StackTrace, madeb.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Edit Call
        [HttpPost("EditMadeb/Id={Id}")]
        [Route("[action]")]
        public IActionResult EditMadeb(string Id, [FromBody] Madeb madeb)
        {
            #region Edit Madeb
            try
            {
                if (ModelState.IsValid)
                {
                    if (Id == null)
                    {
                        return BadRequest("Madeb Param ID cannot be NULL");
                    }

                    if (Id != madeb.Id.ToString())
                    {
                        return BadRequest("Madeb ID's ain't Matching");
                    }
                    if (MadebExists(Id))
                    {
                        Madeb fetchedMadeb = _madebRepository.GetMadebById(Id);
                        madeb.dtEntered = fetchedMadeb.dtEntered;
                        madeb.dtUpdated = DateTime.Now;
                        _madebRepository.Update(madeb);
                        #region Alert Logging 
                        string sActionType = Enum.GetName(typeof(Operations), 3);
                        string sModuleName = (GetType().Name).Replace("Controller", "");
                        string sEventName = Enum.GetName(typeof(LogLevels), 2);
                        string currentMethodName = MethodBase.GetCurrentMethod().Name;
                        string sDescription = currentMethodName + " Method Called";
                        CTALogger logger = new CTALogger(_info);
                        logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, null, madeb.nEnteredBy);
                        #endregion

                        
                        return Ok("Madeb with ID: " + Id + " updated Successfully");
                    }
                    else
                    {
                        return BadRequest("Madeb with ID:" + Id + " does not exist");
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
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription,ex.StackTrace, madeb.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Delete Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult DeleteMadeb(Madeb madeb)
        {
            #region Delete Madeb
            try
            {
                //string m1 = JsonConvert.SerializeObject(madeb);
                string madebID = madeb.Id.ToString();
                if (!string.IsNullOrEmpty(madebID))
                {
                    if (MadebExists(madebID))
                    {
                        Madeb fetchedMadeb = _madebRepository.GetMadebById(madebID);
                        //if (JsonConvert.SerializeObject(madeb) == JsonConvert.SerializeObject(fetchedMadeb))
                        if(madeb.Id == fetchedMadeb.Id)
                        {
                            _madebRepository.Delete(fetchedMadeb);
                            #region Alert Logging 
                            string sActionType = Enum.GetName(typeof(Operations), 4);
                            string sModuleName = (GetType().Name).Replace("Controller", "");
                            string sEventName = Enum.GetName(typeof(LogLevels), 2);
                            string currentMethodName = MethodBase.GetCurrentMethod().Name;
                            string sDescription = currentMethodName + " Method Called";
                            CTALogger logger = new CTALogger(_info);
                            logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, null, madeb.nEnteredBy);
                            #endregion

                            return Ok("Madeb with ID: " + madebID + " removed Successfully");
                        }
                        else
                        {
                            return BadRequest("Madeb Object does not match with Database");
                        }
                    }
                    else
                    {
                        return BadRequest("Madeb with ID: " + madebID + " does not exist");
                    }
                }
                else
                {
                    return BadRequest("Madeb Id Cannot be null");
                }

            }
            catch (Exception ex)
            {
                #region Exception Logging 
                string sActionType = Enum.GetName(typeof(Operations), 4);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 3);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = "Exception in " + currentMethodName;
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription,ex.StackTrace, madeb.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Check if Madeb Exists
        private bool MadebExists(string Id)
        {
            try
            {
                Madeb fetchedMadeb = _madebRepository.GetMadebById(Id);
                if (fetchedMadeb != null)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Exception in Madeb Exists Function, Exception Message: " + ex.Message);
            }
        }
        #endregion
    }
}

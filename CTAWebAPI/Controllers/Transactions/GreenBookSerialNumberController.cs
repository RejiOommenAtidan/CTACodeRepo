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
    [Authorize]
    [EnableCors("AllowOrigin")]
    //[APIKeyAuth]
    [Route("api/[controller]")]
    [ApiController]
    public class GreenBookSerialNumberController : ControllerBase
    {

        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly GreenBookSerialNumberRepository _greenBookSerialNumberRepository;
        private readonly GreenBookSerialNumberVMRepository _greenBookSerialNumberVMRepository;
        private readonly GreenBookSerialNewRecordRepository _greenBookSerialNewRecordRepository;
        private readonly MadebRepository _madebRepository;
        private readonly CTALogger _ctaLogger;
        public GreenBookSerialNumberController(DBConnectionInfo info)
        {
            _info = info;
            _greenBookSerialNumberRepository = new GreenBookSerialNumberRepository(_info.sConnectionString);
            _greenBookSerialNumberVMRepository = new GreenBookSerialNumberVMRepository(_info.sConnectionString);
            _greenBookSerialNewRecordRepository = new GreenBookSerialNewRecordRepository(_info.sConnectionString);
            _madebRepository = new MadebRepository(_info.sConnectionString);
            _ctaLogger = new CTALogger(_info);
        }
        #endregion

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetGreenBookSerialNumbers(DateTime? dtFrom = null, DateTime? dtUpto = null, int? nBookNo = null)
        {
            #region Get GreenBookSerialNumbers limit by 'records'.
            try
            {
                int records = Convert.ToInt32(CTAConfigRepository.GetValueByKey("SelectTotalRecordCount"));
                IEnumerable<GreenBookSerialNumberVM> result = _greenBookSerialNumberVMRepository.GetGreenBookSerialNumbers(records, dtFrom, dtUpto, nBookNo);

                if (result != null)
                {
                    #region Information Logging 
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion

                    return Ok(result);
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }

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

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetGreenBookSerialNumberBySerialNumber(int serialNumber)
        {
            #region Get single record by Passing the Green Book serial number
            try
            {
                GreenBookSerialNumberVM result = _greenBookSerialNumberVMRepository.GetGreenBookSerialNumberBySerialNumber(serialNumber);

                if (result != null)
                {
                    #region Information Logging 
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion

                    return Ok(result);
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }

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

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetGreenBookByDateRange(DateTime start, DateTime end)
        {
            #region Get GreenBookSerialNumbers by Date Range
            try
            {
                IEnumerable<GreenBookSerialNumberVM> result = _greenBookSerialNumberVMRepository.GetGreenBookByDateRange(start, end);

                if (result != null)
                {
                    #region Information Logging 
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion

                    return Ok(result);
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }

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

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetNewEmptyGreenBookSerialRecord()
        {
            #region Get New Empty GreenBookSerialNumber Record
            try
            {
                GreenBookSerialNewRecord emptyRecord = _greenBookSerialNewRecordRepository.GetNewEmptyGreenBookSerialRecord();
                if(emptyRecord != null)
                {
                    #region Information Logging 
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(emptyRecord);
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }
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
        
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetGreenBookSerialNumberAssignList()
        {
            #region Get List of Assignable Serial Number records from Madeb Table.
            try
            {
                Object result = _greenBookSerialNumberVMRepository.GetGreenBookSerialNumberAssignList();
                if (result != null)
                {
                    #region Information Logging 
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(result);
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }
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

        #region Add Calls
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddGreenBookSerialNumber(GreenBookSerialNumber gbsn)
        {
            #region Add GreenbookBook Serial Number
            try
            {
                if (ModelState.IsValid)
                {
                    gbsn.dtEntered = DateTime.Now;
                    gbsn.dtUpdated = DateTime.Now;
                    _greenBookSerialNumberRepository.Add(gbsn);
                    int? nCurrentGBSno = (int?)gbsn.nBookNo;
                    int nIssuedOrNotID = 1;
                    _madebRepository.UpdateSerialNumber(gbsn.sGBID, (int)gbsn.nFormNumber, nCurrentGBSno, nIssuedOrNotID);

                    #region Information Logging 
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called", null, gbsn.nEnteredBy);
                    #endregion

                    return Ok(gbsn);
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, gbsn.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Edit Call
        [HttpPost("EditGreenbookSerialNumber/Id={Id}")]
        [Route("[action]")]
        public IActionResult EditGreenBookSerialNumber(string Id, [FromBody] GreenBookSerialNumber gbsn)
        {
            #region Edit Greenbook Serial Number
            try
            {
                if (ModelState.IsValid)
                {
                    if (Id == null)
                    {
                        return BadRequest("Id is NULL");
                    }

                    if (Id != gbsn.Id.ToString())
                    {
                        return BadRequest("Id not matching with Object");
                    }

                    GreenBookSerialNumber fetch = _greenBookSerialNumberRepository.GetGreenBookSerialNumberById(Convert.ToInt32(Id));
                    if (fetch != null)
                    {
                        gbsn.nEnteredBy = fetch.nEnteredBy;
                        gbsn.dtEntered = fetch.dtEntered;
                        gbsn.dtUpdated = DateTime.Now;
                        _greenBookSerialNumberRepository.Update(gbsn);

                        #region Audit Log
                        CTALogger.LogAuditRecord(fetch, gbsn, fetch.sGBID, fetch.nAuthRegionId, 11, fetch.Id, gbsn.nUpdatedBy);
                        #endregion

                        #region Alert Logging 
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", null, gbsn.nUpdatedBy);
                        #endregion

                        return Ok("Greenbook with ID: " + Id + " updated Successfully");
                    }
                    else
                    {
                        return BadRequest("Greenbook with ID:" + Id + " does not exist");
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, gbsn.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion
    }
}

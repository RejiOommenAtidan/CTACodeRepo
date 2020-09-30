using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Transactions;
using CTADBL.ViewModelsRepositories;
using CTADBL.ViewModels;
using CTADBL.Entities;
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
    //[APIKeyAuth]
    [Route("api/[controller]")]
    [ApiController]
    public class GreenBookSerialNumberController : ControllerBase
    {
        
        private readonly DBConnectionInfo _info;
        private readonly GreenBookSerialNumberRepository _greenBookSerialNumberRepository;
        private readonly GreenBookSerialNumberVMRepository _greenBookSerialNumberVMRepository;
        private readonly GreenBookSerialNewRecordRepository _greenBookSerialNewRecordRepository;
        private readonly CTALogger _ctaLogger;
        #region Constructor
        public GreenBookSerialNumberController(DBConnectionInfo info)
        {
            _info = info;
            _greenBookSerialNumberRepository = new GreenBookSerialNumberRepository(_info.sConnectionString);
            _greenBookSerialNumberVMRepository = new GreenBookSerialNumberVMRepository(_info.sConnectionString);
            _greenBookSerialNewRecordRepository = new GreenBookSerialNewRecordRepository(_info.sConnectionString);
            _ctaLogger = new CTALogger(_info);
        }
        #endregion

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetGreenBookSerialNumbers(int records = 0)
        {
            #region Get GreenBookSerialNumbers limit by 'records'.
            try
            {
                IEnumerable<GreenBookSerialNumberVM> result = _greenBookSerialNumberVMRepository.GetGreenBookSerialNumbers(records);

                if (result != null & result.Count() > 0)
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name);
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name);
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name);
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        #endregion




    }
}

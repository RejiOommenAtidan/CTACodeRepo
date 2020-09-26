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
    public class GreenbookController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly GreenbookRepository _greenbookRepository;
        private readonly GetGBDataByFormNumberVMRepository _getGBDataByFormNumberVMRepository;
        private readonly CTALogger _ctaLogger;
        public GreenbookController(DBConnectionInfo info)
        {
            _info = info;
            _greenbookRepository = new GreenbookRepository(_info.sConnectionString);
            _getGBDataByFormNumberVMRepository = new GetGBDataByFormNumberVMRepository(_info.sConnectionString);
            _ctaLogger = new CTALogger(_info);
        }
        #endregion

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetGreenbooks()
        {
            #region Get All Greenbooks
            try
            {
                IEnumerable<Greenbook> greenbooks = _greenbookRepository.GetAllGreenBooks();

                #region Information Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion

                return Ok(greenbooks);
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

        [HttpGet("GetGreenbook/Id={Id}")]
        [Route("[action]")]
        public IActionResult GetGreenbook(string Id)
        {
            #region Get Greenbook
            try
            {
                Greenbook fetchedGreenbook = _greenbookRepository.GetGreenboookById(Id);

                #region Information Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion

                return Ok(fetchedGreenbook);
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


        [HttpGet("GetGreenbook/sGBID={sGBID}")]
        [Route("[action]")]
        public IActionResult GetGreenbookByGBID(string sGBID)
        {
            #region Get GreenBook by GBID
            try
            {
                Greenbook gb = _greenbookRepository.GetGreenbookByGBID(sGBID);
                #region Information Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion

                return Ok(gb);
            }
            catch(Exception ex)
            {
                #region Exception Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        #endregion

        #region Add Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddGreenbook(Greenbook greenbook)
        {
            #region Add Greenbook
            try
            {
                if (ModelState.IsValid)
                {
                    greenbook.dtEntered = DateTime.Now;
                    greenbook.dtUpdated = DateTime.Now;
                    _greenbookRepository.Add(greenbook);

                    #region Information Logging 
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called", greenbook.nEnteredBy);
                    #endregion

                    return Ok(greenbook);
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name, greenbook.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Edit Call
        [HttpPost("EditGreenbook/Id={Id}")]
        [Route("[action]")]
        public IActionResult EditGreenbook(string Id, [FromBody] Greenbook greenbook)
        {
            #region Edit Greenbook
            try
            {
                if (ModelState.IsValid)
                {
                    if (Id == null)
                    {
                        return BadRequest("Greenbook Param ID cannot be NULL");
                    }

                    if (Id != greenbook.Id.ToString())
                    {
                        return BadRequest("Green book ID's ain't Matching");
                    }
                    if (GreenbookExists(Id))
                    {
                        Greenbook fetchedGreenbook = _greenbookRepository.GetGreenboookById(Id);
                        greenbook.dtEntered = fetchedGreenbook.dtEntered;
                        greenbook.dtUpdated = DateTime.Now;
                        _greenbookRepository.Update(greenbook);

                        #region Alert Logging 
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", greenbook.nEnteredBy);
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name, greenbook.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Delete Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult DeleteGreenbook(Greenbook greenbook)
        {
            #region Delete Greenbook
            try
            {
                string greenbookID = greenbook.Id.ToString();
                if (!string.IsNullOrEmpty(greenbookID))
                {
                    if (GreenbookExists(greenbookID))
                    {
                        Greenbook fetchedGreenbook = _greenbookRepository.GetGreenboookById(greenbookID);
                        _greenbookRepository.Delete(fetchedGreenbook);

                        #region Alert Logging 
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 4), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", greenbook.nEnteredBy);
                        #endregion

                        return Ok("Greenbook with ID: " + greenbookID + " removed Successfully");
                    }
                    else
                    {
                        return BadRequest("Greenbook with ID: " + greenbookID + " does not exist");
                    }
                }
                else
                {
                    return BadRequest("Greenbook Id Cannot be null");
                }

            }
            catch (Exception ex)
            {
                #region Exception Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 4), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name, greenbook.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Delete GreenBook by passing GB Id.
        [HttpPost]
        [Route("[action]")]
        public IActionResult DeleteGreenBook(string sGBID)
        {
            try
            {
                if (!String.IsNullOrEmpty(sGBID))
                {
                    int rowsAffected = _greenbookRepository.DeleteGreenBook(sGBID);
                    if (rowsAffected > 0)
                    {
                        #region Alert Logging
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 4), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", 1);
                        #endregion
                        return Ok(String.Format("Deleted GreenBook with id {0} successfully.", sGBID));
                    }
                    else
                    {
                        return StatusCode(StatusCodes.Status403Forbidden);
                    }
                }
                else
                {
                    return BadRequest("Bad Request. No such GreenBook Id.");
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 4), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name, 1);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

        }
        #endregion

        #region Check if Greenbook Exists
        private bool GreenbookExists(string Id)
        {
            try
            {
                Greenbook fetchedGreenbook = _greenbookRepository.GetGreenboookById(Id);
                if (fetchedGreenbook != null)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Exception in Greenbook Exists Function, Exception Message: " + ex.Message);
            }
        }
        #endregion

        #region Get GB Data for New Entry
        [HttpGet]
        [Route("[action]/Id={Id:int}")]
        public IActionResult GetGBDataNewEntry(int Id)
        {
            #region Get Data
            try
            {
                GetGBDataByFormNumberVM getGBDataByFormNumberVM = _getGBDataByFormNumberVMRepository.GetGBDataByFormNumber(Id);

                #region Information Logging 
                  _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion

                return Ok(getGBDataByFormNumberVM);
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

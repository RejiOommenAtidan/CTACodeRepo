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
using TimeZoneConverter;

namespace CTAWebAPI.Controllers.Transactions
{
    //[Authorize]
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
        private GreenBookVMRepository _greenBookVMRepository;
        private GivenGBIDRepository _givenGBIDRepository;
        private readonly CTALogger _ctaLogger;
        private GBNoteRepository _gbNoteRepository;
        private GBRelationRepository _gbRelationRepository;
        private GBChildrenRepository _gbChildrenRepository;
        private GBDocumentRepository _gbDocumentRepository;
        private readonly AuditLogRepository _auditLogRepository;
        public GreenbookController(DBConnectionInfo info)
        {
            _info = info;
            _greenbookRepository = new GreenbookRepository(_info.sConnectionString);
            _getGBDataByFormNumberVMRepository = new GetGBDataByFormNumberVMRepository(_info.sConnectionString);
            _greenBookVMRepository = new GreenBookVMRepository(_info.sConnectionString);
            _givenGBIDRepository = new GivenGBIDRepository(_info.sConnectionString);
            _ctaLogger = new CTALogger(_info);
            _auditLogRepository = new AuditLogRepository(_info.sConnectionString);
            _gbRelationRepository = new GBRelationRepository(_info.sConnectionString);
            _gbNoteRepository = new GBNoteRepository(_info.sConnectionString);
            _gbChildrenRepository = new GBChildrenRepository(_info.sConnectionString);
            _gbDocumentRepository = new GBDocumentRepository(_info.sConnectionString);
        }
        #endregion

        #region Get Calls
        [AuthorizeRole(FeatureID = 16)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetGreenbooks()
        {
            #region Get All Greenbooks
            try
            {
                int records = Convert.ToInt32(CTAConfigRepository.GetValueByKey("SelectTotalRecordCount"));
                IEnumerable<Object> greenbooks = _greenbookRepository.GetGreenBooks(records);

                #region Information Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion

                return Ok(greenbooks);
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
        [AuthorizeRole(FeatureID = 16)]
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }


        //[HttpPost]
        //[Route("[action]")]

        //public IActionResult GetGreenBookVM(SimpleSearchVM simpleSearch)
        //{

        //    if (String.IsNullOrEmpty(simpleSearch.sSearchField) || String.IsNullOrEmpty(simpleSearch.sSearchValue))
        //    {
        //        return BadRequest(String.Format(@"Invalid request parameters"));
        //    }
        //    try
        //    {
        //        IEnumerable<GreenBookVM> greenBook = _greenBookVMRepository.GetGreenbookVMRecord(simpleSearch.sSearchField, simpleSearch.sSearchValue);
        //        if(greenBook != null)
        //        {
        //            var totrec = greenBook.Count();
        //            return Ok(greenBook);
        //        }
        //        else
        //        {
        //            return NotFound(String.Format(@"No records found for {0} having value {1}", simpleSearch.sSearchField, simpleSearch.sSearchValue));
        //        }
        //    }
        //    catch(Exception ex)
        //    {
        //        return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //    }
        //}
        [AuthorizeRole(FeatureID = 2)]
        [HttpPost]
        [Route("[action]")]
        public IActionResult GetQuickResult(SimpleSearchVM simpleSearch)
        {
            if (String.IsNullOrEmpty(simpleSearch.sSearchField) || String.IsNullOrEmpty(simpleSearch.sSearchValue))
            {
                return BadRequest(String.Format(@"Invalid request parameters"));
            }
            try
            {
                IEnumerable<Object> greenBook = _greenBookVMRepository.GetQuickResult(simpleSearch.sSearchField, simpleSearch.sSearchValue);
                if (greenBook != null)
                {
                    var totrec = greenBook.Count();
                    #region Information Logging 
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(greenBook);
                }
                else
                {
                    return NotFound(String.Format(@"No records found for {0} having value {1}", simpleSearch.sSearchField, simpleSearch.sSearchValue));
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [AuthorizeRole(FeatureID = 2)]
        [HttpPost]
        [Route("[action]")]
        public IActionResult GetQuickResultComplex(DetailedSearchVM detailedSearch)
        {
            if (detailedSearch == null)
            {
                return BadRequest(String.Format(@"Invalid request parameters"));
            }
            try
            {
                IEnumerable<Object> greenBook = _greenBookVMRepository.GetQuickResultComplex(detailedSearch);
                if (greenBook != null)
                {
                    var totrec = greenBook.Count();
                    #region Information Logging 
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(greenBook);
                }
                else
                {
                    return NotFound(String.Format(@"No records found for detailed search"));
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

        }

        [AuthorizeRole(FeatureID = 2)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetDetailsFromGBID(string sGBID, int nUserId)
        {

            if (String.IsNullOrEmpty(sGBID) || nUserId < 0)
            {
                return BadRequest(String.Format(@"Invalid request parameters"));
            }
            try
            {
                GreenBookVM greenBook = _greenBookVMRepository.GetDetailsFromGBID(sGBID, nUserId);
                if (greenBook != null)
                {
                    #region Information Logging 
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(greenBook);
                }
                else
                {
                    return NotFound(String.Format(@"No records found for Greenbook ID having value {0}", sGBID));
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Authorize]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetBasicDetailsFromGBID(string sGBID)
        {

            if (String.IsNullOrEmpty(sGBID))
            {
                return BadRequest(String.Format(@"Invalid request parameters"));
            }
            try
            {
                GreenBookVM greenBook = _greenBookVMRepository.GetBasicDetailsFromGBID(sGBID);
                if (greenBook != null)
                {
                    #region Information Logging 
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(greenBook);
                }
                else
                {
                    return NotFound(String.Format(@"No records found for Greenbook ID having value {0}", sGBID));
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Authorize]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetPersonalDetailsFromGBID(string sGBID)
        {

            if (String.IsNullOrEmpty(sGBID))
            {
                return BadRequest(String.Format(@"Invalid request parameters"));
            }
            try
            {
                Object greenBook = _greenBookVMRepository.GetPersonalDetailsFromGBID(sGBID);
                if (greenBook != null)
                {
                    #region Information Logging 
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(greenBook);
                }
                else
                {
                    return NotFound(String.Format(@"No records found for Greenbook ID having value {0}", sGBID));
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }



        //[HttpPost]
        //[Route("[action]")]
        //public IActionResult GetDetails(GreenBookVM gvm)
        //{
        //    if(gvm == null || !ModelState.IsValid)
        //    {
        //        return BadRequest("Invalid Data.");
        //    }
        //    try
        //    {
        //        GreenBookVM greenBook = _greenBookVMRepository.GetDetails(gvm);
        //        return Ok(gvm);
        //    }
        //    catch(Exception ex)
        //    {
        //        return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //    }
        //}


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
            catch (Exception ex)
            {
                #region Exception Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        [AuthorizeRole(FeatureID = 16)]
        [HttpPost]
        [Route("[action]")]
        public IActionResult GetGreenbooksForEdit([FromBody] Object searchObject)
        {
            if(searchObject == null)
            {
                return BadRequest("Missing parameters to search");
            }
            try
            {
                IEnumerable<Object> result = _greenBookVMRepository.GetGreenbooksForEdit(searchObject.ToString());
                if(result != null && result.Count() > 0)
                {
                    #region Information Logging 
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                    #endregion
                    return Ok(result);
                }
                else
                {
                    return StatusCode(StatusCodes.Status204NoContent, "No records found for search criteria");
                }
                
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        #endregion

        #region Add Call
        [AuthorizeRole(FeatureID = 10)]
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddGreenbook(Greenbook greenbook)
        {
            #region Add Greenbook
            try
            {
                if (ModelState.IsValid)
                {
                    greenbook.dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                    greenbook.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                    _greenbookRepository.Add(greenbook);

                    #region Parsing to Int
                    bool isParsable = int.TryParse(greenbook.sGBID, out int nGBId);
                    if (!isParsable)
                        return BadRequest("Cannot Convert GBID to Int " + greenbook.sGBID);
                    #endregion

                    #region Firing Update Query to Change bGivenOrNot to true
                    _givenGBIDRepository.UpdateGivenOrNot(nGBId);
                    #endregion

                    #region Relations Table Addition
                    //Father - 1
                    if (!string.IsNullOrEmpty(greenbook.sFathersGBID))
                    {
                        Greenbook fatherGB = _greenbookRepository.GetGreenbookByGBID(greenbook.sFathersGBID);
                        if (fatherGB != null)
                        {
                            GBRelation fatherRelation = new GBRelation
                            {
                                sGBID = greenbook.sGBID,
                                sGBIDRelation = greenbook.sFathersGBID,
                                nRelationID = 1,
                                dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time")),
                                dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time")),
                                nEnteredBy = greenbook.nEnteredBy,
                                nUpdatedBy = greenbook.nUpdatedBy
                            };
                            _gbRelationRepository.Add(fatherRelation);
                        }
                    }
                    //Mother - 2
                    if (!string.IsNullOrEmpty(greenbook.sMothersGBID))
                    {
                        Greenbook motherGB = _greenbookRepository.GetGreenbookByGBID(greenbook.sMothersGBID);
                        if (motherGB != null)
                        {
                            GBRelation motherRelation = new GBRelation
                            {
                                sGBID = greenbook.sGBID,
                                sGBIDRelation = greenbook.sMothersGBID,
                                nRelationID = 2,
                                dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time")),
                                dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time")),
                                nEnteredBy = greenbook.nEnteredBy,
                                nUpdatedBy = greenbook.nUpdatedBy
                            };
                            _gbRelationRepository.Add(motherRelation);
                        }
                    }
                    //Spouse - 3
                    if (!string.IsNullOrEmpty(greenbook.sSpouseGBID))
                    {
                        Greenbook spouseGB = _greenbookRepository.GetGreenbookByGBID(greenbook.sSpouseGBID);
                        if (spouseGB != null)
                        {
                            GBRelation spouseRelation = new GBRelation
                            {
                                sGBID = greenbook.sGBID,
                                sGBIDRelation = greenbook.sSpouseGBID,
                                nRelationID = 3,
                                dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time")),
                                dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time")),
                                nEnteredBy = greenbook.nEnteredBy,
                                nUpdatedBy = greenbook.nUpdatedBy
                            };
                            _gbRelationRepository.Add(spouseRelation);
                        }
                    }
                    #endregion

                    #region Information Logging 
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called", null, greenbook.nEnteredBy);
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, greenbook.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Edit Call
        [AuthorizeRole(FeatureID = 16)]
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
                        var gbvmOld = _greenBookVMRepository.GetCustomViewModel(fetchedGreenbook.sGBID);
                        greenbook.nEnteredBy = fetchedGreenbook.nEnteredBy;
                        greenbook.dtEntered = fetchedGreenbook.dtEntered;
                        greenbook.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                        _greenbookRepository.Update(greenbook);
                        var gbvmNew = _greenBookVMRepository.GetCustomViewModel(greenbook.sGBID);
                        var dict0 = gbvmOld.Where(entry => gbvmNew[entry.Key] != entry.Value).ToDictionary(entry => entry.Key, entry => entry.Value);
                        var dict1 = gbvmNew.Where(entry => gbvmOld[entry.Key] != entry.Value).ToDictionary(entry => entry.Key, entry => entry.Value);
                        CTALogger.LogAuditRecordComplex(dict0, dict1, greenbook.sGBID, greenbook.nAuthRegionID, 16, fetchedGreenbook.Id, greenbook.nUpdatedBy);
                        //List<object> changes = new List<object>();
                        //foreach (var item in dict3)
                        //{
                        //    var oldValue = dict0[item.Key];
                        //    var newValue = dict1[item.Key];
                        //    var change = new { Field = item.Key, PreviousValue = oldValue.ToString(), NewValue = newValue.ToString() };
                        //    changes.Add(change);
                        //}
                        //string changesStr = JsonConvert.SerializeObject(changes);

                        #region Audit Log
                        //CTALogger.LogAuditRecord(fetchedGreenbook, greenbook, greenbook.sGBID, greenbook.nAuthRegionID, 16, fetchedGreenbook.Id, greenbook.nUpdatedBy);
                        #endregion

                        #region Alert Logging 
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", null, greenbook.nUpdatedBy);
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, greenbook.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        #endregion

       

        #region Delete Call
        [AuthorizeRole(FeatureID = 17)]
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
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 4), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", null, greenbook.nEnteredBy);
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 4), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, greenbook.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Delete GreenBook by passing GB Id.
        [AuthorizeRole(FeatureID = 17)]
        [HttpPost]
        [Route("[action]")]
        public IActionResult DeleteGreenBookByGBID(string sGBID, int nUserId)
        {
            try
            {
                if (!String.IsNullOrEmpty(sGBID))
                {
                    Greenbook greenbook = _greenbookRepository.GetGreenbookByGBID(sGBID);
                    if (greenbook == null)
                    {
                        return Problem(String.Format("Green book ID {0} not found", sGBID), null, 403);
                    }

                    
                    int rows = _greenbookRepository.DeleteGreenBook(sGBID);
                    if (rows == 0)
                    {
                        #region Alert Logging
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 4), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called");
                        #endregion
                        #region Audit Log
                        //CTALogger.LogAuditRecord(greenbook, greenbook, greenbook.sGBID, greenbook.nAuthRegionID, 16, greenbook.Id, greenbook.nUpdatedBy);

                        AuditLog auditLogger = new AuditLog()
                        {
                            dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time")),
                            nFeatureID = 17,
                            nRegionID = greenbook.nAuthRegionID,
                            nRecordID = greenbook.Id,
                            sGBID = sGBID,
                            sFieldValuesOld = String.Format("Greenbook Id {0} Deleted", sGBID),
                            sFieldValuesNew = String.Format("Greenbook Id {0} Deleted", sGBID),
                            nEnteredBy = nUserId
                        };
                        _auditLogRepository.Add(auditLogger);

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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 4), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
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
                GivenGBID givenGBID = _givenGBIDRepository.GetGivenGBIDByFormNumber(Id);
                if(givenGBID != null)
                {
                    SimpleSearchVM simpleSearch = new SimpleSearchVM();
                    simpleSearch.sSearchField = "sGBID";
                    simpleSearch.sSearchValue = givenGBID.nGBId.ToString();
                    var result = _greenBookVMRepository.GetQuickResult(simpleSearch.sSearchField, simpleSearch.sSearchValue);
                    if (result.Count() == 0) 
                    {
                        GetGBDataByFormNumberVM getGBDataByFormNumberVM = _getGBDataByFormNumberVMRepository.GetGBDataByFormNumber(Id);
                        #region Information Logging 
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                        #endregion
                        return Ok(getGBDataByFormNumberVM);
                    }
                }
                #region Information Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion
                return NotFound("We could not find Valid Data for your request");
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

        #region Get GB Data for Edit Entry
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetGBDataEditEntry()
        {
            #region Get Data
            try
            {
                GetGBDataByFormNumberVM getGBDataByFormNumberVM = _getGBDataByFormNumberVMRepository.GetGBDataByFormNumber(0);

                #region Information Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion

                return Ok(getGBDataByFormNumberVM);
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

        #region Get GB Link Data By GBID
        [AuthorizeRole(FeatureID = 16)]
        [HttpGet]
        [Route("[action]/sGBID={sGBID}")]
        public IActionResult GetGBLinkDataByGBID(string sGBID)
        {
            #region Get Data
            try
            {
                IEnumerable<GBChildren> lGBChildren = _gbChildrenRepository.GetGBChildrenByGBIDParent(sGBID);
                IEnumerable<GBDocument> lGetGBDocument = _gbDocumentRepository.GetAllGBDocumentsByGBID(sGBID);
                IEnumerable<GBNote> lGBNote = _gbNoteRepository.GetGBNoteByGBID(sGBID);

                GBLnkVM lnkGbVM = new GBLnkVM
                {
                    lGBChildren = lGBChildren.ToList(),
                    lGBDocument = lGetGBDocument.ToList(),
                    lGBNote = lGBNote.ToList()
                };

                #region Information Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion

                return Ok(lnkGbVM);
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

        #region Note Part

        #region Check if GBNote Exists
        private bool GBNoteExists(string Id)
        {
            try
            {
                GBNote fetchedGBNote = _gbNoteRepository.GetGBNoteById(Id);
                if (fetchedGBNote != null)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Exception in GB Note Exists Function, Exception Message: " + ex.Message);
            }
        }
        #endregion

        #region Add Note
        [AuthorizeRole(FeatureID = 16)]
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddNote(GBNote gBNote)
        {
            #region Add Note
            try
            {
                if (ModelState.IsValid)
                {
                    gBNote.dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                    gBNote.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                    _gbNoteRepository.Add(gBNote);

                    #region Information Logging 
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called", null, gBNote.nEnteredBy);
                    #endregion

                    #region Get All Notes for Current GB ID to display in UI
                    IEnumerable<GBNote> notes = _gbNoteRepository.GetGBNoteByGBID(gBNote.sGBID);
                    #endregion

                    return Ok(notes);
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, gBNote.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Edit Note
        [AuthorizeRole(FeatureID = 16)]
        [HttpPost("EditNote/Id={Id}")]
        [Route("[action]")]
        public IActionResult EditNote(string Id, [FromBody] GBNote gBNote)
        {
            #region Edit Note
            try
            {
                if (ModelState.IsValid)
                {
                    if (Id == null)
                    {
                        return BadRequest("Note Param ID cannot be NULL");
                    }

                    if (Id != gBNote.Id.ToString())
                    {
                        return BadRequest("Note ID's ain't Matching");
                    }
                    if (GBNoteExists(Id))
                    {
                        GBNote fetchedGBNote = _gbNoteRepository.GetGBNoteById(Id);
                        Greenbook fetchedGB = _greenbookRepository.GetGreenbookByGBID(fetchedGBNote.sGBID);
                        gBNote.dtEntered = fetchedGBNote.dtEntered;
                        gBNote.nEnteredBy = fetchedGBNote.nEnteredBy;
                        gBNote.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                        _gbNoteRepository.Update(gBNote);

                        #region Audit Log
                        CTALogger.LogAuditRecord(fetchedGBNote, gBNote, fetchedGBNote.sGBID, fetchedGB.nAuthRegionID, 101, fetchedGBNote.Id, (int)gBNote.nEnteredBy);
                        #endregion

                        #region Alert Logging 
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", null, gBNote.nEnteredBy);
                        #endregion

                        #region Get All Notes for Current GB ID to display in UI
                        IEnumerable<GBNote> notes = _gbNoteRepository.GetGBNoteByGBID(gBNote.sGBID);
                        #endregion

                        return Ok(notes);
                    }
                    else
                    {
                        return BadRequest("GB Note with ID:" + Id + " does not exist");
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, gBNote.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #endregion

        #region Child Part

        #region Add Child
        [AuthorizeRole(FeatureID = 16)]
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddChild(GBChildren gBChildren)
        {
            #region Add Child
            try
            {
                if (ModelState.IsValid)
                {
                    
                    //Greenbook fetchedGB = _greenbookRepository.GetGreenbookByGBID(gBChildren.sGBIDChild);
                    //if (fetchedGB == null)
                    //{
                    //    return BadRequest("Child with GBID: " + gBChildren.sGBIDChild + " Doesn't Exists");
                    //}
                    gBChildren.dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                    gBChildren.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                    _gbChildrenRepository.Add(gBChildren);
                    Greenbook parent = _greenbookRepository.GetGreenbookByGBID(gBChildren.sGBIDParent);
                    if (gBChildren.sGender == "M")
                    {
                        parent.nChildrenM = parent.nChildrenM + 1;
                    }
                    else
                    {
                        parent.nChildrenF = parent.nChildrenF + 1;
                    }
                    parent.nUpdatedBy = gBChildren.nEnteredBy;
                    parent.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                    _greenbookRepository.Update(parent);

                    #region Information Logging 
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called", null, gBChildren.nEnteredBy);
                    #endregion

                    #region Get All Children for Current GB ID to display in UI
                    IEnumerable<GBChildren> children = _gbChildrenRepository.GetGBChildrenByGBIDParent(gBChildren.sGBIDParent);
                    #endregion

                    return Ok(children);
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, gBChildren.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Edit Child
        [AuthorizeRole(FeatureID = 16)]
        [HttpPost("EditChild/Id={Id}")]
        [Route("[action]")]
        public IActionResult EditChild(string Id, [FromBody] GBChildren gBChild)
        {
            #region Edit Child
            try
            {
                if (ModelState.IsValid)
                {
                    if (Id == null)
                    {
                        return BadRequest("Child Param ID cannot be NULL");
                    }

                    if (Id != gBChild.Id.ToString())
                    {
                        return BadRequest("Child ID's ain't Matching");
                    }
                    if (GBChildrenExists(Id))
                    {
                        GBChildren fetchedGBChild = _gbChildrenRepository.GetGBChildrenById(Id);
                        Greenbook fetchedGB = _greenbookRepository.GetGreenbookByGBID(fetchedGBChild.sGBIDParent);
                        gBChild.nEnteredBy = fetchedGBChild.nEnteredBy;
                        gBChild.dtEntered = fetchedGBChild.dtEntered;
                        gBChild.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                        _gbChildrenRepository.Update(gBChild);

                        Greenbook parent = _greenbookRepository.GetGreenbookByGBID(gBChild.sGBIDParent);
                        if (gBChild.sGender == "M" && fetchedGBChild.sGender == "F")
                        {
                            parent.nChildrenM = parent.nChildrenM + 1;
                            parent.nChildrenF = parent.nChildrenF - 1;
                        }
                        if (gBChild.sGender == "F" && fetchedGBChild.sGender == "M")
                        {
                            parent.nChildrenM = parent.nChildrenM - 1;
                            parent.nChildrenF = parent.nChildrenF + 1;
                        }
                        
                        parent.nUpdatedBy = gBChild.nEnteredBy;
                        parent.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                        _greenbookRepository.Update(parent);

                        #region Audit Log
                        CTALogger.LogAuditRecord(fetchedGBChild, gBChild, fetchedGBChild.sGBIDParent, fetchedGB.nAuthRegionID, 100, fetchedGBChild.Id, (int)gBChild.nEnteredBy);
                        #endregion

                        #region Alert Logging 
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", null, gBChild.nEnteredBy);
                        #endregion

                        #region Get All Notes for Current GB ID to display in UI
                        IEnumerable<GBChildren> children = _gbChildrenRepository.GetGBChildrenByGBIDParent(gBChild.sGBIDParent);
                        #endregion

                        return Ok(children);
                    }
                    else
                    {
                        return BadRequest("Child with ID:" + Id + " does not exist");
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, gBChild.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Check if GBChild Exists
        private bool GBChildrenExists(string Id)
        {
            try
            {
                GBChildren fetchedGBChildren = _gbChildrenRepository.GetGBChildrenById(Id);
                if (fetchedGBChildren != null)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Exception in GB Children Exists Function, Exception Message: " + ex.Message);
            }
        }
        #endregion

        #endregion

        #region Document Part

        #region Add Document
        //[AuthorizeRole(FeatureID = 16)]
        //[HttpPost]
        //[Route("[action]")]
        [NonAction]
        public IActionResult AddDocument(GBDocument gBDocument)
        {
            #region Add Document
            try
            {
                if (ModelState.IsValid)
                {
                    gBDocument.dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                    gBDocument.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                    _gbDocumentRepository.Add(gBDocument);

                    #region Information Logging 
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called", null, gBDocument.nEnteredBy);
                    #endregion

                    #region Get All Documents for Current GB ID to display in UI
                    IEnumerable<GBDocument> documents = _gbDocumentRepository.GetAllGBDocumentsByGBID(gBDocument.sGBID);
                    #endregion

                    return Ok(documents);
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, gBDocument.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        [AuthorizeRole(FeatureID = 2)]
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddDocumentForSearch(GBDocument gBDocument)
        {
            return AddDocument(gBDocument);
        }

        [AuthorizeRole(FeatureID = 16)]
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddDocumentForEdit(GBDocument gBDocument)
        {
            return AddDocument(gBDocument);
        }

        #region Edit Document
        [AuthorizeRole(FeatureID = 16)]
        [HttpPost("EditDocument/Id={Id}")]
        [Route("[action]")]
        public IActionResult EditDocument(string Id, [FromBody] GBDocument gBDocument)
        {
            #region Edit Document
            try
            {
                if (ModelState.IsValid)
                {
                    if (Id == null)
                    {
                        return BadRequest("Document Param ID cannot be NULL");
                    }

                    if (Id != gBDocument.Id.ToString())
                    {
                        return BadRequest("Document ID's ain't Matching");
                    }
                    if (GBDocumentExists(Id))
                    {
                        GBDocument fetchedGBDocument = _gbDocumentRepository.GetDocumentById(Id);
                        gBDocument.dtEntered = fetchedGBDocument.dtEntered;
                        gBDocument.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                        gBDocument.nEnteredBy = fetchedGBDocument.nEnteredBy;
                        Greenbook fetchedGB = _greenbookRepository.GetGreenbookByGBID(fetchedGBDocument.sGBID);
                        _gbDocumentRepository.Update(gBDocument);

                        #region Audit Log
                        CTALogger.LogAuditRecord(fetchedGBDocument, gBDocument, fetchedGBDocument.sGBID, fetchedGB.nAuthRegionID, 16, fetchedGBDocument.Id, gBDocument.nEnteredBy);
                        #endregion

                        #region Alert Logging 
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", null, gBDocument.nEnteredBy);
                        #endregion

                        #region Get All Documents for Current GB ID to display in UI
                        IEnumerable<GBDocument> documents = _gbDocumentRepository.GetAllGBDocumentsByGBID(gBDocument.sGBID);
                        #endregion

                        return Ok(documents);
                    }
                    else
                    {
                        return BadRequest("Document with ID:" + Id + " does not exist");
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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, gBDocument.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Delete Call
        [AuthorizeRole(FeatureID = 16)]
        [HttpPost]
        [Route("[action]")]
        public IActionResult DeleteDocument(GBDocument gBDocument)
        {
            #region Delete GB Document
            try
            {
                string gbDocumentID = gBDocument.Id.ToString();
                if (!string.IsNullOrEmpty(gbDocumentID))
                {
                    if (GBDocumentExists(gbDocumentID))
                    {
                        GBDocument fetchedgBDocument = _gbDocumentRepository.GetDocumentById(gbDocumentID);
                        _gbDocumentRepository.Delete(fetchedgBDocument);

                        #region Alert Logging 
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 4), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", null, gBDocument.nEnteredBy);
                        #endregion

                        #region Get All Documents for Current GB ID to display in UI
                        IEnumerable<GBDocument> documents = _gbDocumentRepository.GetAllGBDocumentsByGBID(gBDocument.sGBID);
                        #endregion

                        return Ok(documents);
                    }
                    else
                    {
                        return BadRequest("Greenbook Document with ID: " + gbDocumentID + " does not exist");
                    }
                }
                else
                {
                    return BadRequest("Greenbook Document Id Cannot be null");
                }

            }
            catch (Exception ex)
            {
                #region Exception Logging 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 4), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, gBDocument.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Check if GBChild Exists
        private bool GBDocumentExists(string Id)
        {
            try
            {
                GBDocument fetchedGBDocument = _gbDocumentRepository.GetDocumentById(Id);
                if (fetchedGBDocument != null)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Exception in GB Document Exists Function, Exception Message: " + ex.Message);
            }
        }
        #endregion

        #endregion
    }
}

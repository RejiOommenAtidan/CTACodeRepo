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
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
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
                    return NotFound(String.Format(@"No records found for sGBID having value {0}", sGBID));
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
                    return NotFound(String.Format(@"No records found for sGBID having value {0}", sGBID));
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
                    return NotFound(String.Format(@"No records found for sGBID having value {0}", sGBID));
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

                    #region Parsing to Int
                    bool isParsable = int.TryParse(greenbook.sGBID, out int nGBId);
                    if (!isParsable)
                        return BadRequest("Cannot Convert GBID to Int " + greenbook.sGBID);
                    #endregion

                    #region Firing Update Query to Change nGivenOrNot to 1
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
                                dtEntered = DateTime.Now,
                                dtUpdated = DateTime.Now,
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
                                dtEntered = DateTime.Now,
                                dtUpdated = DateTime.Now,
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
                                dtEntered = DateTime.Now,
                                dtUpdated = DateTime.Now,
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
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", null, greenbook.nEnteredBy);
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
        [HttpPost]
        [Route("[action]")]
        public IActionResult DeleteGreenBookByGBID(string sGBID)
        {
            try
            {
                if (!String.IsNullOrEmpty(sGBID))
                {
                    int rowsAffected = _greenbookRepository.DeleteGreenBook(sGBID);
                    if (rowsAffected > 0)
                    {
                        #region Alert Logging
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 4), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called");
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
                GetGBDataByFormNumberVM getGBDataByFormNumberVM = _getGBDataByFormNumberVMRepository.GetGBDataByFormNumber(Id);

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
        [HttpGet]
        [Route("[action]/sGBID={sGBID}")]
        public IActionResult GetGBLinkDataByGBID(string sGBID)
        {
            #region Get Data
            try
            {
                IEnumerable<GBChildren> lGBChildren = _gbChildrenRepository.GetGBChildrenByGBIDParent(sGBID);
                IEnumerable<GBDocument> lGetGBDocument = _gbDocumentRepository.GetGBDocumentsByGBID(sGBID);
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
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddNote(GBNote gBNote)
        {
            #region Add Note
            try
            {
                if (ModelState.IsValid)
                {
                    gBNote.dtEntered = DateTime.Now;
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
                        gBNote.dtEntered = fetchedGBNote.dtEntered;
                        _gbNoteRepository.Update(gBNote);

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
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddChild(GBChildren gBChildren)
        {
            #region Add Child
            try
            {
                if (ModelState.IsValid)
                {
                    Greenbook fetchedGB = _greenbookRepository.GetGreenbookByGBID(gBChildren.sGBIDChild);
                    if (fetchedGB == null)
                    {
                        return BadRequest("Child with GBID: " + gBChildren.sGBIDChild + " Doesn't Exists");
                    }
                    gBChildren.dtEntered = DateTime.Now;
                    _gbChildrenRepository.Add(gBChildren);

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
        [HttpPost("EditChild/Id={Id}")]
        [Route("[action]")]
        public IActionResult EditChild(string Id, [FromBody] GBChildren gBChild)
        {
            #region Edit Note
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
                        gBChild.dtEntered = fetchedGBChild.dtEntered;
                        _gbChildrenRepository.Update(gBChild);

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
                throw new Exception("Exception in GBChildren Exists Function, Exception Message: " + ex.Message);
            }
        }
        #endregion

        #endregion
    }
}

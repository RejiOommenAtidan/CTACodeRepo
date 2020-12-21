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
    [AuthorizeRole(FeatureID = 27)]
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    //[APIKeyAuth]
    [ApiController]
    public class RelationController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly RelationRepository _relationRepository;
        private readonly CTALogger _ctaLogger;
        public RelationController(DBConnectionInfo info)
        {
            _info = info;
            _relationRepository = new RelationRepository(_info.sConnectionString);
            _ctaLogger = new CTALogger(_info);
        }
        #endregion

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetRelation()
        {
            #region Get All Relation
            try
            {
               
                IEnumerable<Relation> relation = _relationRepository.GetAllRelation();
                #region Information Logging 
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion
                return Ok(relation);
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message,ex.StackTrace);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        [HttpGet("GetRelation/ID={ID}")]
        [Route("[action]")]
        public IActionResult GetRelation(string ID)
        {
            #region Get Single Relation
            try
            {
              
                Relation fetchedRelation = _relationRepository.GetRelationById(ID);
                #region Information Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called");
                #endregion
                return Ok(fetchedRelation);
            }
            catch (Exception ex)
            {
                #region Exception Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message,ex.StackTrace);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Add Call
        //TODO: Tell
        //[AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddRelation(Relation relation)
        {
            #region Add Relation
            try
            {
                if (ModelState.IsValid)
                {
                    DuplicateCheck<Relation> check = new DuplicateCheck<Relation>(relation, _info.sConnectionString);
                    string[] props = { "sRelation" };
                    string message;
                    if (check.IsDuplicate(relation.Id, props, out message))
                    {
                        return Problem(message, null, 403);
                    }
                    relation.dtEntered = DateTime.Now;
                    relation.dtUpdated = DateTime.Now;

                    _relationRepository.Add(relation);

                    #region Information Logging
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called", null, relation.nEnteredBy);
                    #endregion
                    return Ok(relation);
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
                #region Exception 
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message,ex.StackTrace,relation.nEnteredBy);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Edit Call
        [HttpPost("EditRelation/ID={ID}")]
        [Route("[action]")]
        public IActionResult EditRelation(string ID, [FromBody] Relation relation)
        {
            #region Edit Relation
            try
            {
                if (ModelState.IsValid)
                {
                    
                    if (RelationExists(ID))
                    {
                        DuplicateCheck<Relation> check = new DuplicateCheck<Relation>(relation, _info.sConnectionString);
                        string[] props = { "sRelation" };
                        string message;
                        if (check.IsDuplicate(relation.Id, props, out message))
                        {
                            return Problem(message, null, 403);
                        }

                        Relation fetchedrelation = _relationRepository.GetRelationById(ID);
                        relation.nEnteredBy = fetchedrelation.nEnteredBy;
                        relation.dtEntered = fetchedrelation.dtEntered;
                        relation.dtUpdated = DateTime.Now;
                        _relationRepository.Update(relation);

                        #region Audit Log
                        CTALogger.LogAuditRecord(fetchedrelation, relation, null, null, 27, fetchedrelation.Id, relation.nUpdatedBy);
                        #endregion

                        #region Alert Logging 
                        _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", null, relation.nUpdatedBy);
                        #endregion

                        return Ok("Relation with ID: " + ID + " updated Successfully");
                    }
                    else
                    {
                        return BadRequest("Relation with ID:" + ID + " does not exist");
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
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Delete Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult DeleteRelation(Relation  relation)
        {
            #region Delete Relation
            try
            {
                //TODO: check for correct way of sending string from body
                string relationId = relation.Id.ToString();

                if (!string.IsNullOrEmpty(relationId))
                {
                    if (RelationExists(relationId))
                    {
                       
                        Relation fetchedRelation = _relationRepository.GetRelationById(relationId);
                        _relationRepository.Delete(fetchedRelation);
                        return Ok("Relation with ID: " + relationId + " removed Successfully");
                    }
                    else
                    {
                        return BadRequest("Relation with ID: " + relationId + " does not exist");
                    }
                }
                else
                {
                    return BadRequest("Relation Id Cannot be null");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Check if Relation Exists
        private bool RelationExists(string ID)
        {
            try
            {
               
                Relation fetchedRelation = _relationRepository.GetRelationById(ID);
                if (fetchedRelation != null)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Exception in Relation Exists Function, Exception Message: " + ex.Message);
            }
        }
        #endregion
    }
}

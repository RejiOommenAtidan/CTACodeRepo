using CTADBL.BaseClasses;

using CTADBL.BaseClassRepositories;
using CTADBL.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace CTAWebAPI.Controllers
{
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    //[APIKeyAuth]
    [ApiController]
    public class RelationController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly RelationRepository _relationRepository;
        public RelationController(DBConnectionInfo info)
        {
            _info = info;
            _relationRepository = new RelationRepository(_info.sConnectionString);
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
                RelationRepository relationRepo = new RelationRepository(_info.sConnectionString);
                IEnumerable<Relation> relation = relationRepo.GetAllRelation();
                return Ok(relation);
            }
            catch (Exception ex)
            {
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
                return Ok(fetchedRelation);
            }
            catch (Exception ex)
            {
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
                    relation.dtEntered = DateTime.Now;
                    relation.dtUpdated = DateTime.Now;

                    _relationRepository.Add(relation);
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
                        Relation fetchedrelation = _relationRepository.GetRelationById(ID);
                        relation.dtEntered = fetchedrelation.dtEntered;
                        relation.dtUpdated = DateTime.Now;
                        //user.User_Id
                        _relationRepository.Update(relation);
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

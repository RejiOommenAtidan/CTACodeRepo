﻿using CTADBL.BaseClasses;
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
    [ApiController]
    public class GivenGBIDController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        public GivenGBIDController(DBConnectionInfo info)
        {
            _info = info;
        }
        #endregion

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetGivenGBIDs()
        {
            #region Get Given GBIDs
            try
            {
                GivenGBIDRepository givenGBIDRepository = new GivenGBIDRepository(_info.sConnectionString);
                IEnumerable<GivenGBID> givenGBIDs = givenGBIDRepository.GetAllGivenGBID();
                return Ok(givenGBIDs);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        [HttpGet("GetGivenGBID/givenGBID={Id}")]
        [Route("[action]")]
        public IActionResult GetGivenGBID(string Id)
        {
            #region Get Given GBID
            try
            {
                GivenGBIDRepository givenGBIDRepository = new GivenGBIDRepository(_info.sConnectionString);
                GivenGBID givenGBID = givenGBIDRepository.GetGivenGBID(Id);
                return Ok(givenGBID);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Add Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddUser(GivenGBID givenGBID)
        {
            #region Add Given GBID
            try
            {
                if (ModelState.IsValid)
                {
                    if (givenGBID == null)
                    {
                        return BadRequest("GBID object cannot be NULL");
                    }
                    GivenGBIDRepository givenGBIDRepository = new GivenGBIDRepository(_info.sConnectionString);
                    givenGBIDRepository.Add(givenGBID);
                    return Ok(givenGBID);
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
        [HttpPost("EditGivenGBID/givenGBID={Id}")]
        [Route("[action]")]
        public IActionResult EditUser(string Id, [FromBody] GivenGBID givenGBID)
        {
            #region Edit User
            try
            {
                if (ModelState.IsValid)
                {
                    if (givenGBID == null)
                    {
                        return BadRequest("GBID object cannot be NULL");
                    }

                    if (Id == null)
                    {
                        return BadRequest("GBID param cannot be NULL");
                    }
                    if (Id != givenGBID.Id.ToString())
                    {
                        return BadRequest("ID's ain't Matching");
                    }
                    if (GBIDExists(Id))
                    {
                        GivenGBIDRepository givenGBIDRepository = new GivenGBIDRepository(_info.sConnectionString);
                        givenGBIDRepository.Update(givenGBID);
                        return Ok("GB with ID: " + Id + " updated Successfully");
                    }
                    else
                    {
                        return BadRequest("GB with ID:" + Id + " does not exist");
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
        public IActionResult DeleteGBID(object body)
        {
            #region Delete GBID
            try
            {
                //TODO: check for correct way of sending string from body
                string Id = JsonSerializer.Serialize(body);

                if (!string.IsNullOrEmpty(Id))
                {
                    if (GBIDExists(Id))
                    {
                        GivenGBIDRepository givenGBIDRepository = new GivenGBIDRepository(_info.sConnectionString);
                        GivenGBID fetchedGBID = givenGBIDRepository.GetGivenGBID(Id);
                        givenGBIDRepository.Delete(fetchedGBID);
                        return Ok("GB with ID: " + Id + " removed Successfully");
                    }
                    else
                    {
                        return BadRequest("GB with ID: " + Id + " does not exist");
                    }
                }
                else
                {
                    return BadRequest("GB Id Cannot be null");
                }

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Check if GBID Exists
        private bool GBIDExists(string Id)
        {
            try
            {
                GivenGBIDRepository givenGBIDRepository = new GivenGBIDRepository(_info.sConnectionString);
                GivenGBID fetchedGBId = givenGBIDRepository.GetGivenGBID(Id);
                if (fetchedGBId != null)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Exception in GBID Exists Function, Exception Message: " + ex.Message);
            }
        }
        #endregion
    }
}
using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Transactions;
using CTADBL.Entities;
using CTAWebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Reflection;

namespace CTAWebAPI.Controllers.Masters
{
    
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    [ApiController]
    public class GBRelationController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly GBRelationRepository _gbRelationRepository;
        public GBRelationController(DBConnectionInfo info)
        {
            _info = info;
            _gbRelationRepository = new GBRelationRepository(_info.sConnectionString);
        }
        #endregion

        #region Handle GreenBook Update
        [AuthorizeRole(FeatureID: 16)]
        [HttpPost]
        [Route("[action]")]
        public IActionResult HandleGreenBookUpdate(List<GBRelation> gbRelations)
        {
            try
            {
                var result= _gbRelationRepository.HandleGreenBookUpdate(gbRelations);
                if (result != 0)
                {
                    return Ok();
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

        }
        #endregion
    }
}

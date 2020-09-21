using CTADBL.Entities;
using CTADBL.ViewModels.TempReference;
using CTADBL.ViewModelsRepositories.TempReference;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace CTAWebAPI.Controllers.TempReference
{
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    [ApiController]
    public class SPController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        public SPController(DBConnectionInfo info)
        {
            _info = info;
        }
        #endregion

        #region Joins & Transaction Action
        [HttpGet]
        [Route("[action]")]
        public IActionResult InnerJoin()
        {
            #region Get Users using SP call
            try
            {
                 MemberCommitteeVMRepository memberCommitteeVMRepository= new MemberCommitteeVMRepository(_info.sConnectionString);
                IEnumerable<MemberCommitteeVM> memberCommitttee = memberCommitteeVMRepository.InnerJoin();
                return Ok(memberCommitttee);
                //return Ok("");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult Transaction()
        {
            #region Transaction Example
            try
            {
                MemberCommitteeVMRepository memberCommitteeVMRepository = new MemberCommitteeVMRepository(_info.sConnectionString);
                memberCommitteeVMRepository.Transaction();
                return Ok("Transaction Success");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion
    }
}

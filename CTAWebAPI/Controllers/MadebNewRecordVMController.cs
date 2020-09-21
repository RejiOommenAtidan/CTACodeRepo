using CTADBL.ViewModels;
using CTADBL.ViewModelsRepositories;
using CTADBL.Entities;
using CTAWebAPI.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace CTAWebAPI.Controllers
{
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    //[APIKeyAuth]
    [ApiController]
    public class MadebNewRecordVMController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly MadebNewRecordVMRepository _madebNewRecordVMRepository;
        public MadebNewRecordVMController(DBConnectionInfo info)
        {
            _info = info;
            _madebNewRecordVMRepository = new MadebNewRecordVMRepository(_info.sConnectionString);
        }
        #endregion

        #region Get Calls
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetNewEmptyMadeb()
        {
            #region Get Users using SP call
            try
            {
                List<MadebNewRecordVM> madebNewRecord = _madebNewRecordVMRepository.GetNewEmptyMadeb();
                if(madebNewRecord.Count > 0)
                {
                    return Ok(madebNewRecord);
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
            #endregion
        }
        #endregion
    }
}

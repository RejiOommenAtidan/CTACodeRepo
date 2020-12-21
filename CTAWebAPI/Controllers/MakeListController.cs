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

namespace CTAWebAPI.Controllers
{
    [AuthorizeRole(FeatureID: 15)]
    [EnableCors("AllowOrigin")]
    //[APIKeyAuth]
    [Route("api/[controller]")]
    [ApiController]
    public class MakeListController : ControllerBase
    {

        private readonly DBConnectionInfo _info;
        private readonly MakeListRepository _makeListRepository;
        private readonly CTALogger _ctaLogger;


        public MakeListController(DBConnectionInfo info)
        {
            _info = info;
            _makeListRepository = new MakeListRepository(_info.sConnectionString);
            _ctaLogger = new CTALogger(_info);
        }
        [HttpPost]
        [Route("[action]")]
        public IActionResult MakeList([FromBody] Dictionary<string, dynamic> parameters)
        {
            try
            {
                //var p = JsonConvert.SerializeObject(parameters);
                //var dict = JsonConvert.DeserializeObject<Dictionary<string, dynamic>>(p);
                IEnumerable<MakeList> makeList = _makeListRepository.GetMakeListData(parameters);
                if(makeList != null)
                {
                    #region Information Logging
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called", null, 1);
                    #endregion
                    if(makeList.Count() > 0)
                    {
                        return Ok(makeList);
                    }
                    else
                    {
                        return Ok("No Records");
                    }
                    
                }
                else
                {
                    return BadRequest("Query for MakeList failed.");
                }
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("[action]")]
        public IActionResult SetPrinted([FromBody] Dictionary<string, dynamic> parameters)
        {
                try
            {
                string result = _makeListRepository.SetPrinted(parameters);

                if (!String.IsNullOrEmpty(result) && Convert.ToInt32(result) > 0)
                {
                    #region Alert Logging 
                    _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 3), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 2), MethodBase.GetCurrentMethod().Name + " Method Called", null, 1);
                    #endregion
                    return Ok(string.Format("{0} rows marked as Printed", result));
                }
                else
                {
                    return NotFound(result);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    }
}

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
    //[AuthorizeRole(FeatureID = 13)]
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    //[APIKeyAuth]
    [ApiController]
    public class PrintGreenBookController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly PrintGreenBookVMRepository _printGreenBookVMRepository;
        private readonly CTALogger _ctaLogger;


        public PrintGreenBookController(DBConnectionInfo info)
        {
            _info = info;
            _printGreenBookVMRepository = new PrintGreenBookVMRepository (_info.sConnectionString);
            _ctaLogger = new CTALogger(_info);
        }
        #endregion
        [AuthorizeRole(FeatureID = 13)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetPrintList(int records)
        {
            #region Get Print List
            try
            {
                IEnumerable<PrintGreenBookVM> printList = _printGreenBookVMRepository.GetPrintList(records);

                if (printList != null && printList.Count() > 0)
                {
                    return Ok(printList);
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

        [AuthorizeRole(FeatureID = 13)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetGreenBookByGBID(string sGBID)
        {
            #region Get Print List
            try
            {
                PrintGreenBookVM printRecord = _printGreenBookVMRepository.GetGreenBookByGBID(sGBID);

                if (printRecord != null )
                {
                    return Ok(printRecord);
                }
                else
                {
                    return StatusCode(StatusCodes.Status204NoContent);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        [AuthorizeRole(FeatureID = 13)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult AddPrintActionLog(int nUserId)
        {

            #region AddPrintActionLog
         
                #region Information Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called", null, nUserId);

            return Ok();
            #endregion
            

          
            #endregion
        }



    }
}

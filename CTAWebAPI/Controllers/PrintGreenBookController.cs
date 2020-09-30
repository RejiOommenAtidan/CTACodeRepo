using CTADBL.Entities;
using CTADBL.ViewModels;
using CTADBL.ViewModelsRepositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;

namespace CTAWebAPI.Controllers
{
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    //[APIKeyAuth]
    [ApiController]
    public class PrintGreenBookController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly PrintGreenBookVMRepository _printGreenBookVMRepository;

        public PrintGreenBookController(DBConnectionInfo info)
        {
            _info = info;
            _printGreenBookVMRepository = new PrintGreenBookVMRepository (_info.sConnectionString);
        }
        #endregion
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
    }
}

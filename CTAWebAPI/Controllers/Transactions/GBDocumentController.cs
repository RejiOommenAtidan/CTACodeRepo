using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Transactions;
using CTADBL.Entities;
using CTAWebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Reflection;

namespace CTAWebAPI.Controllers.Masters
{
    [Authorize]
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    [ApiController]
    public class GBDocumentController : ControllerBase
    {
        private readonly DBConnectionInfo _info;
        private readonly GBDocumentRepository _gbDocumentRepository;

        #region Constructor

        public GBDocumentController(DBConnectionInfo info)
        {
            _info = info;
            _gbDocumentRepository = new GBDocumentRepository(_info.sConnectionString);
        }
        #endregion

      

        #region Delete Call
        [HttpPost]
        [Route("[action]")]
        public IActionResult DeleteGBDocument(GBDocument documentToDelete)
        {
            #region Delete AuthRegion
            try
            {
                GBDocument gbdocument = _gbDocumentRepository.GetDocumentById(documentToDelete.Id.ToString());
                if (gbdocument != null && documentToDelete != null)
                {

                        int deleted = _gbDocumentRepository.Delete(documentToDelete);// Delete method should return boolean for success.
                        if (deleted > 0)
                        {
                            #region Alert Logging 
                            CTALogger logger = new CTALogger(_info);
                            logger.LogRecord(((Operations)4).ToString(), GetType().Name.Replace("Controller", ""), ((LogLevels)2).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", null, documentToDelete.nEnteredBy);
                            #endregion
                            return Ok(string.Format("Region with ID: {0} deleted successfully", documentToDelete.Id));
                        }

                        else
                            return StatusCode(StatusCodes.Status500InternalServerError, "There was an error while deleting the record.");

                }
                else
                {
                    return BadRequest("Cannot delete 'null' region.");
                }

            }
            catch (Exception ex)
            {
                #region Exception Logging 
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(((Operations)4).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, documentToDelete.nEnteredBy);
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

    }
}

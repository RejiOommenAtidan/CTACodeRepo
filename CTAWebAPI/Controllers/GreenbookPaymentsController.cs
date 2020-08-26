using CTADBL.BaseClasses;
using CTADBL.BaseClassRepositories;
using CTADBL.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace CTAWebAPI.Controllers
{
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    [ApiController]
    public class GreenbookPaymentsController : ControllerBase
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        public GreenbookPaymentsController(DBConnectionInfo info)
        {
            _info = info;
        }
        #endregion

        #region Get Payments
        [HttpGet("GetPayment/paymentID={paymentID}")]
        [Route("[action]")]
        public IActionResult GetPayment(string paymentID)
        {
            #region Get Payments
            try
            {
                GreenbookPaymentRepository greenbookPaymentRepository = new GreenbookPaymentRepository(_info.ConnectionString);
                GreenbookPayment fetchedPayment = greenbookPaymentRepository.GetPaymentById(paymentID);
                return Ok(fetchedPayment);
                //return Ok("");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

            #endregion
        }
        #endregion

        #region Edit Payment
        [HttpPost("EditPayment/paymentID={paymentID}")]
        [Route("[action]")]
        public IActionResult EditPayment(string paymentID, [FromBody] GreenbookPayment greenbookPayment)
        {
            #region Edit Payment
            try
            {
                if (ModelState.IsValid)
                {
                    if (greenbookPayment == null)
                    {
                        return BadRequest("Payment object cannot be NULL");
                    }

                    GreenbookPaymentRepository greenbookPaymentRepository = new GreenbookPaymentRepository(_info.ConnectionString);
                    greenbookPaymentRepository.Update(greenbookPayment);
                    return Ok(greenbookPayment);
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
    }
}

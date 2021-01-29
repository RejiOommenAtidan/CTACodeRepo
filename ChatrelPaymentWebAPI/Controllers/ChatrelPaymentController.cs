using ChatrelDBL.BaseClasses.Transactions;
using ChatrelDBL.BaseClassRepositories.Masters;
using ChatrelDBL.BaseClassRepositories.Transactions;
using ChatrelDBL.Entities;
using ChatrelDBL.ViewModels;
using ChatrelDBL.ViewModelsRepositories;
using ChatrelPaymentWebAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Core.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using MailKit.Net.Smtp;
using MimeKit;
using Newtonsoft.Json;
using System.Security.Claims;
using System.Threading.Tasks;

using PayPalCheckoutSdk.Core;
using PayPalCheckoutSdk.Orders;
using System.Text;
using DinkToPdf.Contracts;
using DinkToPdf;
using System.IO;
using TimeZoneConverter;

namespace ChatrelPaymentWebAPI.Controllers
{
    //[Authorize]
    [EnableCors("AllowOrigin")]
    //[APIKeyAuth]
    [Route("api/[controller]")]
    [ApiController]


    public class ChatrelPaymentController : ControllerBase
    {
        private readonly DBConnectionInfo _info;
        private readonly ChatrelPaymentRepository _chatrelPaymentRepository;
        private readonly ChatrelPaymentVMRepository _chatrelPaymentVMRepository;
        private readonly GreenbookRepository _greenbookRepository;
        private readonly ChatrelLogger _chatrelLogger;
        private IConverter _converter;

        public ChatrelPaymentController(DBConnectionInfo info, IConverter converter)
        {
            _info = info;
            _chatrelPaymentRepository = new ChatrelPaymentRepository(info.sConnectionString);
            _chatrelPaymentVMRepository = new ChatrelPaymentVMRepository(info.sConnectionString, converter);
            _greenbookRepository = new GreenbookRepository(info.sConnectionString);
            _chatrelLogger = new ChatrelLogger(info);
            _converter = converter;

        }

        #region Add new Payment record
        [Authorize]
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddNewChatrelPayment(ChatrelPaymentVM payment)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var definition = new { details = new[] { new { issue = "", description = "" } } };


                    var status = VerifyPayPalPayment(payment.chatrelPayment.sPayPal_ID, System.Math.Round(payment.chatrelPayment.nChatrelTotalAmount, 2, MidpointRounding.AwayFromZero));
                    bool success = status.Result.Item1;

                    var obj = JsonConvert.DeserializeAnonymousType(status.Result.Item2, definition);

                    if (!success)
                    {
                        return Problem(obj.details[0].description);
                    }

                    Object message = _chatrelPaymentVMRepository.Add(payment);
                    if (message != null)
                    {
                        #region Information Logging
                        _chatrelLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called", null, payment.chatrelPayment.nEnteredBy);
                        #endregion
                        return Ok(message);
                        //return Ok(new { receipt = (byte[])message });
                    }
                    return Problem(message.ToString());
                }
                catch (Exception ex)
                {
                    #region Exception Logging
                    _chatrelLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, payment.chatrelPayment.nEnteredBy);
                    #endregion

                    return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
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
        #endregion

        #region Get Payment Records
        //[Authorize]
        //[HttpGet]
        //[Route("[action]")]
        //public IActionResult GetAllChatrelPayments()
        //{
        //    try
        //    {
        //        IEnumerable<ChatrelPayment> result = _chatrelPaymentRepository.GetAllChatrelPayments();
        //        if (result != null && result.Count() > 0)
        //        {
        //            #region Information Logging 
        //            _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called");
        //            #endregion
        //            return Ok(result);
        //        }
        //        return NoContent();
        //    }
        //    catch (Exception ex)
        //    {
        //        #region Exception Logging 

        //        _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
        //        #endregion

        //        return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //    }
        //}

        #endregion


        #region DisplayChatrelPayment
        [Authorize]
        [HttpGet]
        [Route("[action]")]
        public IActionResult DisplayChatrelPayment(string sGBID)
        {
            if (String.IsNullOrEmpty(sGBID) || String.IsNullOrWhiteSpace(sGBID))
            {
                return BadRequest("Required parameters are missing.");
            }
            try
            {
                //string sGBIDf = User.Claims.Where(claim => claim.Type == ClaimTypes.NameIdentifier).Select(claim => claim.Value).FirstOrDefault().ToString();
                Object chatrel = _chatrelPaymentRepository.DisplayChatrelPayment(sGBID);
                if (chatrel != null)
                {
                    if (chatrel.ToString() == "Greenbook ID does not Exist.")
                    {
                        #region Information Logging 
                        _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", "", Convert.ToInt32(sGBID));
                        #endregion
                        return NotFound(chatrel.ToString());
                    }
                    if (chatrel.ToString() == "Paid Until Value not found")
                    {
                        #region Information Logging 
                        _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", "", Convert.ToInt32(sGBID));
                        #endregion
                        return Ok("Paid Until Missing");
                    }
                    #region Information Logging 
                    _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", "", Convert.ToInt32(sGBID));
                    #endregion
                    return Ok(chatrel);
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 

                _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, Convert.ToInt32(sGBID));
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError);

            }
        }

        #endregion

        #region Get Family Details

        [Authorize]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetFamilyDetails(/*string sGBID*/)
        {
            //if (String.IsNullOrEmpty(sGBID) || String.IsNullOrWhiteSpace(sGBID))
            //{
            //    return BadRequest("Required parameters are missing.");
            //}
            try
            {
                string sGBIDAuthorized = User.Claims.Where(claim => claim.Type == ClaimTypes.NameIdentifier).Select(claim => claim.Value).FirstOrDefault().ToString();
                Object chatrel = _chatrelPaymentRepository.GetFamilyDetails(sGBIDAuthorized);
                if (chatrel != null)
                {
                    #region Information Logging 
                    _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", "", Convert.ToInt32(sGBIDAuthorized));
                    #endregion
                    return Ok(chatrel);
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                string sGBIDAuthorized = User.Claims.Where(claim => claim.Type == ClaimTypes.NameIdentifier).Select(claim => claim.Value).FirstOrDefault().ToString();
                #region Exception Logging 

                _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, Convert.ToInt32(sGBIDAuthorized));
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError);

            }
        }
        #endregion

        #region Get Payment History

        [Authorize]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetPaymentHistory(/*string sGBID*/)
        {
            //if (String.IsNullOrEmpty(sGBID) || String.IsNullOrWhiteSpace(sGBID))
            //{
            //    return BadRequest("Required parameters are missing.");
            //}
            try
            {
                string sGBIDAuthorized = User.Claims.Where(claim => claim.Type == ClaimTypes.NameIdentifier).Select(claim => claim.Value).FirstOrDefault().ToString();
                Object paymentHistory = _chatrelPaymentRepository.GetPaymentHistory(sGBIDAuthorized);
                if (paymentHistory != null)
                {
                    #region Information Logging 
                    _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", "", Convert.ToInt32(sGBIDAuthorized));
                    #endregion
                    return Ok(paymentHistory);
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                string sGBIDAuthorized = User.Claims.Where(claim => claim.Type == ClaimTypes.NameIdentifier).Select(claim => claim.Value).FirstOrDefault().ToString();
                #region Exception Logging 

                _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, Convert.ToInt32(sGBIDAuthorized));
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError);

            }
        }
        #endregion

        #region Verify Friend Payment

        [Authorize]
        [HttpGet]
        [Route("[action]")]
        public IActionResult VerifyFriendDetails(string sFirstName, string sLastName, string sGBID, DateTime dtDOB)
        {
            if (String.IsNullOrEmpty(sGBID) || String.IsNullOrWhiteSpace(sGBID) || String.IsNullOrEmpty(sFirstName) || String.IsNullOrWhiteSpace(sFirstName) || String.IsNullOrEmpty(sLastName) || String.IsNullOrWhiteSpace(sLastName))
            {
                return BadRequest("Required parameters are missing.");
            }
            if (dtDOB == null)
            {
                return BadRequest("Required parameters are missing.");
            }
            try
            {
                bool verified = _chatrelPaymentRepository.VerifyFriendDetails(sFirstName, sLastName, sGBID, dtDOB);
                if (verified)
                {
                    #region Information Logging 
                    _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", "", Convert.ToInt32(sGBID));
                    #endregion
                    return Ok(verified);
                }
                else
                {
                    return Ok(verified);
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 

                _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, Convert.ToInt32(sGBID));
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError);

            }
        }
        #endregion

        #region Submit Dispute
        [Authorize]
        [HttpPost]
        [Route("[action]")]
        public IActionResult SubmitDispute(Dictionary<string, dynamic> dict)
        {

            //To do: Add attachment to the email.

            var mailText = dict["description"].ToString();
            string attachment = dict["file"].ToString();
            var sName = dict["sName"].ToString();
            var sGBID = dict["sGBID"].ToString();
            var sFileName = dict["sTitle"].ToString();
            var sFileExtension = dict["sFileExtension"].ToString();
            var emailFrom = "aayush.pandya@atidan.com";
            var emailTo = "malay.doshi@atidan.com";

            //attachment = attachment.Substring(attachment.IndexOf("base64,") + 7);

            byte[] attach = Convert.FromBase64String(attachment);

            MimeMessage message = new MimeMessage();
            MailboxAddress from = new MailboxAddress(sName, emailFrom);
            MailboxAddress to = new MailboxAddress("CTA Team", emailTo);

            BodyBuilder messageBody = new BodyBuilder();
            messageBody.TextBody = mailText;
            messageBody.Attachments.Add(sFileName + "." + sFileExtension, attach);


            message.From.Add(from);
            message.To.Add(to);
            message.Subject = String.Format("Email from {0}, GreenBook Id: {1}", sName, sGBID);

            message.Date = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("Eastern Standard Time"));
            message.Body = messageBody.ToMessageBody();
            // Message ready. Now to use smtp client to despatch message
            SmtpClient smtpClient = new SmtpClient();
            smtpClient.Connect("smtp-mail.outlook.com", 25, false);
            smtpClient.Authenticate("aayush.pandya@atidan.com", "A@yush@123");
            smtpClient.Send(message);
            smtpClient.Disconnect(true);
            smtpClient.Dispose();
            return Ok("Email sent successfully.");

        }
        #endregion


        //#region Authenticate User
        //[AllowAnonymous]
        //[HttpPost]
        //[Route("[action]")]
        ////public IActionResult AuthenticateGBID(string sGBID, DateTime dtDOB, string sEmail, string sFirstName, string sLastName)
        //public IActionResult AuthenticateGBID(Dictionary<string, string> dict)
        //{
        //    string sGBID = dict.ContainsKey("sGBID") ? dict["sGBID"] : "";
        //    string sEmail = dict.ContainsKey("sEmail") ? dict["sEmail"] : "";
        //    string sFirstName = dict.ContainsKey("sFirstName") ? dict["sFirstName"] : "";
        //    string sLastName = dict.ContainsKey("sLastName") ? dict["sLastName"] : "";
        //    DateTime? dtDOB = dict.ContainsKey("dtDOB") ? (DateTime?)DateTime.Parse(dict["dtDOB"]) : null;

        //    if (String.IsNullOrEmpty(sGBID) || String.IsNullOrWhiteSpace(sGBID) || String.IsNullOrWhiteSpace(sEmail) || String.IsNullOrEmpty(sEmail) || String.IsNullOrEmpty(sFirstName) || String.IsNullOrWhiteSpace(sFirstName) || String.IsNullOrEmpty(sLastName) || String.IsNullOrWhiteSpace(sLastName) || dtDOB == null )
        //    {
        //        return BadRequest("Parameters invalid.");
        //    }
        //    else
        //    {
        //        try
        //        {
        //            Greenbook greenbook = _greenbookRepository.GetGreenbookByGBID(sGBID);
        //            if (greenbook.dtDOB == dtDOB && greenbook.sEmail == sEmail /*&& greenbook.sFirstName == sFirstName && greenbook.sLastName == sLastName*/)
        //            {
        //                #region Information Logging 
        //                _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called",null,Convert.ToInt32(greenbook.sGBID));
        //                #endregion


        //                // should we set a cookie or a token?
        //                return Ok("Verified");
        //            }
        //            else
        //            {
        //                return Ok("Failed");
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            #region Exception Logging 

        //            _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
        //            #endregion
        //            return StatusCode(StatusCodes.Status500InternalServerError);
        //        }
        //    }


        //}
        //#endregion

        #region Get Receipt
        [Authorize]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetReceipt(string sReceiptNumber)
        {
            if (String.IsNullOrEmpty(sReceiptNumber.Trim()))
            {
                return BadRequest();
            }
            try
            {
                string sGBID = User.Claims.Where(claim => claim.Type == ClaimTypes.NameIdentifier).Select(claim => claim.Value).FirstOrDefault().ToString();
                var result = _chatrelPaymentVMRepository.GetReceipt(sReceiptNumber);
                if (result != null)
                {
                    //var receipt = result.GetType().GetProperty("receipt").GetValue(result);
                    //string sPaidByGBId = receipt.GetType().GetProperty("sPaidByGBId").GetValue(receipt).ToString();
                    //if(sGBID != sPaidByGBId)
                    //{
                    //    return Unauthorized("The receipt number " + sReceiptNumber + " does not belong to your Greenbook ID " + sGBID);
                    //}

                    //  return Ok(result);
                    return File((byte[])result, "application/pdf", "ChatrelReceipt.pdf");
                }
                else
                {
                    return NoContent();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        #endregion

        #region PayPal Payment Verification
        //[Authorize]
        //[HttpGet]
        //[Route("[action]")]
        private async Task<Tuple<bool, string>> VerifyPayPalPayment(string orderId, decimal totalChatrel)
        {
            //if (String.IsNullOrEmpty(orderId.Trim()))
            //{
            //    var reply = new HttpResponse();
            //    return new HttpResponse();
            //}
            try
            {
                OrdersGetRequest request = new OrdersGetRequest(orderId);
                var response = await PayPalClient.client().Execute(request);
                var result = response.Result<Order>();
                Console.WriteLine("Retrieved Order Status");
                Console.WriteLine("Status: {0}", result.Status);
                Console.WriteLine("Order Id: {0}", result.Id);
                Console.WriteLine("Intent: {0}", result.CheckoutPaymentIntent);
                Console.WriteLine("Links:");
                foreach (LinkDescription link in result.Links)
                {
                    Console.WriteLine("\t{0}: {1}\tCall Type: {2}", link.Rel, link.Href, link.Method);
                }
                AmountWithBreakdown amount = result.PurchaseUnits[0].AmountWithBreakdown;
                Console.WriteLine("Total Amount: {0} {1}", amount.CurrencyCode, amount.Value);

                if (result.Status == "COMPLETED" && result.CheckoutPaymentIntent == "CAPTURE")
                {
                    if (totalChatrel.ToString() == amount.Value)
                    {
                        return new Tuple<bool, string>(true, "{\"details\":[{\"issue\":\"OK\",\"description\":\"Amount received for transaction id '" + orderId + "' is '" + amount.CurrencyCode + amount.Value + "' \" }]}");
                    }
                    else
                    {
                        return new Tuple<bool, string>(false, "{\"details\":[{\"issue\":\"Amount mismatch\",\"description\":\"Amount received for transaction id '" + orderId + "' is '" + amount.CurrencyCode + amount.Value + "' \" }]}");
                    }
                }
                else
                {
                    return new Tuple<bool, string>(false, "{\"details\":[{\"issue\":\"Status Not 'COMPLETED'\",\"description\":\"Transaction status is '" + result.Status + "' \" }]}");
                }
            }
            catch (Exception ex)
            {
                return new Tuple<bool, string>(false, ex.Message);
            }
        }
        #endregion

        //[HttpGet]
        //[Route("[action]")]
        //public IActionResult TestReceipt()
        //{
        //    var sb = new StringBuilder();
        //    sb.Append(@"
        //                <html>
        //                    <head>
        //                    </head>
        //                    <body>
        //                        <div class='header'><h1>This is the generated PDF report!!!</h1></div>
        //                        <table align='center'>
        //                            <tr>
        //                                <th>Name</th>
        //                                <th>LastName</th>
        //                                <th>Age</th>
        //                                <th>Gender</th>
        //                            </tr>
        //                             <tr>
        //                            <td>{0}</td>
        //                            <td>{1}</td>
        //                            <td>{2}</td>
        //                            <td>{3}</td>
        //                          </tr>

        //                        </table>
        //                    </body>
        //                </html>");
        //    return sb.ToString();
        //}
    }
   
}

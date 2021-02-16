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
using Microsoft.Extensions.Options;
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
        private readonly AppSettings _appSettings;


        public ChatrelPaymentController(DBConnectionInfo info, IConverter converter, IOptions<AppSettings> appSettings)
        {
            _info = info;
            _chatrelPaymentRepository = new ChatrelPaymentRepository(info.sConnectionString);
            _chatrelPaymentVMRepository = new ChatrelPaymentVMRepository(info.sConnectionString, converter);
            _greenbookRepository = new GreenbookRepository(info.sConnectionString);
            _chatrelLogger = new ChatrelLogger(info);
            _converter = converter;
            _appSettings = appSettings.Value;

        }

        #region Add new Payment record
        [AuthorizeToken]
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddNewChatrelPayment(ChatrelPaymentVM payment)
        {
            if (ModelState.IsValid)
            {
                string sGBIDAuthorized = User.Claims.Where(claim => claim.Type == ClaimTypes.NameIdentifier).Select(claim => claim.Value).FirstOrDefault().ToString();
                string sLoginEmail = User.Claims.Where(claim => claim.Type == ClaimTypes.Email).Select(claim => claim.Value).FirstOrDefault().ToString();
                string token = BlockAndGenerateNewToken(Request, sGBIDAuthorized);
                try
                {
                    var definition = new { details = new[] { new { issue = "", description = "" } } };


                    var status = VerifyPayPalPayment(payment.chatrelPayment.sPayPal_ID, System.Math.Round(payment.chatrelPayment.nChatrelTotalAmount, 2, MidpointRounding.AwayFromZero)*1.00M);
                    bool success = status.Result.Item1;

                    var obj = JsonConvert.DeserializeAnonymousType(status.Result.Item2, definition);

                    if (!success)
                    {
                        return Ok(new { message = obj.details[0].description, token });
                    }

                    Object message = _chatrelPaymentVMRepository.Add(payment, sLoginEmail);
                    if (message != null)
                    {



                        #region Information Logging
                        _chatrelLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called", null, payment.chatrelPayment.nEnteredBy);
                        #endregion
                        return Ok(new { message, token });
                        //return Ok(new { receipt = (byte[])message });
                    }
                    return Ok(new { message = message.ToString(), token });
                }
                catch (Exception ex)
                {
                    #region Exception Logging
                    _chatrelLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, payment.chatrelPayment.nEnteredBy);
                    #endregion

                    return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message, token });
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

        [AuthorizeToken]
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddNewChatrelPaymentMobile(ChatrelPaymentVM payment)
        {
            if (ModelState.IsValid)
            {
                string sGBIDAuthorized = User.Claims.Where(claim => claim.Type == ClaimTypes.NameIdentifier).Select(claim => claim.Value).FirstOrDefault().ToString();
                string sLoginEmail = User.Claims.Where(claim => claim.Type == ClaimTypes.Email).Select(claim => claim.Value).FirstOrDefault().ToString();
                string token = BlockAndGenerateNewToken(Request, sGBIDAuthorized);
                try
                {
                    //var definition = new { details = new[] { new { issue = "", description = "" } } };


                    //var status = VerifyPayPalPayment(payment.chatrelPayment.sPayPal_ID, System.Math.Round(payment.chatrelPayment.nChatrelTotalAmount, 2, MidpointRounding.AwayFromZero));
                    //bool success = status.Result.Item1;

                    //var obj = JsonConvert.DeserializeAnonymousType(status.Result.Item2, definition);

                    //if (!success)
                    //{
                    //    return Ok(new { message = obj.details[0].description, token });
                    //}

                    Object message = _chatrelPaymentVMRepository.Add(payment, sLoginEmail);
                    if (message != null)
                    {



                        #region Information Logging
                        _chatrelLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 1), MethodBase.GetCurrentMethod().Name + " Method Called", null, payment.chatrelPayment.nEnteredBy);
                        #endregion
                        return Ok(new { message, token });
                        //return Ok(new { receipt = (byte[])message });
                    }
                    return Ok(new { message = message.ToString(), token });
                }
                catch (Exception ex)
                {
                    #region Exception Logging
                    _chatrelLogger.LogRecord(Enum.GetName(typeof(Operations), 1), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, payment.chatrelPayment.nEnteredBy);
                    #endregion

                    return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message, token });
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
        [AuthorizeToken]
        [HttpGet]
        [Route("[action]")]
        public IActionResult DisplayChatrelPayment(string sGBID)
        {
            if (String.IsNullOrEmpty(sGBID) || String.IsNullOrWhiteSpace(sGBID))
            {
                return BadRequest("Required parameters are missing.");
            }
            string sGBIDAuthorized = User.Claims.Where(claim => claim.Type == ClaimTypes.NameIdentifier).Select(claim => claim.Value).FirstOrDefault().ToString();
            string token = BlockAndGenerateNewToken(Request, sGBIDAuthorized);
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
                        return Ok(new { message = chatrel.ToString(), token });
                    }
                    if (chatrel.ToString() == "Paid Until Value not found")
                    {
                        #region Information Logging 
                        _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", "", Convert.ToInt32(sGBID));
                        #endregion
                        return Ok(new { message = "Paid Until Missing", token });
                    }
                    #region Information Logging 
                    _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", "", Convert.ToInt32(sGBID));
                    #endregion
                    return Ok(new { chatrel, token });
                }
                else
                {
                    return Ok(new { message = "No Data", token });
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 

                _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, Convert.ToInt32(sGBID));
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message, token });

            }
        }

        #endregion

        #region Get Family Details

        [AuthorizeToken]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetFamilyDetails(/*string sGBID*/)
        {
            //if (String.IsNullOrEmpty(sGBID) || String.IsNullOrWhiteSpace(sGBID))
            //{
            //    return BadRequest("Required parameters are missing.");
            //}
            string sGBIDAuthorized = User.Claims.Where(claim => claim.Type == ClaimTypes.NameIdentifier).Select(claim => claim.Value).FirstOrDefault().ToString();
            string token = BlockAndGenerateNewToken(Request, sGBIDAuthorized);
            try
            {
                Object chatrel = _chatrelPaymentRepository.GetFamilyDetails(sGBIDAuthorized);
                if (chatrel != null)
                {
                    #region Information Logging 
                    _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", "", Convert.ToInt32(sGBIDAuthorized));
                    #endregion
                    return Ok(new { chatrel, token });
                }
                else
                {
                    return Ok(new { chatrel, token });
                }
            }
            catch (Exception ex)
            {

                #region Exception Logging 

                _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, Convert.ToInt32(sGBIDAuthorized));
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message, token });

            }
        }
        #endregion

        #region Get Payment History

        [AuthorizeToken]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetPaymentHistory(/*string sGBID*/)
        {
            //if (String.IsNullOrEmpty(sGBID) || String.IsNullOrWhiteSpace(sGBID))
            //{
            //    return BadRequest("Required parameters are missing.");
            //}
            string sGBIDAuthorized = User.Claims.Where(claim => claim.Type == ClaimTypes.NameIdentifier).Select(claim => claim.Value).FirstOrDefault().ToString();
            string token = BlockAndGenerateNewToken(Request, sGBIDAuthorized);
            try
            {
                Object paymentHistory = _chatrelPaymentRepository.GetPaymentHistory(sGBIDAuthorized);
                if (paymentHistory != null)
                {
                    #region Information Logging 
                    _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", "", Convert.ToInt32(sGBIDAuthorized));
                    #endregion
                    return Ok(new { message = "Payment History Found", paymentHistory, token });
                }
                else
                {
                    return Ok(new { message = "No Payment History Found", token });
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, Convert.ToInt32(sGBIDAuthorized));
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message, token });
            }
        }
        #endregion

        #region Verify Friend Payment
        [AuthorizeToken]
        [HttpGet]
        [Route("[action]")]
        public IActionResult VerifyFriendDetails(string sGBID, DateTime dtDOB)
        {
            if (String.IsNullOrEmpty(sGBID) || String.IsNullOrWhiteSpace(sGBID) )
            {
                return BadRequest(new { message = "Required parameters are missing" });
            }
            if (dtDOB == null)
            {
                return BadRequest(new { message = "Required parameters are missing" });
            }
            string sGBIDAuthorized = User.Claims.Where(claim => claim.Type == ClaimTypes.NameIdentifier).Select(claim => claim.Value).FirstOrDefault().ToString();
            string token = BlockAndGenerateNewToken(Request, sGBIDAuthorized);
            try
            {


                bool verified = _chatrelPaymentRepository.VerifyFriendDetails( sGBID, dtDOB);
                if (verified)
                {
                    #region Information Logging 
                    _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", "", Convert.ToInt32(sGBID));
                    #endregion
                    return Ok(new { verified, token });
                }
                else
                {
                    return Ok(new { verified, token });
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 

                _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, Convert.ToInt32(sGBID));
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message, token });

            }
        }
        #endregion


        #region Submit Dispute
        [AuthorizeToken]
        [HttpPost]
        [Route("[action]")]
        public IActionResult SubmitDispute(Dictionary<string, dynamic> dict)
        {

            

            string sGBIDAuthorized = User.Claims.Where(claim => claim.Type == ClaimTypes.NameIdentifier).Select(claim => claim.Value).FirstOrDefault().ToString();
            string token = BlockAndGenerateNewToken(Request, sGBIDAuthorized);
            //To do: Add attachment to the email.
            try
            {

                var sGBID = dict["sGBID"].ToString();
                var mailTextRaw = dict["description"].ToString();
                //string attachment = dict["file"].ToString();
                var sName = dict["sName"].ToString();

                //var sFileName = dict["sTitle"].ToString();
                //var sFileExtension = dict["sFileExtension"].ToString();
                var emailFrom = "chatrelcta@gmail.com";
                var emailTo = "chatrelcta@gmail.com";

                var mailText = String.Format("Name: {0}, GB ID: {1}, Description: {2}", sName, sGBID, mailTextRaw);

                MimeMessage message = new MimeMessage();
                MailboxAddress from = new MailboxAddress(sName, emailFrom);
                MailboxAddress to = new MailboxAddress("CTA Team", emailTo);

                BodyBuilder messageBody = new BodyBuilder();
                messageBody.TextBody = mailText;
                message.From.Add(from);
                message.To.Add(to);
                message.Subject = String.Format("Dispute Raised: GB ID - {0}", sGBID);
                message.Date = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("Eastern Standard Time"));
                
                //messageBody.Attachments.Add(sFileName2 + "." + sFileExtension2, attach2);

                /** Handle attachments*/

                var temp = new[] { new { sTitle = "", sFileExtension = "", binFileDoc = "" } };

                System.Text.Json.JsonElement obj = dict["aFileResults"];
                var files = JsonConvert.DeserializeAnonymousType(obj.GetRawText(), temp);
                int total = files.Count();
                if(total > 0)
                {
                    foreach(var file in files)
                    {
                        string sFileName = file.sTitle;
                        string sFileExtension = file.sFileExtension;
                        byte[] attach = Convert.FromBase64String(file.binFileDoc);
                        messageBody.Attachments.Add(sFileName + "." + sFileExtension, attach);
                    }
                    
                }
                message.Body = messageBody.ToMessageBody();
                //string sFileName2 = files[1].sTitle;


                //string sFileExtension2 = files[1].sFileExtension;


                //byte[] attach2 = Convert.FromBase64String(files[1].binFileDoc);



                //attachment = attachment.Substring(attachment.IndexOf("base64,") + 7);

                //byte[] attach = Convert.FromBase64String(attachment);


                // Message ready. Now to use smtp client to despatch message
                SmtpClient smtpClient = new SmtpClient();
                smtpClient.AuthenticationMechanisms.Remove("XOAUTH2");
                smtpClient.Connect("smtp.gmail.com", 465, true);
                smtpClient.Authenticate("chatrelcta@gmail.com", "hjmzfrcillpuvsxv");
                smtpClient.Send(message);
                smtpClient.Disconnect(true);
                smtpClient.Dispose();
                #region Information Logging 
                _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), MethodBase.GetCurrentMethod().Name + " Method Called", "", Convert.ToInt32(sGBIDAuthorized));
                #endregion
                return Ok(new { message = "Email sent successfully.", token });
            }
            catch (Exception ex)
            {

                #region Exception Logging 

                _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, Convert.ToInt32(sGBIDAuthorized));
                #endregion
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message, token });
            }


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
        [AuthorizeToken]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetReceipt(string sReceiptNumber)
        {
            if (String.IsNullOrEmpty(sReceiptNumber.Trim()))
            {
                return BadRequest();
            }
            string sGBID = User.Claims.Where(claim => claim.Type == ClaimTypes.NameIdentifier).Select(claim => claim.Value).FirstOrDefault().ToString();
            string token = BlockAndGenerateNewToken(Request, sGBID);
            try
            {

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
                     return Ok(new { receipt = Convert.ToBase64String((byte[])result), token });
                   // return Ok(new { receipt = (File((byte[])result, "application/pdf", "ChatrelReceipt.pdf")), token });
                    //  return File((byte[])result, "application/pdf", "ChatrelReceipt.pdf");
                }
                else
                {
                    return Ok(new { receipt = "", token });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message, token });
            }
        }
        #endregion

        #region PayPal Payment Verification
        //[Authorize]
        //[HttpGet]
        //[Route("[action]")]
        [NonAction]
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
                    if (String.Format("{0:0.00}", totalChatrel) == amount.Value)
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


        [AuthorizeToken]
        [HttpGet]
        [Route("[action]")]
        public IActionResult Ping()
        {
            string sGBID = User.Claims.Where(claim => claim.Type == ClaimTypes.NameIdentifier).Select(claim => claim.Value).FirstOrDefault().ToString();
            string token = BlockAndGenerateNewToken(Request, sGBID);
            return Ok(new { message = "Pong", token });
        }

        [NonAction]
        private string BlockAndGenerateNewToken(HttpRequest request, string sGBID)
        {
            var jwt = request.Headers["Authorization"].ToString().Substring(7);
            BlockedTokens.Tokens.Add(jwt);
            //string sGBID = User.FindFirst("NameIdentifier").Value;
            Greenbook gb = _greenbookRepository.GetGreenbookByGBID(sGBID);
            UserVM user = new UserVM { User = gb, sJwtToken = String.Empty };
            user.sJwtToken = JwT.GenerateNewToken(user, _appSettings);
            return user.sJwtToken;
        }
    }

}

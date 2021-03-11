using CTADBL.BaseClasses.Masters;
using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Masters;
using CTADBL.BaseClassRepositories.Transactions;
using CTADBL.Entities;
using CTADBL.ViewModels;
using CTADBL.ViewModelsRepositories;
using CTAWebAPI.Services;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using TimeZoneConverter;

namespace CTAWebAPI.Controllers.Transactions
{
    //[Authorize]
    [EnableCors("AllowOrigin")]
    [Route("api/[controller]")]
    //[APIKeyAuth]
    [ApiController]
    public class MadebController : ControllerBase
    {



        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly MadebRepository _madebRepository;
        private readonly MadebTypeRepository _madebTypeRepository;
        private readonly MadebNewRecordVMRepository _madebNewRecordVMRepository;
        public MadebController(DBConnectionInfo info)
        {
            _info = info;
            _madebRepository = new MadebRepository(_info.sConnectionString);
            _madebNewRecordVMRepository = new MadebNewRecordVMRepository(_info.sConnectionString);
            _madebTypeRepository = new MadebTypeRepository(_info.sConnectionString);
        }
        #endregion

        #region Get Calls
        //[AuthorizeRole(FeatureID = 0)]
        //[HttpGet]
        //[Route("[action]")]
        [NonAction]
        public IActionResult GetNewEmptyMadebCommon(int nMadebTypeId)
        {
            #region Get Users using SP call
            try
            {
                MadebNewRecordVM madebNewRecord = _madebNewRecordVMRepository.GetNewEmptyMadeb(nMadebTypeId);
                if (madebNewRecord != null)
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

        [AuthorizeRole(FeatureID = 0)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetNewEmptyMadeb(int nMadebTypeId)
        {
            return GetNewEmptyMadebCommon(nMadebTypeId);
        }


        [AuthorizeRole(FeatureID = 15)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetNewEmptyMadebMakeList()
        {
            return GetNewEmptyMadebCommon(0);
        }

        [AuthorizeRole(FeatureID = 14)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetNewEmptyMadebIssueBook()
        {
            return GetNewEmptyMadebCommon(0);
        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetMadebs()
        {
            #region Get All Madebs
            try
            {
                IEnumerable<Madeb> madebs = _madebRepository.GetAllMadebs();
                if (madebs.Count() > 0)
                {
                    #region Information Logging 
                    string sActionType = Enum.GetName(typeof(Operations), 2);
                    string sModuleName = (GetType().Name).Replace("Controller", "");
                    string sEventName = Enum.GetName(typeof(LogLevels), 1);
                    string currentMethodName = MethodBase.GetCurrentMethod().Name;
                    string sDescription = currentMethodName + " Method Called";
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(sActionType, sModuleName, sEventName, sDescription);
                    #endregion

                    return Ok(madebs);
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                string sActionType = Enum.GetName(typeof(Operations), 2);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 3);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = "Exception in " + currentMethodName + ", Message: " + ex.Message;
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, ex.StackTrace);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        [HttpGet("GetMadebById/Id={Id}")]
        [Route("[action]")]
        public IActionResult GetMadebById(string Id)
        {
            #region Get Madeb
            try
            {
                Madeb madeb = _madebRepository.GetMadebById(Id);
                if (madeb != null)
                {
                    #region Information Logging 
                    string sActionType = Enum.GetName(typeof(Operations), 2);
                    string sModuleName = (GetType().Name).Replace("Controller", "");
                    string sEventName = Enum.GetName(typeof(LogLevels), 1);
                    string currentMethodName = MethodBase.GetCurrentMethod().Name;
                    string sDescription = currentMethodName + " Method Called";
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(sActionType, sModuleName, sEventName, sDescription);
                    #endregion
                    return Ok(madeb);
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }

            }
            catch (Exception ex)
            {
                #region Exception Logging 
                string sActionType = Enum.GetName(typeof(Operations), 2);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 3);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = "Exception in " + currentMethodName + ", Message: " + ex.Message;
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, ex.StackTrace);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        [AuthorizeRole(FeatureID =0)]
        [HttpGet("GetMadebsByType/MadebType={madebType}")]
        [Route("[action]")]
        public IActionResult GetMadebsByType(int madebType)
        {
            #region Get Madeb
            try
            {
                IEnumerable<Madeb> madebs = _madebRepository.GetMadebsByType(madebType);
                if (madebs.Count() > 0)
                {
                    #region Information Logging 
                    string sActionType = Enum.GetName(typeof(Operations), 2);
                    string sModuleName = (GetType().Name).Replace("Controller", "");
                    string sEventName = Enum.GetName(typeof(LogLevels), 1);
                    string currentMethodName = MethodBase.GetCurrentMethod().Name;
                    string sDescription = currentMethodName + " Method Called";
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(sActionType, sModuleName, sEventName, sDescription);
                    #endregion

                    return Ok(madebs);
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }

            }
            catch (Exception ex)
            {
                #region Exception Logging 
                string sActionType = Enum.GetName(typeof(Operations), 2);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 3);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = "Exception in " + currentMethodName + ", Message: " + ex.Message;
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, ex.StackTrace);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        //[HttpGet("GetMadebByFormNumber/formNumber={formNumber}")]
        //[Route("[action]")]
        //public IActionResult GetMadebByFormNumber(int formNumber)
        //{
        //    #region Get Madeb
        //    try
        //    {
        //        Madeb madeb = _madebRepository.GetMadebByFormNumber(formNumber);
        //        if (madeb != null)
        //        {
        //            #region Information Logging 
        //            string sActionType = Enum.GetName(typeof(Operations), 2);
        //            string sModuleName = (GetType().Name).Replace("Controller", "");
        //            string sEventName = Enum.GetName(typeof(LogLevels), 1);
        //            string currentMethodName = MethodBase.GetCurrentMethod().Name;
        //            string sDescription = currentMethodName + " Method Called";
        //            CTALogger logger = new CTALogger(_info);
        //            logger.LogRecord(sActionType, sModuleName, sEventName, sDescription);
        //            #endregion

        //            return Ok(madeb);
        //        }
        //        else
        //        {
        //            return StatusCode(StatusCodes.Status404NotFound);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        #region Exception Logging 
        //        string sActionType = Enum.GetName(typeof(Operations), 2);
        //        string sModuleName = (GetType().Name).Replace("Controller", "");
        //        string sEventName = Enum.GetName(typeof(LogLevels), 3);
        //        string currentMethodName = MethodBase.GetCurrentMethod().Name;
        //        string sDescription = "Exception in " + currentMethodName + ", Message: " + ex.Message;
        //        CTALogger logger = new CTALogger(_info);
        //        logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, ex.StackTrace);
        //        #endregion

        //        return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //    }
        //    #endregion
        //}

        [HttpGet("GetMadebByAuthRegion/authRegion={authRegion}")]
        [Route("[action]")]
        public IActionResult GetMadebByAuthRegion(int authRegion)
        {
            #region Get Madeb
            try
            {
                IEnumerable<Madeb> madebs = _madebRepository.GetMadebByAuthRegion(authRegion);
                if (madebs.Count() > 0)
                {
                    #region Information Logging 
                    string sActionType = Enum.GetName(typeof(Operations), 2);
                    string sModuleName = (GetType().Name).Replace("Controller", "");
                    string sEventName = Enum.GetName(typeof(LogLevels), 1);
                    string currentMethodName = MethodBase.GetCurrentMethod().Name;
                    string sDescription = currentMethodName + " Method Called";
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(sActionType, sModuleName, sEventName, sDescription);
                    #endregion

                    return Ok(madebs);
                }
                else
                {
                    return StatusCode(StatusCodes.Status404NotFound);
                }
            }
            catch (Exception ex)
            {
                #region Exception Logging 
                string sActionType = Enum.GetName(typeof(Operations), 2);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 3);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = "Exception in " + currentMethodName + ", Message: " + ex.Message;
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, ex.StackTrace);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }

        [AuthorizeRole(FeatureID = 9)]
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetFormsWithoutGBId()
        {
            try
            {
                Object forms = _madebRepository.GetFormsWithoutGBId();
                return Ok(forms);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

        }

        [AuthorizeRole(FeatureID = 14)]
        [HttpGet("GetMadebforIssueBook/GBId={GBId}")]
        [Route("[action]")]
        public IActionResult GetMadebforIssueBook(string GBId)
        {
            Object forms = _madebRepository.GetMadebforIssueBook(GBId);
            return Ok(forms);
        }




        #endregion

        #region Add Call

        [AuthorizeRole(FeatureID = -1)]
        [HttpPost]
        [Route("[action]")]
        public IActionResult AddMadeb(Madeb madeb)
        {
            #region Add Madeb
            try
            {
                if (ModelState.IsValid)
                {
                    madeb.dtEntered = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                    madeb.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                    string result = _madebRepository.Add(madeb);
                    if (result == "GBID does not exist.")
                    {
                        return NotFound(String.Format("GBID {0} does not exist.", madeb.sGBID));
                    }
                    if (result == "Insert Failed")
                    {
                        return StatusCode(StatusCodes.Status500InternalServerError, result);
                    }
                    #region Information Logging 
                    string sActionType = Enum.GetName(typeof(Operations), 1);
                    string sModuleName = (GetType().Name).Replace("Controller", "");
                    string sEventName = Enum.GetName(typeof(LogLevels), 1);
                    string currentMethodName = MethodBase.GetCurrentMethod().Name;
                    string sDescription = currentMethodName + " Method Called";
                    CTALogger logger = new CTALogger(_info);
                    logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, null, madeb.nEnteredBy);
                    #endregion

                    return Ok(madeb);
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
                #region Exception Logging 
                string sActionType = Enum.GetName(typeof(Operations), 1);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 3);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = "Exception in " + currentMethodName + ", Message: " + ex.Message;
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, ex.StackTrace, madeb.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Edit Call
        [AuthorizeRole(FeatureID = -1)]
        [HttpPost("EditMadeb/Id={Id}")]
        [Route("[action]")]
        public IActionResult EditMadeb(string Id, [FromBody] Madeb madeb)
        {
            #region Edit Madeb
            try
            {
                if (ModelState.IsValid)
                {
                    if (Id == null)
                    {
                        return BadRequest("Madeb Param ID cannot be NULL");
                    }

                    if (Id != madeb.Id.ToString())
                    {
                        return BadRequest("Madeb ID's ain't Matching");
                    }
                    if (MadebExists(Id))
                    {
                        Madeb fetchedMadeb = _madebRepository.GetMadebById(Id);
                        madeb.dtEntered = fetchedMadeb.dtEntered;
                        madeb.dtUpdated = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                        string result = _madebRepository.Update(madeb);
                        if (result == "GBID does not exist.")
                        {
                            return NotFound(String.Format("GBID {0} does not exist.", madeb.sGBID));
                        }
                        if (result == "Update Failed")
                        {
                            return StatusCode(StatusCodes.Status500InternalServerError, result);
                        }

                        #region Audit Log
                        if (string.IsNullOrEmpty(madeb.sGBID))
                            CTALogger.LogAuditRecord(fetchedMadeb, madeb, null, null, GetMadebFeatureMapping(madeb.nMadebTypeID), fetchedMadeb.Id, madeb.nUpdatedBy);
                        else
                            CTALogger.LogAuditRecord(fetchedMadeb, madeb, madeb.sGBID, madeb.nAuthRegionID, GetMadebFeatureMapping(madeb.nMadebTypeID), fetchedMadeb.Id, madeb.nUpdatedBy);
                        #endregion

                        #region Alert Logging 
                        string sActionType = Enum.GetName(typeof(Operations), 3);
                        string sModuleName = (GetType().Name).Replace("Controller", "");
                        string sEventName = Enum.GetName(typeof(LogLevels), 2);
                        string currentMethodName = MethodBase.GetCurrentMethod().Name;
                        string sDescription = currentMethodName + " Method Called";
                        CTALogger logger = new CTALogger(_info);
                        logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, null, madeb.nUpdatedBy);
                        #endregion


                        return Ok("Madeb with ID: " + Id + " updated Successfully");
                    }
                    else
                    {
                        return BadRequest("Madeb with ID:" + Id + " does not exist");
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
            catch (Exception ex)
            {
                #region Exception Logging 
                string sActionType = Enum.GetName(typeof(Operations), 3);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 3);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = "Exception in " + currentMethodName + ", Message: " + ex.Message;
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, ex.StackTrace, madeb.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Delete Call
        [AuthorizeRole(FeatureID = -1)]
        [HttpPost]
        [Route("[action]")]
        public IActionResult DeleteMadeb(Madeb madeb)
        {
            #region Delete Madeb
            try
            {
                //string m1 = JsonConvert.SerializeObject(madeb);
                string madebID = madeb.Id.ToString();
                if (!string.IsNullOrEmpty(madebID))
                {
                    if (MadebExists(madebID))
                    {
                        Madeb fetchedMadeb = _madebRepository.GetMadebById(madebID);
                        //if (JsonConvert.SerializeObject(madeb) == JsonConvert.SerializeObject(fetchedMadeb))
                        if (madeb.Id == fetchedMadeb.Id)
                        {
                            _madebRepository.Delete(fetchedMadeb);
                            #region Alert Logging 
                            string sActionType = Enum.GetName(typeof(Operations), 4);
                            string sModuleName = (GetType().Name).Replace("Controller", "");
                            string sEventName = Enum.GetName(typeof(LogLevels), 2);
                            string currentMethodName = MethodBase.GetCurrentMethod().Name;
                            string sDescription = currentMethodName + " Method Called";
                            CTALogger logger = new CTALogger(_info);
                            logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, null, madeb.nEnteredBy);
                            #endregion

                            return Ok("Madeb with ID: " + madebID + " removed Successfully");
                        }
                        else
                        {
                            return BadRequest("Madeb Object does not match with Database");
                        }
                    }
                    else
                    {
                        return BadRequest("Madeb with ID: " + madebID + " does not exist");
                    }
                }
                else
                {
                    return BadRequest("Madeb Id Cannot be null");
                }

            }
            catch (Exception ex)
            {
                #region Exception Logging 
                string sActionType = Enum.GetName(typeof(Operations), 4);
                string sModuleName = (GetType().Name).Replace("Controller", "");
                string sEventName = Enum.GetName(typeof(LogLevels), 3);
                string currentMethodName = MethodBase.GetCurrentMethod().Name;
                string sDescription = "Exception in " + currentMethodName;
                CTALogger logger = new CTALogger(_info);
                logger.LogRecord(sActionType, sModuleName, sEventName, sDescription, ex.StackTrace, madeb.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion

        #region Send Email 
        [Authorize]
        [HttpPost]
        [Route("[action]")]
        public IActionResult SendEmail(EmailSent email)
        {
            if (email != null)
            {
                if (String.IsNullOrEmpty(email.sReceiver))
                {
                    return BadRequest("Empty email receipient");
                }
                try
                {
                    //TODO: remove mail details as given by client afwrds
                    if (ModelState.IsValid)
                    {
                        //string sEmail = CTAConfigRepository.GetValueByKey("CTAAdminEmail").ToString();
                        string sEmailCC = CTAConfigRepository.GetValueByKey("CTAEmailCC").ToString();
                        string sEmailPwd = CTAConfigRepository.GetValueByKey("CTAAdminEmailPassword").ToString();
                        string sEmailRelayServer = CTAConfigRepository.GetValueByKey("CTAEmailRelayServer").ToString();
                        int nPort = Convert.ToInt32(CTAConfigRepository.GetValueByKey("CTAEmailServerPort"));
                        bool bUseSSL = Convert.ToBoolean(CTAConfigRepository.GetValueByKey("CTAEmailUseSSL"));
                        string sEmailFrom = CTAConfigRepository.GetValueByKey("CTAAdminEmail");

                        MimeMessage message = new MimeMessage();
                        MailboxAddress from = new MailboxAddress("Paljor Dataunit", sEmailFrom);
                        MailboxAddress to = new MailboxAddress(email.sName, email.sReceiver);
                        if (!String.IsNullOrEmpty(sEmailCC))
                        {
                            //CC Section
                            MailboxAddress toCC = new MailboxAddress("CTA Team CC", sEmailCC);
                            message.Cc.Add(toCC);
                        }
                        
                        BodyBuilder messageBody = new BodyBuilder();

                        //Regex.IsMatch(email.sBody, @"[\u0F00-\u0FFF]");
                        var result = Regex.Matches(email.sBody, @"[\u0F00-\u0FFF]");
                        var final = result.Distinct();
                        email.sBody = email.sBody.Replace("\n", "<br />");
                        foreach(var item in final)
                        {
                            email.sBody = email.sBody.Replace(item.Value, @$"<span style='font-size:1.7rem; font-weight:600;'>{item}</span>");
                        }
                        messageBody.HtmlBody = email.sBody;
                        //messageBody.TextBody = email.sBody;

                        message.From.Add(from);
                        message.To.Add(to);
                        
                        
                        message.Subject = email.sSubject;
                        message.Body = messageBody.ToMessageBody();
                        message.Date = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));

                        // Message ready. Now to use smtp client to despatch message

                        SmtpClient smtpClient = new SmtpClient();
                        smtpClient.Connect(sEmailRelayServer, nPort, bUseSSL);
                        // Note: since we don't have an OAuth2 token, disable
                        // the XOAUTH2 authentication mechanism.
                        smtpClient.AuthenticationMechanisms.Remove("XOAUTH2");
                        smtpClient.Authenticate(email.sFrom, sEmailPwd);
                        smtpClient.Send(message);
                        smtpClient.Disconnect(true);
                        smtpClient.Dispose();
                        Madeb madeb = _madebRepository.GetMadebByFormNumber(email.nFormNumber, email.nMadebTypeId);
                        madeb.dtReject = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                        madeb.dtEmailSend = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("India Standard Time"));
                        _madebRepository.Update(madeb);
                        return Ok("Email sent successfully.");
                    }
                }
                catch (Exception ex)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
                }
            }

            return Ok("hi");
        }
        #endregion

        #region Check if Madeb Exists
        private bool MadebExists(string Id)
        {
            try
            {
                Madeb fetchedMadeb = _madebRepository.GetMadebById(Id);
                if (fetchedMadeb != null)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Exception in Madeb Exists Function, Exception Message: " + ex.Message);
            }
        }
        #endregion

        #region Get Madeb to Feature Mapping
        private int GetMadebFeatureMapping(int? nMadebTypeID)
        {

            string sMadebId = nMadebTypeID.ToString();
            MadebType fetchedMadebType = _madebTypeRepository.GetMadebTypeById(sMadebId);
            return fetchedMadebType.nMadebFeatureId;
            //if (nMadebTypeID==1) 
            //{
            //    return 13;//Sarso
            //}
            //else if (nMadebTypeID == 2) 
            //{
            //    return 14;//Norchoe
            //}
            //else if (nMadebTypeID == 3)
            //{
            //    return 15;//Bhorlak
            //}
            //else if (nMadebTypeID == 4)
            //{
            //    return 18;//Abroad
            //}
            //else if (nMadebTypeID == 5)
            //{
            //    return 16;//Book Full
            //}
            //else 
            //{
            //    return 17;//BriefGB
            //}
        }
        #endregion
    }
}

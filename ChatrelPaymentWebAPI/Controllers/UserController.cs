using ChatrelDBL.BaseClasses.Transactions;
using ChatrelDBL.BaseClassRepositories.Masters;
using ChatrelDBL.BaseClassRepositories.Transactions;
using ChatrelDBL.Entities;
using ChatrelDBL.ViewModels;
using ChatrelDBL.ViewModelsRepositories;
using ChatrelPaymentWebAPI.Services;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Reflection;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TimeZoneConverter;

namespace ChatrelPaymentWebAPI.Controllers
{
    //[Authorize]
    [EnableCors("AllowOrigin")]
    //[APIKeyAuth]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        #region Constructor
        private readonly DBConnectionInfo _info;
        private readonly double dTimeout = 15;
        private readonly GreenbookRepository _greenbookRepository;
        private readonly AuthRegionRepository _authRegionRepository;
        private readonly ChatrelLogger _chatrelLogger;
        private readonly AppSettings _appSettings;
        #endregion

        public UserController(DBConnectionInfo info, IOptions<AppSettings> appSettings)
        {
            _info = info;
            _greenbookRepository = new GreenbookRepository(info.sConnectionString);
            _authRegionRepository = new AuthRegionRepository(info.sConnectionString);
            _chatrelLogger = new ChatrelLogger(info);
            _appSettings = appSettings.Value;
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<IActionResult> ValidateGoogleToken(string code, string email)
        {
            //var payload = await ValidateGoogle(code);
            //string payloadEmail = payload.Email;
            //bool emailVerified = payload.EmailVerified;

            //if (emailVerified && payloadEmail == email)
            //{
            //    return Ok(true);
            //}
            return NotFound();
        }



        [HttpGet]
        [Route("[action]")]
        public async Task<GoogleJsonWebSignature.Payload> ValidateGoogle(string code)
        {
            //IConfigurationSection googleAuthSection = _configuration.GetSection("Authentication:Google");
            //var flow = new GoogleAuthorizationCodeFlow(new GoogleAuthorizationCodeFlow.Initializer
            //{
            //    ClientSecrets = new ClientSecrets
            //    {
            //        ClientId = "11153496233-ft9h6spf18pfshdlri865cm6d6eteqef.apps.googleusercontent.com",
            //        ClientSecret = "7-x7f2pgvXNGSBY2-RZg0Ebm"
            //    }
            //});
            //var redirectUrl = "http://localhost:3000";
            //var response = await flow.ExchangeCodeForTokenAsync(string.Empty, code, redirectUrl, CancellationToken.None);

            GoogleJsonWebSignature.ValidationSettings settings = new GoogleJsonWebSignature.ValidationSettings();
            string sGoogleClientIDWebApp = ChatrelConfigRepository.GetValueByKey("sGoogleClientIDWebApp").ToString();
            string sGoogleClientIDAndroid = ChatrelConfigRepository.GetValueByKey("sGoogleClientIDAndroid").ToString();
            string sGoogleClientIDIOS = ChatrelConfigRepository.GetValueByKey("sGoogleClientIDIOS").ToString();
            settings.Audience = new List<string>() { sGoogleClientIDWebApp, sGoogleClientIDAndroid, sGoogleClientIDIOS };
            //settings.Audience = new List<string>() { "176037070348-10livm7g5iehb6mrl72bjv29b4bdmavu.apps.googleusercontent.com", "805523212166-j3oa67dcgkkff0pps9qp779ecmsp1c5o.apps.googleusercontent.com", "805523212166-osj9e06odhct70cen9n028ri06q4o2av.apps.googleusercontent.com" };
            GoogleJsonWebSignature.Payload payload = await GoogleJsonWebSignature.ValidateAsync(code, settings);

            return payload;


            //GoogleJsonWebSignature.ValidationSettings settings = new GoogleJsonWebSignature.ValidationSettings
            //{
            //    Audience = new List<string>() { "11153496233-ft9h6spf18pfshdlri865cm6d6eteqef.apps.googleusercontent.com" }
            //};
            //var payload = await GoogleJsonWebSignature.ValidateAsync(response.IdToken, settings);
            //return payload;
        }


        #region AuthenticateGBID
        [AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        //public IActionResult AuthenticateGBID(string sGBID, DateTime dtDOB, string sEmail, string sFirstName, string sLastName)
        public async Task<IActionResult> AuthenticateGBID(Dictionary<string, string> dict)
        {
            string sGBID = dict.ContainsKey("sGBID") ? dict["sGBID"] : "";
            string sEmail = dict.ContainsKey("sEmail") ? dict["sEmail"] : "";
            string sGToken = dict.ContainsKey("code") ? dict["code"] : "";
            DateTime? dtDOB = dict.ContainsKey("dtDOB") ? (DateTime?)DateTime.Parse(dict["dtDOB"]) : null;
            //string sType = dict.ContainsKey("sType") ? dict["sType"] : "";

            if (String.IsNullOrEmpty(sGBID.Trim()) || String.IsNullOrEmpty(sEmail.Trim()) || dtDOB == null || String.IsNullOrEmpty(sGToken.Trim()))
            {
                return BadRequest("Parameters invalid.");
            }
            else
            {
                try
                {
                    string payloadEmail = String.Empty;
                    bool emailVerified = false;

                    //Old Code 
                    var payload = await ValidateGoogle(sGToken);
                    payloadEmail = payload.Email;
                    emailVerified = payload.EmailVerified;

                    //Apple & Google Double Verification Code
                    //if(sType == "Apple")
                    //{
                    //    payloadEmail = sEmail;
                    //    emailVerified = true;
                    //}
                    //if (sType == "Google")
                    //{
                    //    var payload = await ValidateGoogle(sGToken);
                    //    payloadEmail = payload.Email;
                    //    emailVerified = payload.EmailVerified;
                    //}

                    if (emailVerified && payloadEmail == sEmail)
                    {

                        Greenbook greenbook = _greenbookRepository.GetGreenbookByGBID(sGBID);
                        string sAuthRegion = _authRegionRepository.GetAuthRegionById(greenbook.nAuthRegionID.ToString()).sAuthRegion;
                        if (greenbook.dtDOB == dtDOB && greenbook.sLoginGmail == sEmail)
                        {
                            

                            #region JWT
                            UserVM user = new UserVM { User = greenbook, sJwtToken = String.Empty };

                            //WriteToken
                            user.sJwtToken = JwT.GenerateNewToken(user, _appSettings);
                            while (BlockedTokens.Tokens.Contains(user.sJwtToken))
                            {
                                user.sJwtToken = JwT.GenerateNewToken(user, _appSettings);
                            }



                            //   userVMFromDB.nTimeoutInDays = dTimeout;
                            #endregion

                            #region Update Last Successful Login Date
                            greenbook.dtLastSuccessfullLogin = TimeZoneInfo.ConvertTime(DateTime.UtcNow, TZConvert.GetTimeZoneInfo("Eastern Standard Time")); ;
                            _greenbookRepository.Update(greenbook);
                            #endregion

                            // should we set a cookie or a token?
                            #region Information Logging 
                            _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), "AuthenticateGBID Method Called, sJwtToken is: " + user.sJwtToken, null, Convert.ToInt32(greenbook.sGBID));
                            #endregion
                            return Ok(new { result = "Verified", user.sJwtToken, user.User.sCountryID, sAuthRegion });
                        }
                        else
                        {
                            return Ok("Failed");
                        }
                    }
                    else
                    {
                        return Ok("Failed");
                    }
                }
                catch (Exception ex)
                {
                    #region Exception Logging 

                    _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)3).ToString(), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace);
                    #endregion
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
            }


        }
        #endregion

        #region Log Out
        [AuthorizeToken]
        [HttpGet]
        [Route("[action]")]
        public IActionResult Logout()
        {
            string sGBID = User.Claims.Where(claim => claim.Type == ClaimTypes.NameIdentifier).Select(claim => claim.Value).FirstOrDefault().ToString();
            var jwt = Request.Headers["Authorization"].ToString().Substring(7);
            BlockedTokens.Tokens.Add(jwt);
            #region Information Logging 
            _chatrelLogger.LogRecord(((Operations)2).ToString(), (GetType().Name).Replace("Controller", ""), ((LogLevels)1).ToString(), "Logout Method Called, token is: " + jwt, null, Convert.ToInt32(sGBID));
            #endregion
            return Ok(new { message = "Logged Out successfully" });
        }
        #endregion

        /*

        #region Auth User
        [AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        public IActionResult AuthenticateUser(UserVM userFromUI)
        {
            #region Authenticate User
            try
            {
             #region Equality Check
              
                if (userFromUI.sPassword.Equals(userFromDB.sPassword))
                {
                    #region Generating UserVM
                    UserVM userVMFromDB = _userVMRepository.AuthenticateUser(userFromDB.Id);
                    if (userVMFromDB == null)
                    {
                        return BadRequest("UserVM Generation Failed");
                    }
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = Encoding.ASCII.GetBytes(_appSettings.sSecret);
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                    new Claim(ClaimTypes.Name, userVMFromDB.oUser.Id.ToString()),
                    new Claim(ClaimTypes.Role, userVMFromDB.oUserRights.sUserRightsName)
                        }),
                        Expires = DateTime.UtcNow.AddDays(dTimeout),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    //WriteToken
                    userVMFromDB.sJWTToken = tokenHandler.WriteToken(token);
                    //Make Password NULL
                    userVMFromDB.oUser.sPassword = null;
                    userVMFromDB.nTimeoutInDays = dTimeout;
                    return Ok(userVMFromDB);
                    #endregion
                }
                else
                    return Unauthorized("Incorrect Password");
                #endregion        
            }
            catch (Exception ex)
            {
                //TODO: ex.Message || ex.StackTrace
                #region Exception Logging
                _ctaLogger.LogRecord(Enum.GetName(typeof(Operations), 2), (GetType().Name).Replace("Controller", ""), Enum.GetName(typeof(LogLevels), 3), "Exception in " + MethodBase.GetCurrentMethod().Name + ", Message: " + ex.Message, ex.StackTrace, userFromUI.nEnteredBy);
                #endregion

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            #endregion
        }
        #endregion*/



    }


}

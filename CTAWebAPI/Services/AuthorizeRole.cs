using CTADBL.BaseClasses.Transactions;
using CTADBL.BaseClassRepositories.Masters;
using CTADBL.BaseClassRepositories.Transactions;
using CTADBL.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Claims;


namespace CTAWebAPI.Services
{
    [System.AttributeUsage(AttributeTargets.All, Inherited = false, AllowMultiple = false)]
    public class AuthorizeRoleAttribute : AuthorizeAttribute, IAuthorizationFilter
    {
        //public string Roles { get;  set; } 

        private List<string> AllRoles { get; set; }
        private UserRightsRepository _userRightsRepository;
        private FeatureUserrightsRepository _featureUserrightsRepository;
        private UserRepository _userRepository;
        private int _FeatureID;
        public int FeatureID { get; set; }
        
        
        public AuthorizeRoleAttribute()
        {
            // string[] myAllRoles = Roles.Split(','); This line gets you the 'Role' String if specified in the attribute decoration and constructor
            //_FeatureID = FeatureID;
            
            
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            HttpRequest request = context.HttpContext.Request;
            var controller = request.RouteValues["controller"].ToString();
            var action = request.RouteValues["action"].ToString();

            // If madeb id is available in query string or get request route
            if (FeatureID == 0)
            {
                var q = request.QueryString;
                if(q.HasValue)
                {
                    string s = q.Value;
                    s = s.Substring(s.Length - 1);
                    _FeatureID = Convert.ToInt32(s) + 2;
                   
                }
                else
                {
                    _FeatureID = Convert.ToInt32(context.RouteData.Values["madebType"]) + 2;
                }
                if (_FeatureID > 8 || _FeatureID < 3)
                {
                    context.Result = new UnauthorizedResult();
                    return;
                }
            }
            // If madeb is in body (usually in Post request)
            else if (FeatureID == -1)
            {
                context.HttpContext.Request.EnableBuffering();
                context.HttpContext.Request.Body.Position = 0;

                string bodyContent = null;

                using (var streamReader = new StreamReader(context.HttpContext.Request.Body, leaveOpen: true))
                {
                    bodyContent = streamReader.ReadToEnd();
                    context.HttpContext.Request.Body.Position = 0;
                }
                if (bodyContent != null)
                {
                    Madeb madeb = JsonConvert.DeserializeObject<Madeb>(bodyContent);
                    if (madeb != null)
                    {
                        _FeatureID = madeb.nMadebTypeID + 2;
                    }
                }
            }
            else
            {
                _FeatureID = FeatureID;
            }
            
            
            //Assembly asm = Assembly.GetCallingAssembly();

            //var controlleractionlist = asm.GetTypes()
            //        .Where(type => typeof(Microsoft.AspNetCore.Mvc.ControllerBase).IsAssignableFrom(type))
            //        .SelectMany(type => type.GetMethods(BindingFlags.Instance | BindingFlags.DeclaredOnly | BindingFlags.Public))
            //        .Where(m => !m.GetCustomAttributes(typeof(System.Runtime.CompilerServices.CompilerGeneratedAttribute), true).Any())
            //        .Select(x => new { Controller = x.DeclaringType.Name, Action = x.Name, ReturnType = x.ReturnType.Name, Attributes = String.Join(",", x.GetCustomAttributes().Select(a => a.GetType().Name.Replace("Attribute", ""))) })
            //        .OrderBy(x => x.Controller).ThenBy(x => x.Action).ToList();


            // Initialize all repositories
            string connectionString = ((DBConnectionInfo)context.HttpContext.RequestServices.GetService(typeof(DBConnectionInfo))).sConnectionString;
            _userRightsRepository = new UserRightsRepository(connectionString);
            _featureUserrightsRepository = new FeatureUserrightsRepository(connectionString);
            _userRepository = new UserRepository(connectionString);

            // Get Roles from DB
            AllRoles = _userRightsRepository.GetAllUserRights().Select(x => x.sUserRightsName).ToList();

            // Get the controller & action where we are called
            
            


            var userId = context.HttpContext.User.Claims.Where(claim => claim.Type == ClaimTypes.Name).Select(claim => claim.Value).FirstOrDefault();
            
            string userRoleFromJW = context.HttpContext.User.Claims.Where(claim => claim.Type == ClaimTypes.Role).Select(claim => claim.Value).FirstOrDefault().ToString();
            //int rightsId = _userRightsRepository.GetUserRightsByUserRightsName(userRoleFromJW).Id;

            int rightsId = _userRepository.GetUserById(userId).nUserRightsId;

            bool permit = _featureUserrightsRepository.GetFeatureUserrightsByFeatureAnduserRighstId(_FeatureID, rightsId).bRights;
            if (permit)
            {
                return;
            }
            
            context.Result = new UnauthorizedResult();
        }

    }
}

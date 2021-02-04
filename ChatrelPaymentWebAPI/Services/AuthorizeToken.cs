using ChatrelDBL.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatrelPaymentWebAPI.Services
{
    [System.AttributeUsage(AttributeTargets.All, Inherited = false, AllowMultiple = false)]
    public class AuthorizeToken : AuthorizeAttribute, IAuthorizationFilter
    {

        public AuthorizeToken()
        {

        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var jwt = context.HttpContext.Request.Headers["Authorization"].ToString().Substring(7);
            bool blocked = BlockedTokens.Tokens.Contains(jwt);
            if (blocked)
            {
                context.Result = new UnauthorizedResult();
            }
        }
    }
}

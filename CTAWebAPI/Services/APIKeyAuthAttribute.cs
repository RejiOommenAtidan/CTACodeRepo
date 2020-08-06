using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;
namespace CTAWebAPI.Services
{
    [AttributeUsage(AttributeTargets.Class|AttributeTargets.Method)]
    public class APIKeyAuthAttribute : Attribute, IAsyncActionFilter
    {
        //Key from appsettings.json
        private const string sAPIKeyHeaderName = "sAPIKey";
        public async  Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            //Before Request
            if (!context.HttpContext.Request.Headers.TryGetValue(sAPIKeyHeaderName, out var sPotentialKeyValue)) {
                context.Result = new UnauthorizedResult();
                return;
            }

            var configuration = context.HttpContext.RequestServices.GetRequiredService<IConfiguration>();
            var sAPIKey = configuration.GetValue<string>(sAPIKeyHeaderName);
            if(!sAPIKey.Equals(sPotentialKeyValue))
            {
                context.Result = new UnauthorizedResult();
                return;
            }
            await next();
            //After Request
        }
    }
}

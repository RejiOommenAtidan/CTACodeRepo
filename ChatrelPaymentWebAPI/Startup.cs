using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ChatrelDBL.BaseClassRepositories.Masters;
using ChatrelDBL.Entities;
using ChatrelPaymentWebAPI.Services;
using DinkToPdf;
using DinkToPdf.Contracts;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace ChatrelPaymentWebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            #region CORS
            var origins = Configuration["AllowedOrigins"].Split(";");
            services.AddCors(c =>
            {
                c.AddPolicy("AllowOrigin", options => options.WithOrigins(origins).AllowAnyHeader().AllowAnyMethod());
            });
            #endregion

            //services.AddAuthentication(auth =>
            //{
            //    auth.DefaultScheme = "Application";
            //    auth.DefaultSignInScheme = "External";
            //})
            //.AddCookie("Application", options =>
            //{
            //    options.LoginPath = "/api/Account/Login";
            //    //options.ReturnUrlParameter = "/api/Home";
            //})
            //.AddCookie("External")
            //.AddGoogle(google =>
            //{
            //    //google.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            //    google.ClientId = "234274081004-ncqc1dgv0bus45u2vv9jhl3lkve0suns.apps.googleusercontent.com";
            //    google.ClientSecret = "fdQNNrevGXupbtaonNrIf01Q";
            //    google.AuthorizationEndpoint = String.Concat(google.AuthorizationEndpoint, "?prompt=select_account");
            //});

            #region Code for DI Purpose using DBConnection class
            services.AddSingleton<IConfiguration>(Configuration);
            var config = new DBConnectionInfo();
            config.sConnectionString = Configuration.GetConnectionString("myconn");
            services.AddSingleton(config);
            ChatrelConfigRepository configRepository = new ChatrelConfigRepository(config.sConnectionString);
            services.AddSingleton(configRepository);
            ChatrelLogger._auditLogRepository = new ChatrelDBL.BaseClassRepositories.Transactions.AuditLogRepository(config.sConnectionString);

            #endregion

            #region JWT Auth
            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            // Configure jwt authentication
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.sSecret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero //Added for exact time implementation
                };
            });
            #endregion

            //DinkToPDF
            var context = new CustomAssemblyLoadContext();
            context.LoadUnmanagedLibrary(Path.Combine(Directory.GetCurrentDirectory(), @"libwkhtmltox.dll"));
            services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));
            services.AddControllers();

        }
            
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //Get Origins & Use it between Routing & Authorization
            var origins = Configuration["AllowedOrigins"].Split(";");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }


            
            app.UseRouting();


            //app.UseCors("AllowOrigin");
            app.UseCors(options => options.WithOrigins(origins).AllowAnyHeader());
            app.UseHttpsRedirection();
            
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

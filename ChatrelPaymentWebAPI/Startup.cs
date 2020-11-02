using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatrelDBL.BaseClassRepositories.Masters;
using ChatrelDBL.Entities;
using ChatrelPaymentWebAPI.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

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
            #region Code for DI Purpose using DBConnection class
            services.AddSingleton<IConfiguration>(Configuration);
            var config = new DBConnectionInfo();
            config.sConnectionString = Configuration.GetConnectionString("myconn");
            services.AddSingleton(config);
            ChatrelConfigRepository configRepository = new ChatrelConfigRepository(config.sConnectionString);
            services.AddSingleton(configRepository);
            ChatrelLogger._auditLogRepository = new ChatrelDBL.BaseClassRepositories.Transactions.AuditLogRepository(config.sConnectionString);

            #endregion

            services.AddControllers();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

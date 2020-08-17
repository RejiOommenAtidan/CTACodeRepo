using CTADBL.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace CTAWebAPI
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

            #region Code for DI Purpose using DBConnection class
            services.AddSingleton<IConfiguration>(Configuration);
            var config = new DBConnectionInfo();
            config.ConnectionString = Configuration.GetConnectionString("myconn");
            services.AddSingleton(config);
            #endregion


            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //Get Origins & Use between Routing & Authorization
            var origins = Configuration["AllowedOrigins"].Split(";");
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();
            //Allow any header add for header related issues 
            app.UseCors(options => options.WithOrigins(origins).AllowAnyHeader());
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}

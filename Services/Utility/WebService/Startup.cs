using System;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.HealthChecks;
using Microsoft.Extensions.Logging;

using Autofac;
using Autofac.Extensions.DependencyInjection;

using Benton.Utility.Services.Data;

using Benton.Utility.WebService.Runtime;

using ILogger = Benton.Utility.Services.Diagnostics.ILogger;

namespace Benton.Utility.WebService
{
  public class Startup
  {
    public IConfiguration Configuration { get; }

    public IContainer ApplicationContainer { get; private set; }

    public Startup() => this.Configuration = new ConfigurationBuilder()
            .AddEnvironmentVariables("BENTON_UTILITY_")
            .Build();

    public IServiceProvider ConfigureServices(IServiceCollection services)
    {
      services.AddMvc().AddControllersAsServices();

      services.AddDbContext<TodoContext>(options =>
      {
        options.UseSqlServer(this.Configuration["SQL_CONNECTION_STRING"], sqlServerOptionsAction: sqlOptions =>
        {
          sqlOptions.EnableRetryOnFailure(
          maxRetryCount: 5,
          maxRetryDelay: TimeSpan.FromSeconds(30),
          errorNumbersToAdd: null);
        });
      });

      services.AddHealthChecks(checks =>
      {
        checks.AddSqlCheck("DB", this.Configuration["SQL_CONNECTION_STRING"]);
      });

      // Prepare DI container
      this.ApplicationContainer = DependencyResolution.Setup(services);

      // Print some useful information at bootstrap time
      this.PrintBootstrapInfo(this.ApplicationContainer);

      // Create the IServiceProvider based on the container
      return new AutofacServiceProvider(this.ApplicationContainer);
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
    {
      loggerFactory.AddConsole(this.Configuration.GetSection("Logging"));

      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }

      app.UseMvc();
    }

    private void PrintBootstrapInfo(IContainer container)
    {
      var log = container.Resolve<ILogger>();
      log.Info("Web service started", () => new { Uptime.ProcessId });
    }
  }
}

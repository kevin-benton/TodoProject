using System;

using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

using Benton.Utility.Services.Diagnostics;
using Benton.Utility.Services.Data;
using Benton.Utility.Services.Runtime;

using Benton.Utility.WebService.Runtime;

namespace Benton.Utility.WebService
{
  public class Program
  {
    public static void Main(string[] args)
    {
      IConfig config = new Config(new ConfigData(new Logger(Uptime.ProcessId, LogLevel.Info)));

      IWebHost host = WebHost.CreateDefaultBuilder(args)
                             .UseUrls("http://*:" + config.Port)
                             .UseKestrel(options => { options.AddServerHeader = false; })
                             .UseIISIntegration()
                             .UseHealthChecks("/health", TimeSpan.FromSeconds(1))
                             .UseStartup<Startup>()
                             .Build();

      using (IServiceScope scope = host.Services.CreateScope())
      {
        IServiceProvider services = scope.ServiceProvider;

        try
        {
          TodoContext context = services.GetRequiredService<TodoContext>();
          TodoInitializer.Initialize(context);
        }
        catch (Exception)
        {
          ILogger logger = services.GetRequiredService<ILogger>();
          logger.Error("An error occured while seeding the database.", () => { });
        }
      }

      host.Run();
    }
  }
}

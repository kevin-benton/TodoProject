using Benton.Utility.Services.Runtime;

namespace Benton.Utility.WebService.Runtime
{
  public interface IConfig
  {
    int Port { get; }

    // Service layer configuration
    IServicesConfig ServicesConfig { get; }
  }

  /// <summary>Web service configuration</summary>
  public class Config : IConfig
  {
    private const string PORT = "PORT";
    private const string SQL_CONNECTION_STRING = "SQL_CONNECTION_STRING";

    public int Port { get; }
    public IServicesConfig ServicesConfig { get; }

    public Config(IConfigData configData)
    {
      this.Port = configData.GetInt(PORT);

      this.ServicesConfig = new ServicesConfig
      {
        SqlConnectionString = configData.GetString(SQL_CONNECTION_STRING)
      };
    }
  }
}

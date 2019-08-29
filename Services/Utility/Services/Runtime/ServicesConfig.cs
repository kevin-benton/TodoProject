namespace Benton.Utility.Services.Runtime
{
  public interface IServicesConfig
  {
    string SqlConnectionString { get; set; }
  }

  public class ServicesConfig : IServicesConfig
  {
    public string SqlConnectionString { get; set; }
  }
}

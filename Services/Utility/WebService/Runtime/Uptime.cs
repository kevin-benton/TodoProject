using System;

namespace Benton.Utility.WebService.Runtime
{
  public static class Uptime
  {
    public static DateTime Start { get; } = DateTime.UtcNow;
    public static TimeSpan Duration => DateTime.UtcNow.Subtract(Start);
    public static string ProcessId { get; } = "WebService." + Guid.NewGuid();
  }
}
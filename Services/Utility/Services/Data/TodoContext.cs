using Microsoft.EntityFrameworkCore;

using Benton.Utility.Services.Models;

namespace Benton.Utility.Services.Data
{
  public class TodoContext : DbContext
  {
    public TodoContext(DbContextOptions<TodoContext> options)
        : base(options)
    {
      this.Database.EnsureCreated();
    }

    public DbSet<TodoItem> TodoItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.ApplyConfiguration(new TodoItemConfiguration());
    }
  }
}

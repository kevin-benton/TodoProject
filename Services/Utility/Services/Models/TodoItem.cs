using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Benton.Utility.Services.Models
{
  public class TodoItem
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }
    public string Name { get; set; }
    public bool Completed { get; set; }
    public DateTime Created { get; set; }

  }

  class TodoItemConfiguration : IEntityTypeConfiguration<TodoItem>
  {
    public void Configure(EntityTypeBuilder<TodoItem> modelBuilder)
    {
      modelBuilder.ToTable("TodoItem");
    }
  }
}

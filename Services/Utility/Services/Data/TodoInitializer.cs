using System;
using System.Linq;

using Benton.Utility.Services.Models;

namespace Benton.Utility.Services.Data
{
  public static class TodoInitializer
  {
    public static void Initialize(TodoContext context)
    {
      if (context.TodoItems.Any())
      {
        // Database has already been created and has data. Do nothing.
        return;
      }

      TodoItem[] todos = {
        new TodoItem { Name = "Create API", Completed = true, Created = DateTime.UtcNow },
        new TodoItem { Name = "Initialize data", Completed = false, Created = DateTime.UtcNow },
        new TodoItem { Name = "Dockerize", Completed = false, Created = DateTime.UtcNow },
        new TodoItem { Name = "Publish", Completed = false, Created = DateTime.UtcNow }
      };

      foreach (TodoItem t in todos)
      {
        context.TodoItems.Add(t);
      }

      context.SaveChanges();
    }
  }
}

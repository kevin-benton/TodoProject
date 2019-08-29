using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using Benton.Utility.Services;
using Benton.Utility.Services.Diagnostics;
using Benton.Utility.Services.Models;

namespace Benton.Utility.WebService.v1.Controllers
{
  [Route(Version.Path + "/[controller]")]
  public class TodosController : Controller
  {
    private readonly ILogger _logger;
    private readonly ITodoRepository _todos;

    public TodosController(ILogger logger, ITodoRepository todos)
    {
      this._logger = logger;
      this._todos = todos;
    }

    [HttpGet]
    public async Task<IEnumerable<TodoItem>> Get()
    {
      this._logger.Info("Get All", () => {});
      return await this._todos.GetAll();
    }

    [HttpGet("{id}", Name = "GetTodo")]
    public async Task<IActionResult> Get(long id)
    {
      this._logger.Info($"Get todo {id}", () => {});
      TodoItem item = await this._todos.Get(id);

      if (item == null)
      {
        return NotFound();
      }

      return new ObjectResult(item);
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] TodoItem item)
    {
      this._logger.Info("Create new todo", () => { });
      if (item == null)
      {
        return BadRequest();
      }

      item.Completed = false;
      item.Created = DateTime.UtcNow;

      await this._todos.Create(item);

      return CreatedAtRoute("GetTodo", new { id = item.Id }, item);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Put(long id, [FromBody] TodoItem item)
    {
      this._logger.Info($"Update todo {id}", () => { });
      if (item == null || item.Id != id)
      {
        return BadRequest();
      }

      TodoItem todo = await this._todos.Get(id);

      if (todo == null)
      {
        return NotFound();
      }

      todo.Completed = item.Completed;
      todo.Name = item.Name;

      await this._todos.Update(todo);

      return new NoContentResult();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(long id)
    {
      this._logger.Info($"Delete todo {id}", () => { });
      TodoItem todo = await this._todos.Get(id);

      if (todo == null)
      {
        return NotFound();
      }

      await this._todos.Delete(todo);

      return new NoContentResult();
    }
  }
}

using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using Benton.Utility.Services.Data;
using Benton.Utility.Services.Models;

namespace Benton.Utility.Services
{
  public interface ITodoRepository
  {
    Task<List<TodoItem>> GetAll();
    Task<TodoItem> Get(long id);
    Task Create(TodoItem item);
    Task Update(TodoItem item);
    Task Delete(TodoItem item);
  }

  public class TodoRepository : ITodoRepository
  {
    private readonly TodoContext _context;

    public TodoRepository(TodoContext context)
    {
      this._context = context;
    }

    public async Task<List<TodoItem>> GetAll()
    {
      return await this._context.TodoItems.ToListAsync();
    }

    public async Task<TodoItem> Get(long id)
    {
      return await this._context.TodoItems.FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task Create(TodoItem item)
    {
      this._context.TodoItems.Add(item);
      await this._context.SaveChangesAsync();
    }

    public async Task Update(TodoItem item)
    {
      this._context.Update(item);
      await this._context.SaveChangesAsync();
    }

    public async Task Delete(TodoItem item)
    {
      this._context.Remove(item);
      await this._context.SaveChangesAsync();
    }
  }
}

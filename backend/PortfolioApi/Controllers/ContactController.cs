using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.DTOs;
using PortfolioApi.Models;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly AppDbContext _context;
    public ContactController(AppDbContext context) { _context = context; }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateContactMessageRequest req)
    {
        var msg = new ContactMessage { Name = req.Name, Email = req.Email, Subject = req.Subject, Message = req.Message };
        _context.ContactMessages.Add(msg);
        await _context.SaveChangesAsync();
        return Ok(new ContactMessageDto(msg.Id, msg.Name, msg.Email, msg.Subject, msg.Message, msg.CreatedDate));
    }

    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _context.ContactMessages.Select(m => new ContactMessageDto(m.Id, m.Name, m.Email, m.Subject, m.Message, m.CreatedDate)).ToListAsync());

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var msg = await _context.ContactMessages.FindAsync(id);
        if (msg == null) return NotFound();
        _context.ContactMessages.Remove(msg);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

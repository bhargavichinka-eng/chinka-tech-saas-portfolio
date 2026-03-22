using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.DTOs;
using PortfolioApi.Models;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LeadsController : ControllerBase
{
    private readonly AppDbContext _context;
    public LeadsController(AppDbContext context) { _context = context; }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateLeadRequest req)
    {
        var lead = new Lead { Name = req.Name, Email = req.Email, Company = req.Company, Country = req.Country, Budget = req.Budget, Message = req.Message };
        _context.Leads.Add(lead);
        await _context.SaveChangesAsync();
        return Ok(new LeadDto(lead.Id, lead.Name, lead.Email, lead.Company, lead.Country, lead.Budget, lead.Message, lead.CreatedDate));
    }

    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _context.Leads.Select(l => new LeadDto(l.Id, l.Name, l.Email, l.Company, l.Country, l.Budget, l.Message, l.CreatedDate)).ToListAsync());

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var lead = await _context.Leads.FindAsync(id);
        if (lead == null) return NotFound();
        _context.Leads.Remove(lead);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

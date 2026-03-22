using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.DTOs;
using PortfolioApi.Models;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CaseStudiesController : ControllerBase
{
    private readonly AppDbContext _context;
    public CaseStudiesController(AppDbContext context) { _context = context; }

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _context.CaseStudies.Select(c => new CaseStudyDto(c.Id, c.Title, c.Problem, c.Solution, c.Result, c.TechStack, c.ImageUrl, c.CreatedDate)).ToListAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var c = await _context.CaseStudies.FindAsync(id);
        if (c == null) return NotFound();
        return Ok(new CaseStudyDto(c.Id, c.Title, c.Problem, c.Solution, c.Result, c.TechStack, c.ImageUrl, c.CreatedDate));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateCaseStudyRequest req)
    {
        var cs = new CaseStudy { Title = req.Title, Problem = req.Problem, Solution = req.Solution, Result = req.Result, TechStack = req.TechStack, ImageUrl = req.ImageUrl };
        _context.CaseStudies.Add(cs);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = cs.Id }, new CaseStudyDto(cs.Id, cs.Title, cs.Problem, cs.Solution, cs.Result, cs.TechStack, cs.ImageUrl, cs.CreatedDate));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateCaseStudyRequest req)
    {
        var cs = await _context.CaseStudies.FindAsync(id);
        if (cs == null) return NotFound();
        cs.Title = req.Title; cs.Problem = req.Problem; cs.Solution = req.Solution;
        cs.Result = req.Result; cs.TechStack = req.TechStack; cs.ImageUrl = req.ImageUrl;
        await _context.SaveChangesAsync();
        return Ok(new CaseStudyDto(cs.Id, cs.Title, cs.Problem, cs.Solution, cs.Result, cs.TechStack, cs.ImageUrl, cs.CreatedDate));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var cs = await _context.CaseStudies.FindAsync(id);
        if (cs == null) return NotFound();
        _context.CaseStudies.Remove(cs);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

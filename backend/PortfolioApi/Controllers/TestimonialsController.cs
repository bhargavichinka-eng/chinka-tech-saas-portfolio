using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.DTOs;
using PortfolioApi.Models;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestimonialsController : ControllerBase
{
    private readonly AppDbContext _context;
    public TestimonialsController(AppDbContext context) { _context = context; }

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _context.Testimonials.Select(t => new TestimonialDto(t.Id, t.ClientName, t.Company, t.Feedback, t.Rating, t.CreatedDate)).ToListAsync());

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTestimonialRequest req)
    {
        var t = new Testimonial { ClientName = req.ClientName, Company = req.Company, Feedback = req.Feedback, Rating = req.Rating };
        _context.Testimonials.Add(t);
        await _context.SaveChangesAsync();
        return Ok(new TestimonialDto(t.Id, t.ClientName, t.Company, t.Feedback, t.Rating, t.CreatedDate));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateTestimonialRequest req)
    {
        var t = await _context.Testimonials.FindAsync(id);
        if (t == null) return NotFound();
        t.ClientName = req.ClientName; t.Company = req.Company; t.Feedback = req.Feedback; t.Rating = req.Rating;
        await _context.SaveChangesAsync();
        return Ok(new TestimonialDto(t.Id, t.ClientName, t.Company, t.Feedback, t.Rating, t.CreatedDate));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var t = await _context.Testimonials.FindAsync(id);
        if (t == null) return NotFound();
        _context.Testimonials.Remove(t);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

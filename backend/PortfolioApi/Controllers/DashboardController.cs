using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _context;
    public DashboardController(AppDbContext context) { _context = context; }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        return Ok(new
        {
            products = await _context.Products.CountAsync(),
            caseStudies = await _context.CaseStudies.CountAsync(),
            blogPosts = await _context.BlogPosts.CountAsync(),
            publishedPosts = await _context.BlogPosts.CountAsync(b => b.IsPublished),
            leads = await _context.Leads.CountAsync(),
            contacts = await _context.ContactMessages.CountAsync(),
            testimonials = await _context.Testimonials.CountAsync(),
            bookings = await _context.Bookings.CountAsync()
        });
    }
}

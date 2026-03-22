using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.DTOs;
using PortfolioApi.Models;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogPostsController : ControllerBase
{
    private readonly AppDbContext _context;
    public BlogPostsController(AppDbContext context) { _context = context; }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] bool? published)
    {
        var query = _context.BlogPosts.AsQueryable();
        if (published.HasValue) query = query.Where(b => b.IsPublished == published.Value);
        return Ok(await query.Select(b => new BlogPostDto(b.Id, b.Title, b.Slug, b.Content, b.Tags, b.PublishedDate, b.IsPublished)).ToListAsync());
    }

    [HttpGet("{slug}")]
    public async Task<IActionResult> GetBySlug(string slug)
    {
        var b = await _context.BlogPosts.FirstOrDefaultAsync(p => p.Slug == slug);
        if (b == null) return NotFound();
        return Ok(new BlogPostDto(b.Id, b.Title, b.Slug, b.Content, b.Tags, b.PublishedDate, b.IsPublished));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateBlogPostRequest req)
    {
        var post = new BlogPost { Title = req.Title, Slug = req.Slug, Content = req.Content, Tags = req.Tags, IsPublished = req.IsPublished };
        _context.BlogPosts.Add(post);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetBySlug), new { slug = post.Slug }, new BlogPostDto(post.Id, post.Title, post.Slug, post.Content, post.Tags, post.PublishedDate, post.IsPublished));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateBlogPostRequest req)
    {
        var post = await _context.BlogPosts.FindAsync(id);
        if (post == null) return NotFound();
        post.Title = req.Title; post.Slug = req.Slug; post.Content = req.Content;
        post.Tags = req.Tags; post.IsPublished = req.IsPublished;
        await _context.SaveChangesAsync();
        return Ok(new BlogPostDto(post.Id, post.Title, post.Slug, post.Content, post.Tags, post.PublishedDate, post.IsPublished));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var post = await _context.BlogPosts.FindAsync(id);
        if (post == null) return NotFound();
        _context.BlogPosts.Remove(post);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

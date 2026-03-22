using PortfolioApi.Data;
using PortfolioApi.DTOs;
using PortfolioApi.Models;
using Microsoft.EntityFrameworkCore;

namespace PortfolioApi.Services;

public class BlogService : IBlogService
{
    private readonly AppDbContext _context;

    public BlogService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<BlogPostDto>> GetAllAsync(bool? published)
    {
        var query = _context.BlogPosts.AsQueryable();
        if (published.HasValue) query = query.Where(b => b.IsPublished == published.Value);
        return await query.Select(b => new BlogPostDto(b.Id, b.Title, b.Slug, b.Content, b.Tags, b.PublishedDate, b.IsPublished)).ToListAsync();
    }

    public async Task<BlogPostDto?> GetBySlugAsync(string slug)
    {
        var b = await _context.BlogPosts.FirstOrDefaultAsync(p => p.Slug == slug);
        return b == null ? null : new BlogPostDto(b.Id, b.Title, b.Slug, b.Content, b.Tags, b.PublishedDate, b.IsPublished);
    }

    public async Task<BlogPostDto> CreateAsync(CreateBlogPostRequest request)
    {
        var post = new BlogPost { Title = request.Title, Slug = request.Slug, Content = request.Content, Tags = request.Tags, IsPublished = request.IsPublished };
        _context.BlogPosts.Add(post);
        await _context.SaveChangesAsync();
        return new BlogPostDto(post.Id, post.Title, post.Slug, post.Content, post.Tags, post.PublishedDate, post.IsPublished);
    }

    public async Task<BlogPostDto?> UpdateAsync(int id, UpdateBlogPostRequest request)
    {
        var post = await _context.BlogPosts.FindAsync(id);
        if (post == null) return null;
        post.Title = request.Title; post.Slug = request.Slug; post.Content = request.Content;
        post.Tags = request.Tags; post.IsPublished = request.IsPublished;
        await _context.SaveChangesAsync();
        return new BlogPostDto(post.Id, post.Title, post.Slug, post.Content, post.Tags, post.PublishedDate, post.IsPublished);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var post = await _context.BlogPosts.FindAsync(id);
        if (post == null) return false;
        _context.BlogPosts.Remove(post);
        await _context.SaveChangesAsync();
        return true;
    }
}

using PortfolioApi.Data;
using PortfolioApi.DTOs;
using PortfolioApi.Models;
using Microsoft.EntityFrameworkCore;

namespace PortfolioApi.Services;

public class ProductService : IProductService
{
    private readonly AppDbContext _context;

    public ProductService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ProductDto>> GetAllAsync() =>
        await _context.Products.Select(p => new ProductDto(p.Id, p.Name, p.Description, p.TechStack, p.LiveUrl, p.GithubUrl, p.ImageUrl, p.CreatedDate)).ToListAsync();

    public async Task<ProductDto?> GetByIdAsync(int id)
    {
        var p = await _context.Products.FindAsync(id);
        return p == null ? null : new ProductDto(p.Id, p.Name, p.Description, p.TechStack, p.LiveUrl, p.GithubUrl, p.ImageUrl, p.CreatedDate);
    }

    public async Task<ProductDto> CreateAsync(CreateProductRequest request)
    {
        var product = new Product { Name = request.Name, Description = request.Description, TechStack = request.TechStack, LiveUrl = request.LiveUrl, GithubUrl = request.GithubUrl, ImageUrl = request.ImageUrl };
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return new ProductDto(product.Id, product.Name, product.Description, product.TechStack, product.LiveUrl, product.GithubUrl, product.ImageUrl, product.CreatedDate);
    }

    public async Task<ProductDto?> UpdateAsync(int id, UpdateProductRequest request)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return null;
        product.Name = request.Name; product.Description = request.Description; product.TechStack = request.TechStack;
        product.LiveUrl = request.LiveUrl; product.GithubUrl = request.GithubUrl; product.ImageUrl = request.ImageUrl;
        await _context.SaveChangesAsync();
        return new ProductDto(product.Id, product.Name, product.Description, product.TechStack, product.LiveUrl, product.GithubUrl, product.ImageUrl, product.CreatedDate);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return false;
        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return true;
    }
}

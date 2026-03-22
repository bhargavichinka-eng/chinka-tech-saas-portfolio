using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.DTOs;
using PortfolioApi.Models;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _context.Products.Select(p => new ProductDto(p.Id, p.Name, p.Description, p.TechStack, p.LiveUrl, p.GithubUrl, p.ImageUrl, p.CreatedDate)).ToListAsync());

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var p = await _context.Products.FindAsync(id);
        if (p == null) return NotFound();
        return Ok(new ProductDto(p.Id, p.Name, p.Description, p.TechStack, p.LiveUrl, p.GithubUrl, p.ImageUrl, p.CreatedDate));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateProductRequest req)
    {
        var product = new Product { Name = req.Name, Description = req.Description, TechStack = req.TechStack, LiveUrl = req.LiveUrl, GithubUrl = req.GithubUrl, ImageUrl = req.ImageUrl };
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, new ProductDto(product.Id, product.Name, product.Description, product.TechStack, product.LiveUrl, product.GithubUrl, product.ImageUrl, product.CreatedDate));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateProductRequest req)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();
        product.Name = req.Name; product.Description = req.Description; product.TechStack = req.TechStack;
        product.LiveUrl = req.LiveUrl; product.GithubUrl = req.GithubUrl; product.ImageUrl = req.ImageUrl;
        await _context.SaveChangesAsync();
        return Ok(new ProductDto(product.Id, product.Name, product.Description, product.TechStack, product.LiveUrl, product.GithubUrl, product.ImageUrl, product.CreatedDate));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();
        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

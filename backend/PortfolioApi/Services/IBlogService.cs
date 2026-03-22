using PortfolioApi.DTOs;

namespace PortfolioApi.Services;

public interface IBlogService
{
    Task<IEnumerable<BlogPostDto>> GetAllAsync(bool? published);
    Task<BlogPostDto?> GetBySlugAsync(string slug);
    Task<BlogPostDto> CreateAsync(CreateBlogPostRequest request);
    Task<BlogPostDto?> UpdateAsync(int id, UpdateBlogPostRequest request);
    Task<bool> DeleteAsync(int id);
}

namespace PortfolioApi.DTOs;

public record ProductDto(int Id, string Name, string Description, string TechStack, string? LiveUrl, string? GithubUrl, string? ImageUrl, DateTime CreatedDate);
public record CreateProductRequest(string Name, string Description, string TechStack, string? LiveUrl, string? GithubUrl, string? ImageUrl);
public record UpdateProductRequest(string Name, string Description, string TechStack, string? LiveUrl, string? GithubUrl, string? ImageUrl);

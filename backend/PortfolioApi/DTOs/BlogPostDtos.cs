namespace PortfolioApi.DTOs;

public record BlogPostDto(int Id, string Title, string Slug, string Content, string Tags, DateTime PublishedDate, bool IsPublished);
public record CreateBlogPostRequest(string Title, string Slug, string Content, string Tags, bool IsPublished);
public record UpdateBlogPostRequest(string Title, string Slug, string Content, string Tags, bool IsPublished);

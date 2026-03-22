namespace PortfolioApi.DTOs;

public record CaseStudyDto(int Id, string Title, string Problem, string Solution, string Result, string TechStack, string? ImageUrl, DateTime CreatedDate);
public record CreateCaseStudyRequest(string Title, string Problem, string Solution, string Result, string TechStack, string? ImageUrl);
public record UpdateCaseStudyRequest(string Title, string Problem, string Solution, string Result, string TechStack, string? ImageUrl);

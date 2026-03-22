namespace PortfolioApi.DTOs;

public record LeadDto(int Id, string Name, string Email, string? Company, string? Country, string? Budget, string Message, DateTime CreatedDate);
public record CreateLeadRequest(string Name, string Email, string? Company, string? Country, string? Budget, string Message);

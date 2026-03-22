namespace PortfolioApi.DTOs;

public record ContactMessageDto(int Id, string Name, string Email, string Subject, string Message, DateTime CreatedDate);
public record CreateContactMessageRequest(string Name, string Email, string Subject, string Message);

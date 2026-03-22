namespace PortfolioApi.DTOs;

public record BookingDto(int Id, string Name, string Email, DateTime BookingDate, string? Message, DateTime CreatedDate);
public record CreateBookingRequest(string Name, string Email, DateTime BookingDate, string? Message);

namespace PortfolioApi.Models;
public class Booking
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public DateTime BookingDate { get; set; }
    public string? Message { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
}

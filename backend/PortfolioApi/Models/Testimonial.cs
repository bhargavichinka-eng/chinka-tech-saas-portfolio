namespace PortfolioApi.Models;
public class Testimonial
{
    public int Id { get; set; }
    public string ClientName { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string Feedback { get; set; } = string.Empty;
    public int Rating { get; set; } = 5;
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
}

namespace PortfolioApi.Models;
public class CaseStudy
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Problem { get; set; } = string.Empty;
    public string Solution { get; set; } = string.Empty;
    public string Result { get; set; } = string.Empty;
    public string TechStack { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
}

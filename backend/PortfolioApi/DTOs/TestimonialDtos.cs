namespace PortfolioApi.DTOs;

public record TestimonialDto(int Id, string ClientName, string Company, string Feedback, int Rating, DateTime CreatedDate);
public record CreateTestimonialRequest(string ClientName, string Company, string Feedback, int Rating);
public record UpdateTestimonialRequest(string ClientName, string Company, string Feedback, int Rating);

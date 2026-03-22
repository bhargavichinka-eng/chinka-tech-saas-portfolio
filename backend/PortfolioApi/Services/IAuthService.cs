using PortfolioApi.DTOs;

namespace PortfolioApi.Services;

public interface IAuthService
{
    Task<LoginResponse?> LoginAsync(LoginRequest request);
}

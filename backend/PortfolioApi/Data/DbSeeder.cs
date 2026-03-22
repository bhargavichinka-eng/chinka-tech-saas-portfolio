using Microsoft.EntityFrameworkCore;
using PortfolioApi.Models;

namespace PortfolioApi.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        try
        {
            // Ensure database is created with schema
            await context.Database.EnsureCreatedAsync();
            
            if (!await context.Users.AnyAsync())
            {
                context.Users.Add(new User
                {
                    Email = "admin@chinkatech.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
                    Role = "Admin"
                });
            }

            if (!await context.Products.AnyAsync())
        {
            context.Products.AddRange(
                new Product { Name = "SaaS Starter Kit", Description = "A complete SaaS starter kit with multi-tenancy, billing, and admin.", TechStack = "Next.js, ASP.NET Core, SQL Server, Stripe", LiveUrl = "https://example.com", GithubUrl = "https://github.com/example/saas-starter" },
                new Product { Name = "Invoice Manager", Description = "Automated invoicing and payment tracking for freelancers.", TechStack = "React, Node.js, PostgreSQL", LiveUrl = "https://invoicemanager.example.com" }
            );
        }

        if (!await context.CaseStudies.AnyAsync())
        {
            context.CaseStudies.AddRange(
                new CaseStudy { Title = "E-Commerce Platform Migration", Problem = "Client had a legacy PHP monolith causing slow performance.", Solution = "Migrated to Next.js frontend with ASP.NET Core microservices.", Result = "60% faster page loads, 40% increase in conversions.", TechStack = "Next.js, ASP.NET Core, Azure" },
                new CaseStudy { Title = "Multi-tenant SaaS Dashboard", Problem = "Client needed isolated data per tenant with shared infrastructure.", Solution = "Implemented schema-based multi-tenancy with EF Core.", Result = "Onboarded 50+ tenants with zero data leakage.", TechStack = "ASP.NET Core, SQL Server, Azure" }
            );
        }

        if (!await context.BlogPosts.AnyAsync())
        {
            context.BlogPosts.AddRange(
                new BlogPost { Title = "Building Multi-Tenant SaaS with ASP.NET Core", Slug = "building-multi-tenant-saas-aspnet-core", Content = "In this post, we explore how to build a robust multi-tenant SaaS application using ASP.NET Core and Entity Framework Core...", Tags = "SaaS,ASP.NET Core,Multi-Tenancy", IsPublished = true, PublishedDate = DateTime.UtcNow.AddDays(-7) },
                new BlogPost { Title = "Integrating Stripe Payments in Next.js", Slug = "stripe-payments-nextjs", Content = "A complete guide to integrating Stripe payment processing in your Next.js application...", Tags = "Stripe,Next.js,Payments", IsPublished = true, PublishedDate = DateTime.UtcNow.AddDays(-3) }
            );
        }

        if (!await context.Testimonials.AnyAsync())
        {
            context.Testimonials.AddRange(
                new Testimonial { ClientName = "John Smith", Company = "TechStartup Inc", Feedback = "Outstanding work! Delivered a production-ready SaaS platform ahead of schedule.", Rating = 5 },
                new Testimonial { ClientName = "Sarah Johnson", Company = "Digital Agency Co", Feedback = "Excellent ASP.NET Core expertise. Our API performance improved dramatically.", Rating = 5 }
            );
        }

        await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error seeding database: {ex.Message}");
            throw;
        }
    }
}

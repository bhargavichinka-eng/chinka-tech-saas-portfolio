-- =============================================
-- SaaS Portfolio Platform - Seed Data
-- =============================================

USE PortfolioDb;
GO

-- Admin User (password: Admin@123)
INSERT INTO Users (Email, PasswordHash, Role) VALUES
('admin@chinkatech.com', '$2a$11$rBF3e5W9q7M2K1vL4xN0.uPQjSdT8mVnZ6wHkRaGcX5yO3pI7sEtq', 'Admin');

-- Products
INSERT INTO Products (Name, Description, TechStack, LiveUrl, GithubUrl) VALUES
('SaaS Starter Kit', 'A complete SaaS starter kit with multi-tenancy, billing, and admin dashboard.', 'Next.js, ASP.NET Core, SQL Server, Stripe, Azure', 'https://example.com/saas-starter', 'https://github.com/chinkatech/saas-starter'),
('Invoice Manager', 'Automated invoicing and payment tracking for freelancers and agencies.', 'React, ASP.NET Core, SQL Server, Stripe', 'https://example.com/invoice', NULL),
('Multi-Tenant CRM', 'Customer relationship management with tenant isolation and analytics.', 'Next.js, ASP.NET Core, SQL Server, Azure', 'https://example.com/crm', NULL);

-- Case Studies
INSERT INTO CaseStudies (Title, Problem, Solution, Result, TechStack) VALUES
('E-Commerce Platform Migration', 'Client had a legacy PHP monolith causing slow performance and frequent downtime.', 'Migrated to Next.js frontend with ASP.NET Core microservices on Azure App Service.', '60% faster page loads, 40% increase in conversions, 99.9% uptime.', 'Next.js, ASP.NET Core, SQL Server, Azure'),
('Multi-tenant SaaS Dashboard', 'Client needed isolated data per tenant with shared infrastructure for cost efficiency.', 'Implemented schema-based multi-tenancy with EF Core and Azure SQL Elastic Pools.', 'Onboarded 50+ tenants with zero data leakage, 40% cost reduction.', 'ASP.NET Core, SQL Server, Azure, EF Core'),
('Payment Integration Overhaul', 'Client was losing revenue due to failed payments and poor subscription management.', 'Implemented Stripe Billing with webhooks, dunning management, and customer portal.', 'Payment failure rate dropped from 8% to 1.2%, revenue increased by 25%.', 'ASP.NET Core, Stripe, Next.js, SQL Server');

-- Blog Posts
INSERT INTO BlogPosts (Title, Slug, Content, Tags, IsPublished, PublishedDate) VALUES
('Building Multi-Tenant SaaS with ASP.NET Core', 'building-multi-tenant-saas-aspnet-core',
'Multi-tenancy is a critical architectural decision for SaaS applications. In this post, we explore how to implement schema-based multi-tenancy using ASP.NET Core and Entity Framework Core.

## What is Multi-Tenancy?

Multi-tenancy allows a single application to serve multiple customers (tenants) while keeping their data isolated. This is fundamental to SaaS business models.

## Schema-Based vs Row-Based

Schema-based: Each tenant gets their own database schema. Higher isolation, slightly more complex migrations.
Row-based: All tenants share tables with a TenantId column. Simpler but requires careful query filtering.

## Implementation with EF Core

Using a custom DbContext with tenant resolution middleware, we can automatically filter all queries by the current tenant.

## Conclusion

Multi-tenancy is achievable in ASP.NET Core with the right architecture. Start simple and scale as your customer base grows.',
'SaaS,ASP.NET Core,Multi-Tenancy,EF Core', 1, DATEADD(DAY, -7, GETUTCDATE())),

('Integrating Stripe Payments in Next.js', 'stripe-payments-nextjs',
'Stripe is the gold standard for payment processing. This guide shows you how to integrate Stripe in a Next.js application with ASP.NET Core backend.

## Setup

Install Stripe packages and configure your keys.

## Creating a Payment Intent

The backend creates a PaymentIntent and returns the client secret to the frontend.

## Handling Webhooks

Webhooks are critical for reliable payment processing. Set up your webhook endpoint to handle payment events.

## Subscriptions

For SaaS, you will typically use Stripe Billing for subscription management.

## Conclusion

Stripe integration is straightforward with Next.js and ASP.NET Core. The key is proper webhook handling.',
'Stripe,Next.js,Payments,SaaS', 1, DATEADD(DAY, -3, GETUTCDATE())),

('Azure Deployment Guide for ASP.NET Core', 'azure-deployment-aspnet-core',
'Deploying ASP.NET Core to Azure App Service is streamlined with GitHub Actions CI/CD.

## Azure App Service

Configure your App Service with the right SKU for your traffic needs.

## Environment Variables

Use Azure App Service Configuration to manage environment variables securely.

## GitHub Actions

Set up your workflow to build, test, and deploy automatically on push to main.

## Conclusion

Azure + GitHub Actions provides a reliable, automated deployment pipeline for your ASP.NET Core applications.',
'Azure,ASP.NET Core,DevOps,CI/CD', 1, DATEADD(DAY, -1, GETUTCDATE()));

-- Testimonials
INSERT INTO Testimonials (ClientName, Company, Feedback, Rating) VALUES
('John Smith', 'TechStartup Inc', 'Outstanding work! Delivered a production-ready SaaS platform ahead of schedule and under budget. The code quality is excellent.', 5),
('Sarah Johnson', 'Digital Agency Co', 'Excellent ASP.NET Core expertise. Our API performance improved dramatically after the migration. Highly recommend!', 5),
('Michael Chen', 'E-Commerce Ventures', 'The Stripe integration was flawless. Revenue tracking and subscription management work perfectly. Great communication throughout.', 5),
('Emily Rodriguez', 'HealthTech Solutions', 'Built our multi-tenant healthcare platform with rock-solid security and HIPAA-compliant architecture. Impressive technical skills.', 5);

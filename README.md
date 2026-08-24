# Chinka Tech SaaS Portfolio Platform

A full-stack SaaS developer portfolio platform built with **Next.js**, **ASP.NET Core Web API**, and **SQL Server**.

## Features

### Public Portfolio
- 🏠 **Home** — Hero, Services, Products, Case Studies, Tech Stack, Testimonials, Process, CTA
- 👤 **About** — Skills and experience overview
- 🛠 **Services** — 8 service offerings with pricing
- 📦 **Products** — SaaS products showcase
- 📊 **Case Studies** — Problem/solution/result format
- 📝 **Blog** — Published articles with dynamic routes
- 📬 **Contact** — Contact form with backend storage
- 📅 **Book a Call** — Discovery call booking form

### Admin Dashboard
- 🔐 **JWT Authentication** — Secure admin login
- 📊 **Dashboard Stats** — Overview of all content counts
- ✏️ **Manage Products** — Full CRUD
- ✏️ **Manage Case Studies** — Full CRUD
- ✏️ **Manage Blog Posts** — Full CRUD with publish/unpublish
- ✏️ **Manage Testimonials** — Full CRUD
- 📥 **View Leads** — See and delete leads
- 📥 **View Contact Messages** — See and delete messages
- 📥 **View Bookings** — See and delete bookings
- 📤 **Image Upload** — Upload images for products/case studies

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS |
| Backend | ASP.NET Core 10 Web API |
| Database | SQL Server + EF Core |
| Auth | JWT Bearer Tokens |
| Storage | Local / Azure Blob Storage |
| CI/CD | GitHub Actions |
| Cloud | Azure App Service + Static Web Apps |
| Container | Docker + Docker Compose |

## Project Structure

```
saas-portfolio-platform/
├── frontend/           # Next.js application
│   ├── src/
│   │   ├── app/        # App Router pages
│   │   ├── components/ # Shared components
│   │   ├── context/    # React context (Auth)
│   │   ├── lib/        # API client
│   │   └── types/      # TypeScript types
│   └── Dockerfile
├── backend/
│   └── PortfolioApi/   # ASP.NET Core Web API
│       ├── Controllers/ # API endpoints
│       ├── Data/        # EF Core DbContext + Seeder
│       ├── DTOs/        # Data Transfer Objects
│       ├── Middleware/  # Logging + Error handling
│       ├── Models/      # Entity models
│       ├── Repositories/# Repository pattern
│       └── Services/    # Business logic
├── database/
│   ├── schema.sql      # SQL Server schema
│   └── seed.sql        # Seed data
├── docs/
│   └── api.md          # API documentation
├── .github/workflows/  # CI/CD pipelines
├── docker-compose.yml
└── README.md
```

## Static-first setup

This project is configured to run as a static portfolio by default. The dynamic backend and database are intentionally kept available but disabled unless you explicitly enable them.

For Azure Static Web Apps deployment, the frontend is built as a static export:

```ts
// frontend/next.config.ts
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};
```

Set the backend on only when you need admin routes, JWT auth, and database-backed forms:

```bash
# frontend/.env.local
NEXT_PUBLIC_BACKEND_ENABLED=true
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

```json
// backend/PortfolioApi/appsettings.Development.json
{
  "BackendEnabled": true
}
```

You can also enable it at runtime with an environment variable:

```bash
set ENABLE_BACKEND=true
```

## Quick Start

### Prerequisites
- Node.js 20+
- .NET SDK 10+
- SQL Server only if backend is enabled

### Option 1: Local static frontend workflow (default)

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

### Option 2: Optional Docker setup (not required)

```bash
git clone https://github.com/bhargavichinka-eng/chinka-tech-saas-portfolio
cd chinka-tech-saas-portfolio
docker-compose up --build
```

This remains available for local testing, but it is no longer the default workflow.

### Option 3: Manual Setup for dynamic backend

**1. Database**
```bash
# Run SQL Server locally or use Docker:
docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=YourPassword123!' -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
```

**2. Backend**
```bash
cd backend/PortfolioApi
# Update appsettings.json with your connection string
dotnet restore
dotnet run
# API available at http://localhost:5000
# Swagger UI at http://localhost:5000/swagger
```

**3. Frontend**
```bash
cd frontend
cp .env.example .env.local
# Edit .env.local with your API URL
npm install
npm run dev
# App available at http://localhost:3000
```

## Admin Login

Default credentials (seeded automatically):
- **Email**: admin@chinkatech.com
- **Password**: Admin@123

> ⚠️ Change these credentials in production!

## Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Backend (appsettings.json)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=PortfolioDb;..."
  },
  "Jwt": {
    "Key": "YourSuperSecretKey",
    "Issuer": "PortfolioApi",
    "Audience": "PortfolioClient"
  },
  "AllowedOrigins": "http://localhost:3000",
  "BaseUrl": "http://localhost:5000"
}
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/login | No | Admin login |
| GET | /api/products | No | List products |
| POST | /api/products | Admin | Create product |
| PUT | /api/products/{id} | Admin | Update product |
| DELETE | /api/products/{id} | Admin | Delete product |
| GET | /api/casestudies | No | List case studies |
| GET | /api/blogposts?published=true | No | List blog posts |
| GET | /api/blogposts/{slug} | No | Get blog post |
| GET | /api/testimonials | No | List testimonials |
| POST | /api/leads | No | Submit lead |
| POST | /api/contact | No | Submit contact |
| POST | /api/bookings | No | Create booking |
| GET | /api/dashboard/stats | Admin | Dashboard stats |
| POST | /api/upload | Admin | Upload image |

Full API docs: [docs/api.md](docs/api.md)

## Deployment

### Azure Static Web Apps (Frontend)

1. Create an Azure Static Web Apps resource
2. Add `AZURE_STATIC_WEB_APPS_API_TOKEN` to GitHub Secrets
3. Add `NEXT_PUBLIC_API_URL` to GitHub Secrets
4. Push to `main` branch

### Azure App Service (Backend)

1. Create an Azure App Service (Linux, .NET 10)
2. Add `AZURE_APP_SERVICE_NAME` and `AZURE_PUBLISH_PROFILE` to GitHub Secrets
3. Configure App Service environment variables
4. Push to `main` branch

### Azure SQL Database

```bash
# Apply schema
sqlcmd -S your-server.database.windows.net -U sa -P password -i database/schema.sql
# Apply seed data
sqlcmd -S your-server.database.windows.net -U sa -P password -i database/seed.sql
```

## Development

```bash
# Frontend linting
cd frontend && npm run lint

# Backend build
cd backend/PortfolioApi && dotnet build

# Run all tests
cd backend/PortfolioApi && dotnet test
```

## License

MIT © Chinka Tech

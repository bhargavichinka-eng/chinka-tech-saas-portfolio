# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

The API uses JWT Bearer token authentication for admin endpoints.

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@chinkatech.com",
  "password": "Admin@123"
}
```

**Response:**
```json
{
  "token": "eyJhbGci...",
  "email": "admin@chinkatech.com",
  "role": "Admin"
}
```

Use the token in subsequent requests:
```
Authorization: Bearer eyJhbGci...
```

---

## Products

### List Products
```http
GET /api/products
```

### Get Product
```http
GET /api/products/{id}
```

### Create Product (Admin)
```http
POST /api/products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "My SaaS Product",
  "description": "Product description",
  "techStack": "Next.js, ASP.NET Core",
  "liveUrl": "https://myproduct.com",
  "githubUrl": "https://github.com/me/myproduct",
  "imageUrl": "https://example.com/image.jpg"
}
```

### Update Product (Admin)
```http
PUT /api/products/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description",
  "techStack": "Next.js, ASP.NET Core, SQL Server"
}
```

### Delete Product (Admin)
```http
DELETE /api/products/{id}
Authorization: Bearer {token}
```

---

## Case Studies

### List Case Studies
```http
GET /api/casestudies
```

### Create Case Study (Admin)
```http
POST /api/casestudies
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Platform Migration",
  "problem": "Legacy PHP monolith with performance issues",
  "solution": "Migrated to Next.js + ASP.NET Core",
  "result": "60% faster page loads",
  "techStack": "Next.js, ASP.NET Core, Azure",
  "imageUrl": null
}
```

---

## Blog Posts

### List Blog Posts
```http
GET /api/blogposts
GET /api/blogposts?published=true   # Only published posts
GET /api/blogposts?published=false  # Only drafts (Admin)
```

### Get Blog Post by Slug
```http
GET /api/blogposts/{slug}
```

### Create Blog Post (Admin)
```http
POST /api/blogposts
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "My Article",
  "slug": "my-article",
  "content": "Full article content...",
  "tags": "SaaS,Next.js,Tips",
  "isPublished": false
}
```

### Update Blog Post (Admin)
```http
PUT /api/blogposts/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated Title",
  "slug": "updated-slug",
  "content": "Updated content...",
  "tags": "SaaS,Updated",
  "isPublished": true
}
```

---

## Leads

### Submit Lead (Public)
```http
POST /api/leads
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@company.com",
  "company": "Acme Corp",
  "country": "US",
  "budget": "$5,000 - $10,000",
  "message": "I need a SaaS platform built..."
}
```

### List Leads (Admin)
```http
GET /api/leads
Authorization: Bearer {token}
```

---

## Contact

### Submit Contact Message (Public)
```http
POST /api/contact
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I have a project..."
}
```

### List Messages (Admin)
```http
GET /api/contact
Authorization: Bearer {token}
```

---

## Testimonials

### List Testimonials (Public)
```http
GET /api/testimonials
```

### Create Testimonial (Admin)
```http
POST /api/testimonials
Authorization: Bearer {token}
Content-Type: application/json

{
  "clientName": "John Smith",
  "company": "TechStartup Inc",
  "feedback": "Outstanding work!",
  "rating": 5
}
```

---

## Bookings

### Create Booking (Public)
```http
POST /api/bookings
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "bookingDate": "2026-04-01T10:00:00Z",
  "message": "Want to discuss a SaaS project"
}
```

### List Bookings (Admin)
```http
GET /api/bookings
Authorization: Bearer {token}
```

---

## Dashboard Stats (Admin)

```http
GET /api/dashboard/stats
Authorization: Bearer {token}
```

**Response:**
```json
{
  "products": 3,
  "caseStudies": 2,
  "blogPosts": 3,
  "publishedPosts": 2,
  "leads": 5,
  "contacts": 10,
  "testimonials": 4,
  "bookings": 2
}
```

---

## File Upload (Admin)

```http
POST /api/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data

file: [binary file data]
```

**Response:**
```json
{
  "url": "http://localhost:5000/uploads/abc123.jpg"
}
```

Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`

---

## Error Responses

```json
{
  "error": "An internal error occurred.",
  "detail": "..."
}
```

Common HTTP status codes:
- `200` — Success
- `201` — Created
- `204` — No Content (delete)
- `400` — Bad Request
- `401` — Unauthorized
- `403` — Forbidden
- `404` — Not Found
- `500` — Internal Server Error

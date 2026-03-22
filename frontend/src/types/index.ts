export interface Product {
  id: number;
  name: string;
  description: string;
  techStack: string;
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  createdDate: string;
}

export interface CaseStudy {
  id: number;
  title: string;
  problem: string;
  solution: string;
  result: string;
  techStack: string;
  imageUrl?: string;
  createdDate: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  tags: string;
  publishedDate: string;
  isPublished: boolean;
}

export interface Lead {
  id: number;
  name: string;
  email: string;
  company?: string;
  country?: string;
  budget?: string;
  message: string;
  createdDate: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdDate: string;
}

export interface Testimonial {
  id: number;
  clientName: string;
  company: string;
  feedback: string;
  rating: number;
  createdDate: string;
}

export interface Booking {
  id: number;
  name: string;
  email: string;
  bookingDate: string;
  message?: string;
  createdDate: string;
}

export interface DashboardStats {
  products: number;
  caseStudies: number;
  blogPosts: number;
  publishedPosts: number;
  leads: number;
  contacts: number;
  testimonials: number;
  bookings: number;
}

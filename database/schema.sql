-- =============================================
-- SaaS Portfolio Platform - Database Schema
-- SQL Server
-- =============================================

CREATE DATABASE PortfolioDb;
GO

USE PortfolioDb;
GO

-- Users table
CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Email NVARCHAR(256) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(MAX) NOT NULL,
    Role NVARCHAR(50) NOT NULL DEFAULT 'Admin',
    CreatedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

-- Products table
CREATE TABLE Products (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    TechStack NVARCHAR(500) NOT NULL,
    LiveUrl NVARCHAR(500) NULL,
    GithubUrl NVARCHAR(500) NULL,
    ImageUrl NVARCHAR(500) NULL,
    CreatedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

-- CaseStudies table
CREATE TABLE CaseStudies (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(200) NOT NULL,
    Problem NVARCHAR(MAX) NOT NULL,
    Solution NVARCHAR(MAX) NOT NULL,
    Result NVARCHAR(MAX) NOT NULL,
    TechStack NVARCHAR(500) NOT NULL,
    ImageUrl NVARCHAR(500) NULL,
    CreatedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

-- BlogPosts table
CREATE TABLE BlogPosts (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(200) NOT NULL,
    Slug NVARCHAR(200) NOT NULL UNIQUE,
    Content NVARCHAR(MAX) NOT NULL,
    Tags NVARCHAR(500) NOT NULL DEFAULT '',
    PublishedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    IsPublished BIT NOT NULL DEFAULT 0
);

-- Leads table
CREATE TABLE Leads (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(200) NOT NULL,
    Email NVARCHAR(256) NOT NULL,
    Company NVARCHAR(200) NULL,
    Country NVARCHAR(100) NULL,
    Budget NVARCHAR(100) NULL,
    Message NVARCHAR(MAX) NOT NULL,
    CreatedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

-- ContactMessages table
CREATE TABLE ContactMessages (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(200) NOT NULL,
    Email NVARCHAR(256) NOT NULL,
    Subject NVARCHAR(300) NOT NULL,
    Message NVARCHAR(MAX) NOT NULL,
    CreatedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

-- Testimonials table
CREATE TABLE Testimonials (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ClientName NVARCHAR(200) NOT NULL,
    Company NVARCHAR(200) NOT NULL,
    Feedback NVARCHAR(MAX) NOT NULL,
    Rating INT NOT NULL DEFAULT 5 CHECK (Rating >= 1 AND Rating <= 5),
    CreatedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

-- Bookings table
CREATE TABLE Bookings (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(200) NOT NULL,
    Email NVARCHAR(256) NOT NULL,
    BookingDate DATETIME2 NOT NULL,
    Message NVARCHAR(MAX) NULL,
    CreatedDate DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

-- Indexes
CREATE INDEX IX_BlogPosts_IsPublished ON BlogPosts (IsPublished);
CREATE INDEX IX_BlogPosts_PublishedDate ON BlogPosts (PublishedDate DESC);
CREATE INDEX IX_Leads_CreatedDate ON Leads (CreatedDate DESC);
CREATE INDEX IX_ContactMessages_CreatedDate ON ContactMessages (CreatedDate DESC);
CREATE INDEX IX_Bookings_BookingDate ON Bookings (BookingDate);

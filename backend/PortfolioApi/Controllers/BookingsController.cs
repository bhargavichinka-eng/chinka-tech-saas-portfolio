using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.DTOs;
using PortfolioApi.Models;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private readonly AppDbContext _context;
    public BookingsController(AppDbContext context) { _context = context; }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateBookingRequest req)
    {
        var booking = new Booking { Name = req.Name, Email = req.Email, BookingDate = req.BookingDate, Message = req.Message };
        _context.Bookings.Add(booking);
        await _context.SaveChangesAsync();
        return Ok(new BookingDto(booking.Id, booking.Name, booking.Email, booking.BookingDate, booking.Message, booking.CreatedDate));
    }

    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await _context.Bookings.Select(b => new BookingDto(b.Id, b.Name, b.Email, b.BookingDate, b.Message, b.CreatedDate)).ToListAsync());

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var booking = await _context.Bookings.FindAsync(id);
        if (booking == null) return NotFound();
        _context.Bookings.Remove(booking);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}

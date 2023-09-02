package com.oceanwinds.booking.controller;

import com.oceanwinds.booking.entity.Booking;
import com.oceanwinds.booking.entity.BookingMessage;
import com.oceanwinds.booking.entity.BookingRating;
import com.oceanwinds.booking.entity.dto.BookingDto;
import com.oceanwinds.booking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public Booking createBooking(@RequestBody BookingDto bookingDto) {
        return bookingService.createReservee(bookingDto);
    }

    @PutMapping("/{id}")
    public Booking updateBooking(@PathVariable Long id, @RequestBody BookingDto bookingDto) {
        return bookingService.updateReservee(id, bookingDto);
    }

    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable Long id) {
        bookingService.deleteReservee(id);
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllReservees();
    }

    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable Long id) {
        return bookingService.getReserveeById(id);
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUserId(@PathVariable Long userId) {
        return bookingService.getReserveesByUserId(userId);
    }

    @GetMapping("/product/{productId}")
    public List<Booking> getBookingsByProductId(@PathVariable Long productId) {
        return bookingService.getReserveesByProductId(productId);
    }

    @PostMapping("/{bookingId}/messages")
    public void addMessageToBooking(@PathVariable Long bookingId, @RequestBody BookingMessage message) {
        bookingService.addMessageToBooking(bookingId, message);
    }

    @PostMapping("/{bookingId}/ratings")
    public void addRatingToBooking(@PathVariable Long bookingId, @RequestBody BookingRating rating) {
        bookingService.addRatingToBooking(bookingId, rating);
    }
}

package com.oceanwinds.booking.controller;

import com.oceanwinds.booking.entity.Booking;
import com.oceanwinds.booking.entity.BookingMessage;
import com.oceanwinds.booking.entity.BookingRating;
import com.oceanwinds.booking.entity.dto.BookingDto;
import com.oceanwinds.booking.entity.dto.MediaRatingDto;
import com.oceanwinds.booking.entity.dto.RatingDto;
import com.oceanwinds.booking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    private final BookingService bookingService;

    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public Booking createBooking(@RequestBody BookingDto bookingDto) {
        return bookingService.createReserve(bookingDto);
    }

    @PutMapping("/{id}")
    public Booking updateBooking(@PathVariable Long id, @RequestBody BookingDto bookingDto) throws IllegalAccessException {
        return bookingService.updateReserve(id, bookingDto);
    }

    @PutMapping("/complete/{id}")
    public Booking completeBooking(@PathVariable Long id){
        return bookingService.completeReserve(id);
    }

    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable Long id) {
        bookingService.deleteReserve(id);
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllReserves();
    }

    @GetMapping("/actives")
    public List<Booking> getAllActiveBookings() {
        return bookingService.getAllReserves().stream()
                .filter(Booking::getActive).toList();
    }

    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable Long id) {
        return bookingService.getReserveById(id);
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUserId(@PathVariable Long userId) {
        return bookingService.getReservesByUserId(userId);
    }

    @GetMapping("/product/{productId}")
    public List<Booking> getBookingsByProductId(@PathVariable Long productId) {
        return bookingService.getReservesByProductId(productId);
    }

    @GetMapping("/ratings/{id}")
    public List<RatingDto> getAllRatings(@PathVariable Long id){


        return bookingService.getAllRatings(id);
    }

    @GetMapping("/ratings/media/{id}")
    public MediaRatingDto getMediaRating(@PathVariable Long id){
       return bookingService.getMediaRating(id);
    }

    @PostMapping("/{bookingId}/messages")
    public void addMessageToBooking(@PathVariable Long bookingId, @RequestBody BookingMessage message) {
        bookingService.addMessageToBooking(bookingId, message);
    }

    @PostMapping("/{bookingId}/ratings")
    public void addRatingToBooking(@PathVariable Long bookingId, @RequestBody BookingRating rating) {
        int score = rating.getRating();
        if(score>0 && score<=5){
            bookingService.addRatingToBooking(bookingId, rating);
        }else{
            throw new IllegalArgumentException("Score out of 1-5 range");
        }

    }

    @PatchMapping("/rating/message/{messageId}")
    public BookingMessage editBookingMessage(@PathVariable Long messageId,String message){
        return bookingService.editBookingMessage(messageId,message);
    }

    @PatchMapping("/rating/rating/{ratingId}")
    public BookingRating editBookingRating(@PathVariable Long ratingId,int rating){
        return bookingService.editBookingRating(ratingId,rating);
    }
    @GetMapping("/product/date/{productId}")
    public ResponseEntity<List<Map<String, Object>>> getReservesByProductId(@PathVariable Long productId) {
        List<Map<String, Object>> reserves = bookingService.getReservesDateByProductId(productId);
        return ResponseEntity.ok(reserves);
    }
}

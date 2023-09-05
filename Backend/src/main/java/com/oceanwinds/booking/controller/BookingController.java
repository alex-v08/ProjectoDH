package com.oceanwinds.booking.controller;

import com.oceanwinds.booking.entity.Booking;
import com.oceanwinds.booking.entity.BookingMessage;
import com.oceanwinds.booking.entity.BookingRating;
import com.oceanwinds.booking.entity.dto.BookingDto;
import com.oceanwinds.booking.entity.dto.RatingDto;
import com.oceanwinds.booking.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
    public List<Booking> getAllActiveBookings(){
        List<Booking> activeBookings = bookingService.getAllReserves().stream().filter(booking -> booking.getActive().equals(true)).collect(Collectors.toList());

        return activeBookings;
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

    @GetMapping("/allRatings/{id}")
    public List<RatingDto> getAllRatings(@PathVariable Long id){
        List<Booking> bookings = bookingService.getAllReserves().stream().filter(booking -> booking.getProduct().getId().equals(id)).toList();
        List<RatingDto> ratings = new ArrayList<>();

        for(Booking reserve: bookings){
            RatingDto ratingDto = new RatingDto();

            ratingDto.setDate(reserve.getMessage().getDateMessage());
            ratingDto.setName(reserve.getUser().getName() + " " + reserve.getUser().getLastName());
            ratingDto.setRating(reserve.getRating().getRating());
            ratingDto.setMessage(reserve.getMessage().getMessage());

            ratings.add(ratingDto);
        }
        return  ratings;
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
}

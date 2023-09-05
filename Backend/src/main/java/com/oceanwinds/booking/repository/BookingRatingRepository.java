package com.oceanwinds.booking.repository;
import com.oceanwinds.booking.entity.BookingRating;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BookingRatingRepository extends JpaRepository<BookingRating,Long> {
}

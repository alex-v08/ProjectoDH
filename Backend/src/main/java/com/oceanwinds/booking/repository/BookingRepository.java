package com.oceanwinds.booking.repository;


import com.oceanwinds.booking.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {


        List<Booking> findByProductId(Long productId);

        List<Booking> findByUserId(Long userId);
}


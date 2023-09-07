package com.oceanwinds.booking.repository;


import com.oceanwinds.booking.entity.Booking;
import com.oceanwinds.product.entity.Product;
import com.oceanwinds.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {


        List<Product> findByProductId(Long productId);

        List<User> findByUserId(Long userId);
}


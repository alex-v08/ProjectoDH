package com.oceanwinds.booking.repository;


import com.oceanwinds.booking.entity.Booking;
import com.oceanwinds.product.entity.Product;
import com.oceanwinds.user.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;


@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {


        Set<Product> findByProductId(Long productId);

        Set<User> findByUserId(Long userId);



        List<Booking> findAll();

    Set<Booking> findAllByProduct_Id(Long id);
}


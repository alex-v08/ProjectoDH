package com.oceanwinds.booking.repository;


import com.oceanwinds.booking.entity.Booking;
import com.oceanwinds.product.entity.Product;
import com.oceanwinds.user.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;


@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {


    List<Product> findByProductId(Long productId);

    List<User> findByUserId(Long userId);
    List<Booking> findAll();

    List<Booking> findAllByProduct_Id(Long id);
    @Query("SELECT p FROM Product p WHERE p.id NOT IN " +
            "(SELECT DISTINCT b.product.id FROM Booking b " +
            " WHERE (b.dateEnd >= :startDate AND b.dateInit <= :endDate))")
    List<Product> findProductsNotReservedInDateRange(@Param("startDate") LocalDate startDate,
                                                     @Param("endDate") LocalDate endDate);

}


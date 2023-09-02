package com.oceanwinds.reservee.repository;


import com.oceanwinds.reservee.entity.Reservee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReserveeRepository extends JpaRepository<Reservee, Long> {


        List<Reservee> findByProductId(Long productId);

        List<Reservee> findByUserId(Long userId);
}


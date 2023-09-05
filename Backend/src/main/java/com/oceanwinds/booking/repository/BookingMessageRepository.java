package com.oceanwinds.booking.repository;

import com.oceanwinds.booking.entity.BookingMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingMessageRepository extends JpaRepository<BookingMessage,Long> {
}

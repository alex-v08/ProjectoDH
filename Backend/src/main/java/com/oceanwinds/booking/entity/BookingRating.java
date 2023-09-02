package com.oceanwinds.booking.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "RESERVA_RATINGS")
@Getter
@Setter
public class BookingRating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int rating; // Puntuación de la reserva (1-5 estrellas)

    @ManyToOne
    @JoinColumn(name = "booking_rating_id")
    Booking booking;
}

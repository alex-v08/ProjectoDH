package com.oceanwinds.booking.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "reserve_rating")
@Getter
@Setter
public class BookingRating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer rating; // Puntuación de la reserva (1-5 estrellas)
    private String uuid;


    @JsonIgnore
    @OneToOne(mappedBy = "rating")
    Booking booking;
}

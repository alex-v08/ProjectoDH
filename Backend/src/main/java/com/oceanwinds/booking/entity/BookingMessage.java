package com.oceanwinds.booking.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "reserve_message")
@Getter
@Setter
public class BookingMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String mensaje; // Mensaje relacionado con la reserva
    private String uuid;
    private LocalDate dateMessage;


    @JsonIgnore
    @OneToOne(mappedBy = "message")
    private Booking booking;
}

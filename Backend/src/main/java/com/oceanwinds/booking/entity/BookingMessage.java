package com.oceanwinds.booking.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "RESERVA_MENSAJES")
@Getter
@Setter
public class BookingMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String mensaje; // Mensaje relacionado con la reserva

    @ManyToOne
    @JoinColumn(name = "reserva_id")
    private Booking booking;
}

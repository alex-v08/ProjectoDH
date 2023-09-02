package com.oceanwinds.reservee.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "RESERVA_RATINGS")
@Getter
@Setter
public class ReservaRating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int rating; // Puntuación de la reserva (1-5 estrellas)
}

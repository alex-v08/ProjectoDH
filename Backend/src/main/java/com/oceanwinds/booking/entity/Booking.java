package com.oceanwinds.booking.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.oceanwinds.product.entity.Product;
import com.oceanwinds.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "Reserve")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private LocalDate dateInit;
    private LocalDate dateEnd;

    private LocalDateTime dateCreated;

    @OneToOne
    @JoinColumn(name = "message_id", referencedColumnName = "id")
    private BookingMessage message;

    @OneToOne
    @JoinColumn(name = "rating_id", referencedColumnName = "id")
    private BookingRating rating;

    private Boolean active;

    private Boolean complete = false;


}

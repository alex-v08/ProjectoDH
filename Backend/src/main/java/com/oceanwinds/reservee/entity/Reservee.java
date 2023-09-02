package com.oceanwinds.reservee.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.oceanwinds.product.entity.Product;
import com.oceanwinds.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "Reservee")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Reservee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private LocalDate dateInit;
    private LocalDate dateEnd;

    @OneToMany(mappedBy = "reservee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)

    private Set<ReservaMessage> messages = new HashSet<>();

    @OneToMany(mappedBy = "reservee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)

    private Set<ReservaRating> ratting = new HashSet<>();

    private Boolean active;


}

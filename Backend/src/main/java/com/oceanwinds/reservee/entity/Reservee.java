package com.oceanwinds.reservee.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.oceanwinds.product.entity.Product;
import com.oceanwinds.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.mapping.Set;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Entity
@Table(name = "Reservee")
@Setter@Getter

@AllArgsConstructor
@NoArgsConstructor
public class Reservee {
    @Id
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private Date datInit;
    private Date datEnd;

    @OneToMany(mappedBy = "reserva", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<ReservaRating> ratings = new HashSet<>();

    @OneToMany(mappedBy = "reserva", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<ReservaMessage> message = new HashSet<>();
}

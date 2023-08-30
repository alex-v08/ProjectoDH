package com.oceanwinds.user.entity;


import jakarta.persistence.*;

import lombok.*;
import software.amazon.ion.EmptySymbolException;

@Entity
@Data
@NoArgsConstructor

@AllArgsConstructor
@Table(name = "USERS")

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @Column(nullable = false)
    private String name;
    private String lastName;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false, unique = true)
    private String dni;


    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String address;


    private UserEnum role;

    private String uuid;

    private Boolean active;


    public User(String name, String lastName, String email, String password, String uuid, Boolean active) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.uuid = uuid;
        this.active = active;
    }
}


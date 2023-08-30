package com.oceanwinds.user.entity;


import jakarta.persistence.*;

import lombok.*;

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

    @Enumerated
    private UserEnum role;

    private String uuid;


    public User(String name, String lastName, String email, String password, String uuid) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.uuid = uuid;
    }
}


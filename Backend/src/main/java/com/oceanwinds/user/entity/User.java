package com.oceanwinds.user.entity;


import jakarta.persistence.*;

import lombok.*;

@Entity
@NoArgsConstructor

@ToString
@Getter

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Setter
    @Column(nullable = false)

    private String name;

    @Setter

    private String lastName;

    @Setter

    @Column(nullable = false, unique = true)
    private String email;

    @Setter
    @Column(nullable = false, unique = true)
    private String dni;

    @Setter
    @Column(nullable = false)
    private String password;

    @Setter
    @Column(nullable = false)
    private String phone;

    @Setter
    @Column(nullable = false)
    private String address;

    @Setter
    @Enumerated
    private UserEnum role;

    @Setter
    private String uuid;

    public User(String name, String lastName, String email, String dni, String password, String phone, String address, UserEnum role, String uuid) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.dni = dni;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.role = role;
        this.uuid = uuid;
    }


}


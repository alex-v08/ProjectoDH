package com.oceanwinds.crud_user.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Setter
    private String name;

    @Setter
    private String lastName;

    @Setter
    private String email;

    @Setter
    private String dni;

    @Setter
    private String password;

    @Setter
    private String phone;

    @Setter
    private String address;

    @Setter
    private UserEnum role;

    public User(String name, String lastName, String email, String dni, String password, String phone, String address, UserEnum role) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.dni = dni;
        this.password = password;
        this.phone = phone;
        this.address = address;
        this.role = role;
    }
}


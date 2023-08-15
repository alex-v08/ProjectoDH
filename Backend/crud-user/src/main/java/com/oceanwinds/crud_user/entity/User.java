package com.oceanwinds.crud_user.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder



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



}


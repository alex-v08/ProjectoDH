package com.oceanwinds.user.entity.dto;

import com.oceanwinds.user.entity.UserEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@AllArgsConstructor
@NoArgsConstructor
@Getter@Setter
public class UserDto {


    private String name;
    private String lastName;

    private String email;

    private String dni;


    private String password;


    private String phone;


    private String address;

    @Enumerated (EnumType.STRING)
    private UserEnum role;

    private String uuid;




}

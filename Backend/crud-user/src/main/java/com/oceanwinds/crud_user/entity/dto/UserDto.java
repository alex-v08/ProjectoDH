package com.oceanwinds.crud_user.entity.dto;

import com.oceanwinds.crud_user.entity.UserEnum;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@AllArgsConstructor
@NoArgsConstructor
@Getter@Setter
public class UserDto {
    @NotBlank(message = "Name is mandatory")
    private String name;

    private String lastName;
    @NotBlank(message = "Name is mandatory")
    private String email;

    private String dni;
    @NotBlank(message = "Name is mandatory")
    private String password;

    private String phone;

    private String address;

    @Enumerated
    private UserEnum role;

    private String uuid;



}

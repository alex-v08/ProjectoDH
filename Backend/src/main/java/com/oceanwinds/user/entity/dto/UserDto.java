package com.oceanwinds.user.entity.dto;

import com.oceanwinds.user.entity.UserEnum;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter@Setter
@Data
public class UserDto {


    private String name;
    private String lastName;

    private String email;

    private String dni;


    private String password;


    private String phone;


    private String address;


    private UserEnum role;

    private String uuid;

    private Boolean active;

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public UserDto(String name, String lastName, String email, String uuid, Boolean active) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.uuid = uuid;
        this.active = active;
    }

}

package com.oceanwinds.user.entity.dto;



import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Setter @Getter

public class UserDto {

    private String name;
    private String lastName;
    private String email;
    private String uuid;
    private String dni;
    private String phone;
    private String address;

}

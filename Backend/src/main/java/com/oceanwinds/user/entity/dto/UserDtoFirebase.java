package com.oceanwinds.user.entity.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Setter @Getter
public class UserDtoFirebase {

        private String name;
        private String lastName;
        private String email;
        private String uuid;


}

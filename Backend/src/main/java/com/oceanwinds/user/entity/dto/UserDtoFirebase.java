package com.oceanwinds.user.entity.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString

public class UserDtoFirebase {

        private String name;
        private String lastName;

        private String email;

        private String uuid;
        private Boolean active;
}

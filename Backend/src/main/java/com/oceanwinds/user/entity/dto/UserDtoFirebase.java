package com.oceanwinds.user.entity.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor

@ToString

public class UserDtoFirebase {

        private String name;
        private String lastName;

        private String email;

        private String uuid;
        private Boolean active;

        public String getName() {
                return name;
        }

        public void setName(String name) {
                this.name = name;
        }

        public String getLastName() {
                return lastName;
        }

        public void setLastName(String lastName) {
                this.lastName = lastName;
        }

        public String getEmail() {
                return email;
        }

        public void setEmail(String email) {
                this.email = email;
        }

        public String getUuid() {
                return uuid;
        }

        public void setUuid(String uuid) {
                this.uuid = uuid;
        }

        public Boolean getActive() {
                return active;
        }

        public void setActive(Boolean active) {
                this.active = active;
        }


}

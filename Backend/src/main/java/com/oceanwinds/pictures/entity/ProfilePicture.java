package com.oceanwinds.pictures.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.oceanwinds.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProfilePicture {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String imageKey;

    private String imageUrl;

    @JsonIgnore
    @OneToOne(mappedBy = "profilePicture")
    private User user;

}

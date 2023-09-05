package com.oceanwinds.booking.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class RatingDto {

    private String name;
    private LocalDate date;
    private int rating;
    private String photoUrl;
    private String comment;
}

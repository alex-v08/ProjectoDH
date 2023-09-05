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
    private int rating;
    private String message;
    private String photoUrl;
    private LocalDate date;
}

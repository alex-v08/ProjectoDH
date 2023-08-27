package com.oceanwinds.category.entity.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class CategoryDto {
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column
    private String description;

    @Column
    private String image;
}

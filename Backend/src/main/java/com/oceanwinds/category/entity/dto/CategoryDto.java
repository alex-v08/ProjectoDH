package com.oceanwinds.category.entity.dto;

import jakarta.persistence.Column;
import lombok.*;

@Data
@AllArgsConstructor @NoArgsConstructor
public class CategoryDto {
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column
    private String description;

    @Column
    private String image;
}

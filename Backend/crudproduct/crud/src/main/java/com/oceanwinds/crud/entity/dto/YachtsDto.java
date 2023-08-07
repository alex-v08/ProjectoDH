package com.oceanwinds.crud.entity.dto;

import com.oceanwinds.crud.entity.Category;
import jakarta.persistence.Column;

import lombok.*;


@Getter
@Setter



public class YachtsDto {
    @Column(name = "name" , nullable = false)
    private String name;
    @Column(name = "sku", nullable = false, unique = true)
    private String sku;
    private String description;
    private String imageUrl;
    private Double pricePerDay;
    private Double pricePerWeek;
    private Double pricePerHour;

    private Category category;

    private Boolean available;

    public YachtsDto() {

    }

    public YachtsDto(String name, String sku, String description, String imageUrl, Double pricePerDay, Double pricePerWeek, Double pricePerHour, Category category, Boolean available) {
        this.name = name;
        this.sku = sku;
        this.description = description;
        this.imageUrl = imageUrl;
        this.pricePerDay = pricePerDay;
        this.pricePerWeek = pricePerWeek;
        this.pricePerHour = pricePerHour;
        this.category = category;
        this.available = available;
    }
}

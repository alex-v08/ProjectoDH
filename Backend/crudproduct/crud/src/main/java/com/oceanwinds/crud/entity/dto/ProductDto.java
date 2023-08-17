package com.oceanwinds.crud.entity.dto;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter



public class ProductDto {
    @Column(name = "name" , nullable = false)
    private String name;
    @Column(name = "sku", nullable = false, unique = true)
    private String sku;
    private String description;
    private String imageUrl;
    private Double pricePerDay;
    private Double pricePerWeek;
    private Double pricePerHour;

    private Long categoryId;
    private Long featureId;

    private Boolean available;

    public ProductDto() {

    }

    public ProductDto(String name, String sku, String description, String imageUrl, Double pricePerDay, Double pricePerWeek, Double pricePerHour, Long categoryId, Boolean available) {
        this.name = name;
        this.sku = sku;
        this.description = description;
        this.imageUrl = imageUrl;
        this.pricePerDay = pricePerDay;
        this.pricePerWeek = pricePerWeek;
        this.pricePerHour = pricePerHour;
        this.categoryId = categoryId;
        this.available = available;
    }
}

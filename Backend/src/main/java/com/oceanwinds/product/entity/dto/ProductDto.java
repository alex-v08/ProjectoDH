package com.oceanwinds.product.entity.dto;

import com.oceanwinds.location.entity.dto.LocationDto;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;


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
    private Set<Long> featuresId;
    private LocationDto location;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Double getPricePerDay() {
        return pricePerDay;
    }

    public void setPricePerDay(Double pricePerDay) {
        this.pricePerDay = pricePerDay;
    }

    public Double getPricePerWeek() {
        return pricePerWeek;
    }

    public void setPricePerWeek(Double pricePerWeek) {
        this.pricePerWeek = pricePerWeek;
    }

    public Double getPricePerHour() {
        return pricePerHour;
    }

    public void setPricePerHour(Double pricePerHour) {
        this.pricePerHour = pricePerHour;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }
}

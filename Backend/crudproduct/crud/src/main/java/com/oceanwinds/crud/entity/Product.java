package com.oceanwinds.crud.entity;


import jakarta.persistence.*;
import lombok.*;



@Entity
@Getter @Setter

@Table(name = "YACHTS")

public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name" , nullable = false)
    private String name;
    @Column(nullable = false, unique = true)
    private String sku;
    private String description;

    @Transient
    private String imageUrl;
    private Double pricePerDay;
    private Double pricePerWeek;
    private Double pricePerHour;

    private Category category;

    private Boolean available;

    public Product(Long id, String name, String sku, String description, String imageUrl, Double pricePerDay, Double pricePerWeek, Double pricePerHour, Category category, Boolean available) {
        this.id = id;
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

    public Product() {
    }

    @Override
    public String toString() {
        return "Yachts{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", sku='" + sku + '\'' +
                ", description='" + description + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", pricePerDay=" + pricePerDay +
                ", pricePerWeek=" + pricePerWeek +
                ", pricePerHour=" + pricePerHour +
                ", category=" + category +
                ", available=" + available +
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Boolean getAvailable() {
        return available;
    }

    public void setAvailable(Boolean available) {
        this.available = available;
    }
}




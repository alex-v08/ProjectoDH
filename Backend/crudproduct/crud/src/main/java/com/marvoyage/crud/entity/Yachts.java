package com.marvoyage.crud.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "yachts")
public class Yachts {

    @Id
    private Long id;
    private String name;
    private String description;
    private String imageUrl;
    private String pricePerDay;
    private String pricePerWeek;
    private String pricePerHour;

    private Category category;

    private Boolean available;

    public void setPricePerWeek(String pricePerWeek) {
        this.pricePerWeek = pricePerWeek;
    }

    public String getPricePerHour() {
        return pricePerHour;
    }

    public void setPricePerHour(String pricePerHour) {
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

    public Yachts() {
    }

    public Yachts(Long id, String name, String description, String imageUrl, String pricePerDay, String pricePerWeek, String pricePerHour, Category category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.pricePerDay = pricePerDay;
        this.pricePerWeek = pricePerWeek;
        this.pricePerHour = pricePerHour;
        this.category = category;
    }

    public Yachts(Long aLong, String nombre, String descripcion, String imagen) {
        this.id = aLong;
        this.name = nombre;
        this.description = descripcion;
        this.imageUrl = imagen;
    }



    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getPricePerDay() {
        return pricePerDay;
    }

    public void setPricePerDay(String pricePerDay) {
        this.pricePerDay = pricePerDay;
    }

    public String getPricePerWeek() {
        return pricePerWeek;
    }
}




package com.marvoyage.crud.dto;

import com.marvoyage.crud.entity.Category;
import jakarta.validation.constraints.NotBlank;

public class YachtsDto {
    @NotBlank
    private String nombre;
    private String descripcion;
    private String imagen;

    private String pricePerDay;
    private String pricePerWeek;
    private String pricePerHour;

    private Category category;

    private Boolean available;

    public YachtsDto(String nombre, String descripcion, String imagen, String pricePerDay, String pricePerWeek, String pricePerHour, Category category, Boolean available) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.pricePerDay = pricePerDay;
        this.pricePerWeek = pricePerWeek;
        this.pricePerHour = pricePerHour;
        this.category = category;
        this.available = available;
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

    public YachtsDto() {
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getImagen() {
        return imagen;
    }

    public void setImagen(String imagen) {
        this.imagen = imagen;
    }
}

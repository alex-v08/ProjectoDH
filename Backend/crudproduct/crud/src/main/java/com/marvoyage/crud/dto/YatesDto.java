package com.marvoyage.crud.dto;

import jakarta.validation.constraints.NotBlank;

public class YatesDto {
    @NotBlank
    private String nombre;
    private String descripcion;
    private String imagen;

    public YatesDto() {
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

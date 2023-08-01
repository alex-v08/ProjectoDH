package com.marvoyage.crud.dao;

import jakarta.validation.constraints.NotBlank;

public class YatesDao {
    @NotBlank
    private String nombre;
    private String descripcion;
    private String imagen;

    public YatesDao() {
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

package com.marvoyage.crud.entity;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "yates")

public class Yates {

    @Id
    private Long id;
    private String nombre;
    private String descripcion;
    private String imagen;
    private String precioPorDia;
    private String precioPorSemana;
    private String precioPorhora;

    private Category category;

    public Yates() {
    }

    public Yates(String nombre, String descripcion, String imagen, String precioPorDia, String precioPorSemana, String precioPorhora, Category category) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.imagen = imagen;
        this.precioPorDia = precioPorDia;
        this.precioPorSemana = precioPorSemana;
        this.precioPorhora = precioPorhora;
        this.category = category;
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

    public String getPrecioPorDia() {
        return precioPorDia;
    }

    public void setPrecioPorDia(String precioPorDia) {
        this.precioPorDia = precioPorDia;
    }

    public String getPrecioPorSemana() {
        return precioPorSemana;
    }

    public void setPrecioPorSemana(String precioPorSemana) {
        this.precioPorSemana = precioPorSemana;
    }

    public String getPrecioPorhora() {
        return precioPorhora;
    }

    public void setPrecioPorhora(String precioPorhora) {
        this.precioPorhora = precioPorhora;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Long getId() {
        return id;
    }

}

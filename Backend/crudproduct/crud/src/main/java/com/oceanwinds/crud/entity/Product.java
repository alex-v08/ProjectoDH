package com.oceanwinds.crud.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;


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
    private String imageUrl;
    private Double pricePerDay;
    private Double pricePerWeek;
    private Double pricePerHour;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToMany
    @JoinTable(name = "yacht_feature", joinColumns = @JoinColumn(name = "yacht_id"),
    inverseJoinColumns = @JoinColumn(name = "feature_id"))
    private Set<Feature> feature = new HashSet<>();

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
                ", category=" + (category != null ? category.getName() : "null") +
                ", available=" + available +
                '}';
    }

    public Long getId() {
        return id;
    }


}




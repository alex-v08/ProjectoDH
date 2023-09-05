package com.oceanwinds.product.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.oceanwinds.category.entity.Category;

import com.oceanwinds.feature.entity.Feature;
import com.oceanwinds.location.entity.Location;
import com.oceanwinds.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;


@Entity
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Product")
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
    @JoinTable(name = "product_feature", joinColumns = @JoinColumn(name = "product_id"),
    inverseJoinColumns = @JoinColumn(name = "feature_id"))
    private Set<Feature> feature = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;

    private Boolean available;

    @JsonIgnore
    @ManyToMany(mappedBy = "favoriteProducts")
    private Set<User> favoriteUsers = new HashSet<>();


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




}




package com.oceanwinds.category.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.oceanwinds.product.entity.Product;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "CATEGORY")
@Data
@AllArgsConstructor @NoArgsConstructor
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column
    private String description;

    @Column
    private String image;

    @JsonIgnore
    @OneToMany(mappedBy = "category")
    private List<Product> product;

    private Boolean eliminated = false;


}

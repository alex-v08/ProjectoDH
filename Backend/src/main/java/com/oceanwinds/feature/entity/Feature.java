package com.oceanwinds.feature.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.oceanwinds.product.entity.Product;
import jakarta.persistence.*;
import lombok.*;


import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Feature")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Feature {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column
    private String image;

    @JsonIgnore
    @ManyToMany(mappedBy = "feature")
    private Set<Product> product = new HashSet<>();
}

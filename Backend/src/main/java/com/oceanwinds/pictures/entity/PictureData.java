package com.oceanwinds.pictures.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.oceanwinds.product.entity.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class PictureData {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String imageKey;

    private String imageUrl;

    @ManyToOne(fetch= FetchType.EAGER)
    @JoinColumn(name = "picture_id",nullable = false)
    @JsonIgnore
    private Product product;

}

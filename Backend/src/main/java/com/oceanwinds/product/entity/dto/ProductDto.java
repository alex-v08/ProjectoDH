package com.oceanwinds.product.entity.dto;

import com.oceanwinds.location.entity.dto.LocationDto;
import com.oceanwinds.pictures.entity.PictureData;
import jakarta.persistence.Column;
import lombok.*;

import java.util.Set;


@Getter
@Setter
@NoArgsConstructor
@Data
@AllArgsConstructor
public class ProductDto {
    @Column(name = "name" , nullable = false)
    private String name;
    @Column(name = "sku", nullable = false, unique = true)
    private String sku;
    private String description;
    private String imageUrl;
    private Double pricePerDay;
    private Double pricePerWeek;
    private Double pricePerHour;

    private Long categoryId;
    private Set<Long> featuresId;
    private LocationDto location;
    private Set<PictureData> pictures;
    private String produDescription;

    private Boolean available;

}

package com.oceanwinds.product.entity.dto;

import com.oceanwinds.location.entity.dto.LocationDto;
import com.oceanwinds.pictures.entity.PictureData;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Set;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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

    private Boolean available;






}

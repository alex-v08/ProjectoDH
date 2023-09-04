package com.oceanwinds.pictures.repository;

import com.oceanwinds.pictures.entity.PictureData;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductImageRepository extends JpaRepository<PictureData,Long> {
}

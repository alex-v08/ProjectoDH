package com.oceanwinds.product.repository;

import com.oceanwinds.category.entity.Category;
import com.oceanwinds.feature.entity.Feature;
import com.oceanwinds.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    boolean existsByAvailable(boolean available);

    Optional<Product> findByName(String name);

    List<Product> findByCategory(Category category);

    List<Product> findByFeatureIn(Set<Feature> features);

    List<Product> findByAvailable(boolean b);

    List<Product> findByAvailableAndCategory(boolean b, String category);

    @Query(value = "SELECT IMAGE_URL FROM PRODUCT WHERE ID = ?1 ", nativeQuery = true)
    List<String> findproductWithModifiedImages(Long id);

      Page<Product>  findAll (Pageable pegeable);

}

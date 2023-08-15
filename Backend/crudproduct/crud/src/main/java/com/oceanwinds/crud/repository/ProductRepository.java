package com.oceanwinds.crud.repository;

import com.oceanwinds.crud.entity.Category;
import com.oceanwinds.crud.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    boolean existsByAvailable(boolean available);

    Optional<Product> findByName(String name);

    List<Product> findByCategory(Category category);

    List<Product> findByAvailable(boolean b);

    List<Product> findByAvailableAndCategory(boolean b, String category);


    @Query(value = "SELECT IMAGE_URL FROM YACHTS WHERE ID = ?1 ", nativeQuery = true)
    List<String> findYachtsWithModifiedImages(Long id);

      Page<Product>  findAll (Pageable pegeable);

}

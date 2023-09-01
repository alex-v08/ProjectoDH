package com.oceanwinds.favorites.repository;

import com.oceanwinds.favorites.entity.Favorites;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface FavoritesRepository extends JpaRepository<Favorites, Long> {



        @Modifying
        @Query(value = "INSERT INTO favorites (user_id, product_id) VALUES (:userId, :productId)", nativeQuery = true)
        void addFavorite(@Param("userId") Long userId, @Param("productId") Long productId);

        Set<Favorites> findByProductId(Long productId);

        List<Favorites> findAll();

        @Modifying
        @Query (value = "DELETE FROM favorites WHERE user_id = :userId AND product_id = :productId", nativeQuery = true)
        void deleteByUserIdAndProductId(Long userId, Long productId);

        Set<Favorites> findByUserId(Long userId);
}

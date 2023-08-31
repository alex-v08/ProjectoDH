package com.oceanwinds.favorites.controller;

import com.oceanwinds.favorites.service.FavoritesService;
import com.oceanwinds.product.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/favorites")
public class FavoritesController {

    private final FavoritesService favoritesService;

    @Autowired
    public FavoritesController(FavoritesService favoritesService) {
        this.favoritesService = favoritesService;
    }

    @PostMapping("/{userId}/add/{productId}")
    public ResponseEntity<String> addFavorite(
            @PathVariable Long userId,
            @PathVariable Long productId
    ) {
        String result = favoritesService.addFavorite(userId, productId);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/{userId}/remove/{productId}")
    public ResponseEntity<String> removeFavorite(
            @PathVariable Long userId,
            @PathVariable Long productId
    ) {
        String result = favoritesService.removeFavorite(userId, productId);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Set<Product>> getUserFavorites(@PathVariable Long userId) {
        Set<Product> favoriteProducts = favoritesService.getUserFavorites(userId);
        return ResponseEntity.ok(favoriteProducts);
    }
}

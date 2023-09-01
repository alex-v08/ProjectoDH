package com.oceanwinds.favorites.controller;

import com.oceanwinds.favorites.entity.Favorites;
import com.oceanwinds.favorites.service.FavoritesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/favorites")
public class FavoritesController {

    private final FavoritesService favoritesService;

    @Autowired
    public FavoritesController(FavoritesService favoritesService) {
        this.favoritesService = favoritesService;
    }

    @PostMapping("/add")
    public void addFavorite(@RequestParam Long userId, @RequestParam Long productId) {
        favoritesService.addFavorite(userId, productId);
    }

    @DeleteMapping("/delete")
    public void deleteByUserIdAndProductId(@RequestParam Long userId, @RequestParam Long productId) {
        favoritesService.deleteByUserIdAndProductId(userId, productId);
    }

    @GetMapping("/findByProductId/{productId}")
    public Set<Favorites> findByProductId(@PathVariable Long productId) {
        return favoritesService.findByProductId(productId);
    }

    @GetMapping("/findByUserId/{userId}")
    public Set<Favorites> findByUserId(@PathVariable Long userId) {
        return favoritesService.findByUserId(userId);
    }

    @GetMapping("/findAll")
    public List<Favorites> findAll() {
        return favoritesService.findAll();
    }
}

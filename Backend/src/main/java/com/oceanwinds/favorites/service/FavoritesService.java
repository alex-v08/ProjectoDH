package com.oceanwinds.favorites.service;

import com.oceanwinds.favorites.entity.Favorites;
import com.oceanwinds.favorites.repository.FavoritesRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.Set;

@Service
@RequiredArgsConstructor
public class FavoritesService {

    private final FavoritesRepository favoritesRepository;


    @Transactional
    public void addFavorite(Long userId, Long productId) {
        favoritesRepository.addFavorite(userId, productId);
    }

    @Transactional
    public void deleteByUserIdAndProductId(Long userId, Long productId) {
        favoritesRepository.deleteByUserIdAndProductId(userId, productId);
    }

    public Set<Favorites> findByProductId(Long productId) {
        return favoritesRepository.findByProductId(productId);
    }

    public Set<Favorites> findByUserId(Long userId) {
        return favoritesRepository.findByUserId(userId);
    }



    public Set<Favorites> findAll() {
        return favoritesRepository.find_All();
    }
}

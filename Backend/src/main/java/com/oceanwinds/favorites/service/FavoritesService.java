package com.oceanwinds.favorites.service;

import com.oceanwinds.favorites.repository.FavoritesRepository;
import com.oceanwinds.product.entity.Product;
import com.oceanwinds.product.repository.ProductRepository;
import com.oceanwinds.user.entity.User;
import com.oceanwinds.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Set;


@Service
public class FavoritesService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    private final FavoritesRepository favoritesRepository;



    @Autowired
    public FavoritesService(UserRepository userRepository, ProductRepository productRepository,FavoritesRepository favoritesRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.favoritesRepository = favoritesRepository;
    }

    public String addFavorite(Long userId, Long productId) {
        User user = userRepository.findById(userId).orElse(null);
        Product product = productRepository.findById(productId).orElse(null);

        if (user == null || product == null) {
            return "User or product not found.";
        }

        user.getFavoriteProducts().add(product);
        userRepository.save(user);

        return "Product added to favorites.";
    }

    public String removeFavorite(Long userId, Long productId) {
        User user = userRepository.findById(userId).orElse(null);
        Product product = productRepository.findById(productId).orElse(null);

        if (user == null || product == null) {
            return "User or product not found.";
        }

        user.getFavoriteProducts().remove(product);
        userRepository.save(user);

        return "Product removed from favorites.";
    }

    public Set<Product> getUserFavorites(Long userId) {
        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            return Collections.emptySet();
        }

        return user.getFavoriteProducts();
    }
}

package com.oceanwinds.product.service;


import Global.exceptions.AttributeException;
import Global.exceptions.ResourceNotFoundException;
import Global.util.PaginatedResponse;
import com.oceanwinds.category.entity.Category;
import com.oceanwinds.category.repository.CategoryRepository;
import com.oceanwinds.feature.entity.Feature;
import com.oceanwinds.product.entity.Product;
import com.oceanwinds.product.entity.dto.ProductDto;
import com.oceanwinds.feature.repository.FeatureRepository;
import com.oceanwinds.product.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    FeatureRepository featureRepository;


    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Yacht not found"));
    }

    public Product getYachtByName(String name) {
        return productRepository.findByName(name).get();
    }

    public Product createProduct(ProductDto dto) throws AttributeException {
        if (dto.getName() == null || dto.getName().isEmpty()) {
            throw new AttributeException("Name is required");
        }
        if (dto.getDescription() == null || dto.getDescription().isEmpty()) {
            throw new AttributeException("Description is required");
        }
        if (dto.getImageUrl() == null || dto.getImageUrl().isEmpty()) {
            throw new AttributeException("Image is required");
        }

        Product product = new Product();

        if (dto.getCategoryId() != null) {
          Category category = categoryRepository.findById(dto.getCategoryId())
                  .orElseThrow(() -> new EntityNotFoundException("Category not found"));
          product.setCategory(category);
        } else {
            product.setCategory(null);
        }
        if (dto.getFeaturesId() != null){
            Set<Feature> features = new HashSet<>(featureRepository.findAllById(dto.getFeaturesId()));
            product.setFeature(features);
        } else {
            product.setFeature(new HashSet<>());
        }

        product.setName(dto.getName());
        product.setSku(dto.getSku());
        product.setDescription(dto.getDescription());
        product.setImageUrl(dto.getImageUrl());
        product.setAvailable(dto.getAvailable());
        product.setPricePerDay(dto.getPricePerDay());
        product.setPricePerHour(dto.getPricePerHour());
        product.setPricePerWeek(dto.getPricePerWeek());

        return productRepository.save(product);
    }


    public Product updateProduct(Long id, ProductDto dto) throws AttributeException {

        Product product = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Yacht not found"));
        if (dto.getCategoryId() != null) {
            Category category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new EntityNotFoundException("Category not found"));
            product.setCategory(category);
        } else {
            product.setCategory(null);
        }
        if (dto.getFeaturesId() != null){
            Set<Feature> features = new HashSet<>(featureRepository.findAllById(dto.getFeaturesId()));
            product.setFeature(features);
        } else {
            product.setFeature(null);
        }

        product.setName(dto.getName());
        product.setSku(dto.getSku());
        product.setDescription(dto.getDescription());
        product.setImageUrl(dto.getImageUrl());
        product.setAvailable(dto.getAvailable());
        product.setPricePerDay(dto.getPricePerDay());
        product.setPricePerHour(dto.getPricePerHour());
        product.setPricePerWeek(dto.getPricePerWeek());


        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {

        Product yacht = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Yacht not found"));
        productRepository.deleteById(id);

    }

    public boolean existsByAvailable(boolean available) throws AttributeException {
        if (!available) {
            throw new AttributeException("Yacht is not Available for rent");

        }
        return productRepository.existsByAvailable(available);

    }
    
    public List<Product> getAvailableProductByCategory(String category) {
        return productRepository.findByAvailableAndCategory(true, category);
    }

    public List<Product> getProductByCategoryId(List<Long> categoriesId) {
        List<Category> categories = categoryRepository.findAllById(categoriesId);
        return productRepository.findByCategoryIn(categories);
    }

    public List<Product> getProductsByCategoryName(List<String> categoriesName) {
        List<Category> categories = categoryRepository.findAllByNameIn(categoriesName);
        return productRepository.findByCategoryIn(categories);
    }

    public List<Product> getProductByFeaturesId(List<Long> featuresId) {
        Set<Feature> features = new HashSet<>(featureRepository.findAllById(featuresId));
        List<Product> products = productRepository.findByFeatureIn(features);
        products.removeIf(product -> !product.getFeature().containsAll(features));
        return products;
    }

    public List<Product> getProductByFeaturesName(List<String> featuresName) {
        Set<Feature> features = new HashSet<>(featureRepository.findAllByNameIn(featuresName));
        List<Product> products = productRepository.findByFeatureIn(features);
        products.removeIf(product -> !product.getFeature().containsAll(features));
        return products;
    }

    public List<Product> getAllProductFilterId(List<Long> categoriesId, List<Long> featuresId) {
        List<Category> categories;
        Set<Feature> features;

        if (!categoriesId.isEmpty()) {
            categories = categoryRepository.findAllById(categoriesId);
        } else {
            categories = new ArrayList<>();
        }

        if (!featuresId.isEmpty()) {
            features = new HashSet<>(featureRepository.findAllById(featuresId));
        } else {
            features = new HashSet<>();
        }

        List<Product> products;

        if (categories.isEmpty() && features.isEmpty()){
            // No hay categorías especificadas y tampoco características, traer todos los productos
            products = productRepository.findAll();
        } else if (categories.isEmpty()) {
            // No hay categorías especificadas, buscar solo por características
            products = productRepository.findByFeatureIn(features);
            products.removeIf(product -> !product.getFeature().containsAll(features));
        } else if (features.isEmpty()) {
            // No hay características especificadas, buscar solo por categorías
            products = productRepository.findByCategoryIn(categories);
        } else {
            // Buscar por ambas categorías y características
            products = productRepository.findByCategoryInAndFeatureIn(categories, features);
            products.removeIf(product -> !product.getFeature().containsAll(features));
        }

        return products;
    }

    public List<Product> getAvailableProduct() {

        return productRepository.findByAvailable(true);
    }

    public List<Map<String, Object>> findProductWithModifiedImages(Long id) {
        List<Map<String, Object>> modifiedImagesList = new ArrayList<>();

        Product yacht = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Yacht not found"));

        for (int i = 1; i <= 13; i++) {
            Map<String, Object> modifiedImage = new HashMap<>();
            modifiedImage.put("id", i);
            modifiedImage.put("url", yacht.getImageUrl() + i + ".png");
            modifiedImagesList.add(modifiedImage);
        }
        return modifiedImagesList;
    }

    public PaginatedResponse<Product> getAllYachts(int page, int perPage) {

        Page<Product> yachtsPage = productRepository.findAll(PageRequest.of(page - 1, perPage));

        PaginatedResponse<Product> paginatedResponse = new PaginatedResponse<>();
        paginatedResponse.setPage(yachtsPage.getNumber() + 1);
        paginatedResponse.setPer_page(yachtsPage.getSize());
        paginatedResponse.setTotal(yachtsPage.getTotalElements());
        paginatedResponse.setTotal_pages(yachtsPage.getTotalPages());
        paginatedResponse.setData(yachtsPage.getContent());

        return paginatedResponse;
    }

    public PaginatedResponse<Product> getproductsByPage(int page, int perPage) {
        PaginatedResponse<Product> allYachts = getAllYachts(page, perPage);
        List<Product> yachts = allYachts.getData();
        List<Product> availableYachts = new ArrayList<>();

        for (Product yacht : yachts) {
            if (yacht.getAvailable()) {
                availableYachts.add(yacht);
            }
        }
        allYachts.setData(availableYachts);
        return allYachts;

    }
}




package com.oceanwinds.product.service;


import Global.exceptions.AttributeException;
import Global.exceptions.ResourceNotFoundException;
import Global.util.PaginatedResponse;
import com.oceanwinds.category.entity.Category;
import com.oceanwinds.category.repository.CategoryRepository;
import com.oceanwinds.feature.entity.Feature;
import com.oceanwinds.location.entity.Location;
import com.oceanwinds.location.repository.LocationRepository;
import com.oceanwinds.product.entity.Product;
import com.oceanwinds.product.entity.dto.ProductDto;
import com.oceanwinds.feature.repository.FeatureRepository;
import com.oceanwinds.product.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
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

    @Autowired
    LocationRepository locationRepository;

    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

    public Product getProductByName(String name) {
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
        Location location = null;
        if (dto.getLocation() != null){
            if (dto.getLocation().getCountry() != null && !dto.getLocation().getCountry().isEmpty() && dto.getLocation().getCity() != null && !dto.getLocation().getCity().isEmpty()){
                location = locationRepository.findByCountryAndCity(dto.getLocation().getCountry(), dto.getLocation().getCity());
                if (location != null){
                    product.setLocation(location);
                }
                else {
                    Location newLocation = new Location();
                    newLocation.setCountry(dto.getLocation().getCountry());
                    newLocation.setCity(dto.getLocation().getCity());
                    location = locationRepository.findById(locationRepository.save(newLocation).getId()).get();
                }
            }
        }

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
        product.setPricePerDay(dto.getPricePerDay());
        product.setPricePerHour(dto.getPricePerHour());
        product.setPricePerWeek(dto.getPricePerWeek());
        product.setLocation(location);
        product.setAvailable(dto.getAvailable());
        return productRepository.save(product);
    }


    public Product updateProduct(Long id, ProductDto dto) throws AttributeException {

        Product product = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        Location location = null;
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
        if (dto.getLocation() != null){
            if (dto.getLocation().getCountry() != null && !dto.getLocation().getCountry().isEmpty() && dto.getLocation().getCity() != null && !dto.getLocation().getCity().isEmpty()){
                location = locationRepository.findByCountryAndCity(dto.getLocation().getCountry(), dto.getLocation().getCity());
                if (location != null){
                    product.setLocation(location);
                }
                else {
                    Location newLocation = new Location();
                    newLocation.setCountry(dto.getLocation().getCountry());
                    newLocation.setCity(dto.getLocation().getCity());
                    location = locationRepository.findById(locationRepository.save(newLocation).getId()).get();
                }
            }
        }

        product.setName(dto.getName());
        product.setSku(dto.getSku());
        product.setDescription(dto.getDescription());
        product.setImageUrl(dto.getImageUrl());
        product.setPricePerDay(dto.getPricePerDay());
        product.setPricePerHour(dto.getPricePerHour());
        product.setPricePerWeek(dto.getPricePerWeek());
        product.setLocation(location);
        product.setAvailable(dto.getAvailable());


        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        productRepository.deleteById(id);
    }

    public boolean existsByAvailable(boolean available) throws AttributeException {
        if (!available) {
            throw new AttributeException("Product is not Available for rent");
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

    public List<Product> getAllProductFilter(String city, List<Long> categoriesId, List<Long> featuresId) {
        if (city == null || city.isEmpty() && (categoriesId == null || categoriesId.isEmpty()) && (featuresId == null || featuresId.isEmpty())) {
            return new ArrayList<>();
        }

        Specification<Product> spec = Specification.where(null);

        if (city != null && !city.isEmpty()) {
            spec = spec.and((root, query, builder) ->
                    builder.equal(root.get("location").get("city"), city)
            );
        }

        if (!categoriesId.isEmpty()) {
            spec = spec.and((root, query, builder) ->
                    root.join("category").get("id").in(categoriesId)
            );
        }

        if (!featuresId.isEmpty()) {
            spec = spec.and((root, query, builder) ->
                    root.join("feature").get("id").in(featuresId)
            );
        }

        return productRepository.findAll(spec);
    }

    public List<Product> getAvailableProduct() {
        return productRepository.findByAvailable(true);
    }

    public List<Map<String, Object>> findProductWithModifiedImages(Long id) {
        List<Map<String, Object>> modifiedImagesList = new ArrayList<>();

        Product product = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        for (int i = 1; i <= 13; i++) {
            Map<String, Object> modifiedImage = new HashMap<>();
            modifiedImage.put("id", i);
            modifiedImage.put("url", product.getImageUrl() + i + ".png");
            modifiedImagesList.add(modifiedImage);
        }
        return modifiedImagesList;
    }

    public PaginatedResponse<Product> getAllProducts(int page, int perPage) {

        Page<Product> productsPage = productRepository.findAll(PageRequest.of(page - 1, perPage));

        PaginatedResponse<Product> paginatedResponse = new PaginatedResponse<>();
        paginatedResponse.setPage(productsPage.getNumber() + 1);
        paginatedResponse.setPer_page(productsPage.getSize());
        paginatedResponse.setTotal(productsPage.getTotalElements());
        paginatedResponse.setTotal_pages(productsPage.getTotalPages());
        paginatedResponse.setData(productsPage.getContent());

        return paginatedResponse;
    }

    public PaginatedResponse<Product> getproductsByPage(int page, int perPage) {
        PaginatedResponse<Product> allProducts = getAllProducts(page, perPage);
        List<Product> products = allProducts.getData();
        List<Product> availableProducts = new ArrayList<>();

        for (Product product : products) {
            if (product.getAvailable()) {
                availableProducts.add(product);
            }
        }
        allProducts.setData(availableProducts);
        return allProducts;
    }
}




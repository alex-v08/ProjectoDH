package com.oceanwinds.crud.service;


import Global.exceptions.AttributeException;
import Global.exceptions.ResourceNotFoundException;
import Global.util.PaginatedResponse;
import com.oceanwinds.crud.entity.Category;
import com.oceanwinds.crud.entity.Product;
import com.oceanwinds.crud.entity.dto.ProductDto;
import com.oceanwinds.crud.repository.CategoryRepository;
import com.oceanwinds.crud.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;


    public List<Product> getAllYachts() {
        return productRepository.findAll();
    }

    public Product getYachtById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Yacht not found"));
    }

    public Product getYachtByName(String name) {
        return productRepository.findByName(name).get();
    }

    public Product createYacht(ProductDto dto) throws AttributeException {

        if (dto.getName() == null || dto.getName().isEmpty()) {
            throw new AttributeException("Name is required");
        }
        if (dto.getDescription() == null || dto.getDescription().isEmpty()) {
            throw new AttributeException("Description is required");
        }
        if (dto.getImageUrl() == null || dto.getImageUrl().isEmpty()) {
            throw new AttributeException("Image is required");
        }


        Product yacht = new Product();

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));


        yacht.setName(dto.getName());
        yacht.setSku(dto.getSku());
        yacht.setDescription(dto.getDescription());
        yacht.setImageUrl(dto.getImageUrl());
        yacht.setAvailable(dto.getAvailable());
        yacht.setPricePerDay(dto.getPricePerDay());
        yacht.setCategory(category);
        yacht.setPricePerHour(dto.getPricePerHour());
        yacht.setPricePerWeek(dto.getPricePerWeek());


        return productRepository.save(yacht);
    }


    public Product updateYacht(Long id, ProductDto dto) throws AttributeException {

        Product yacht = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Yacht not found"));
        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));


        yacht.setName(dto.getName());
        yacht.setSku(dto.getSku());
        yacht.setDescription(dto.getDescription());
        yacht.setImageUrl(dto.getImageUrl());
        yacht.setAvailable(dto.getAvailable());
        yacht.setPricePerDay(dto.getPricePerDay());
        yacht.setCategory(category);
        yacht.setPricePerHour(dto.getPricePerHour());
        yacht.setPricePerWeek(dto.getPricePerWeek());


        return productRepository.save(yacht);
    }

    public void deleteYacht(Long id) {

        Product yacht = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Yacht not found"));
        productRepository.deleteById(id);

    }

    public boolean existsByAvailable(boolean available) throws AttributeException {
        if (!available) {
            throw new AttributeException("Yacht is not Available for rent");

        }
        return productRepository.existsByAvailable(available);

    }


    public List<Product> getAvailableYachtsByCategory(String category) {
        return productRepository.findByAvailableAndCategory(true, category);
    }

    public List<Product> getYachtsByCategoryName(String categoryName) {
        Category category = categoryRepository.findByName(categoryName).get();
        return productRepository.findByCategory(category);
    }

    public List<Product> getYachtsByCategory(Category category) {
        return productRepository.findByCategory(category);
    }

    public List<Product> getAvailableYachts() {

        return productRepository.findByAvailable(true);
    }

    public List<Map<String, Object>> findYachtsWithModifiedImages(Long id) {
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

    public PaginatedResponse<Product> getYachtsByPage(int page, int perPage) {
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




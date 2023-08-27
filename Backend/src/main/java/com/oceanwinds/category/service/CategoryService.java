package com.oceanwinds.category.service;

import Global.exceptions.AttributeException;
import Global.exceptions.ResourceNotFoundException;
import com.oceanwinds.category.entity.Category;
import com.oceanwinds.category.entity.dto.CategoryDto;

import com.oceanwinds.category.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(Long id){return categoryRepository.findById(id);}

    public Category getCategoryByName(String name){return categoryRepository.findByName(name).get();}

    public Category updateCategory(Long id, CategoryDto dto) throws AttributeException {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        category.setName(dto.getName());
        category.setDescription(dto.getDescription());
        category.setImage(dto.getImage());
        return categoryRepository.save(category);
    }

    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        categoryRepository.deleteById(id);
    }

    public Category createCategory(CategoryDto dto) throws AttributeException {

        if (dto.getName() == null || dto.getName().isEmpty()) {
            throw new AttributeException("Name is required");
        }

        Category category = new Category();

        category.setName(dto.getName());
        category.setDescription(dto.getDescription());
        category.setImage(dto.getImage());

        return categoryRepository.save(category);
    }

}

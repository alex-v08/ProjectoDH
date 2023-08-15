package com.oceanwinds.crud.service;

import Global.exceptions.AttributeException;
import Global.exceptions.ResourceNotFoundException;
import com.oceanwinds.crud.entity.Category;
import com.oceanwinds.crud.entity.dto.CategoryDto;
import com.oceanwinds.crud.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;

    public List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(Long id){return categoryRepository.findById(id);}

    public Category getCategoryByName(String name){return categoryRepository.findByName(name).get();}

    public Category updateCategory(Long id, CategoryDto dto) throws AttributeException {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        category.setName(dto.getName());

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

        return categoryRepository.save(category);
    }

}

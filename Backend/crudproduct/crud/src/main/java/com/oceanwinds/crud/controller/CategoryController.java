package com.oceanwinds.crud.controller;

import Global.dto.MessageDto;
import Global.exceptions.AttributeException;
import Global.exceptions.ResourceNotFoundException;
import com.oceanwinds.crud.entity.Category;
import com.oceanwinds.crud.entity.dto.CategoryDto;
import com.oceanwinds.crud.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @PostMapping("/category/create")
    public ResponseEntity<MessageDto> createCategory(@RequestBody CategoryDto dto) throws AttributeException {
        categoryService.createCategory(dto);
        String message = "Category created successfully";
        return ResponseEntity.ok(new MessageDto(HttpStatus.OK, message));
    }

    @DeleteMapping("/category/delete/{id}")
    public ResponseEntity<MessageDto> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok(new MessageDto(HttpStatus.OK, "Category deleted successfully"));
    }

    @PutMapping("/category/update/{id}")
    public ResponseEntity<MessageDto> updateCategory(@PathVariable Long id, @RequestBody CategoryDto dto) throws AttributeException {
        categoryService.updateCategory(id, dto);

        String message = "Category updated successfully";
        return ResponseEntity.ok(new MessageDto(HttpStatus.OK, message));
    }

    @GetMapping("/category/all")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategory();
        if (categories.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.ok(categories);
        }
    }

    @GetMapping("/categoryById/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        Category category = categoryService.getCategoryById(id).orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        if (category == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.ok(category);
        }
    }

    @GetMapping("/categoryByName/{name}")
    public ResponseEntity<Category> getCategoryByName(@RequestParam String name) {
        Category category = categoryService.getCategoryByName(name);
        if (category == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.ok(category);
        }
    }
}

package com.oceanwinds.crud.controller;

import Global.dto.MessageDto;
import Global.exceptions.AttributeException;
import Global.util.PaginatedResponse;
import com.oceanwinds.crud.entity.Product;
import com.oceanwinds.crud.entity.dto.ProductDto;
import com.oceanwinds.crud.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "http://localhost:3000")
public class YachtController {

    @Autowired
    private ProductService productService;

    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllYachts() {
        List<Product> yachts = productService.getAllYachts();
        if (yachts.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.ok(yachts);
        }

    }

    @GetMapping("/yachtByCategory/{category}")
    public ResponseEntity<List<Product>> getYachtsByCategory(@RequestParam String categoryName) {
        List<Product> yachts = productService.getYachtsByCategoryName(categoryName);
        if (yachts.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.ok(yachts);
        }
    }

    @GetMapping("/page/{page}")
    public ResponseEntity<PaginatedResponse<Product>> getYachtsByPage(
            @PathVariable int page,
            @RequestParam(defaultValue = "10") int perPage) {
        PaginatedResponse<Product> response = productService.getYachtsByPage(page, perPage);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/available")
    public ResponseEntity<List<Product>> getAvailableYachts() throws AttributeException {
        List<Product> yachts = productService.getAvailableYachts();
        if (yachts.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
        return ResponseEntity.ok(yachts);

        }

    }


    @GetMapping("/{id}")
    public ResponseEntity<Product> getYachtById (@PathVariable Long id) {
        Product yacht = productService.getYachtById(id);
        if (yacht == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {

            return ResponseEntity.ok(yacht);
        }
    }



    @PostMapping("/create")
    public ResponseEntity<MessageDto> createYacht(@RequestBody ProductDto dto) throws AttributeException {
        productService.createYacht(dto);
        String message = "Yacht created successfully";
        return ResponseEntity.ok(new MessageDto(HttpStatus.OK, message));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<MessageDto> updateYacht(@PathVariable Long id, @RequestBody ProductDto dto) throws AttributeException {
        productService.updateYacht(id, dto);

        String message = "Yacht updated successfully";
        return ResponseEntity.ok(new MessageDto(HttpStatus.OK, message));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageDto> deleteYacht(@PathVariable Long id) {

        productService.deleteYacht(id);
        return ResponseEntity.ok(new MessageDto(HttpStatus.OK, "Yacht deleted successfully"));
    }

    @GetMapping("/urlImage/{id}")
    public List<Map<String, Object>> getYachtModifiedImages(@PathVariable Long id) {
        return productService.findYachtsWithModifiedImages(id);
    }



}

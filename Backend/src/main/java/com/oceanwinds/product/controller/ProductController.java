package com.oceanwinds.product.controller;

import Global.dto.MessageDto;
import Global.exceptions.AttributeException;
import Global.util.PaginatedResponse;
import com.oceanwinds.product.entity.Product;
import com.oceanwinds.product.service.ProductService;
import com.oceanwinds.user.product.entity.dto.ProductDto;
import com.oceanwinds.feature.repository.FeatureRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private FeatureRepository featureRepository;

    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProduct() {
        List<Product> product = productService.getAllProduct();
        if (product.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.ok(product);
        }

    }

    @GetMapping("/yachtByCategoryName/{categoryName}")
    public ResponseEntity<List<Product>> getYachtsByCategoryName(@RequestParam String categoryName) {
        List<Product> product = productService.getProductsByCategoryName(categoryName);
        if (product.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.ok(product);
        }
    }


    @GetMapping("/productByCategoryId/{categoryId}")
    public ResponseEntity<List<Product>> getproductByCategoryId(@RequestParam Long categoryId) {
        List<Product> product = productService.getProductByCategoryId(categoryId);
        if (product.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.ok(product);
        }
    }

    @GetMapping("/productByFeaturesId/{featuresId}")
    public ResponseEntity<List<Product>> getproducttsByFeaturesId(@RequestParam List<Long> featuresId) {
        List<Product> yachts = productService.getProductByFeaturesId(featuresId);
        if (yachts.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.ok(yachts);
        }
    }

    @GetMapping("/page/{page}")
    public ResponseEntity<PaginatedResponse<Product>> getProductByPage(
            @PathVariable int page,
            @RequestParam(defaultValue = "10") int perPage) {
        PaginatedResponse<Product> response = productService.getproductsByPage(page, perPage);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/available")
    public ResponseEntity<List<Product>> getAvailableProduct() throws AttributeException {
        List<Product> product = productService.getAvailableProduct();
        if (product.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
        return ResponseEntity.ok(product);

        }

    }


    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById (@PathVariable Long id) {
        Product yacht = productService.getProductById(id);
        if (yacht == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {

            return ResponseEntity.ok(yacht);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<MessageDto> createProduct(@RequestBody ProductDto dto) throws AttributeException {
        productService.createProduct(dto);
        String message = "Yacht created successfully";
        return ResponseEntity.ok(new MessageDto(HttpStatus.OK, message));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<MessageDto> updateProduct(@PathVariable Long id, @RequestBody ProductDto dto) throws AttributeException {
        productService.updateProduct(id, dto);

        String message = "Product updated successfully";
        return ResponseEntity.ok(new MessageDto(HttpStatus.OK, message));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageDto> deleteProduct(@PathVariable Long id) {

        productService.deleteProduct(id);
        return ResponseEntity.ok(new MessageDto(HttpStatus.OK, "Yacht deleted successfully"));
    }

    @GetMapping("/urlImage/{id}")
    public List<Map<String, Object>> getProducttModifiedImages(@PathVariable Long id) {
        return productService.findProductWithModifiedImages(id);
    }



}

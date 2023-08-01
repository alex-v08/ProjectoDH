package com.marvoyage.crud.controller;

import Global.dto.MessageDto;
import Global.exceptions.AttributeException;
import com.marvoyage.crud.dto.YachtsDto;
import com.marvoyage.crud.entity.Yachts;
import com.marvoyage.crud.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/yachts")
public class YachtController {

    @Autowired
    private ProductService productService;

    @GetMapping("/all")
    public ResponseEntity<List<Yachts>> getAllYachts() {

        return ResponseEntity.ok(productService.getAllYachts());
    }

    @GetMapping("/available")
    public ResponseEntity<List<Yachts>> getAvailableYachts() {
        List<Yachts> yachts = productService.getAvailableYachts();
        if (yachts.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(new MessageDto("No hay yates disponibles")));
        } else {
        return ResponseEntity.ok(yachts);

        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<Yachts> getYachtById(@Valid Long id, @RequestBody YachtsDto dto) throws AttributeException {
        Yachts yacht = productService.getYachtById(id);
        if (yacht != null) {
            return new ResponseEntity<>(yacht, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Yachts> createYacht(@RequestBody YachtsDto dto) throws AttributeException {
        Yachts createdYacht = productService.createYacht(dto);
        return new ResponseEntity<>(createdYacht, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Yachts> updateYacht(@PathVariable Long id, @RequestBody YachtsDto dto) throws AttributeException {
        Yachts updatedYacht = productService.updateYacht(id, dto);
        if (updatedYacht != null) {
            return new ResponseEntity<>(updatedYacht, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteYacht(@PathVariable Long id) {
        productService.deleteYacht(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

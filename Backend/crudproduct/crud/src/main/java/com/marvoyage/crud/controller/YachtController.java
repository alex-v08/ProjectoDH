package com.marvoyage.crud.controller;

import com.marvoyage.crud.dto.YachtsDto;
import com.marvoyage.crud.entity.Yachts;
import com.marvoyage.crud.service.ProductService;
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

    @GetMapping
    public ResponseEntity<List<Yachts>> getAllYachts() {
        List<Yachts> yachts = productService.getAllYachts();
        return new ResponseEntity<>(yachts, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Yachts> getYachtById(@PathVariable Long id) {
        Yachts yacht = productService.getYachtById(id);
        if (yacht != null) {
            return new ResponseEntity<>(yacht, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Yachts> createYacht(@RequestBody YachtsDto dto) {
        Yachts createdYacht = productService.createYacht(dto);
        return new ResponseEntity<>(createdYacht, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Yachts> updateYacht(@PathVariable Long id, @RequestBody YachtsDto dto) {
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

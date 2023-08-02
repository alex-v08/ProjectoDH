package com.marvoyage.crud.controller;

import Global.dto.MessageDto;
import Global.exceptions.AttributeException;
import com.marvoyage.crud.dto.YachtsDto;
import com.marvoyage.crud.entity.Yachts;
import com.marvoyage.crud.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/")
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
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
        return ResponseEntity.ok(yachts);

        }

    }

    @GetMapping("/{id}")
    public ResponseEntity<Yachts> getYachtById (@PathVariable Long id) {
        Yachts yacht = productService.getYachtById(id);
        if (yacht == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {

            return ResponseEntity.ok(yacht);
        }
    }



    @PostMapping("/create")
    public ResponseEntity<MessageDto> createYacht(@RequestBody YachtsDto dto) throws AttributeException {
        Yachts createdYacht = productService.createYacht(dto);
        String message = "Yacht created successfully";
        return ResponseEntity.ok(new MessageDto(HttpStatus.OK, message));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<MessageDto> updateYacht(@PathVariable Long id, @RequestBody YachtsDto dto) throws AttributeException {
        Yachts updatedYacht = productService.updateYacht(id, dto);


        String message = "Yacht updated successfully";
        return ResponseEntity.ok(new MessageDto(HttpStatus.OK, message));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<MessageDto> deleteYacht(@PathVariable Long id) {

        productService.deleteYacht(id);
        return ResponseEntity.ok(new MessageDto(HttpStatus.OK, "Yacht deleted successfully"));
    }
}

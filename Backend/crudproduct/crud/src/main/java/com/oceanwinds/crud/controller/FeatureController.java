package com.oceanwinds.crud.controller;

import Global.dto.MessageDto;
import Global.exceptions.AttributeException;
import com.oceanwinds.crud.entity.Category;
import com.oceanwinds.crud.entity.Feature;
import com.oceanwinds.crud.entity.dto.CategoryDto;
import com.oceanwinds.crud.entity.dto.FeatureDto;
import com.oceanwinds.crud.service.FeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "http://localhost:3000")
public class FeatureController {

    @Autowired
    FeatureService featureService;

    @PostMapping("/feature/create")
    public ResponseEntity<MessageDto> createFeature(@RequestBody FeatureDto dto) throws AttributeException {
        featureService.createFeature(dto);
        String message = "Feature created successfully";
        return ResponseEntity.ok(new MessageDto(HttpStatus.OK, message));
    }

    @GetMapping("/feature/all")
    public ResponseEntity<List<Feature>> getAllFeatures() {
        List<Feature> features = featureService.getAllFeature();
        if (features.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.ok(features);
        }
    }
}

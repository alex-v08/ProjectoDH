package com.oceanwinds.feature.controller;

import Global.dto.MessageDto;
import Global.exceptions.AttributeException;
import Global.exceptions.ResourceNotFoundException;
import com.oceanwinds.feature.entity.Feature;
import com.oceanwinds.feature.entity.dto.FeatureDto;
import com.oceanwinds.feature.service.FeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "*")
public class FeatureController {


    private final FeatureService featureService;

    @Autowired
    public FeatureController(FeatureService featureService) {
        this.featureService = featureService;
    }

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

    @DeleteMapping("/feature/delete/{id}")
    public ResponseEntity<MessageDto> deleteFeature (@PathVariable Long id){
        featureService.deleteFeature(id);
        return ResponseEntity.ok(new MessageDto(HttpStatus.OK, "Feature deleted successfully"));
    }

    @PutMapping("/feature/update/{id}")
    public ResponseEntity<MessageDto> updateFeature(@PathVariable Long id, @RequestBody FeatureDto dto) throws AttributeException {
        featureService.updateFeature(id, dto);

        String message = "Feature updated successfully";
        return ResponseEntity.ok(new MessageDto(HttpStatus.OK, message));
    }

    @GetMapping("/featureById/{id}")
    public ResponseEntity<Feature> getFeatureById(@PathVariable Long id) {
        Feature feature = featureService.getFeatureById(id).orElseThrow(() -> new ResourceNotFoundException("Feature not found"));
        if (feature == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.ok(feature);
        }
    }
}

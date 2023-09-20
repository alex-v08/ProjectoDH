package com.oceanwinds.location.controller;

import Global.dto.MessageDto;
import Global.exceptions.AttributeException;
import com.oceanwinds.location.entity.Location;
import com.oceanwinds.location.entity.dto.LocationDto;
import com.oceanwinds.location.service.LocationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/location")
@CrossOrigin(origins = "*")
@AllArgsConstructor
public class LocationController {

    private LocationService locationService;

    @PostMapping("/location/create")
    public ResponseEntity<MessageDto> createLocation(@RequestBody LocationDto dto) throws AttributeException {
        locationService.createLocation(dto);
        String message = "Location created successfully";
        return ResponseEntity.ok(new MessageDto(HttpStatus.OK, message));
    }

    @GetMapping("/location/all")
    public ResponseEntity<List<Location>> getAllLocation() {
        List<Location> locations = locationService.getAllLocation();
        if (locations.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } else {
            return ResponseEntity.ok(locations);
        }
    }

    @PutMapping("/location/update/{id}")
    public ResponseEntity<MessageDto> updateLocation(@PathVariable Long id, @RequestBody LocationDto dto) throws AttributeException {
        locationService.updateLocation(id, dto);
        String message = "Location updated successfully";
        return ResponseEntity.ok(new MessageDto(HttpStatus.OK, message));
    }

    @DeleteMapping("/location/delete/{id}")
    public ResponseEntity<MessageDto> deleteLocation (@PathVariable Long id){
        locationService.deleteLocation(id);
        return ResponseEntity.ok(new MessageDto(HttpStatus.OK, "Location deleted successfully"));
    }

}

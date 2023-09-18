package com.oceanwinds.location.service;

import Global.exceptions.AttributeException;
import Global.exceptions.ResourceNotFoundException;
import com.oceanwinds.location.entity.Location;
import com.oceanwinds.location.entity.dto.LocationDto;
import com.oceanwinds.location.repository.LocationRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Data
public class LocationService {

    @Autowired
    LocationRepository locationRepository;

    public List<Location> getAllLocation() {
        List<Location> locations = locationRepository.findAll();
        locations.removeIf(location -> location.getDeleted());
        return locations;
    }

    public Location createLocation(LocationDto dto) throws AttributeException {

        Location location = new Location();

        location.setCountry(dto.getCountry());
        location.setCity(dto.getCity());

        return locationRepository.save(location);
    }

    public Location updateLocation(Long id, LocationDto dto) throws AttributeException {
        Location location = locationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Location not found"));
        location.setCountry(dto.getCountry());
        location.setCity(dto.getCity());
        return locationRepository.save(location);
    }

    public void deleteLocation(Long id) {
        Location location = locationRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Location not found"));
        location.setDeleted(true);
        locationRepository.save(location);
    }

    public Optional<Location> getLocationById(Long id){return locationRepository.findById(id);}

}

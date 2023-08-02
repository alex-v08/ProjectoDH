package com.marvoyage.crud.service;


import Global.exceptions.AttributeException;
import Global.exceptions.ResourceNotFoundException;
import com.marvoyage.crud.dto.YachtsDto;
import com.marvoyage.crud.entity.Yachts;
import com.marvoyage.crud.repository.YachtsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    YachtsRepository yachtsRepository;

    public List<Yachts> getAllYachts() {
        return yachtsRepository.findAll();
    }

    public Yachts getYachtById(Long id) {
        return yachtsRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Yacht not found"));
    }

    public Yachts getYachtByName(String name) {
        return yachtsRepository.findByName(name).get();
    }

    public Yachts createYacht(YachtsDto dto) throws AttributeException {

        if (dto.getNombre() == null || dto.getNombre().isEmpty()) {
            throw new AttributeException("Name is required");
        }
        if (dto.getDescripcion() == null || dto.getDescripcion().isEmpty()) {
            throw new AttributeException("Description is required");
        }
        if (dto.getImagen() == null || dto.getImagen().isEmpty()) {
            throw new AttributeException("Image is required");
        }
        Yachts yacht = new Yachts(autoIncrementId(), dto.getNombre(), dto.getDescripcion(), dto.getImagen());
        return yachtsRepository.save(yacht);
    }

    private Long autoIncrementId() {
        List<Yachts> yachts = yachtsRepository.findAll();
        return yachts.isEmpty() ? 1L : yachts.stream().max(Comparator.comparing(Yachts::getId)).get().getId() + 1L;
    }

    public Yachts updateYacht(Long id, YachtsDto dto) throws AttributeException {
        Yachts yacht = yachtsRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Yacht not found"));
        yacht.setName(dto.getNombre());
        yacht.setDescription(dto.getDescripcion());
        yacht.setImageUrl(dto.getImagen());
        yacht.setAvailable(dto.getAvailable());
        yacht.setPricePerDay(dto.getPricePerDay());
        yacht.setCategory(dto.getCategory());
        yacht.setPricePerHour(dto.getPricePerHour());
        yacht.setPricePerWeek(dto.getPricePerWeek());


        return yachtsRepository.save(yacht);
    }

    public void deleteYacht(Long id) {

        Yachts yacht = yachtsRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Yacht not found"));
        yachtsRepository.deleteById(id);
    }

    public boolean existsByAvailable(boolean available) throws AttributeException {
        if (!available) {
            throw new AttributeException("Yacht is not Available for rent");

        }
        return yachtsRepository.existsByAvailable(available);

    }

    public List<Yachts> getAvailableYachts() {
        return yachtsRepository.findByAvailable(true);


    }
}



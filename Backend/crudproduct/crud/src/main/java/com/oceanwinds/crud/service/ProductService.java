package com.oceanwinds.crud.service;


import Global.exceptions.AttributeException;
import Global.exceptions.ResourceNotFoundException;
import com.oceanwinds.crud.entity.Category;
import com.oceanwinds.crud.entity.dto.YachtsDto;
import com.oceanwinds.crud.entity.Yachts;
import com.oceanwinds.crud.repository.YachtsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

        if (dto.getName() == null || dto.getName().isEmpty()) {
            throw new AttributeException("Name is required");
        }
        if (dto.getDescription() == null || dto.getDescription().isEmpty()) {
            throw new AttributeException("Description is required");
        }
        if (dto.getImageUrl() == null || dto.getImageUrl().isEmpty()) {
            throw new AttributeException("Image is required");
        }


        Yachts yacht = new Yachts();

        yacht.setName(dto.getName());
        yacht.setSku(dto.getSku());
        yacht.setDescription(dto.getDescription());
        yacht.setImageUrl(dto.getImageUrl());
        yacht.setAvailable(dto.getAvailable());
        yacht.setPricePerDay(dto.getPricePerDay());
        yacht.setCategory(dto.getCategory());
        yacht.setPricePerHour(dto.getPricePerHour());
        yacht.setPricePerWeek(dto.getPricePerWeek());


        return yachtsRepository.save(yacht);
    }


    public Yachts updateYacht(Long id, YachtsDto dto) throws AttributeException {
        Yachts yacht = yachtsRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Yacht not found"));
        yacht.setName(dto.getName());
        yacht.setSku(dto.getSku());
        yacht.setDescription(dto.getDescription());
        yacht.setImageUrl(dto.getImageUrl());
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


    public List<Yachts> getAvailableYachtsByCategory(String category) {
        return yachtsRepository.findByAvailableAndCategory(true, category);
    }

    public List<Yachts> getYachtsByCategory(Category category) {
        return yachtsRepository.findByCategory(category);
    }

    public List<Yachts> getAvailableYachts() {

        return yachtsRepository.findByAvailable(true);
    }

    public List<String> findYachtsWithModifiedImages(Long id){
        List<String> modifiedImages = new ArrayList<>();
        Yachts yacht = yachtsRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Yacht not found"));

        for (int i = 1; i <= 13; i++) {
            modifiedImages.add(yacht.getImageUrl() + i + ".png");
        }
        return modifiedImages;
    }


    }




package com.marvoyage.crud.service;


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
        return yachtsRepository.findById(id).get();
    }

    public Yachts getYachtByName(String name) {
        return yachtsRepository.findByName(name).get();
    }

    public Yachts createYacht(YachtsDto dto) {
        Yachts yacht = new Yachts(autoIncrementId(), dto.getNombre(), dto.getDescripcion(), dto.getImagen());
        return yachtsRepository.save(yacht);
    }

    private Long autoIncrementId() {
        List<Yachts> yachts = yachtsRepository.findAll();
        return yachts.isEmpty() ? 1L : yachts.stream().max(Comparator.comparing(Yachts::getId)).get().getId() + 1L;
    }

    public Yachts updateYacht(Long id, YachtsDto dto) {
        Yachts yacht = yachtsRepository.findById(id).get();
        yacht.setName(dto.getNombre());
        yacht.setDescription(dto.getDescripcion());
        yacht.setImageUrl(dto.getImagen());
        return yachtsRepository.save(yacht);
    }
    public void deleteYacht(Long id) {
        yachtsRepository.deleteById(id);
    }


    }



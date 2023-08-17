package com.oceanwinds.crud.service;

import Global.exceptions.AttributeException;
import com.oceanwinds.crud.entity.Category;
import com.oceanwinds.crud.entity.Feature;
import com.oceanwinds.crud.entity.dto.CategoryDto;
import com.oceanwinds.crud.entity.dto.FeatureDto;
import com.oceanwinds.crud.repository.FeatureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeatureService {
    @Autowired
    FeatureRepository featureRepository;

    public List<Feature> getAllFeature() {
        return featureRepository.findAll();
    }

    public Feature createFeature(FeatureDto dto) throws AttributeException {

        if (dto.getName() == null || dto.getName().isEmpty()) {
            throw new AttributeException("Name is required");
        }

        Feature feature = new Feature();

        feature.setName(dto.getName());
        feature.setImage(dto.getImage());

        return featureRepository.save(feature);
    }
}

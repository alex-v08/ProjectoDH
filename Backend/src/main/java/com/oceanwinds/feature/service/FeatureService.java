package com.oceanwinds.feature.service;

import Global.exceptions.AttributeException;
import Global.exceptions.ResourceNotFoundException;
import com.oceanwinds.feature.entity.Feature;
import com.oceanwinds.feature.entity.dto.FeatureDto;
import com.oceanwinds.feature.repository.FeatureRepository;
import com.oceanwinds.product.entity.Product;
import com.oceanwinds.product.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeatureService {
    @Autowired
    FeatureRepository featureRepository;

    @Autowired
    ProductRepository productRepository;

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

    public Feature updateFeature(Long id, FeatureDto dto) throws AttributeException {
        Feature feature = featureRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Feature not found"));
        feature.setName(dto.getName());
        feature.setImage(dto.getImage());
        return featureRepository.save(feature);
    }

    public void deleteFeature(Long id) {
        Feature feature = featureRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Feature not found"));

        if (feature != null) {

            List<Product> productsWithFeature = productRepository.findByFeatureContaining(feature);

            for (Product product : productsWithFeature) {
                product.getFeature().remove(feature);
            }

            productRepository.saveAll(productsWithFeature);
        }

        featureRepository.deleteById(id);
    }

    public Optional<Feature> getFeatureById(Long id){return featureRepository.findById(id);}
}

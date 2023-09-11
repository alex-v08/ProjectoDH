package com.oceanwinds.feature.repository;

import com.oceanwinds.feature.entity.Feature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface FeatureRepository extends JpaRepository<Feature, Long> {
    Set<Feature> findAllByNameIn(Set<String> featuresName);
}

package com.oceanwinds.location.repository;

import com.oceanwinds.location.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    Location findByCountry(String country);
    Optional<Location> findByCity(String city);
    Location findByCountryAndCity(String country, String city);
}

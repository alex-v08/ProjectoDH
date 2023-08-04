package com.oceanwinds.crud.repository;

import com.oceanwinds.crud.entity.Yachts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface YachtsRepository extends JpaRepository<Yachts, Long> {

    boolean existsByAvailable(boolean available);

    List<Yachts> findByCategory(String category);
    Optional<Yachts> findByName(String name);

    List<Yachts> findByAvailable(boolean b);

    List<Yachts> findByAvailableAndCategory(boolean b, String category);
}

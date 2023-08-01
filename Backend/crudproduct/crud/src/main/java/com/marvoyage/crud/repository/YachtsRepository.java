package com.marvoyage.crud.repository;

import com.marvoyage.crud.entity.Yachts;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface YachtsRepository extends MongoRepository<Yachts, Long> {

    boolean existsByAvailable(boolean available);
    Optional<Yachts> findByName(String name);

    List<Yachts> findByAvailable(boolean b);
}

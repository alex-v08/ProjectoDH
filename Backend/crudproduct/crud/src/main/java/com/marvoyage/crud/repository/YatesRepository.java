package com.marvoyage.crud.repository;

import com.marvoyage.crud.entity.Yates;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface YatesRepository extends MongoRepository<Yates, Long> {
}

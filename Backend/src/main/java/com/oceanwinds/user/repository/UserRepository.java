package com.oceanwinds.user.repository;

import com.oceanwinds.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByemail(String email);

    Optional<User> findByemail(String email);


    boolean existsByDni(String dni);
}

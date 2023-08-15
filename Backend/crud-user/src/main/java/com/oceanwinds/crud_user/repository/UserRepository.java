package com.oceanwinds.crud_user.repository;

import com.oceanwinds.crud_user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByemail(String email);
    Optional<User> findByemail(String email);

}

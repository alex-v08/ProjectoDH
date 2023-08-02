package crud.crudUser.repository;

import crud.crudUser.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends MongoRepository<User, Long> {

    boolean existsByemail(String email);
    Optional<User> findByemail(String email);
}

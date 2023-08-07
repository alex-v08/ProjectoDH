package crud.cruduser.repository;

import crud.cruduser.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends MongoRepository<User, Long> {

    boolean existsByemail(String email);
    Optional<User> findByemail(String email);
}

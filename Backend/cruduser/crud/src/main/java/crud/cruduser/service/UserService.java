package crud.cruduser.service;

import crud.cruduser.dto.UserDto;
import crud.cruduser.entity.User;
import crud.cruduser.repository.UsersRepository;

import crud.global.exceptions.AttributeException;
import crud.global.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class UserService {

    @Autowired
    UsersRepository usersRepository;

    public List<User> getAllUsers() {
        return
                usersRepository.findAll();
    }

    public User getUserById(Long id) {
        return usersRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public User saveUser(UserDto dto) throws AttributeException {


        if(usersRepository.existsByemail(dto.getEmail())){
            throw new AttributeException("User already exists");
        }


        User user = new User(autoincrementId(), dto.getName(), dto.getLastName(), dto.getEmail(), dto.getPassword(), dto.getPhone(), dto.getAddress());
        return usersRepository.save(user);
    }


    public User updateUser(UserDto dto, Long id) throws AttributeException {
        User user = usersRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!user.getEmail().equals(dto.getEmail()) && usersRepository.existsByemail(dto.getEmail())) {
            throw new AttributeException("User already exists");
        }
        user.setName(dto.getName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setPhone(dto.getPhone());
        user.setAddress(dto.getAddress());
        return  usersRepository.save(user);

    }


    public void deleteUser(Long id) {
        usersRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        usersRepository.deleteById(id);
    }

    private Long autoincrementId() {
        List<User> users = usersRepository.findAll();
        return users.isEmpty() ? 1L : users.stream().max(Comparator.comparing(User::getId)).get().getId() + 1L;
    }

}

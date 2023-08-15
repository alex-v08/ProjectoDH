package com.oceanwinds.crud_user.service;


import Global.exceptions.AttributeException;
import Global.exceptions.ResourceNotFoundException;
import com.oceanwinds.crud_user.entity.User;
import com.oceanwinds.crud_user.entity.dto.UserDto;
import com.oceanwinds.crud_user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository usersRepository;

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


        User user = new User();
        updateUser(dto, user.getId());

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
}

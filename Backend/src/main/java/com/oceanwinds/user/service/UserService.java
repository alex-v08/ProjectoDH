package com.oceanwinds.user.service;

import Global.exceptions.AttributeException;
import Global.exceptions.ResourceNotFoundException;
import com.oceanwinds.user.entity.User;
import com.oceanwinds.user.entity.dto.UserDto;
import com.oceanwinds.user.repository.UserRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Data

public class UserService {
    @Autowired
    UserRepository usersRepository;

    public List<User> getAllUsers() {
        return usersRepository.findAll();
    }

    public User getUserById(Long id) {
        return usersRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public User saveUser(UserDto dto) throws AttributeException {
        validateUserAttributes(dto);

        if (usersRepository.existsByemail(dto.getEmail())) {
            throw new AttributeException("El correo electrónico ya está registrado.");
        }

        if (usersRepository.existsByDni(dto.getUuid())) {
            throw new AttributeException("El uid ya se encuentra registrado.");
        }

        User user = new User();
        user.setName(dto.getName());
        user.setDni(dto.getDni());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setPhone(dto.getPhone());
        user.setAddress(dto.getAddress());
        user.setRole(dto.getRole());
        user.setUuid(dto.getUuid());
        user.setActive(dto.isActive());

        return usersRepository.save(user);
    }

    public User updateUser(UserDto dto, Long id) throws AttributeException {
        User user = usersRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!user.getEmail().equals(dto.getEmail()) && usersRepository.existsByemail(dto.getEmail())) {
            throw new AttributeException("El correo electrónico ya está registrado.");
        }

        if (!user.getDni().equals(dto.getDni()) && usersRepository.existsByDni(dto.getDni())) {
            throw new AttributeException("El DNI ya está registrado.");
        }

        validateUserAttributes(dto);
        user.setName(dto.getName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setPhone(dto.getPhone());
        user.setAddress(dto.getAddress());
        user.setRole(dto.getRole());
        user.setUuid(dto.getUuid());
        user.setActive(dto.isActive());

        return usersRepository.save(user);
    }

    public void deleteUser(Long id) {
        usersRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        usersRepository.deleteById(id);
    }

    public User findByEmail(String email) {
        return usersRepository.findByemail(email).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    private void validateUserAttributes(UserDto dto) throws AttributeException {
        if (!dto.getName().matches("^[A-Za-z ]+$")) {
            throw new AttributeException("El nombre solo puede contener letras.");
        }

        if (!dto.getLastName().matches("^[A-Za-z ]+$")) {
            throw new AttributeException("El apellido solo puede contener letras.");
        }

        if (!dto.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new AttributeException("El formato del correo electrónico es inválido.");
        }

        if (!dto.getDni().matches("^[0-9]+$")) {
            throw new AttributeException("El DNI solo puede contener números.");
        }


    }

    public Boolean getUserByUuid(String uuid) {
        return usersRepository.existsByUuid(uuid);

    }
}

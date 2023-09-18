package com.oceanwinds.user.service;

import Global.exceptions.AttributeException;
import Global.exceptions.ResourceNotFoundException;

import com.oceanwinds.pictures.entity.ProfilePicture;
import com.oceanwinds.pictures.repository.ProfilePictureRepository;
import com.oceanwinds.user.entity.User;
import com.oceanwinds.user.entity.UserEnum;
import com.oceanwinds.user.entity.dto.UserDto;
import com.oceanwinds.user.entity.dto.UserDtoFirebase;
import com.oceanwinds.user.repository.UserRepository;
import lombok.Data;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;

@Service
@Data
@Slf4j
public class UserService {


    private final UserRepository usersRepository;
    private final ProfilePictureRepository profilePictureRepository;


    public List<User> getAllUsers() {
        List<User> users = usersRepository.findAll();
        users.removeIf(user -> user.getDeleted());
        return users;
    }


    public User getUserById(Long id) {
        return usersRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public User saveUserFirebase(UserDtoFirebase dto) throws AttributeException {


        if (usersRepository.existsByemail(dto.getEmail())) {
            Optional<User> userOptional = usersRepository.findByemail(dto.getEmail());
            userOptional.get().setDeleted(false);
            usersRepository.save(userOptional.get());
            if (!userOptional.get().getUuid().equals(dto.getUuid())) {
                throw new AttributeException("El correo electrónico ya está registrado.");
            }
        }

        validateUserAttributesFirebase(dto);
        User user = new User();
        user.setName(dto.getName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setUuid(dto.getUuid());
        return usersRepository.save(user);
    }


    public User updateUser(UserDto dto, Long id) throws AttributeException {
        User user = (usersRepository.findById(id)).orElseThrow(() -> new ResourceNotFoundException("User not found"));

        //validar si uuid existe asociado al mismo correo
        if (usersRepository.existsByemail(dto.getEmail())) {
            Optional<User> userOptional = usersRepository.findByemail(dto.getEmail());
            if (!userOptional.get().getUuid().equals(dto.getUuid())) {
                throw new AttributeException("El correo electrónico ya está registrado.");
            }
        }


        validateUserAttributes(dto);
        user.setName(dto.getName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setAddress(dto.getAddress());
        user.setUuid(dto.getUuid());

        return usersRepository.save(user);
    }

    public void changeRole(long id, UserEnum role) {
        User user = usersRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setRole(role);
        usersRepository.save(user);
    }

    public void deleteUser(Long id) {
        if (usersRepository.existsById(id)) {
            User user = usersRepository.findById(id).get();
            user.setDeleted(true);
            usersRepository.save(user);
        } else {
            throw new ResourceNotFoundException("User not found");
        }
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

        if (!dto.getDni().matches("^[A-Za-z0-9+_.-]+$")) {

            throw new AttributeException("El DNI solo puede contener números o el Dni ya Existe");

        }


    }

    private void validateUserAttributesFirebase(UserDtoFirebase dto) throws AttributeException {
        validateName(dto.getName());
        validateLastName(dto.getLastName());
        validateEmail(dto.getEmail());
        validateUuid(dto.getUuid(), dto.getEmail());
    }

    private void validateName(String name) throws AttributeException {
        if (!name.matches("^[A-Za-z ]+$")) {
            throw new AttributeException("El nombre solo puede contener letras.");
        }
    }

    private void validateLastName(String lastName) throws AttributeException {
        if (!lastName.matches("^[A-Za-z ]+$")) {
            throw new AttributeException("El apellido solo puede contener letras.");
        }
    }

    private void validateEmail(String email) throws AttributeException {
        if (!email.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new AttributeException("El formato del correo electrónico es inválido.");
        }
    }

    private void validateUuid(String uuid, String email) throws AttributeException {
        if (!uuid.matches("^[A-Za-z0-9+_.-]+$") && uuid.equals(usersRepository.findByemail(email).get().getUuid())) {
            throw new AttributeException("El Uuid solo puede contener números o el Uuid ya Existe");
        }
    }


    public Boolean getUserByUuid(String uuid) {
        return usersRepository.existsByUuid(uuid);

    }

    public Set<User> getUsersByUuid(String uuid) {
        Set<User> listUser = usersRepository.getUsersByUuid(uuid);
        return listUser;

    }



    @Transactional
    public void setProfilePicture(Long id, ProfilePicture pictureData) {
        User user = getUserById(id);

        if (user == null) {
            throw new NoSuchElementException("User with ID " + id + " not found");
        }
        user.setProfilePicture(pictureData);
        usersRepository.save(user);
    }
}

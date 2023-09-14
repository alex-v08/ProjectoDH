package com.oceanwinds.user.controller;


import Global.dto.MessageDto;
import Global.exceptions.AttributeException;
import com.oceanwinds.pictures.entity.ProfilePicture;
import com.oceanwinds.user.entity.User;
import com.oceanwinds.user.entity.UserEnum;
import com.oceanwinds.user.entity.dto.UserDto;
import com.oceanwinds.user.entity.dto.UserDtoFirebase;
import com.oceanwinds.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")

public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping("/all")
    public ResponseEntity<List<User>> getAll() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/uid/{uuid}")
    public ResponseEntity<Boolean> getByUuid(@PathVariable String uuid) {
        return ResponseEntity.ok(userService.getUserByUuid(uuid));
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getId(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }


    @PostMapping("/createfb")
    public ResponseEntity<MessageDto> savefb(@RequestBody UserDtoFirebase dto) {
        try {
            User user = userService.saveUserFirebase(dto);
            String message = "Usuario creado con Nombre: " + user.getName();
            return ResponseEntity.ok(new MessageDto(HttpStatus.OK, message));
        } catch (AttributeException e) {
            String errorMessage = "Error al crear el usuario: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageDto(HttpStatus.BAD_REQUEST, errorMessage));
        }
    }

    @PatchMapping("/update/role/{id}")
    public ResponseEntity<MessageDto> updateRole(@PathVariable("id")Long id, @Valid @RequestBody UserEnum role) throws AttributeException {
        userService.changeRole(id, role);
        String message = "User updated with role: " + role;
        return ResponseEntity.ok(new MessageDto(HttpStatus.OK, message));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<MessageDto> update(@PathVariable("id")Long id,@Valid @RequestBody UserDto dto) throws AttributeException {
        User user = userService.updateUser(dto, id);
        String message = "User updated with name: " + user.getName();
        return ResponseEntity.ok(new MessageDto(HttpStatus.OK, message));
    }

    @PatchMapping("/delete/{id}")
    public ResponseEntity<MessageDto> delete(@PathVariable Long id) {
        userService.deleteUser(id);
        String message = "User deleted with id: " + id;
        return ResponseEntity.ok(new MessageDto(HttpStatus.OK, message));
    }

    @GetMapping("/list/{uuid}")
    public Set<User> listByUuid(String uuid){
          return userService.getUsersByUuid(uuid);
    }

    @PatchMapping("/profile/{id}")
    public ResponseEntity<HttpStatus> setProfilePicture(@PathVariable Long id, ProfilePicture ProfilePicture){
        userService.setProfilePicture(id,ProfilePicture);
        return ResponseEntity.ok(HttpStatus.OK);
    }

}

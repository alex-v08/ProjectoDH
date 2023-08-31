package com.oceanwinds.user.controller;


import Global.dto.MessageDto;
import Global.exceptions.AttributeException;
import com.oceanwinds.product.entity.Product;
import com.oceanwinds.user.entity.User;
import com.oceanwinds.user.entity.dto.UserDto;
import com.oceanwinds.user.service.UserService;
import jakarta.validation.Valid;
import org.hibernate.mapping.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST,RequestMethod.PUT,RequestMethod.DELETE})

public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/all")
    public ResponseEntity<List<User>> getAll() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("uid/{uuid}")
    public ResponseEntity<Boolean> getByUuid(@PathVariable String uuid) {
        return ResponseEntity.ok(userService.getUserByUuid(uuid));
    }
    public ResponseEntity<List<User>> getall() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
    @GetMapping("/{id}")
    public ResponseEntity<User> getId(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PostMapping("/create")
    public ResponseEntity<MessageDto> save(@Valid @RequestBody UserDto dto) {
        try {
            User user = userService.saveUser(dto);
            String message = "Usuario creado con Nombre: " + user.getName();
            return ResponseEntity.ok(new MessageDto(HttpStatus.OK, message));
        } catch (AttributeException e) {
            String errorMessage = "Error al crear el usuario: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageDto(HttpStatus.BAD_REQUEST, errorMessage));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<MessageDto> update(@PathVariable("id")Long id,@Valid @RequestBody UserDto dto) throws AttributeException {
        User user = userService.updateUser(dto, id);
        String message = "User updated with name: " + user.getName();
        return ResponseEntity.ok(new MessageDto(HttpStatus.OK, message));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageDto> delete(@PathVariable Long id) {
        userService.deleteUser(id);
        String message = "User deleted with id: " + id;
        return ResponseEntity.ok(new MessageDto(HttpStatus.OK, message));
    }






}

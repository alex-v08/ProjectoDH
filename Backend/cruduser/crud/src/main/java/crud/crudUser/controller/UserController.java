package crud.crudUser.controller;

import crud.crudUser.dto.UserDto;
import crud.crudUser.service.UserService;
import crud.crudUser.entity.User;


import crud.global.dto.MessageDto;
import crud.global.exceptions.AttributeException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/all")
  public ResponseEntity<List<User>> getall() {
    return ResponseEntity.ok(userService.getAllUsers());
  }
    @GetMapping("/{id}")
    public ResponseEntity<User> getId(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PostMapping("/new")
    public ResponseEntity<MessageDto> save(@Valid @RequestBody UserDto dto) throws AttributeException {
        User user = userService.saveUser(dto);
        String message = "User created with Name: " + user.getName();

        return ResponseEntity.ok(new MessageDto(HttpStatus.OK, message));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MessageDto> update(@PathVariable("id")Long id,@Valid @RequestBody UserDto dto) throws AttributeException {
        User user = userService.updateUser(dto, id);
        String message = "User updated with id: " + user.getName();
        return ResponseEntity.ok(new MessageDto(HttpStatus.OK, message));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageDto> delete(@PathVariable Long id) {
        userService.deleteUser(id);
        String message = "User deleted with id: " + id;
        return ResponseEntity.ok(new MessageDto(HttpStatus.OK, message));
    }

}
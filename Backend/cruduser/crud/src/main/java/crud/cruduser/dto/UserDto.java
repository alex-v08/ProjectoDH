package crud.cruduser.dto;

import jakarta.validation.constraints.NotBlank;

public class UserDto {

    @NotBlank(message = "Name is mandatory")
    private String name;

    private String lastName;

    @NotBlank(message = "Email is mandatory")
    private String email;

    private String password;
    private String phone;

    private String address;

    public UserDto(String name) {

        this.name = name;
    }

    public UserDto(String name, String lastName, String email, String password, String phone, String address) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.address = address;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

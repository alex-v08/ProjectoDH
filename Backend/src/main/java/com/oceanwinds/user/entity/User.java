package com.oceanwinds.user.entity;



import com.fasterxml.jackson.annotation.JsonIgnore;
import com.oceanwinds.product.entity.Product;
import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@Entity

@Table(name = "USERS")

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)

    private Long id;
    @Column(nullable = false)
    private String name;
    private String lastName;
    @Column(nullable = false, unique = true)
    private String email;
    private String dni;

    private String phone;
    private String address;

    private UserEnum role= UserEnum.USER_DEFAULT;
    private String uuid;
    private Boolean active;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "favorites",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private Set<Product> favoriteProducts = new HashSet<>();

    public String getName() {
        return name;
    }

    public Long getId() {
        return id;
    }

    public User() {
    }

    public void setName(String name) {
        this.name = name;
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

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
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

    public UserEnum getRole() {
        return role;
    }

    public void setRole(UserEnum role) {
        this.role = role;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Set<Product> getFavoriteProducts() {
        return favoriteProducts;
    }

    public void setFavoriteProducts(Set<Product> favoriteProducts) {
        this.favoriteProducts = favoriteProducts;
    }

    public User(String name, String lastName, String email, String uuid, Boolean active) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.uuid = uuid;
        this.active = active;
    }


}


package com.oceanwinds.user.entity;



import com.fasterxml.jackson.annotation.JsonIgnore;
import com.oceanwinds.pictures.entity.PictureData;
import com.oceanwinds.pictures.entity.ProfilePicture;
import com.oceanwinds.product.entity.Product;
import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "USERS")
@AllArgsConstructor
@NoArgsConstructor
@Getter@Setter
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

    @Column(nullable = false, unique = true)
    private String uuid;

    private Boolean deleted = false;

    private Boolean enabled = true;

    @OneToOne(cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "profilePicture_id", referencedColumnName = "id")
    private ProfilePicture profilePicture;



    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(
            name = "favorites",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private Set<Product> favoriteProducts = new HashSet<>();


}


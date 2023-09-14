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
@Getter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @Column(nullable = false)@Setter
    private String name;
    @Setter
    private String lastName;
    @Column(nullable = false, unique = true)@Setter
    private String email;
    @Setter
    private String dni;
    @Setter
    private String phone;
    @Setter
    private String address;
    @Setter
    private UserEnum role= UserEnum.USER_DEFAULT;
    @Setter
    @Column(nullable = false, unique = true)
    private String uuid;
    @Setter
    private Boolean deleted = false;
    @Setter
    private Boolean enabled = true;
    @Setter
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


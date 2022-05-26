package hotels.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    private String fullname;

    @NotBlank
    private String address;

    @NotBlank
    private String tel;

    @NotBlank
    private String username;

    @NotBlank
    private String password;

//    @NotBlank
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Booking> listBooking;
    public static enum Role {
        ADMIN, CUSTOMER
    }
}

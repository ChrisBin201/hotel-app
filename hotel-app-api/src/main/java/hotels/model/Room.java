package hotels.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private long id;

    @NotBlank
    private String name;
    @Enumerated(EnumType.STRING)
    private Type type;

    private String image;

    private double price;

    @NotBlank
    private String description;
//    @JsonManagedReference
    @OneToMany(mappedBy = "room",cascade = CascadeType.ALL,orphanRemoval = true,fetch = FetchType.LAZY)
    private List<BookedRoom> listBookedRoom  ;
    public static enum Type {
        SINGLE, DOUBLE, VIP, FAMILY
    }


}

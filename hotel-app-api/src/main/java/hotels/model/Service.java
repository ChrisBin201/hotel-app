package hotels.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
@Entity
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotBlank
    private String name;

    @OneToMany(mappedBy = "service",cascade = CascadeType.ALL,orphanRemoval = true,fetch = FetchType.LAZY)
    private List<UsedService> listUsedService  ;

    private double price;

    private String description ;
}

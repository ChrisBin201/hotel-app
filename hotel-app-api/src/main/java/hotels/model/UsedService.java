package hotels.model;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Data
@Entity
public class UsedService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "serviceId")
//    @OnDelete(action = OnDeleteAction.CASCADE)
    private Service service;

    private double price;

    private long quantity;

    public double getTotalAmount(){
        return price*quantity;
    }
}

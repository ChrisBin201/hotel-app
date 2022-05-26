package hotels.model;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private LocalDate bookingDate ;

    private String note;

    @ManyToOne()
    @JoinColumn(name = "userId")
    private User user;

    @OneToMany(mappedBy = "booking",targetEntity = BookedRoom.class,cascade = CascadeType.ALL,orphanRemoval = true)
    private List<BookedRoom> listBookedRoom;

    public double getTotalAmount(){
        double total=0;
        for(BookedRoom x: listBookedRoom)
            total+= x.getTotalAmount();
        return total;
    }

    public void addBookedRoom(BookedRoom br){
        listBookedRoom.add(br);
    }

    public void removeBookedRoom(BookedRoom br){
        listBookedRoom.remove(br);
    }
}

package hotels.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
public class BookedRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private LocalDate checkin;

    private LocalDate checkout;

    private double price;

    private boolean isCheckin;

//    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "roomId")
    private Room room;
    @ManyToOne
    @JoinColumn(name = "bookingId")
    private Booking booking;


    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "bookedRoomId")

    private List<UsedService> listUsedServices;

    public void setIsCheckin(boolean isCheckin){
        this.isCheckin =isCheckin;
    }

    public double getTotalAmount(){
        double totalService=0;
        for(UsedService x: listUsedServices)
            totalService+=x.getTotalAmount();
        return price + totalService;
    }

    public void addUsedService(UsedService us){
        listUsedServices.add(us);
    }

    public void removeUsedService(UsedService us){
        listUsedServices.remove(us);
    }
}

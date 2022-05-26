package hotels.dto.requestDto;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import hotels.model.BookedRoom;
import hotels.model.Room;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;
@Data
public class RoomRequestDto {
//    private long id;
    private String name;
//    @Enumerated(EnumType.STRING)
    private Room.Type type;
//    private String image;
    private double price;
    private String description;

}

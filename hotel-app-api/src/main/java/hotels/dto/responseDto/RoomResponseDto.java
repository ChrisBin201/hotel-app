package hotels.dto.responseDto;

import hotels.model.Room;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
@Data
public class RoomResponseDto {
    private long id;
    private String name;
//    @Enumerated(EnumType.STRING)
    private Room.Type type;
    private String image;
    private double price;
    private String description;
    private List<Long> listBookedRoomId ;

}

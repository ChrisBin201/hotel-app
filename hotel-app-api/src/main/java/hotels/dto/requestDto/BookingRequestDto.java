package hotels.dto.requestDto;

import hotels.model.BookedRoom;
import hotels.model.User;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
@Data
public class BookingRequestDto {

    private long id;
    private String bookingDateStr ;
    private String checkin,checkout;
    private String note;
    private long userId;
    private List<BookedRoomRequestDto> listBookedRoom;
}

package hotels.dto.responseDto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
@Data
public class BookingResponseDto {

    private long id;
    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "dd/MM/yyyy" )
    private LocalDate bookingDate ;
    private String note;
    private String fullName;
    private List<BookedRoomResponseDto> listBookedRoom;
}

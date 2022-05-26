package hotels.dto.requestDto;

import lombok.Data;

import java.util.Date;
import java.util.List;
@Data
public class BookedRoomRequestDto {

//    private long id;
//    private Date checkin;
//    private Date checkout;
//    private double price;
    private boolean isCheckin;
    private long roomId;
    private List<UsedServiceRequestDto> listUsedService;
}

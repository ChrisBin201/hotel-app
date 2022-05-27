package hotels.dto.responseDto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
@Data
public class BookedRoomResponseDto {

    private long id;
    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "dd/MM/yyyy" )
    private LocalDate checkin;
    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "dd/MM/yyyy" )
    private LocalDate checkout;
    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "dd/MM/yyyy" )
    private LocalDate bookingDate;
    private double price;
    private boolean isCheckin;
    private RoomResponseDto room;
    private String customerName;
    private List<UsedServiceResponseDto> listUsedService;

    public void setIsCheckin(boolean isCheckin){
        this.isCheckin = isCheckin;
    }
}

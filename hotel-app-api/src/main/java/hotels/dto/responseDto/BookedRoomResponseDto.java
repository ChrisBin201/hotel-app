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
    private double price;
    private boolean isCheckin;
    private String roomName;
    private String customerName;
    private List<UsedServiceResponseDto> listUsedService;

    public void setIsCheckin(boolean isCheckin){
        this.isCheckin = isCheckin;
    }
}

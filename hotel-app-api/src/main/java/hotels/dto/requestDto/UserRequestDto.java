package hotels.dto.requestDto;

import hotels.model.Booking;
import hotels.model.User;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;
@Data
public class UserRequestDto {

//    private long id;
    private String fullname;
    private String address;
    private String tel;
    private String username;
    private String password;
//    @Enumerated(EnumType.STRING)
    private User.Role role;
//    private List<Long> listBookingId;
}

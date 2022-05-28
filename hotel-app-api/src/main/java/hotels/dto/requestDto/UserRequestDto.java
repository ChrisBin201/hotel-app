package hotels.dto.requestDto;

import hotels.model.Booking;
import hotels.model.User;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.List;
@Data
public class UserRequestDto {

//    private long id;
    @NotBlank
    private String fullname;
    @NotBlank
    private String address;

    @NotBlank
    @Pattern(regexp="^$|[0-9]{10}")
    private String tel;

    @NotBlank
    private String username;
//    @Enumerated(EnumType.STRING)
    private User.Role role;
//    private List<Long> listBookingId;
}

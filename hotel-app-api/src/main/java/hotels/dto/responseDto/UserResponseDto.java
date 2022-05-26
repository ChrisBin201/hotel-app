package hotels.dto.responseDto;

import hotels.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
@Data
public class UserResponseDto {

    private long id;
    private String fullname;
    private String address;
    private String tel;
    private String username;
//    private String password;
//    @Enumerated(EnumType.STRING)
    private User.Role role;
//    private List<Long> listBookingName;
//    private String token;
}

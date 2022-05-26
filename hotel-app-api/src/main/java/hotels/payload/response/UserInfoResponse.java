package hotels.payload.response;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
@Data
@AllArgsConstructor
public class UserInfoResponse {
    private Long id;
    private String username;
    private String fullname;
    private String address;
    private String tel;
    private String token;
    private String role;
}

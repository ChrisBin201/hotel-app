package hotels.payload.request;

import hotels.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.annotations.Type;

import java.util.Set;

import javax.validation.constraints.*;
@Data
@AllArgsConstructor
public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String fullname;

    @NotBlank
    private String address;

    @NotBlank
    @Pattern(regexp="^$|[0-9]{10}")
    private String tel;

    @NotBlank
    @Size(min = 3, max = 20)
    private String username;
//    @NotBlank
    private User.Role role;

    @NotBlank
//    @Size(min = 6, max = 40)
    private String password;


}

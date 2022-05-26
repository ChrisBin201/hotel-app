package hotels.service;

import hotels.dto.responseDto.ServiceResponseDto;
import hotels.dto.responseDto.UserResponseDto;

import java.util.List;

public interface UserService {
    public UserResponseDto getUserInfo(String username);
    public  List<UserResponseDto> getAllCustomers();
    public UserResponseDto deleteUser(Long id);
}

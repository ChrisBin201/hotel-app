package hotels.service;

import hotels.dto.mapper;
import hotels.dto.responseDto.ServiceResponseDto;
import hotels.dto.responseDto.UserResponseDto;
import hotels.model.User;
import hotels.repository.UserRepository;
import hotels.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;


    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }


    @Override
    public UserResponseDto getUserInfo(String username) {
       User u = userRepository.findByUsername(username).get();
        return mapper.userToUserResponseDto(u);
    }

    @Override
    public List<UserResponseDto> getAllCustomers() {
        List<User> listUser = StreamSupport
                .stream(userRepository.findAll().spliterator(), false)
                .collect(Collectors.toCollection(ArrayList::new));
        List<UserResponseDto> list = listUser.stream()
                .filter(u -> u.getRole()== User.Role.CUSTOMER)
                .map(u -> mapper.userToUserResponseDto(u))
                .collect(Collectors.toCollection(ArrayList::new));
        return list;
    }

    @Override
    public UserResponseDto deleteUser(Long id) {
        User u = userRepository.findById(id).get();
        userRepository.delete(u);
        return mapper.userToUserResponseDto(u);
    }
}

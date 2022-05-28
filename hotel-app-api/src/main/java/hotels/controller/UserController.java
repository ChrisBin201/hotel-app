package hotels.controller;

import hotels.dto.requestDto.ServiceRequestDto;
import hotels.dto.requestDto.UserRequestDto;
import hotels.dto.responseDto.ServiceResponseDto;
import hotels.dto.responseDto.UserResponseDto;
import hotels.security.jwt.JwtUtils;
import hotels.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/users",produces = "application/json")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;
    private JwtUtils jwtUtils;
    @Autowired
    UserController(UserService userService,JwtUtils jwtUtils){
        this.userService = userService;
        this.jwtUtils = jwtUtils;
    }
    @GetMapping("/user")
    public ResponseEntity<UserResponseDto> getUserInfo(HttpServletRequest request){
        String token = jwtUtils.getJwtFromCookies(request);
        String username = jwtUtils.getUserNameFromJwtToken(token);
        UserResponseDto userResponseDto = userService.getUserInfo(username);
        return new ResponseEntity<>(userResponseDto, HttpStatus.OK);
    }
    @GetMapping("/customers")
    public ResponseEntity<List<UserResponseDto>> listCustomer(){
        List<UserResponseDto> listUser = userService.getAllCustomers();
        return new ResponseEntity<>(listUser, HttpStatus.OK);
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<UserResponseDto> deleteUser(@PathVariable final Long id){
        UserResponseDto userResponseDto = userService.deleteUser(id);
        return new ResponseEntity<>(userResponseDto,HttpStatus.OK);
    }
    @PutMapping("/editUser/{id}")
    public ResponseEntity<UserResponseDto> editUser(@PathVariable final Long id ,@Valid @RequestBody final UserRequestDto userRequestDto){
        UserResponseDto userResponseDto = userService.editUser(id,userRequestDto);
        return new ResponseEntity<>(userResponseDto,HttpStatus.OK);
    }
}

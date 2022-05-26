package hotels.controller;

import hotels.dto.mapper;
import hotels.dto.requestDto.RoomRequestDto;
import hotels.dto.responseDto.RoomResponseDto;
import hotels.model.BookedRoom;
import hotels.model.Room;
import hotels.repository.RoomRepository;
import hotels.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping(path = "/rooms",produces = "application/json")
@CrossOrigin(origins = "*")
public class RoomController {
//    private final RoomRepository roomRepo;

    private final RoomService roomService;

    @Autowired
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
//        this.roomRepo = roomRepo;
    }


    @GetMapping()
    public ResponseEntity<List<RoomResponseDto>> listRoom() {
        List<RoomResponseDto> listRoom = roomService.getAllRooms();
//        String ct = new ClassPathResource("static/images/").getFile().getPath();
//        System.out.println(ct);
        return new ResponseEntity<>(listRoom,HttpStatus.OK);
    }

    @PutMapping(value ="editRoom/{id}",consumes = "multipart/form-data")
    public ResponseEntity<RoomResponseDto> edtRoom(@PathVariable final Long id ,final RoomRequestDto roomRequestDto,@RequestParam(value = "img",required = false)  MultipartFile img) throws IOException {
        RoomResponseDto roomResponseDto = roomService.editRoom(id,roomRequestDto,img);

        return new ResponseEntity<>(roomResponseDto,HttpStatus.OK);
    }
    @DeleteMapping("/deleteRoom/{id}")
    public ResponseEntity<RoomResponseDto> deleteRoom(@PathVariable final Long id) throws IOException {
        RoomResponseDto roomResponseDto = roomService.deleteRoom(id);
        return new ResponseEntity<>(roomResponseDto,HttpStatus.OK);
    }
    @PostMapping (value = "/addRoom",consumes = "multipart/form-data")
    public ResponseEntity<RoomResponseDto> addRoom(final RoomRequestDto roomRequestDto,@RequestParam(value = "image",required = false) final MultipartFile img) throws IOException {
        RoomResponseDto roomResponseDto = roomService.addRoom(roomRequestDto,img);
        System.out.println(img);
        return new ResponseEntity<>(roomResponseDto, HttpStatus.OK);
    }

    @GetMapping("/freeRooms")
    public ResponseEntity<List<RoomResponseDto>> listRooms(@RequestParam("ci") final String  checkin,@RequestParam("co") final String checkout) throws ParseException {

//        Date ci = new SimpleDateFormat("dd/MM/yyyy").parse(checkin);
//        Date co = new SimpleDateFormat("dd/MM/yyyy").parse(checkout);
        LocalDate ci = LocalDate.parse(checkin, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        LocalDate co = LocalDate.parse(checkout, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        List<RoomResponseDto> listFreeRoom = roomService.getFreeRooms(ci,co);

        return new ResponseEntity<>(listFreeRoom, HttpStatus.OK);
    }

    @GetMapping("/types")
    public ResponseEntity<List<String>> listType(){
        List<String> list = roomService.getTypesRoom();
        return new ResponseEntity<>(list,HttpStatus.OK);
    }
}

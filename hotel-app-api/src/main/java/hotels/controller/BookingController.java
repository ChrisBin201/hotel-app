package hotels.controller;

import hotels.dto.requestDto.BookingRequestDto;
import hotels.dto.requestDto.RoomRequestDto;
import hotels.dto.responseDto.BookedRoomResponseDto;
import hotels.dto.responseDto.BookingResponseDto;
import hotels.dto.responseDto.RoomResponseDto;
import hotels.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(path = "/booking",produces = "application/json")
@CrossOrigin(origins = "*")
public class BookingController {
    private final BookingService bookingService;
    @Autowired
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping
    public ResponseEntity<List<BookingResponseDto>> getAllBookings(){
        List<BookingResponseDto> listBooking = bookingService.getAllBookings();
        return new ResponseEntity<>(listBooking,HttpStatus.OK);
    }
    @GetMapping("/room/{id}")
    public ResponseEntity<List<BookedRoomResponseDto>> getAllBookings(@PathVariable final  Long id){
        List<BookedRoomResponseDto> listBooking = bookingService.getBookingByRoom(id);
        return new ResponseEntity<>(listBooking,HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<List<BookingResponseDto>> getBookingsByCustomer(@PathVariable final Long id ){
        List<BookingResponseDto> listBooking = bookingService.getBookingsByUser(id);
        return new ResponseEntity<>(listBooking,HttpStatus.OK);
    }

    @PostMapping("/addBooking")
    public ResponseEntity<BookingResponseDto> booking(@RequestBody final BookingRequestDto bookingRequestDto) throws ParseException {
        BookingResponseDto bookingResponseDto = bookingService.addBooking(bookingRequestDto);
        return new ResponseEntity<>(bookingResponseDto, HttpStatus.OK);
    }

    @PostMapping("/editBooking/{id}")
    public ResponseEntity<BookingResponseDto> editBooking(@PathVariable final Long id ,@RequestBody final BookingRequestDto bookingRequestDto){
        BookingResponseDto bookingResponseDto = bookingService.editBooking(id,bookingRequestDto);
        return new ResponseEntity<>(bookingResponseDto,HttpStatus.OK);
    }

    @DeleteMapping("/deleteBooking/{id}")
    public ResponseEntity<BookingResponseDto> deleteBooking(@PathVariable final Long id){
        BookingResponseDto bookingResponseDto = bookingService.deleteBooking(id);
        return new ResponseEntity<>(bookingResponseDto,HttpStatus.OK);
    }

}

package hotels.service;

import hotels.dto.requestDto.BookingRequestDto;
import hotels.dto.responseDto.BookedRoomResponseDto;
import hotels.dto.responseDto.BookingResponseDto;

import javax.xml.crypto.Data;
import java.text.ParseException;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface BookingService {
    public BookingResponseDto addBooking(BookingRequestDto bookingRequestDto) throws ParseException;
//    public List<BookingResponseDto> getListBookingByDates(Date ci, Date co) throws  ParseException;
    public BookingResponseDto editBooking(Long id, BookingRequestDto bookingRequestDto);
    public BookingResponseDto deleteBooking(Long id);
    public List<BookingResponseDto> getAllBookings();
    public List<BookingResponseDto> getBookingsByUser(Long userId);
    public List<BookedRoomResponseDto> getBookingByRoom(Long roomId);
//    public List<BookedRoomResponseDto>

}

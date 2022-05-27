package hotels.service;

import hotels.dto.mapper;
import hotels.dto.requestDto.BookingRequestDto;
import hotels.dto.responseDto.BookedRoomResponseDto;
import hotels.dto.responseDto.BookingResponseDto;
import hotels.model.*;
import hotels.repository.*;
import org.springframework.stereotype.Service;


import javax.servlet.ServletContext;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class BookingServiceImpl implements BookingService{

    private final BookingRepository bookingRepository;
    private final BookedRoomRepository bookedRoomRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final ServiceRepository serviceRepository;
    private ServletContext context;


    public BookingServiceImpl(BookingRepository bookingRepository, BookedRoomRepository bookedRoomRepository, UserRepository userRepository, RoomRepository roomRepository, ServiceRepository serviceRepository, ServletContext context) {
        this.bookingRepository = bookingRepository;
        this.bookedRoomRepository = bookedRoomRepository;
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
        this.serviceRepository = serviceRepository;
        this.context = context;
    }

    @Override
    public BookingResponseDto addBooking(BookingRequestDto bookingRequestDto) throws ParseException {
        Booking booking = new Booking();
//        Date bkDate = new SimpleDateFormat("dd/MM/yyyy").parse(bookingRequestDto.getBookingDateStr());
        LocalDate bkDate = LocalDate.parse(bookingRequestDto.getBookingDateStr(),DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        booking.setBookingDate(bkDate);
        booking.setNote(bookingRequestDto.getNote());
        User user = userRepository.findById(bookingRequestDto.getUserId()).get();
        booking.setUser(user);

        LocalDate ci = LocalDate.parse(bookingRequestDto.getCheckin(),DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        LocalDate co = LocalDate.parse(bookingRequestDto.getCheckout(),DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        List<BookedRoom> listBookedRoom = new ArrayList<>();
        bookingRequestDto.getListBookedRoom().forEach(brReq->{
                BookedRoom br = new BookedRoom();
                br.setCheckin(ci);
                br.setCheckout(co);
                br.setIsCheckin(false);
                Room r =  roomRepository.findById(brReq.getRoomId()).get();
                br.setRoom(r);
                br.setBooking(booking);
                br.setPrice(r.getPrice());
                List<UsedService> listUsedService = new ArrayList<>();
                brReq.getListUsedService().forEach(usReq->{
                    UsedService us = new UsedService();
                    hotels.model.Service s = serviceRepository.findById(usReq.getServiceId()).get();
                    us.setService(s);
                    us.setPrice(s.getPrice());
                    us.setQuantity(usReq.getQuantity());

                    listUsedService.add(us);
                });
                br.setListUsedServices(listUsedService);

                listBookedRoom.add(br);
        });
        booking.setListBookedRoom(listBookedRoom);
        Booking booking1 = bookingRepository.save(booking);
        return mapper.BookingToBookingResponseDto(booking1);
    }
//    @Transactional
    @Override
    public BookingResponseDto editBooking(Long id,BookingRequestDto bookingRequestDto) {
        Booking bk  = bookingRepository.findById(id).get();
        LocalDate bkDate = LocalDate.parse(bookingRequestDto.getBookingDateStr(),DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        bk.setBookingDate(bkDate);
        bk.setNote(bookingRequestDto.getNote());

        LocalDate ci = LocalDate.parse(bookingRequestDto.getCheckin(),DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        LocalDate co = LocalDate.parse(bookingRequestDto.getCheckout(),DateTimeFormatter.ofPattern("dd/MM/yyyy"));

        List<BookedRoom> listBookedRoom = bk.getListBookedRoom();
        listBookedRoom.stream().forEach(br ->{
            br.getListUsedServices().clear();
        });
        listBookedRoom.clear();

        bookingRequestDto.getListBookedRoom().forEach(brReq->{
            BookedRoom br = new BookedRoom();
            br.setCheckin(ci);
            br.setCheckout(co);
            Room r =  roomRepository.findById(brReq.getRoomId()).get();
            br.setRoom(r);
            br.setPrice(r.getPrice());

            List<UsedService> listUsedService = new ArrayList<>();
            brReq.getListUsedService().forEach(usReq->{
                UsedService us = new UsedService();
                hotels.model.Service s = serviceRepository.findById(usReq.getServiceId()).get();
                us.setService(s);
                us.setPrice(s.getPrice());
                us.setQuantity(usReq.getQuantity());

                listUsedService.add(us);
            });
            br.setListUsedServices(listUsedService);

            listBookedRoom.add(br);
        });
//        bk.setListBookedRoom(listBookedRoom);
        Booking bk1 = bookingRepository.save(bk);
        return mapper.BookingToBookingResponseDto(bk1);
    }

    @Override
    public BookingResponseDto deleteBooking(Long id) {
        Booking bk = bookingRepository.findById(id).get();
        bookingRepository.delete(bk);
        return mapper.BookingToBookingResponseDto(bk);
    }

    @Override
    public List<BookingResponseDto> getAllBookings() {
        List<Booking> listBooking = StreamSupport
                .stream(bookingRepository.findAll().spliterator(), false)
                .collect(Collectors.toCollection(ArrayList::new));
        List<BookingResponseDto> list = listBooking.stream()
                .map(bk -> mapper.BookingToBookingResponseDto(bk))
                .collect(Collectors.toCollection(ArrayList::new));
        return list;
    }

    @Override
    public List<BookingResponseDto> getBookingsByUser(Long userId) {
        List<Booking> listBooking = StreamSupport
                .stream(bookingRepository.findByUserId(userId).spliterator(), false)
                .collect(Collectors.toCollection(ArrayList::new));
        List<BookingResponseDto> list = listBooking.stream()
                .map(bk -> mapper.BookingToBookingResponseDto(bk))
                .collect(Collectors.toCollection(ArrayList::new));
        for(BookingResponseDto bk:list){
            for(BookedRoomResponseDto br:bk.getListBookedRoom()){
                if(br.getRoom().getImage()==null)
                    br.getRoom().setImage("http://localhost:8080"+context.getContextPath()+"/images/"+"defaultRoom.jpg");
            }
        }
        return list;
    }

    @Override
    public List<BookedRoomResponseDto> getBookingByRoom(Long roomId) {
        List<BookedRoom> listBookedRoom = StreamSupport
                .stream(bookedRoomRepository.findByRoomId(roomId).spliterator(), false)
                .collect(Collectors.toCollection(ArrayList::new));
//        for(BookedRoom br : listBookedRoom) {
//            System.out.println("brId: " + br.getId());
//            System.out.println(br.getBooking().getId());
//        }
        List<BookedRoomResponseDto> list = listBookedRoom.stream()
                .map(br -> mapper.BrToBookedRoomResponseDto(br))
                .collect(Collectors.toCollection(ArrayList::new));
        return list;
    }

}

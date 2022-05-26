package hotels.dto;

import hotels.dto.responseDto.*;
import hotels.model.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class mapper {

    public static UserResponseDto userToUserResponseDto(User u){
        UserResponseDto userResponseDto = new UserResponseDto();
        userResponseDto.setId(u.getId());
        userResponseDto.setFullname(u.getFullname());
        userResponseDto.setAddress(u.getAddress());
        userResponseDto.setUsername(u.getUsername());
        userResponseDto.setTel(u.getTel());
        userResponseDto.setRole(u.getRole());
        return userResponseDto;
    }
    public static RoomResponseDto roomToRoomResponseDto(Room room){
        RoomResponseDto roomResponseDto = new RoomResponseDto();
        roomResponseDto.setId(room.getId());
        roomResponseDto.setName(room.getName());
        roomResponseDto.setPrice(room.getPrice());
        roomResponseDto.setDescription(room.getDescription());
        roomResponseDto.setType(room.getType());
        roomResponseDto.setImage(room.getImage());
        if(!room.getListBookedRoom().isEmpty())
        roomResponseDto.setListBookedRoomId(room.getListBookedRoom().stream()
                .map(br -> br.getId()).collect(Collectors.toCollection(ArrayList::new)));
        return roomResponseDto;
    }

    public static List<RoomResponseDto> listRoomToListRoomResponseDto(List<Room> rooms) {
        List<RoomResponseDto> listRoomResponseDto = new ArrayList<>();
        for (Room r: rooms) {
            listRoomResponseDto.add(roomToRoomResponseDto(r));
        }
        return listRoomResponseDto;
    }

    public static BookingResponseDto BookingToBookingResponseDto(Booking bk){
        BookingResponseDto bookingResponseDto = new BookingResponseDto();
        bookingResponseDto.setBookingDate(bk.getBookingDate());
        bookingResponseDto.setId(bk.getId());
        bookingResponseDto.setNote(bk.getNote());
        bookingResponseDto.setFullName(bk.getUser().getFullname());
        bookingResponseDto.setListBookedRoom(bk.getListBookedRoom().stream()
                .map(br -> BrToBookedRoomResponseDto(br)).collect(Collectors.toCollection(ArrayList::new)));
        return bookingResponseDto;
    }

    public static BookedRoomResponseDto BrToBookedRoomResponseDto(BookedRoom br){
        BookedRoomResponseDto bookedRoomResponseDto = new BookedRoomResponseDto();
        bookedRoomResponseDto.setId(br.getId());
        bookedRoomResponseDto.setRoomName(br.getRoom().getName());
        bookedRoomResponseDto.setCustomerName(br.getBooking().getUser().getFullname());
        bookedRoomResponseDto.setPrice(br.getPrice());
        bookedRoomResponseDto.setCheckin(br.getCheckin());
        bookedRoomResponseDto.setCheckout(br.getCheckout());
        bookedRoomResponseDto.setListUsedService(br.getListUsedServices()
                .stream().map(us -> UsToUsedServiceResponseDto(us)).collect(Collectors.toCollection(ArrayList::new)));
        return bookedRoomResponseDto;


    }

    public static ServiceResponseDto ServiceToServiceResponseDto(Service service){
        ServiceResponseDto serviceResponseDto = new ServiceResponseDto();
        serviceResponseDto.setId(service.getId());
        serviceResponseDto.setName(service.getName());
        serviceResponseDto.setDescription(service.getDescription());
        serviceResponseDto.setPrice(service.getPrice());
        return serviceResponseDto;
    }

    public static UsedServiceResponseDto UsToUsedServiceResponseDto(UsedService us){
        UsedServiceResponseDto usedServiceResponseDto = new UsedServiceResponseDto();
        usedServiceResponseDto.setId(us.getId());
        usedServiceResponseDto.setServiceName(us.getService().getName());
        usedServiceResponseDto.setPrice(us.getPrice());
        usedServiceResponseDto.setQuantity(us.getQuantity());
        return usedServiceResponseDto;
    }
}

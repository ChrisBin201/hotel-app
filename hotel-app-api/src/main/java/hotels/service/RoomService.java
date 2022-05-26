package hotels.service;

import hotels.dto.requestDto.RoomRequestDto;
import hotels.dto.responseDto.RoomResponseDto;
import hotels.model.Room;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface RoomService {
    public RoomResponseDto addRoom(RoomRequestDto roomRequestDto, MultipartFile img) throws IOException;
    public List<RoomResponseDto> getFreeRooms(LocalDate ci, LocalDate co);
    public List<RoomResponseDto> getAllRooms();
    public RoomResponseDto editRoom(Long roomId,RoomRequestDto roomRequestDto, MultipartFile img) throws IOException;
    public RoomResponseDto deleteRoom(Long roomId) throws IOException;
    public List<String> getTypesRoom();
}

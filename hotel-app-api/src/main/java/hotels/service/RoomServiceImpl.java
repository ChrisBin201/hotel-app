package hotels.service;

import hotels.dto.mapper;
import hotels.dto.requestDto.RoomRequestDto;
import hotels.dto.responseDto.RoomResponseDto;
import hotels.model.BookedRoom;
import hotels.model.Room;
import hotels.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class RoomServiceImpl implements RoomService{


    private final RoomRepository roomRepository;
    private ServletContext context;

    public RoomServiceImpl(RoomRepository roomRepository, ServletContext context) {
        this.roomRepository = roomRepository;
        this.context = context;
    }
    @Transactional
    @Override
    public RoomResponseDto addRoom(RoomRequestDto roomRequestDto, MultipartFile img) throws IOException {
        Room room = new Room();
        room.setName(roomRequestDto.getName());
        room.setType(roomRequestDto.getType());
        room.setPrice(roomRequestDto.getPrice());
        room.setDescription(roomRequestDto.getDescription());
        room.setListBookedRoom(new ArrayList<>());
        Room room1 = roomRepository.save(room);
        if(img!=null)
        {
            String pathDir = new ClassPathResource("static/images/").getFile().getAbsolutePath();
//        String imgName = "room"+room1.getId()+".png";
            String extension = StringUtils.getFilenameExtension(img.getOriginalFilename());
            String imgName = "room" + room1.getId() + "." + extension;
            Files.copy(img.getInputStream(), Paths.get(pathDir + File.separator + imgName), StandardCopyOption.REPLACE_EXISTING);

            System.out.println("http://localhost:8080" + context.getContextPath() + "/images/" + imgName);
//        Room room2 = roomRepository.findById(room1.getId()).get();
            room1.setImage("http://localhost:8080" + context.getContextPath() + "/images/" + imgName);
        }
        return mapper.roomToRoomResponseDto(room1)
        ;
    }

    @Override
    public List<RoomResponseDto> getFreeRooms(LocalDate ci, LocalDate co) {

        List<Room> listRoom = StreamSupport
                .stream(roomRepository.findAll().spliterator(), false)
                .collect(Collectors.toCollection(ArrayList::new));

        List<RoomResponseDto> list = new ArrayList<>();

        listRoom.stream().forEach(r ->{
            if(r.getListBookedRoom().isEmpty())
                list.add(mapper.roomToRoomResponseDto(r));
            else{
                boolean check = true;
                for(BookedRoom br: r.getListBookedRoom())
                    if(br.getCheckin().isAfter(co) || br.getCheckout().isBefore(ci))
                        continue;
                    else{
                        check = false;
                        break;
                    }
                if(check) list.add(mapper.roomToRoomResponseDto(r));
            }
        });
        for(RoomResponseDto r:list){
            if(r.getImage()==null)
                r.setImage("http://localhost:8080"+context.getContextPath()+"/images/"+"defaultRoom.jpg");
        }
        return list;
    }

    @Override
    public List<RoomResponseDto> getAllRooms() {
        List<Room> listRoom = StreamSupport
                .stream(roomRepository.findAll().spliterator(), false)
                .collect(Collectors.toCollection(ArrayList::new));
        List<RoomResponseDto> list = listRoom.stream()
                .map(r -> mapper.roomToRoomResponseDto(r))
                .collect(Collectors.toCollection(ArrayList::new));
        for(RoomResponseDto r:list){
            if(r.getImage()==null)
                r.setImage("http://localhost:8080"+context.getContextPath()+"/images/"+"defaultRoom.jpg");
            int random = LocalTime.now().getSecond();
            r.setImage(r.getImage()+"?"+random);
        }
        return list;
    }

    @Transactional
    @Override
    public RoomResponseDto editRoom(Long roomId, RoomRequestDto roomRequestDto, MultipartFile img) throws IOException {
        Room r = roomRepository.findById(roomId).get();
        r.setName(roomRequestDto.getName());
        r.setType(roomRequestDto.getType());
        r.setPrice(roomRequestDto.getPrice());
        r.setDescription(roomRequestDto.getDescription());
        if(img != null)
        {
            String pathDir = new ClassPathResource("static/images/").getFile().getAbsolutePath();
//        String imgName = "room"+room1.getId()+".png";
            String extension = StringUtils.getFilenameExtension(img.getOriginalFilename());
            String imgName = "room" + r.getId() + "." + extension;
            Files.copy(img.getInputStream(), Paths.get(pathDir + File.separator + imgName), StandardCopyOption.REPLACE_EXISTING);
            System.out.println("http://localhost:8080" + context.getContextPath() + "/images/" + imgName);
//        Room room2 = roomRepository.findById(room1.getId()).get();
            r.setImage("http://localhost:8080" + context.getContextPath() + "/images/" + imgName);
        }
        return mapper.roomToRoomResponseDto(r);

    }

    @Override
    public RoomResponseDto deleteRoom(Long roomId) throws IOException {
        Room r = roomRepository.findById(roomId).get();

        roomRepository.delete(r);
        String path = r.getImage();
        if(path != null) {
            int index = path.indexOf("images/") + 7;
            String imgName = path.substring(index);
            String pathDir = new ClassPathResource("static/images/").getFile().getAbsolutePath();
//        String imgName = "room"+room1.getId()+".png";
            Files.deleteIfExists(Paths.get(pathDir + File.separator + imgName));
            System.out.println(imgName);
        }
        return mapper.roomToRoomResponseDto(r);
    }

    @Override
    public List<String> getTypesRoom() {
       List<String> listType = new ArrayList<>();
        for (Room.Type type : Room.Type.values()) {
//            System.out.println(day);
            listType.add(type.name());
        }
        return listType;
    }

}

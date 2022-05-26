package hotels.repository;

import hotels.model.BookedRoom;
import hotels.model.Booking;
import org.springframework.data.repository.CrudRepository;

public interface BookedRoomRepository extends CrudRepository<BookedRoom,Long> {
    Iterable<BookedRoom> findByRoomId(Long roomId);
}

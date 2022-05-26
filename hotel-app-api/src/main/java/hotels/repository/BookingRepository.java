package hotels.repository;

import hotels.model.Booking;
import org.springframework.data.repository.CrudRepository;

public interface BookingRepository extends CrudRepository<Booking,Long> {
    Iterable<Booking> findByUserId(Long userId);
}

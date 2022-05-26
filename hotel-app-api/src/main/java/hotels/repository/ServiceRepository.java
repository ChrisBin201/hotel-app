package hotels.repository;

import hotels.model.Service;
import org.springframework.data.repository.CrudRepository;

public interface ServiceRepository extends CrudRepository<Service,Long> {
}

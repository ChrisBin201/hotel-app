package hotels.dto.requestDto;

import hotels.model.Service;
import lombok.Data;

import javax.persistence.*;
@Data
public class UsedServiceRequestDto {

    private long id;
    private long serviceId;
    private double price;
    private long quantity;
}

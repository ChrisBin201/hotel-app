package hotels.dto.responseDto;

import lombok.Data;

@Data
public class UsedServiceResponseDto {

    private long id;
    private String serviceName;
    private double price;
    private long quantity;
}

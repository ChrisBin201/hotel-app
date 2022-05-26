package hotels.dto.requestDto;

import lombok.Data;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;

@Data
public class ServiceRequestDto {

//    private long id;
    @NotBlank
    private String name;
    private double price;
    @NotBlank
    private String description ;
}

package hotels.service;



import hotels.dto.requestDto.ServiceRequestDto;
import hotels.dto.responseDto.ServiceResponseDto;

import java.util.List;

public interface ServiceService {
    public ServiceResponseDto addService(ServiceRequestDto serviceRequestDto);
    public List<ServiceResponseDto> getAllServices();
    public ServiceResponseDto editService(Long id, ServiceRequestDto serviceRequestDto);
    public ServiceResponseDto deleteService(Long id);

}

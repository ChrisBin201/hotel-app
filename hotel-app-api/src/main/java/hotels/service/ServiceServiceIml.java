package hotels.service;

import hotels.dto.mapper;
import hotels.dto.requestDto.ServiceRequestDto;
import hotels.dto.responseDto.ServiceResponseDto;
import hotels.repository.ServiceRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ServiceServiceIml implements ServiceService {

    private final ServiceRepository serviceRepository;

    public ServiceServiceIml(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }


    @Override
    public ServiceResponseDto addService(ServiceRequestDto serviceRequestDto) {
        hotels.model.Service service = new hotels.model.Service();
        service.setName(serviceRequestDto.getName());
        service.setDescription(serviceRequestDto.getDescription());
        service.setPrice(serviceRequestDto.getPrice());
        hotels.model.Service service1 = serviceRepository.save(service);
        return mapper.ServiceToServiceResponseDto(service1);
    }

    @Override
    public List<ServiceResponseDto> getAllServices() {
        List<hotels.model.Service> listService = StreamSupport
                .stream(serviceRepository.findAll().spliterator(), false)
                .collect(Collectors.toCollection(ArrayList::new));
        List<ServiceResponseDto> list = listService.stream()
                .map(s -> mapper.ServiceToServiceResponseDto(s))
                .collect(Collectors.toCollection(ArrayList::new));
        return list;
    }
    @Transactional
    @Override
    public ServiceResponseDto editService(Long id, ServiceRequestDto serviceRequestDto) {
        hotels.model.Service s = serviceRepository.findById(id).get();
        s.setName(serviceRequestDto.getName());
        s.setPrice(serviceRequestDto.getPrice());
        s.setDescription(serviceRequestDto.getDescription());
        return mapper.ServiceToServiceResponseDto(s);
    }

    @Override
    public ServiceResponseDto deleteService(Long id) {
        hotels.model.Service s = serviceRepository.findById(id).get();
        serviceRepository.delete(s);
        return mapper.ServiceToServiceResponseDto(s);
    }
}

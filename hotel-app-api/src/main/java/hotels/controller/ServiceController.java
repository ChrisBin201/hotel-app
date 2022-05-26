package hotels.controller;

import hotels.dto.requestDto.RoomRequestDto;
import hotels.dto.requestDto.ServiceRequestDto;
import hotels.dto.responseDto.RoomResponseDto;
import hotels.dto.responseDto.ServiceResponseDto;
import hotels.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/service",produces = "application/json")
@CrossOrigin(origins = "*")
public class ServiceController {
    private final ServiceService serviceService;
    @Autowired
    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }
    @GetMapping
    public ResponseEntity<List<ServiceResponseDto>> listService(){
        List<ServiceResponseDto> listService = serviceService.getAllServices();
        return new ResponseEntity<>(listService, HttpStatus.OK);
    }

    @PutMapping("editService/{id}")
    public ResponseEntity<ServiceResponseDto> edtService(@PathVariable final Long id ,@Valid @RequestBody final ServiceRequestDto serviceRequestDto){
        ServiceResponseDto serviceResponseDto = serviceService.editService(id,serviceRequestDto);
        return new ResponseEntity<>(serviceResponseDto,HttpStatus.OK);
    }

    @DeleteMapping("/deleteService/{id}")
    public ResponseEntity<ServiceResponseDto> deleteService(@PathVariable final Long id){
        ServiceResponseDto serviceResponseDto = serviceService.deleteService(id);
        return new ResponseEntity<>(serviceResponseDto,HttpStatus.OK);
    }

    @PostMapping ("/addService")
    public ResponseEntity<ServiceResponseDto> addService(@Valid @RequestBody final ServiceRequestDto serviceRequestDto) {
        ServiceResponseDto serviceResponseDto = serviceService.addService(serviceRequestDto);
        return new ResponseEntity<>(serviceResponseDto, HttpStatus.OK);
    }


}

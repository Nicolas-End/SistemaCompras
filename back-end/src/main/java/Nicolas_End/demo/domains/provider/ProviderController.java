package Nicolas_End.demo.domains.provider;

import Nicolas_End.demo.dtos.provider.BasicProviderInfosDTO;
import Nicolas_End.demo.infra.util.model.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/provider")
public class ProviderController {

    private final ProviderService providerService;
    public ProviderController(ProviderService providerService){
        this.providerService = providerService;
    }

    @PostMapping
    public ResponseEntity registerNewProvider(@RequestBody BasicProviderInfosDTO providerDatas){

        ApiResponse apiResponse = this.providerService.registerNewProvider(providerDatas);

        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @GetMapping
    public ResponseEntity getAllRegisteredProvider(){
        ApiResponse apiResponse = this.providerService.getAllProvider();

        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }
}

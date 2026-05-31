package Nicolas_End.demo.domains.itens;


import Nicolas_End.demo.dtos.itens.ItemNameAndPriceDTO;
import Nicolas_End.demo.infra.util.response.ApiResponse;
import Nicolas_End.demo.infra.util.response.ResponseUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/itens")
public class ItensController {

    private ItensService itensService;

    public ItensController(ItensService itensService, ResponseUtil responseUtil){
        this.itensService = itensService;

    }


    @GetMapping()
    public ResponseEntity getItens(){


        ApiResponse apiResponse = this.itensService.getAllItens();
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);


    }

    @PostMapping()
    public  ResponseEntity registerNewItem(@RequestBody ItemNameAndPriceDTO data ){
        ApiResponse apiResponse = this.itensService.registerNewItem(data);

        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }



}

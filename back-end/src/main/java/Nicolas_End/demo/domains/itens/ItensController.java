package Nicolas_End.demo.domains.itens;


import Nicolas_End.demo.dtos.itens.ItemAndProviderCnpjDTO;
import Nicolas_End.demo.dtos.itens.ItensListDTO;
import Nicolas_End.demo.infra.util.response.ApiResponse;
import Nicolas_End.demo.infra.util.response.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/itens")
public class ItensController {

    private final ItensService itensService;
    private final ResponseUtil responseUtil;

    public ItensController(ItensService itensService, ResponseUtil responseUtil){
        this.itensService = itensService;
        this.responseUtil = responseUtil;

    }


    @GetMapping()
    public ResponseEntity getItens(){


        List<ItensListDTO> itensList = this.itensService.getAllItens();
        ApiResponse apiResponse = responseUtil.sucess(itensList, "Itens Capturados com sucesso", HttpStatus.OK);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);


    }

    @PostMapping()
    public  ResponseEntity registerNewItem(@RequestBody ItemAndProviderCnpjDTO data ){
        ApiResponse apiResponse = this.itensService.registerNewItem(data);

        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }



}

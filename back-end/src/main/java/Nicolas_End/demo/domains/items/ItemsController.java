package Nicolas_End.demo.domains.items;


import Nicolas_End.demo.dtos.items.ItemAndProviderCnpjDTO;
import Nicolas_End.demo.dtos.items.ItensListDTO;
import Nicolas_End.demo.infra.util.model.response.ApiResponse;
import Nicolas_End.demo.infra.util.model.response.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/itens")
public class ItemsController {

    private final ItemsService itemsService;
    private final ResponseUtil responseUtil;

    public ItemsController(ItemsService itemsService, ResponseUtil responseUtil){
        this.itemsService = itemsService;
        this.responseUtil = responseUtil;

    }


    @GetMapping()
    public ResponseEntity getItens(){


        List<ItensListDTO> itensList = this.itemsService.getAllItens();
        ApiResponse apiResponse = responseUtil.sucess(itensList, "Itens Capturados com sucesso", HttpStatus.OK);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);


    }

    @PostMapping()
    public  ResponseEntity registerNewItem(@RequestBody ItemAndProviderCnpjDTO data ){
        ApiResponse apiResponse = this.itemsService.registerNewItem(data);

        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }



}

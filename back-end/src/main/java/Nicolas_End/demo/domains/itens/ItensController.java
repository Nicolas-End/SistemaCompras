package Nicolas_End.demo.domains.itens;


import Nicolas_End.demo.infra.util.response.ApiResponse;
import Nicolas_End.demo.infra.util.response.ResponseUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(name = "/itens")
public class ItensController {

    private ItensService itensService;
    private ResponseUtil responseUtil;

    public ItensController(ItensService itensService, ResponseUtil responseUtil){
        this.itensService = itensService;
        this.responseUtil = responseUtil;
    }


    @GetMapping()
    public ResponseEntity getItens(@PathVariable boolean all){

        if (all){
            ApiResponse apiResponse = this.itensService.getAllItens();
            return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
        }
        return ResponseEntity.ok(null);
    }

}

package Nicolas_End.demo.domains.itens;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(name = "/itens")
public class ItensController {

    private ItensService itensService;

    public ItensController(ItensService itensService){
        this.itensService = itensService;
    }


}

package Nicolas_End.demo.domains.itens;

import Nicolas_End.demo.infra.util.response.ResponseUtil;
import Nicolas_End.demo.dtos.itens.ItensListDTO;
import Nicolas_End.demo.infra.util.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class ItensService {

    final private ItensRepository itensRepository;
    final private ResponseUtil responseUtil ;

    public  ItensService(ItensRepository itensRepository, ResponseUtil responseUtil){
        this.itensRepository = itensRepository;
        this.responseUtil = responseUtil;
    }

    public <T> ApiResponse getAllItens(){
        List<ItensListDTO> itensList = this.getListItens() ;

        return responseUtil.sucess(itensList, "Itens Capturados com sucesso", HttpStatus.OK);
    }

    private List<ItensListDTO> getListItens(){
        return this.itensRepository.findAllBy();
    }
}

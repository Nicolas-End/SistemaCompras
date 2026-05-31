package Nicolas_End.demo.domains.itens;

import Nicolas_End.demo.dtos.itens.ItemNameAndPriceDTO;
import Nicolas_End.demo.infra.util.response.ResponseUtil;
import Nicolas_End.demo.dtos.itens.ItensListDTO;
import Nicolas_End.demo.infra.util.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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


    public  <T> ApiResponse registerNewItem(ItemNameAndPriceDTO datas){

        // verifica se o item ja esta cadastrado ou se não esta com valores invalidos
        ApiResponse validateItemName = this.validateItemNameAndPriceDTO(datas);
        if(!validateItemName.getSucess()){
            return validateItemName;
        }

        ItensEntity itemEntity = this.createItemEntity(datas);

        ItensEntity itemEntityRegistered = this.itensRepository.save(itemEntity);

        return responseUtil.sucess(itemEntityRegistered, "ITEM CADASTRADO COM SUCESSO", HttpStatus.OK);


    }

    private List<ItensListDTO> getListItens(){
        return this.itensRepository.findAllBy();
    }

    private ApiResponse validateItemNameAndPriceDTO(ItemNameAndPriceDTO datas){

        if (datas.itemName() == null || datas.itemPrice() == null) {
            responseUtil.error("User invalid input", "Algum dos valores enviados é invalido", HttpStatus.BAD_REQUEST);
        }
        else if (itemAlreadyRegisteredByName(datas.itemName()))
        {
            responseUtil.error("Item already registered", "Item com este nome ja registrado", HttpStatus.CONFLICT);
        }
        return  responseUtil.sucess(null,null,null);
    }

    private boolean itemAlreadyRegisteredByName(String name){
        return this.itensRepository.existsByName(name);
    }

    private  ItensEntity createItemEntity(ItemNameAndPriceDTO datas){
        return  new ItensEntity(datas.itemName(), datas.itemPrice());
    }

}

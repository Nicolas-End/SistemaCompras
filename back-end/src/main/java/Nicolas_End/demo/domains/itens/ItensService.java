package Nicolas_End.demo.domains.itens;

import Nicolas_End.demo.domains.provider.ProviderEntity;
import Nicolas_End.demo.domains.provider.ProviderService;
import Nicolas_End.demo.dtos.itens.ItemNamePriceAndProviderCNPJDTO;
import Nicolas_End.demo.dtos.itens.ItemNamePriceProviderEnityDTO;
import Nicolas_End.demo.infra.config.RedisConfigurations;
import Nicolas_End.demo.infra.util.response.ResponseUtil;
import Nicolas_End.demo.dtos.itens.ItensListDTO;
import Nicolas_End.demo.infra.util.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;

import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
public class ItensService {

    final private ItensRepository itensRepository;
    final private ResponseUtil responseUtil ;
    final private ProviderService providerService;

    public  ItensService(ItensRepository itensRepository, ResponseUtil responseUtil, ProviderService providerService){
        this.itensRepository = itensRepository;
        this.responseUtil = responseUtil;
        this.providerService = providerService;
    }

    // salva os itens no cache do sistema
    @Cacheable(value = RedisConfigurations.ITEMS_CACHE)
    public <T> List<ItensListDTO> getAllItens() {

        List<ItensListDTO> itensList = this.getListItens() ;

        return itensList;

    }


    public  <T> ApiResponse registerNewItem(ItemNamePriceAndProviderCNPJDTO datas){

        // verifica se o item ja esta cadastrado ou se não esta com valores invalidos
        ApiResponse validateItemName = this.validateItemNameAndPriceDTO(datas);
        if(!validateItemName.getSucess()){
            return validateItemName;
        }

        // cria e gerencia o dados do item para ser adicionado ao banco de dados
        Optional<ProviderEntity> providerEntity = this.searchForProviderByCnpj(datas);
        ItemNamePriceProviderEnityDTO internalItensDatasWithProviderEntity = this.setItemNamePriceProviderEnitty(datas, providerEntity);

        // cria a entidade do item a ser adicionado ao banco de dados
        ItensEntity itemEntity = this.createItemEntity(internalItensDatasWithProviderEntity);

        ItensEntity itemEntityRegistered = this.itensRepository.save(itemEntity);

        return responseUtil.sucess(itemEntityRegistered, "ITEM CADASTRADO COM SUCESSO", HttpStatus.OK);


    }





    private List<ItensListDTO> getListItens(){
        return this.itensRepository.findAllBy();
    }

    private ApiResponse validateItemNameAndPriceDTO(ItemNamePriceAndProviderCNPJDTO datas){

        if (datas.itemName() == null || datas.itemPrice() == null) {
            return responseUtil.error("User invalid input", "Algum dos valores enviados é invalido", HttpStatus.BAD_REQUEST);
        }

        else if (itemAlreadyRegisteredByName(datas.itemName()))
        {
            return responseUtil.error("Item already registered", "Item com este nome ja registrado", HttpStatus.CONFLICT);
        }

        return  responseUtil.sucess(null,null,null);
    }

    private boolean itemAlreadyRegisteredByName(String name){
        return this.itensRepository.existsByName(name);
    }

    private  ItensEntity createItemEntity(ItemNamePriceProviderEnityDTO datas){

        return  new ItensEntity(datas.name(), datas.price(), datas.providerEntity()) ;
    }





    // retorna a entidade do destibuidor
    private Optional<ProviderEntity> searchForProviderByCnpj(ItemNamePriceAndProviderCNPJDTO datas) {

        if (datas.providerCNPJ().isEmpty()){
            return Optional.empty();
        }
            return this.providerService.findProviderEntityByCnpjToItensEntity(datas.providerCNPJ().get());
    }


    private ItemNamePriceProviderEnityDTO setItemNamePriceProviderEnitty(ItemNamePriceAndProviderCNPJDTO datas, Optional<ProviderEntity> provider){
        if(provider.isEmpty()){
            return new ItemNamePriceProviderEnityDTO(datas.itemName(), datas.itemPrice(), null);
        }
        return new ItemNamePriceProviderEnityDTO(datas.itemName(),datas.itemPrice(),provider.get());

    }
}

package Nicolas_End.demo.domains.itens;

import Nicolas_End.demo.domains.provider.ProviderEntity;
import Nicolas_End.demo.domains.provider.ProviderService;
import Nicolas_End.demo.dtos.itens.ItemAndProviderCnpjDTO;
import Nicolas_End.demo.dtos.itens.ItemAndProviderEnityDTO;
import Nicolas_End.demo.infra.config.RedisConfigurations;
import Nicolas_End.demo.infra.util.response.ResponseUtil;
import Nicolas_End.demo.dtos.itens.ItensListDTO;
import Nicolas_End.demo.infra.util.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.cache.autoconfigure.CacheProperties;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;

import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

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
    public  List<ItensListDTO> getAllItens() {

        List<ItensListDTO> itensList = this.getListItens() ;

        return itensList;

    }


    @CacheEvict(value = RedisConfigurations.ITEMS_CACHE, allEntries = true)
    public  <T> ApiResponse registerNewItem(ItemAndProviderCnpjDTO item){

        // verifica se o item ja esta cadastrado ou se não esta com valores invalidos
        ApiResponse validatedItem = this.ValidateItemInfos(item);
        if(!validatedItem.getSuccess()){
            return validatedItem;
        }

        // cria e gerencia o dados do item para ser adicionado ao banco de dados
        Optional<ProviderEntity> providerEntity = this.searchForProviderByCnpj(item);

        // cria a entidade do item a ser adicionado ao banco de dados
        ItensEntity itemEntity = new ItensEntity
                .Builder(item.name(), item.price())
                .internalCode(item.code().orElse(null))
                .provider(providerEntity.orElse(null))
                .build();

        ItensEntity itemEntityRegistered = this.itensRepository.save(itemEntity);

        return responseUtil.sucess(itemEntityRegistered, "ITEM CADASTRADO COM SUCESSO", HttpStatus.OK);


    }





    private List<ItensListDTO> getListItens(){
        return this.itensRepository.findAllBy();
    }

    private ApiResponse ValidateItemInfos(ItemAndProviderCnpjDTO item){

        if (item.name() == null || item.price() == null) {
            return responseUtil.error("User invalid input", "Algum dos valores enviados é invalido", HttpStatus.BAD_REQUEST);
        }

        else if (itemAlreadyRegisteredByName(item.name()))
        {
            return responseUtil.error("Item already registered", "Item com este nome ja registrado", HttpStatus.CONFLICT);
        }

        return  responseUtil.sucess(null,null,null);
    }

    private boolean itemAlreadyRegisteredByName(String name){
        return this.itensRepository.existsByName(name);
    }





    // retorna a entidade do destibuidor
    private Optional<ProviderEntity> searchForProviderByCnpj(ItemAndProviderCnpjDTO datas) {

        if (datas.providerCNPJ().isEmpty()){
            return Optional.empty();
        }
        return this.providerService.findProviderEntityByCnpj(datas.providerCNPJ().get());
    }


    private ItemAndProviderEnityDTO createItemDTOWithProvider(ItemAndProviderCnpjDTO item, Optional<ProviderEntity> provider){
        if(provider.isEmpty()){
            return new ItemAndProviderEnityDTO(item.name(), item.price(), null);
        }
        return new ItemAndProviderEnityDTO(item.name(),item.price(),provider.get());

    }
}

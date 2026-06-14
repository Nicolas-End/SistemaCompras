package Nicolas_End.demo.domains.provider;


import Nicolas_End.demo.dtos.provider.ProviderInfosRequest;
import Nicolas_End.demo.infra.util.response.ApiResponse;
import Nicolas_End.demo.infra.util.response.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class ProviderService {

    private final ProviderRepository providerRepository;
    private final ResponseUtil responseUtil;
    public  ProviderService(ProviderRepository providerRepository, ResponseUtil responseUtil){
        this.providerRepository = providerRepository;
        this.responseUtil = responseUtil;
    }

    public Optional<ProviderEntity> findProviderEntityByCnpj(String cnpj){
        return this.providerRepository.findById(cnpj);
    }




    public ApiResponse registerNewProvider(ProviderInfosRequest providerDatas){
        Optional<ProviderEntity> findProvider = this.findProviderEntityByCnpj(providerDatas.cnpj());
        if(findProvider.isPresent()){
            return this.responseUtil.error("Provider Already registered", "Fornecedor com este cpnj já cadastrado", HttpStatus.CONFLICT);
        }

        // registra e cria um nova entidade de provedor no banco de dados
        Optional<ProviderEntity> provider = registerNewProviderEntity(createNewProviderEntity(providerDatas));

        if(provider.isPresent()){
            return  this.responseUtil.sucess(null,"Fornecedor Cadastrado com sucesso", HttpStatus.OK);
        }

        return this.responseUtil.error("Internal Error","Erro Interno no sisteam",HttpStatus.INTERNAL_SERVER_ERROR);
    }


    private ProviderEntity createNewProviderEntity(ProviderInfosRequest providerInfosRequest){
        return new ProviderEntity(providerInfosRequest.cnpj(), providerInfosRequest.name(),providerInfosRequest.telephone(),providerInfosRequest.address());
    }

    private Optional<ProviderEntity> registerNewProviderEntity(ProviderEntity provider){
        return this.providerRepository.save(provider);
    }

}

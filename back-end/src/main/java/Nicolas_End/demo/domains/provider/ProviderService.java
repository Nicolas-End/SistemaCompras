package Nicolas_End.demo.domains.provider;


import Nicolas_End.demo.dtos.provider.BasicProviderInfosDTO;
import Nicolas_End.demo.infra.util.model.response.ApiResponse;
import Nicolas_End.demo.infra.util.model.response.ResponseUtil;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
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
        return this.providerRepository.findByCnpj(cnpj);
    }




    public ApiResponse registerNewProvider(BasicProviderInfosDTO providerDatas){

        // verifica se o fornecedor esta no tamanho correto ou se ja esta cadastrado no sistema
        ApiResponse validateProviderEntity = this.providerGeneralValidate(providerDatas);
        if(!validateProviderEntity.getSuccess()){
            return validateProviderEntity;
        }

        ProviderEntity provider = new ProviderEntity.Builder(providerDatas.cnpj(),providerDatas.name())
                .telephone(providerDatas.telephone())
                .address(providerDatas.address())
                .build();
        this.registerNewProviderEntity(provider);


        return  this.responseUtil.sucess(null,"Fornecedor Cadastrado com sucesso", HttpStatus.OK);

    }


    public ApiResponse getAllProvider(){
        List<BasicProviderInfosDTO> providers = this.providerRepository.findAllBy();

        return this.responseUtil.sucess(providers, "Usuario encontrado com sucesso", HttpStatus.OK);
    }



    private void registerNewProviderEntity(ProviderEntity provider){
        this.providerRepository.save(provider);
        return;
    }






    private ApiResponse providerGeneralValidate(BasicProviderInfosDTO providerDatas){
        String telephone;
        Optional<ProviderEntity> providerDatabase = this.findProviderEntityByCnpj(providerDatas.cnpj());
        if(providerDatabase.isPresent()){
            return this.responseUtil.error("Provider Already registered", "Fornecedor com este cpnj já cadastrado", HttpStatus.CONFLICT);
        }


        // verifica se foi registrado algum telefone
        if(providerDatas.telephone() != null){
            telephone = providerDatas.telephone();
        }else{
            telephone = null;
        }


        //verifica o tamanho do CNPJ E TELEFONE
        if (!validateCpnjAndTelephoneLenght(providerDatas.cnpj(), telephone)){
            return this.responseUtil.error("Invalid Lenght format", "Tamanho enviado do telephone ou cnpj é invalido", HttpStatus.BAD_REQUEST);
        }

        return  this.responseUtil.sucess(null,null,null);


    }

    private boolean validateCpnjAndTelephoneLenght(String cnpj, String telephone){
        return (cnpj.length() == 14 && (telephone.length() == 11) || telephone == null  );
    }



}

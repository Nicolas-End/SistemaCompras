package Nicolas_End.demo.domains.provider;


import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class ProviderService {

    private final ProviderRepository providerRepository;
    public  ProviderService(ProviderRepository providerRepository){
        this.providerRepository = providerRepository;
    }

    public Optional<ProviderEntity> findProviderEntityByCnpjToItensEntity(String cpnj){
        return this.findProviderEntity(cpnj);
    }

    private Optional<ProviderEntity> findProviderEntity(String cnpj) {
        return this.providerRepository.findById(cnpj);
    }



}

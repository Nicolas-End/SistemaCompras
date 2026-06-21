package Nicolas_End.demo.domains.provider;

import Nicolas_End.demo.dtos.provider.BasicProviderInfosDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@EnableJpaRepositories
public interface ProviderRepository extends JpaRepository<ProviderEntity, UUID> {

    Optional<ProviderEntity> findByCnpj(String cnpj);


    List<BasicProviderInfosDTO> findAllBy();
}

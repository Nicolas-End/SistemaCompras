package Nicolas_End.demo.domains.provider;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.Optional;
import java.util.UUID;

@EnableJpaRepositories
public interface ProviderRepository extends JpaRepository<ProviderEntity, UUID> {

    public Optional<ProviderEntity> findByCnpj(String cnpj);

}

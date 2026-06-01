package Nicolas_End.demo.domains.provider;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface ProviderRepository extends JpaRepository<ProviderEntity, String> {




}

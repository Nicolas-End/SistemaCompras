package Nicolas_End.demo.domains.quote;

import Nicolas_End.demo.domains.provider.ProviderEntity;
import Nicolas_End.demo.domains.staff.StaffEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.UUID;

@EnableJpaRepositories
public interface QuoteRepository extends JpaRepository<QuoteEntity, UUID>{

    QuoteEntity findByRequestFor (StaffEntity staff);

    QuoteEntity findByProvider (ProviderEntity provider);
}

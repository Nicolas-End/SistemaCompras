package Nicolas_End.demo.domains.quote;

import Nicolas_End.demo.domains.provider.ProviderEntity;
import Nicolas_End.demo.domains.staff.StaffEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface QuoteRepository extends JpaRepository<QuoteEntity, UUID>{

    QuoteEntity findByRequest_for (StaffEntity staff);

    QuoteEntity findByProvider (ProviderEntity provider);
}

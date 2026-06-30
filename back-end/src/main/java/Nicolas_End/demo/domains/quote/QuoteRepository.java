package Nicolas_End.demo.domains.quote;

import Nicolas_End.demo.domains.staff.StaffEntity;
import Nicolas_End.demo.dtos.quotes.QuoteBasicInfosDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.List;
import java.util.UUID;

@EnableJpaRepositories
public interface QuoteRepository extends JpaRepository<QuoteEntity, UUID>{

    List<QuoteEntity> findAllByRequestFor(StaffEntity staffEntity);
}

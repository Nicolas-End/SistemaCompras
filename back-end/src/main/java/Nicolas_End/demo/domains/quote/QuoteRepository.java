package Nicolas_End.demo.domains.quote;

import Nicolas_End.demo.dtos.quotes.QuoteBasicInfosDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.UUID;

@EnableJpaRepositories
public interface QuoteRepository extends JpaRepository<QuoteEntity, UUID>{


}

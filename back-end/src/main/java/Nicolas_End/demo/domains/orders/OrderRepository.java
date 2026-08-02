package Nicolas_End.demo.domains.orders;

import Nicolas_End.demo.domains.quote.QuoteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.Optional;
import java.util.UUID;

@EnableJpaRepositories
public interface OrderRepository extends JpaRepository<OrderEntity, UUID> {

    boolean existsByQuoteId(QuoteEntity quoteEntity);
}

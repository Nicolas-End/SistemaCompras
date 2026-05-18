package Nicolas_End.demo.domains.itens;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.UUID;

@EnableJpaRepositories
public interface ItensRepository extends JpaRepository<ItensEntity, UUID> {

    ItensEntity findByName(String name);
}

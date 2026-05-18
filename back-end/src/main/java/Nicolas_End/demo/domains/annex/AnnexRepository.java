package Nicolas_End.demo.domains.annex;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.UUID;

@EnableJpaRepositories
public interface AnnexRepository extends JpaRepository<AnnexEntity, UUID> {
}

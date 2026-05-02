package Nicolas_End.demo.domains.annex;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AnnexRepository extends JpaRepository<AnnexEntity, UUID> {
}

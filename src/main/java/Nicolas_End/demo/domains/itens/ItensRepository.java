package Nicolas_End.demo.domains.itens;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ItensRepository extends JpaRepository<UUID, ItensEntity> {

    ItensEntity findByName(String name);
}

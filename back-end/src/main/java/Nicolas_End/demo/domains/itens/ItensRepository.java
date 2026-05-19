package Nicolas_End.demo.domains.itens;

import Nicolas_End.demo.dtos.itens.ItensListDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.List;
import java.util.UUID;

@EnableJpaRepositories
public interface ItensRepository extends JpaRepository<ItensEntity, UUID> {

    ItensEntity findByName(String name);

    List<ItensListDTO> findAllBy();
}

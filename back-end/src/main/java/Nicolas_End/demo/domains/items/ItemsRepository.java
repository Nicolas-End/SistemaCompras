package Nicolas_End.demo.domains.items;

import Nicolas_End.demo.dtos.items.ItensListDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.List;
import java.util.UUID;

@EnableJpaRepositories
public interface ItemsRepository extends JpaRepository<ItemsEntity, UUID> {

    ItemsEntity findByName(String name);

    List<ItensListDTO> findAllBy();

    boolean existsByName(String name);

}

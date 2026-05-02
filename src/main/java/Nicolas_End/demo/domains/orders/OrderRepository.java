package Nicolas_End.demo.domains.orders;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface OrderRepository extends JpaRepository<UUID, OrderEntity> {


}

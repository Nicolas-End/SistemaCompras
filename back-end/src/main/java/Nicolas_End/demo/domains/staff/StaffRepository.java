package Nicolas_End.demo.domains.staff;


import Nicolas_End.demo.dtos.staff.StaffDatasDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.List;
import java.util.UUID;

@EnableJpaRepositories
public interface StaffRepository extends JpaRepository<StaffEntity, UUID> {

    StaffEntity findByEmail(String email);

    List<StaffDatasDTO> findAllBy();
}

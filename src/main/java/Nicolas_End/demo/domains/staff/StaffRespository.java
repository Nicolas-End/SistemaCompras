package Nicolas_End.demo.domains.staff;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface StaffRespository extends JpaRepository<UUID, StaffEntity> {

    StaffEntity findByEmail(String email);

}

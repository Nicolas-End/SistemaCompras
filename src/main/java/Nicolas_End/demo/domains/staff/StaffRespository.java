package Nicolas_End.demo.domains.staff;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.UUID;

@EnableJpaRepositories
public interface StaffRespository extends JpaRepository<StaffEntity, UUID> {

    StaffEntity findByEmail(String email);



}

package Nicolas_End.demo.domains.annex;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

@EnableJpaRepositories
public interface AnnexRepository extends JpaRepository<AnnexEntity, UUID> {

    /*Query para procuar annex com base em uma lista de keys*/
    @Query("SELECT a FROM AnnexEntity a WHERE a.key in :keys")
    List<AnnexEntity> findAllByKey(@Param("keys")List<String> keys);

}

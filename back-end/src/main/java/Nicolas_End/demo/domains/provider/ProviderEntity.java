package Nicolas_End.demo.domains.provider;

import Nicolas_End.demo.infra.util.clock.ApiClockUtil;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Optional;
import java.util.UUID;

@Entity
@Table(name = "TB_PROVIDER")


@Getter
@Setter
public class ProviderEntity implements Serializable {

    public ProviderEntity(String cnpj, String name, Optional<String> telephone, Optional<String> address){
        this.cnpj = cnpj;
        this.name = name;
        telephone.ifPresent(telephoneString -> this.telephone = telephoneString);
        address.ifPresent(addressString -> this.address = addressString);

    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;



    @Column(length = 14, unique = true)
    private String cnpj;

    @Column(nullable = false)
    private String name;

    @Column (length = 11 )
    private String telephone;

    @Column
    private  String address;

    @Column
    private String createdAt;

    @Column
    private String updatedAt;



    @PrePersist
    public void prePersist(){
        this.createdAt = ApiClockUtil.getPresentDay();
    }

    @PreUpdate
    public void preUpdate(){
        this.updatedAt = ApiClockUtil.getPresentDay();

    }


}

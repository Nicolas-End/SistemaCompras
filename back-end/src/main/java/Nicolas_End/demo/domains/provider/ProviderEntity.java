package Nicolas_End.demo.domains.provider;

import Nicolas_End.demo.dtos.provider.BasicProviderInfosDTO;
import Nicolas_End.demo.infra.util.clock.ApiClockUtil;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Optional;
import java.util.UUID;

@Entity
@Table(name = "TB_PROVIDER")
@NoArgsConstructor
@Getter
@Setter
public class ProviderEntity implements Serializable {
    
    private ProviderEntity (String cnpj, String name, String telephone, String address){
        this.cnpj = cnpj;
        this.name = name;
        this.telephone = telephone;
        this.address = address;
    }

    public static ProviderEntity createInstanceByBasicDTO(BasicProviderInfosDTO datas){
        return new ProviderEntity(datas.cnpj(), datas.name(), datas.telephone(), datas.address());
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

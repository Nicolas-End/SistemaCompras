package Nicolas_End.demo.domains.provider;

import Nicolas_End.demo.dtos.provider.BasicProviderInfosDTO;
import Nicolas_End.demo.infra.util.clock.ApiClockUtil;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.autoconfigure.info.ProjectInfoProperties;

import java.io.Serializable;
import java.util.Optional;
import java.util.UUID;

@Entity
@Table(name = "TB_PROVIDER")
@NoArgsConstructor
@Getter
@Setter
public class ProviderEntity implements Serializable {
    


    private ProviderEntity (Builder builder){
        this.cnpj = builder.cnpj;
        this.name = builder.name;
        this.telephone = builder.telephone;
        this.address = builder.address;
    }

    public static class Builder{
        private final String cnpj;
        private final String name;

        private String telephone = null;
        private String address = null;
        public Builder(String cnpj, String name){
            this.cnpj = cnpj;
            this.name = name;
        }

        public Builder telephone (String telephone){
            this.telephone = telephone;
            return this;
        }

        public Builder address(String address){
            this.address = telephone;
            return this;
        }

        public ProviderEntity build(){
            return new ProviderEntity(this);
        }
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

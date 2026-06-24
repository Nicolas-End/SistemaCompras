package Nicolas_End.demo.domains.itens;


import Nicolas_End.demo.domains.provider.ProviderEntity;
import Nicolas_End.demo.infra.util.clock.ApiClockUtil;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "tb_itens")
@Getter
@Setter
@NoArgsConstructor
public class ItensEntity implements Serializable {

    private ItensEntity(String name, Double price, ProviderEntity providerEntity, String code ){
        this.name = name;
        this.price = price;
        this.provider = providerEntity;
        this.internalCode = code;
    }



    public static class Builder{
        private final String name;
        private final Double price;
        private ProviderEntity provider = null;
        private String code = null;

        public Builder(String name, Double price) {
            this.name = name;
            this.price = price;
        }

        public Builder provider(ProviderEntity provider){
            this.provider = provider;
            return  this;
        }

        public Builder internalCode(String code){
            this.code = code;
            return this;
        }

        public ItensEntity build() {
            return new ItensEntity(this.name, this.price,this.provider, this.code);
        }
    }
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    // codigo interno da empresa
    @Column(nullable = true, unique = true)
    private String internalCode;

    @Column(nullable = false, unique = true)
    private String name;

    @Column
    private String createdAt;

    @Column
    private String updatedAt;

    @ManyToOne
    @JoinColumn(insertable = true)
    private ProviderEntity provider;


    @Column
    private double price;

    @PrePersist
    public void prePersist(){
        this.createdAt = ApiClockUtil.getPresentDay();
    }

    @PreUpdate
    public void preUpdate(){
        this.updatedAt = ApiClockUtil.getPresentDay();

    }

}

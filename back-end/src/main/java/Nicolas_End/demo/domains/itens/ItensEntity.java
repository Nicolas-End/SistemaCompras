package Nicolas_End.demo.domains.itens;


import Nicolas_End.demo.domains.provider.ProviderEntity;
import Nicolas_End.demo.dtos.itens.ItemAndProviderEnityDTO;
import Nicolas_End.demo.infra.util.clock.ApiClockUtil;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Entity
@Table(name = "tb_itens")
@Getter
@Setter
@NoArgsConstructor
public class ItensEntity implements Serializable {

    private ItensEntity(String name, Double price, ProviderEntity providerEntity){
        this.name = name;
        this.price = price;
        this.provider = providerEntity;
    }

    public static ItensEntity createInstanceWithDTO(ItemAndProviderEnityDTO datas){
        return  new ItensEntity(datas.name(), datas.price(), datas.providerEntity());
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    // codigo interno da empresa
    @Column(nullable = true, unique = true)
    private String InternalCode;

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

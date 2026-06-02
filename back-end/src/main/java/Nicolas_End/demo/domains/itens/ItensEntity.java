package Nicolas_End.demo.domains.itens;


import Nicolas_End.demo.domains.provider.ProviderEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "tb_itens")
@Getter
@Setter
public class ItensEntity implements Serializable {

    public ItensEntity(String name, Double price, ProviderEntity providerEntity){
        this.name = name;
        this.price = price;
        this.provider = providerEntity;
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
    private LocalDateTime createdAt;

    @Column
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(insertable = true)
    private ProviderEntity provider;


    @Column
    private double price;

    @PrePersist
    public void prePersist(){
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    public void preUpdate(){
        this.updatedAt = LocalDateTime.now();
    }
}

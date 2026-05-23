package Nicolas_End.demo.domains.quote;

import Nicolas_End.demo.domains.annex.AnnexEntity;
import Nicolas_End.demo.domains.itens.ItensEntity;
import Nicolas_End.demo.domains.provider.ProviderEntity;
import Nicolas_End.demo.domains.staff.StaffEntity;
import Nicolas_End.demo.enums.quotes.QuoteStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "TB_QUOTE", schema = "compras")
@Getter
@Setter
public class QuoteEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updateAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuoteStatus status;


   @ManyToOne
   @JoinColumn(name = "staff_id")
    private StaffEntity requestFor;


    @ManyToOne
    @JoinColumn(name = "provider_id")
    private ProviderEntity provider;


    @ManyToMany
    @JoinTable(
            name ="TB_ANEXX_QUOTE",
            joinColumns = @JoinColumn(name = "quote_id"),
            inverseJoinColumns = @JoinColumn(name = "annex_id"),
            indexes = @Index(columnList = "quote_id"),
            schema = "compras"

    )
    private List<AnnexEntity> annexes;



    @PrePersist
    public void PrePersist(){
        this.status = QuoteStatus.SOLICITADO;
        this.createdAt = LocalDateTime.now();
    };

    @PreUpdate
    public void PreUpdate(){
        this.updateAt = LocalDateTime.now();
    }





}

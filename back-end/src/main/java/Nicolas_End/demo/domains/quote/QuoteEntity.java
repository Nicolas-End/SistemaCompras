package Nicolas_End.demo.domains.quote;

import Nicolas_End.demo.domains.annex.AnnexEntity;
import Nicolas_End.demo.domains.itens_order.ItemsQuoteEntity;
import Nicolas_End.demo.domains.provider.ProviderEntity;
import Nicolas_End.demo.domains.staff.StaffEntity;
import Nicolas_End.demo.enums.quotes.QuoteStatus;
import Nicolas_End.demo.infra.security.auth.AutheticatedStaff;
import Nicolas_End.demo.infra.util.model.BasicEntityModel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "TB_QUOTE", schema = "compras")
@Getter
@Setter
@NoArgsConstructor
public class QuoteEntity extends BasicEntityModel {

    private QuoteEntity (List<ItemsQuoteEntity> items, List<AnnexEntity>annexes){
        this.items = items;
        this.annexes = annexes;
    }
    public static class Builder{

        private  List<ItemsQuoteEntity> items = null;
        private  List<AnnexEntity> annexes = null;

        public Builder items(List<ItemsQuoteEntity> items){
            this.items = items;
            return this;
        }

        public Builder annex(List<AnnexEntity> annexes){
            this.annexes = annexes;
            return this ;
        }

        public QuoteEntity build(){
            return new QuoteEntity(this.items, this.annexes);
        }

    }
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;



    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private QuoteStatus status;

    @OneToMany(mappedBy = "quote")
    private List<ItemsQuoteEntity> items;

   @ManyToOne
   @JoinColumn(name = "staff_id")
    private StaffEntity requestFor;


    @ManyToOne
    @JoinColumn(name = "provider_id")
    private ProviderEntity provider;


    //relação para os anexos
    //  como pdf, imagem e afins
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
    public void initialize(){
        this.requestFor = AutheticatedStaff.Get();
        this.status = QuoteStatus.SOLICITADO;
    };





}

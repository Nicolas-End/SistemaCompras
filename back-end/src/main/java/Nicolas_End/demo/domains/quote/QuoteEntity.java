package Nicolas_End.demo.domains.quote;

import Nicolas_End.demo.domains.annex.AnnexEntity;
import Nicolas_End.demo.domains.itens_order.ItemsQuoteEntity;
import Nicolas_End.demo.domains.provider.ProviderEntity;
import Nicolas_End.demo.domains.staff.StaffEntity;
import Nicolas_End.demo.enums.quotes.QuoteStatus;
import Nicolas_End.demo.infra.exception.costumExceptions.DataLimitLenghtException;
import Nicolas_End.demo.infra.security.auth.AutheticatedStaff;
import Nicolas_End.demo.infra.util.model.BasicEntityModel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import java.util.List;
import java.util.UUID;

@Slf4j
@Entity
@Table(name = "TB_QUOTE", schema = "compras")
@Getter
@Setter
@NoArgsConstructor
public class QuoteEntity extends BasicEntityModel {

    private QuoteEntity (Builder builder){
        this.items = builder.items;
        this.annexes = builder.annexes;
        this.annexQuantity = builder.annexQuantity;
        this.itemQuantity = builder.itemQuantity;
        this.observation = builder.observation;
    }
    public static class Builder{
        private int itemQuantity = 0;
        private int annexQuantity = 0;
        private String observation = null;
        private  List<ItemsQuoteEntity> items = null;
        private  List<AnnexEntity> annexes = null;

        public Builder items(List<ItemsQuoteEntity> items){

            if(items != null){
                this.items = items;
                this.itemQuantity = items.size();
            }

            return this;
        }

        public Builder observation(String observation) {

            if (observation.length() > 1500) {
                throw new DataLimitLenghtException("Campo obersavação recebeu um tamanho invalido");
            }

            this.observation = observation;
            return this;
        }

        public Builder annex(List<AnnexEntity> annexes){
            if(annexes != null){
                this.annexes = annexes;
                this.annexQuantity = annexes.size();

            }

            return this ;
        }

        public QuoteEntity build(){
            return new QuoteEntity(this);
        }

    }
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(name = "annex_quantity")
    private int annexQuantity;

    @Column(name = "item_quantity")
    private int itemQuantity;

    @Column(length = 1000)
    private String observation;

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


    public void setItems(List<ItemsQuoteEntity> items){
        if(items != null){
            this.items = items;
            this.itemQuantity = items.size();
        }
    }
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

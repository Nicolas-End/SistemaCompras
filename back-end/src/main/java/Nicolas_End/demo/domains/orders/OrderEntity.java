package Nicolas_End.demo.domains.orders;

import Nicolas_End.demo.domains.quote.QuoteEntity;
import Nicolas_End.demo.enums.order.OrderStatus;
import Nicolas_End.demo.infra.util.date.DateUtil;
import Nicolas_End.demo.infra.util.model.BasicEntityModel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "TB_ORDERS", schema = "compras")
@Getter
@Setter
@NoArgsConstructor
public class OrderEntity extends BasicEntityModel {

    public OrderEntity (Builder builder){
        this.internalId= builder.internalId;
        this.quoteId = builder.quote;

    }


    public static class Builder{
        private final QuoteEntity quote;
        private String internalId = null;

        public Builder(QuoteEntity quote){
            this.quote = quote;
        }

        public Builder Id(String internalId){
            this.internalId = internalId;

            return  this;
        }

        public OrderEntity build(){
            return new OrderEntity(this);
        }

    }

    @Id
    @GeneratedValue( strategy = GenerationType.AUTO)
    private UUID id;


    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @OneToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name="quote_id", referencedColumnName = "id")
    private QuoteEntity quoteId;

    @Column
    private String internalId;



    @PrePersist
    private void PrePersist(){

        this.orderStatus = OrderStatus.CHEGANDO;
    }




}

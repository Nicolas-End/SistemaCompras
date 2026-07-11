package Nicolas_End.demo.domains.orders;

import Nicolas_End.demo.domains.quote.QuoteEntity;
import Nicolas_End.demo.enums.order.OrderStatus; 
import Nicolas_End.demo.infra.util.model.BasicEntityModel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "TB_ORDERS", schema = "compras")
@Getter
@Setter

public class OrderEntity extends BasicEntityModel {

    @Id
    @GeneratedValue( strategy = GenerationType.AUTO)
    private UUID id;


    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @OneToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name="quote_id", referencedColumnName = "id")
    private QuoteEntity quoteId;




    @PrePersist
    private void PrePersist(){
        this.orderStatus = OrderStatus.CHEGANDO;
    }


}

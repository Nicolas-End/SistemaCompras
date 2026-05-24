package Nicolas_End.demo.domains.itens_order;

import Nicolas_End.demo.domains.itens.ItensEntity;
import Nicolas_End.demo.domains.orders.OrderEntity;
import Nicolas_End.demo.domains.quote.QuoteEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "TB_ITENS_QUOTE", schema = "compras")
@Getter
@Setter
public class ItensOrderEntity implements Serializable {
    @EmbeddedId
    private ItensOrderId id;


    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("orderId")
    @JoinColumn(name = "order_id")
    private QuoteEntity order;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("itemId")
    @JoinColumn(name = "item_id")
    private ItensEntity item;

    @Column(nullable = false,unique = false)
    private Integer quantity;

    @Column(name="created_at")
    private LocalDateTime createdAt;

    @Column(name="updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    private void PrePersist(){
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    private  void PreUpdate(){
        this.updatedAt = LocalDateTime.now();
    }
}



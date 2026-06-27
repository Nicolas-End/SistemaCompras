package Nicolas_End.demo.domains.itens_order;

import Nicolas_End.demo.domains.itens.ItensEntity;
import Nicolas_End.demo.domains.quote.QuoteEntity;
import Nicolas_End.demo.infra.util.model.BasicEntityModel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "TB_ITENS_QUOTE", schema = "compras")
@Getter
@Setter
public class ItensQuoteEntity extends BasicEntityModel {
    @EmbeddedId
    private ItensQuoteId id;


    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("quoteId")
    @JoinColumn(name = "quote_id")
    private QuoteEntity quote;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("itemId")
    @JoinColumn(name = "item_id")
    private ItensEntity item;

    @Column(nullable = false,unique = false)
    private Integer quantity;

}



package Nicolas_End.demo.domains.itens_order;

import Nicolas_End.demo.domains.annex.AnnexEntity;
import Nicolas_End.demo.domains.items.ItemsEntity;
import Nicolas_End.demo.domains.quote.QuoteEntity;
import Nicolas_End.demo.infra.util.model.BasicEntityModel;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "TB_ITENS_QUOTE", schema = "compras")
@Getter
@Setter
@NoArgsConstructor
public class ItemsQuoteEntity extends BasicEntityModel {

    public ItemsQuoteEntity(ItemsEntity item, QuoteEntity quote, Integer quantity){
        this.item = item;
        this.quote = quote;
        this.quantity = quantity;

        this.id = new ItensQuoteId();
        this.id.setItemId(item.getId());
        this.id.setQuoteId(quote.getId());


    }

    @EmbeddedId
    private ItensQuoteId id;

    public static class Builder{

        private final ItemsEntity item ;
        private  final QuoteEntity quote;
        private Integer quantity = 0;

        public Builder(ItemsEntity item, QuoteEntity quote){
            this.item = item;
            this.quote = quote;
        }

        public Builder quantity(Integer quantity){
            this.quantity = quantity;
            return this;
        }

        public ItemsQuoteEntity build(){
            return new ItemsQuoteEntity(this.item, this.quote, this.quantity);
        }

    }
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @MapsId("quoteId")
    @JoinColumn(name = "quote_id")
    private QuoteEntity quote;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("itemId")
    @JoinColumn(name = "item_id")
    private ItemsEntity item;

    @Column(nullable = false,unique = false)
    private Integer quantity;
}



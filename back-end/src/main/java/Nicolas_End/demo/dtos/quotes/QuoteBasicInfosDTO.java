package Nicolas_End.demo.dtos.quotes;

import Nicolas_End.demo.domains.annex.AnnexEntity;
import Nicolas_End.demo.domains.annex.AnnexService;
import Nicolas_End.demo.domains.items.ItemsEntity;
import Nicolas_End.demo.domains.itens_order.ItemsQuoteEntity;
import lombok.Getter;
import lombok.Setter;


import java.util.Date;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class QuoteBasicInfosDTO  {

    private UUID id;
    private  String requestFor;
    private Date createdAt;
    private  int annexQuantity;
    private int itemsQuantity;

    private QuoteBasicInfosDTO (Builder builder){
        this.id = builder.id;
        this.requestFor = builder.requestFor;
        this.createdAt = builder.createdAt;
        this.annexQuantity = builder.annexQuantity;
        this.itemsQuantity = builder.itemsQuantity;
    }

    public static class Builder{
        private final UUID id;
        private final String requestFor;
        private final Date createdAt;
        private int annexQuantity = 0;
        private int itemsQuantity = 0;

        public Builder(UUID id, String requestFor, Date createdAt){
            this.id = id;
            this.requestFor = requestFor;
            this.createdAt = createdAt;
        }

        public Builder annexQuantity(int annexQuantity) {
            this.annexQuantity = annexQuantity;

            return  this;
        }

        public  Builder itemsQuantity(int itemsQuantity){
            this.itemsQuantity = itemsQuantity ;

            return this;
        }


        public QuoteBasicInfosDTO build(){
            return new QuoteBasicInfosDTO(this) ;
        }

    }

}

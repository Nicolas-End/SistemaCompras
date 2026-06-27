package Nicolas_End.demo.domains.itens_order;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.UUID;

@Embeddable
public class ItensQuoteId implements Serializable {

    private UUID quoteId;


    private  UUID itemId;
}

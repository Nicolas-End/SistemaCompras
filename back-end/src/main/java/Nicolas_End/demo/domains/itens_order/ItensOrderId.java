package Nicolas_End.demo.domains.itens_order;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.util.UUID;

@Embeddable
public class ItensOrderId  {

    private UUID orderId;


    private  UUID itemId;
}

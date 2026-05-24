package Nicolas_End.demo.domains.itens_order;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.UUID;

@Embeddable
public class ItensOrderId implements Serializable {

    private UUID orderId;


    private  UUID itemId;
}

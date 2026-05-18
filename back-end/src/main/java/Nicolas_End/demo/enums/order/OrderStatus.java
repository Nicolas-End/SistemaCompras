package Nicolas_End.demo.enums.order;


import lombok.Getter;

@Getter
public enum OrderStatus {
    CHEGANDO("CHEGANDO"),
    RECEBIDO("RECEBIDO"),
    CANCELADO("CANCELADO");

    private final String status;

    OrderStatus(String status){
        this.status = status;
    }


}

package Nicolas_End.demo.enums.quotes;

import lombok.Getter;

@Getter
public enum QuoteStatus {
    SOLICITADO("SOLICITADO"),
    EM_COTACAO("EM_COTACAO"),
    AGUARDANDO_APROVACAO("AGUARDANDO_APROVACAO"),
    APROVADO("APROVADO"),
    REJEITADO("REJEITADO");

    private final String status;

    QuoteStatus(String status){
        this.status = status;
    }




}

package Nicolas_End.demo.enums.quotes;


import lombok.Getter;
import lombok.Setter;

@Getter
public enum QuoteStatus {
    SOLICITADO("SOLICITADO"),
    AGUANDANDO_ANALISE_COMPRADOR("ANALISE_COMPRADOR"),
    AGUARDANDO_IMPLANTACAO_VENDEDOR("IMPLANTACAO_VENDEDOR");

    private final String status;

    QuoteStatus(String status){
        this.status = status;
    }




}

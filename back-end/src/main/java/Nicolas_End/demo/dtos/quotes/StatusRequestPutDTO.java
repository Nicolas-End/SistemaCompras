package Nicolas_End.demo.dtos.quotes;

import Nicolas_End.demo.enums.quotes.QuoteStatus;

import java.util.UUID;

public record StatusRequestPutDTO(
        UUID id,
        QuoteStatus newStatus
) {


}

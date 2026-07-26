package Nicolas_End.demo.dtos.quotes;

import Nicolas_End.demo.dtos.annex.AnnexPostDTO;
import Nicolas_End.demo.dtos.items.ItemQuantityDTO;
import Nicolas_End.demo.enums.quotes.QuoteStatus;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.UUID;

public record QuoteEditableDatasDTO (
        @NotNull(message = "Id do orçamento não pode ser Null")
        UUID id,

        @Valid
        UUID providerId,

        @Valid
        List<ItemQuantityDTO> items,

        @Valid
        List<AnnexPostDTO> annexes,

        @Valid
        String observation,

        @Valid
        QuoteStatus status
){

}

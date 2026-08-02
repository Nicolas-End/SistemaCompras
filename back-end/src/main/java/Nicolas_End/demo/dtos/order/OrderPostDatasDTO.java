package Nicolas_End.demo.dtos.order;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record OrderPostDatasDTO (
        @NotNull
        UUID quoteId,
        @Valid
        String internalId

) {
}

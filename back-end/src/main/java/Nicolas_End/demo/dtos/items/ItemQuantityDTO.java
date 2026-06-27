package Nicolas_End.demo.dtos.items;




import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

import java.util.UUID;

public record ItemQuantityDTO(
        @NotBlank
        UUID id,
        @Positive
        int quantity ) {

}

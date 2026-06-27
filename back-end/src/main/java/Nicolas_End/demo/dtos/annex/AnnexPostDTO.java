package Nicolas_End.demo.dtos.annex;

import Nicolas_End.demo.enums.annex.AnnexTypes;
import jakarta.validation.constraints.NotBlank;

public record AnnexPostDTO (
        @NotBlank
        String url,
        @NotBlank
        AnnexTypes type

){
}

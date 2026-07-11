package Nicolas_End.demo.dtos.annex;

import Nicolas_End.demo.enums.annex.AnnexTypes;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;


public record AnnexPostDTO (
        String url,
        @Enumerated(EnumType.STRING)
        AnnexTypes type,
        String key,
        String name

){
}

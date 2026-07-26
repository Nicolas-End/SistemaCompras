package Nicolas_End.demo.dtos.quotes;

import Nicolas_End.demo.dtos.annex.AnnexPostDTO;
import Nicolas_End.demo.dtos.items.ItemQuantityDTO;

import java.util.List;
public record QuotePostDatasDTO(
        List<ItemQuantityDTO> items,
        List<AnnexPostDTO> annexes,

        String observation
){
}

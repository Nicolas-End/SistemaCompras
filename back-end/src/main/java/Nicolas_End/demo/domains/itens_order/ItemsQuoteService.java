package Nicolas_End.demo.domains.itens_order;


import Nicolas_End.demo.domains.items.ItemsEntity;
import Nicolas_End.demo.domains.quote.QuoteEntity;
import Nicolas_End.demo.dtos.items.ItemEntityAndQuantityDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemsQuoteService {

    public List<ItemsQuoteEntity> creatItemsQuoteEntitiesList(List<ItemEntityAndQuantityDTO> itemsList, QuoteEntity quote){
        return itemsList.stream().map(items ->
                new ItemsQuoteEntity.Builder(items.itemsEntity(), quote)
                .quantity(items.quantity())
                .build()).toList();

    }

}

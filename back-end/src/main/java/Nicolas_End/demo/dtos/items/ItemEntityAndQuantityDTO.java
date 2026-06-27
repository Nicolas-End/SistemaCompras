package Nicolas_End.demo.dtos.items;

import Nicolas_End.demo.domains.items.ItemsEntity;

public record ItemEntityAndQuantityDTO(
        ItemsEntity itemsEntity,
        Integer quantity

) {
}

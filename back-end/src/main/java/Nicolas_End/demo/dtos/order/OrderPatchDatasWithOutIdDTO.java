package Nicolas_End.demo.dtos.order;

import Nicolas_End.demo.enums.order.OrderStatus;
import jakarta.validation.Valid;

public record OrderPatchDatasWithOutIdDTO(
        @Valid
        String internalId,
        @Valid
        OrderStatus status) {
}

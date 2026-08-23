package Nicolas_End.demo.dtos.order;

import Nicolas_End.demo.enums.order.OrderStatus;
import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

public record OrderPatchDatasDTO (UUID id,
                                  String internalId,
                                  OrderStatus status){
}
